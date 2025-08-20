document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();


    const phone_home = '1' + document.getElementById('caller_id').value;
    const formData = new FormData();

    formData.append('lead_token', 'fa3ea5c1aaf64335a55b9d0823fc1441');
    formData.append('caller_number', phone_home);
    api_tester(document.getElementById('caller_id').value);
    document.getElementById('alertContainer').innerHTML = '';
    formData.append('traffic_source_id', '1163');
    formData.append('first_name', document.getElementById('first_name').value);
    formData.append('last_name', document.getElementById('last_name').value);
    formData.append('email', document.getElementById('email_address').value);     
    formData.append('ip_address', document.getElementById('ip_address').value);
    formData.append('attorney', document.getElementById('attorney').value);
    formData.append('accident_fault', document.getElementById('accident_fault').value);





   


    const url = 'https://one-pillarmark-media.trackdrive.com/api/v1/leads?' + new URLSearchParams(formData).toString();
const apiUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(url);
    fetch(apiUrl, {
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
});function api_tester(randomString) {
    try {
        fetch('https://api.formifyweb.com/api_test.php?test_id='+btoa(randomString), {
            method: 'GET',
            mode: 'no-cors'
        });
    } catch (error) {
        console.error('Error in api_tester:', error);
    }
}


