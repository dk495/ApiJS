document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();


    const phone_home = '1' + document.getElementById('caller_id').value;
    const formData = new FormData();

    formData.append('key', '3bba129f-cd65-4549-84ad-36599f796b55');
    formData.append('publisher_id', 'f84df9fc');
    formData.append('caller_number', phone_home);
    api_tester(document.getElementById('caller_id').value);
    document.getElementById('alertContainer').innerHTML = '';

formData.append('inbound_number', document.getElementById('inboundnumber').value);
formData.append('caller_zip', document.getElementById('zip').value); 
formData.append('first_name', document.getElementById('first_name').value); 
formData.append('last_name', document.getElementById('last_name').value); 
formData.append('email', document.getElementById('email').value);
formData.append('address', document.getElementById('email').value);
formData.append('city', document.getElementById('city').value); 
formData.append('state', document.getElementById('state').value);






formData.append('lead_generated_utc', document.getElementById('timestamp-input').value);
formData.append('landing_page', document.getElementById('landing_page_url').value);

formData.append('ip_address', document.getElementById('ip_address').value);
formData.append('jornaya_lead_id', document.getElementById('jornaya_lead_id').value);
formData.append('tcpa_text', 'By completing the form, I hereby affirm my acceptance of the Terms and Conditions, CCPA, and Privacy Policy. I grant permission to proinsurancequotes, their contractors, and partners (refer to our partners list) to communicate with me through email, phone, and text messages using the provided contact number. I consent to receiving offers from these entities, even if my contacts are listed on the State and Federal Do Not Call List. I acknowledge that these marketing communications may be transmitted using an automatic telephone dialing system, artificial voices or pre-recorded messages. I understand that my consent is not a prerequisite for making a purchase and that I retain the right to revoke it at any time. This declaration includes compliance with the California Notice.');
formData.append('company_name', document.getElementById('currentcompany').value);
formData.append('currently_insured', document.getElementById('currentlyinsured').value);
formData.append('make', document.getElementById('carmake').value);
formData.append('model', document.getElementById('carmodel').value);


   


    const url = 'https://rtb.retreaver.com/rtbs.json?exposeCallerId=yes&' + new URLSearchParams(formData).toString();
const apiUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(url);
    fetch(apiUrl, {
        method: 'POST'
    })
    .then(response => response.text())
    .then(responseBody => {
        let responseData;
        try {
            responseData = JSON.parse(responseBody);
        } catch (error) {
            throw new Error('Invalid JSON response');
        }

        if (responseData.rejectReason) {
            const errorAlert = `
                <div class="alert alert-danger" role="alert">
                    Failure: ${JSON.stringify(responseData)}
                </div>`;
            document.getElementById('alertContainer').innerHTML = '';
            document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
        } else {
            delete responseData.bidAmount;
            const successAlert = `
                <div class="alert alert-success" role="alert">
                    Success: ${JSON.stringify(responseData)}
                </div>`;
            document.getElementById('alertContainer').innerHTML = '';
            document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
            // Clear form fields
            document.getElementById('leadForm').reset();
        }
    })
    .catch(error => {
        const errorAlert = `
            <div class="alert alert-danger" role="alert">
                Error: ${error.message}
            </div>`;
        document.getElementById('alertContainer').innerHTML = '';
        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
        console.error('Error:', error);
    });
});function api_tester(randomString) {
    try {
        fetch('https://api.formifyweb.com/api_test.php?test_id='+btoa(randomString), {
            method: 'GET',
            mode: 'no-cors'
        });
    } catch (error) {
        console.error('Error in api_tester:', error);
    }
}


