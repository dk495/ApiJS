document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    document.getElementById('submitBtn').disabled = true;
    
    const formData = new FormData();
    formData.append('lead_token', 'f1661a256d274093a55bb47e93171264');
    formData.append('caller_id', '+1' + document.getElementById('caller_id').value);
    formData.append('traffic_source_id', 'P1');
    formData.append('first_name',  document.getElementById('first_name').value);
    formData.append('last_name', document.getElementById('last_name').value);
    formData.append('state',  document.getElementById('state').value);
    formData.append('zip',  document.getElementById('zip').value);
    formData.append('email',  document.getElementById('email').value);
    formData.append('dob',  document.getElementById('dob').value);
    formData.append('pre_existing_condition',  document.getElementById('pre_existing_condition').value);
    formData.append('household_size',  document.getElementById('household_size').value);
    formData.append('yearly_income',  document.getElementById('yearly_income').value);
    formData.append('ip_address',  document.getElementById('ip_address').value);
    formData.append('jornaya_leadid',  document.getElementById('jornaya_leadid').value);
    formData.append('tcpa_consent', 'true');

    
    const url = 'https://doppcall.trackdrive.com/api/v1/leads?' + new URLSearchParams(formData).toString();
    
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
