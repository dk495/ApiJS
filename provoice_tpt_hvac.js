document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const pingData = new FormData();
           pingData.append('lp_campaign_id', '667c02c2e533b');
pingData.append('lp_campaign_key', 'bqpfCLQdD3PTKtH6B9Gk');
 
pingData.append('first_name', document.getElementById('first_name').value);
pingData.append('last_name', document.getElementById('last_name').value);

pingData.append('lp_response', 'JSON');
           
pingData.append('city', document.getElementById('city').value);
pingData.append('state', document.getElementById('state').value);

pingData.append('landing_page', document.getElementById('landing_page').value);
pingData.append('ip_address', document.getElementById('ip_address').value);
pingData.append('hvac_service', document.getElementById('hvac_service').value);
pingData.append('hvac_system_type', document.getElementById('hvac_system_type').value);
pingData.append('zip_code', document.getElementById('zip_code').value);
pingData.append('tcpa_language', 'By completing the form, I hereby affirm my acceptance of the Terms and Conditions, CCPA , and Privacy Policy . I grant permission to myhomeRevamp, their contractors, and partners (refer to our partners list) to communicate with me through email, phone, and text messages using the provided contact number. I consent to receiving offers from these entities, even if my contacts are listed on the "State and Federal Do Not Call List." I acknowledge that these marketing communications may be transmitted using an automatic telephone dialing system or pre-recorded messages. I understand that my consent is not a prerequisite for making a purchase and that I retain the right to revoke it at any time. This declaration includes compliance with the California Notice.');

pingData.append('trustedform_url', document.getElementById('trusted_form_cert_id').value);
            pingData.append('jornaya', document.getElementById('jornaya_lead_id').value);
            pingData.append('trusted_form_cert_id', document.getElementById('trusted_form_cert_id').value);
            pingData.append('jornaya_lead_id', document.getElementById('jornaya_lead_id').value);

    const pingUrl = 'https://corsproxy.io/?https://pointerleads.leadspediatrack.com/ping.do?' + new URLSearchParams(pingData).toString();

    fetch(pingUrl, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(pingResponse => {
        if (pingResponse.result === 'success') {
            const ping_id = pingResponse.ping_id;

            const formData = new FormData();
                   formData.append('lp_campaign_id', '667c02c2e533b'); 
formData.append('lp_campaign_key', 'bqpfCLQdD3PTKtH6B9Gk');
 formData.append('phone_home', document.getElementById('phone_home').value);
formData.append('lp_caller_id', document.getElementById('phone_home').value);

formData.append('lp_response', 'JSON');
            formData.append('first_name', document.getElementById('first_name').value);
formData.append('last_name', document.getElementById('last_name').value);
formData.append('city', document.getElementById('city').value);
formData.append('state', document.getElementById('state').value);
formData.append('email_address', document.getElementById('email').value);
formData.append('address', document.getElementById('address').value);
formData.append('landing_page', document.getElementById('landing_page').value);
formData.append('ip_address', document.getElementById('ip_address').value);
formData.append('hvac_service', document.getElementById('hvac_service').value);
formData.append('hvac_system_type', document.getElementById('hvac_system_type').value);
formData.append('zip_code', document.getElementById('zip_code').value);
formData.append('tcpa_language', 'By completing the form, I hereby affirm my acceptance of the Terms and Conditions, CCPA , and Privacy Policy . I grant permission to myhomeRevamp, their contractors, and partners (refer to our partners list) to communicate with me through email, phone, and text messages using the provided contact number. I consent to receiving offers from these entities, even if my contacts are listed on the "State and Federal Do Not Call List." I acknowledge that these marketing communications may be transmitted using an automatic telephone dialing system or pre-recorded messages. I understand that my consent is not a prerequisite for making a purchase and that I retain the right to revoke it at any time. This declaration includes compliance with the California Notice.');
formData.append('call_recording_url', document.getElementById('call_recording_url').value);
formData.append('trustedform_url', document.getElementById('trusted_form_cert_id').value);
            formData.append('jornaya', document.getElementById('jornaya_lead_id').value);
            formData.append('trusted_form_cert_id', document.getElementById('trusted_form_cert_id').value);
            formData.append('jornaya_lead_id', document.getElementById('jornaya_lead_id').value);
            formData.append('lp_ping_id', ping_id); // Include the ping_id from the ping response

            const postUrl = 'https://pointerleads.leadspediatrack.com/post.do?' + new URLSearchParams(formData).toString();

            fetch(postUrl, {
                method: 'POST'
            })
            .then(response => {
                if (response.status === 200 || response.status === 201) {
                    response.text().then(responseBody => {
                        const successAlert = `
                            <div class="alert alert-success" role="alert">
                                ${response.status} : Form submitted successfully! Response Body: ${responseBody}
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
                    });
                    document.getElementById('submitBtn').disabled = false;
                } else {
                    response.text().then(responseBody => {
                        const errorAlert = `
                            <div class="alert alert-danger" role="alert">
                                Form submission failed. Please try again. Response Body: ${responseBody}
                            </div>`;
                        document.getElementById('alertContainer').innerHTML = '';
                        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
                    });
                    document.getElementById('submitBtn').disabled = false;
                }
            })
            .catch(error => console.error('Error:', error));
        } else {
            const errorAlert = `
                <div class="alert alert-danger" role="alert">
                    Ping failed. Response Body: ${JSON.stringify(pingResponse)}
                </div>`;
            document.getElementById('alertContainer').innerHTML = '';
            document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
            document.getElementById('submitBtn').disabled = false;
        }
    })
    .catch(error => console.error('Error:', error));
});

    
