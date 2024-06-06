document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    document.getElementById('submitBtn').disabled = true;
    
    const formData = new FormData();
    formData.append('lead_token', 'd7144429ec19450292644a3048f30e32');
    formData.append('caller_id', '+1' + document.getElementById('caller_id').value);
    formData.append('traffic_source_id', '1014');
  
    formData.append('first_name',  document.getElementById('first_name').value);
    formData.append('last_name', document.getElementById('last_name').value);
 
    formData.append('state',  document.getElementById('state').value);
    formData.append('zip',  document.getElementById('zip').value);
    formData.append('dob',  document.getElementById('dob').value);
     formData.append('jornaya_leadid',  document.getElementById('jornaya_leadid').value);
 

    
    const url = 'https://express-lead-hub.trackdrive.com/api/v1/leads/capture?' + new URLSearchParams(formData).toString();
    
    fetch(url, {
        method: 'POST'
    })
    .then(response => {
        document.getElementById('submitBtn').disabled = false;
        
        if (response.status === 200 || response.status === 201) {
            response.text().then(responseBody => {
                const successAlert = `
                    <div class="alert alert-success" role="alert">
                        ${response.status} : Form submitted successfully! Response Body: ${responseBody}
                    </div>`;
                document.getElementById('alertContainer').innerHTML = '';
                document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
            });
            document.getElementById('leadForm').reset();
        } else if (response.status === 422) {
            response.json().then(data => {
                const errorAlert = `
                    <div class="alert alert-danger" role="alert">
                        Error. Response Body: ${JSON.stringify(data)}
                    </div>`;
                document.getElementById('alertContainer').innerHTML = '';
                document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
            });
        } else {
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
