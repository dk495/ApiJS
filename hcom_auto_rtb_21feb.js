 document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();
document.getElementById('submitBtn').disabled = true;
             // Your API URL
    const formData = new FormData();
formData.append('key', '9e0dd95b-83b5-4818-a9b2-5e42f01c3b80');
formData.append('publisher_id', '4abd32bc');
    api_tester(document.getElementById('caller_id').value);
    formData.append('caller_number', '+1' + document.getElementById('caller_id').value);
formData.append('first_name', document.getElementById('first_name').value);
formData.append('last_name', document.getElementById('last_name').value);
formData.append('address1', document.getElementById('address').value);
formData.append('city', document.getElementById('city').value);
formData.append('state', document.getElementById('state').value);
formData.append('zip', document.getElementById('zip').value);
formData.append('email', document.getElementById('email').value);
formData.append('current_provider', document.getElementById('insurance_company').value);
formData.append('home_ownership', document.getElementById('homeowner').value);

formData.append('currently_insured', document.getElementById('currently_insured').value);


formData.append('sr22', document.getElementById('sr22').value);
formData.append('state_minimum', document.getElementById('state_minimum').value);
formData.append('trusted_form_url', document.getElementById('trusted_form_url').value);
formData.append('tcpa_call_consent', document.getElementById('tcpa_call_consent').value);
formData.append('tcpa_url', 'https://auto.topnotchinsurancedeals.com');
formData.append('tcpa_text', 'This is a solicitation for insurance. By selecting the check box, you represent that you are 18+ years of age and agree to the Privacy Policy and Terms & Conditions. By selecting the above check box, you agree by your electronic signature that you give express written consent via this chat/webform to receive marketing communications regarding auto insurance products and services via live, automated dialing system telephone call, text, or email from a licensed sales agent associated with auto.topnotchinsurancedeals.com at the phone number provided by you, including wireless numbers, if applicable, even if you have previously registered the provided number on the National Do Not Call Registry. SMS/MMS and data messaging rates may apply. I understand this request has been initiated by me and is an unscheduled contact request. I further understand that this request, initiated by me, is my affirmative consent to be contacted, which is in compliance with all federal and state telemarketing and Do-Not-Call laws. Your consent is not required to get a quote or purchase. To receive quotes without providing consent, please call at 855-650-4479 TTY:711 (Mon-Fri 9AM-6PM EST). Carrier data rates may apply. TCPA LeadIDs are used with the information for compliance. You can revoke your consent by filling out the Opt-Out form.');


formData.append('dialed_number', document.getElementById('dialed_number').value);
formData.append('truecall_id', document.getElementById('truecall_id').value);



const url = 'https://rtb.retreaver.com/rtbs.json?' + new URLSearchParams(formData).toString();
const apiUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(url);

    fetch(apiUrl, {
        method: 'POST'
    })
    .then(response => {
        if (response.status === 200 || response.status === 201) {
            response.json().then(responseBody => {
                // Remove 'retreaver_payout' key from response body
                delete responseBody.retreaver_payout;

                const successAlert = `
                    <div class="alert alert-success" role="alert">
                        ${response.status} : Form submitted successfully! Response Body: ${JSON.stringify(responseBody)}
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
        } else {
            response.text().then(responseBody => {
                const errorAlert = `
                    <div class="alert alert-danger" role="alert">
                        Form submission failed. Please try again. Response Body: ${responseBody}
                    </div>`;
                document.getElementById('alertContainer').innerHTML = '';
                document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
document.getElementById('submitBtn').disabled = false;
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