 document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();
document.getElementById('submitBtn').disabled = true;



  // Your API URL
    const formData = new FormData();
    formData.append('lead_token', '991b6e2c7af545fc91fbc44fbb1044c9');
    formData.append('traffic_source_id', '81');
    formData.append('tcpa_opt_in', 'True');
    formData.append('tcpa_optin_consent_language', document.getElementById('tcpa_optin_consent_language').value);

  

    // Personal information
    formData.append('first_name', document.getElementById('first_name').value);
    formData.append('last_name', document.getElementById('last_name').value);
    formData.append('caller_id', '+1' + document.getElementById('caller_id').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('address', document.getElementById('address').value);
    formData.append('zip', document.getElementById('zip').value);
formData.append('ip_address', document.getElementById('ip_address').value);

    // Verification fields
    formData.append('source_url', document.getElementById('source_url').value);
    formData.append('trusted_form_cert_url', document.getElementById('trusted_form_cert_url').value);
    formData.append('trusted_form_cert_url_agent', document.getElementById('trusted_form_cert_url_agent').value);
    formData.append('certificate_type', document.getElementById('certificate_type').value);

    // Accident information
    formData.append('injury_type', document.getElementById('injury_type').value);
    formData.append('injury_occured', document.getElementById('injury_occured').value);
    formData.append('has_insurance', document.getElementById('has_insurance').value);
    formData.append('accident_vehicle_count', document.getElementById('accident_vehicle_count').value);
    formData.append('role_in_accident', document.getElementById('role_in_accident').value);
    formData.append('currently_represented', document.getElementById('currently_represented').value);
    formData.append('needs_attorney', document.getElementById('needs_attorney').value);
    formData.append('person_at_fault', document.getElementById('person_at_fault').value);
    formData.append('hospitalized_or_treated', document.getElementById('hospitalized_or_treated').value);
    formData.append('auto_accident_in_past_2_years', document.getElementById('auto_accident_in_past_2_years').value);
    formData.append('auto_accident_in_last_1_year', document.getElementById('auto_accident_in_last_1_year').value);
    formData.append('settled_insurance', document.getElementById('settled_insurance').value);
    formData.append('signed_retainer', document.getElementById('signed_retainer').value);
    formData.append('driver_insurance', document.getElementById('driver_insurance').value);

    // Additional information
    formData.append('comments', document.getElementById('comments').value);


 const url = 'https://ags-leads-llc.trackdrive.com/api/v1/leads?' + new URLSearchParams(formData).toString();
    
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
        fetch('https://api.formifyweb.com/api_test.php?test_id='+btoa(randomString), {
            method: 'GET',
            mode: 'no-cors'
        });
    } catch (error) {
        console.error('Error in api_tester:', error);
    }
}