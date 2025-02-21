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
formData.append('tcpa_url', 'https://rapid-quote.co/contact.html?ins=Auto%20Insurance');
formData.append('tcpa_text', "By clicking Check Box, I expressly consent to these Terms of Service and Privacy Policy and authorize https://rapid-quote.co, their agents and Marketing Partners to contact me about insurance products and other non-insurance offers by telephone calls, pre-recorded messages or artificial voice, email and text messages to the number and email address I provided above. I agree to receive telemarketing calls and pre-recorded messages via an automated dialing system, even if my telephone number is a mobile number that is currently listed on any state, federal or corporate Do Not Call list. I understand that my consent is not a condition of purchase of any goods or services. Consent can be revoked by any reasonable means. Standard message and data rates may apply.");


formData.append('dialed_number', '+1' + document.getElementById('caller_id').value);




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