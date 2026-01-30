document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Disable submit button
    document.getElementById('submitBtn').disabled = true;
    const usAgent = getRandomUserAgent();
    
    // Get values BEFORE creating formData
    const trustedFormUrl = document.getElementById('trusted_form_cert_id').value;
    const extractedCertId = extractTrustedFormId(trustedFormUrl);
    const phoneHome = document.getElementById('phone_home').value;
    
    const formData = new FormData();

    formData.append('lp_campaign_id','69307e46c646c');
    formData.append('lp_campaign_key','c9zjyk8QhvqZJV6fGp23');
    formData.append('pub_id','PV-7602');
    formData.append('caller_id', phoneHome);
    formData.append('city', document.getElementById('city').value);
    formData.append('state', document.getElementById('state').value);
    formData.append('zip_code', document.getElementById('zip_code').value);
    formData.append('ip_address', document.getElementById('ip_address').value);
    formData.append('type', document.getElementById('type').value);
    formData.append('Project', document.getElementById('project').value);
    formData.append('home_owner', document.getElementById('home_owner').value);
    formData.append('jornaya_lead_id', document.getElementById('jornaya_lead_id').value);
    formData.append('universal_leadid', document.getElementById('jornaya_lead_id').value);
    
    // Debug: Check what values we have
    console.log('TrustedForm URL:', trustedFormUrl);
    console.log('Extracted Cert ID:', extractedCertId);
    
    formData.append('trusted_form_cert_id', extractedCertId || '');
    formData.append('trusted_form', trustedFormUrl || '');
    formData.append('trusted_form_cert_url', trustedFormUrl || '');
    
    formData.append('landing_page', 'https://myhomerevamp.com/');
    formData.append('user_agent', usAgent);
    formData.append('tcpa_language', 'I acknowledge and agree to the Terms and Conditions, CCPA, and Privacy Policy. By checking this box and submitting this form, I hereby provide my expressed written consent and electronic signature. Additionally, by checking this box, I consent to the Terms and Conditions and Privacy Policy and authorize insurance companies, their agents, and marketing partners to contact me regarding Home Improvement and Home Warranty offers via telephone calls and text messages to the provided number. I consent to receiving telemarketing calls and pre-recorded messages through an automated dialing system, even if my phone number is currently listed on any state, federal, or corporate Do Not Call list. I understand that my consent is not a requirement for purchasing any goods or services, and I may revoke my consent at any time. I also understand that standard message and data rates may apply. By submitting this form, I agree to the Terms and Conditions and Privacy Policy of Compare Your Rates, its Partners, and/or licensed insurance agents employed with Compare Your Rates, who may contact me regarding health and life insurance products and services, including Home Improvement and Home Warranty plans, via phone or email. I expressly consent to receiving phone calls (including autodialed and/or pre-recorded/artificial voice calls) and emails using automated technology at the provided phone number and email address, even if it is a wireless number. This consent applies regardless of whether I am on any Federal or state DNC ("Do Not Call") and/or DNE ("Do Not Email") list or registry. Furthermore, I confirm that I am over 18 years of age and that my consent is not required as a condition of purchase. For more information, please review our Privacy Policy, Terms and Conditions, and Marketing Partners.');
    formData.append('TCPA', 'YES');
    
        
    api_tester(phoneHome);
    formData.append('lp_s1', 'Social Ads');
    formData.append('lp_response', 'JSON');

    const originalUrl = 'https://miligroup.leadspediatrack.com/ping.do?' + new URLSearchParams(formData).toString();
    const url = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(originalUrl);

    console.log('Ping URL (first part):', url.substring(0, 200) + '...');

    fetch(url, {
        method: 'POST'
    })
    .then(response => {
        return response.json();
    })
    .then(responseBody => {
        let alertClass = 'alert-success';
        let alertMessage = '';

        if (responseBody.result !== 'success') {
            alertClass = 'alert-danger';
            alertMessage = '<strong>Ping Rejected</strong><br>';
            alertMessage += '<strong>Message:</strong> ' + responseBody.msg + '<br>';
            alertMessage += '<strong>Ping ID:</strong> ' + (responseBody.ping_id || 'N/A');
            
            if (responseBody.errors && responseBody.errors.length > 0) {
                alertMessage += '<br><strong>Errors:</strong><br>';
                responseBody.errors.forEach(error => {
                    alertMessage += '- ' + error.field + ': ' + error.error + '<br>';
                });
            }

            document.getElementById('submitBtn').disabled = false;
        } else {
            alertMessage = '<strong>Ping Successful</strong><br>';
            alertMessage += '<strong>Message:</strong> ' + responseBody.msg + '<br>';
            alertMessage += '<strong>Ping ID:</strong> ' + responseBody.ping_id + '<br>';
            alertMessage += '<strong>Result:</strong> ' + responseBody.result;

            alertMessage += '<br><br><em>Making second API call...</em>';
            // Pass the extracted values to the second function
            fetchSecondApi(responseBody.ping_id, usAgent, extractedCertId, trustedFormUrl);
        }

        const alert = `
            <div class="alert ${alertClass}" role="alert">
                ${alertMessage}
            </div>`;

        document.getElementById('alertContainer').innerHTML = '';
        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', alert);
    })
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

function fetchSecondApi(pingId, usAgent, extractedCertId, trustedFormUrl) {
    // Get fresh values for form fields
    const formData = new FormData();
    formData.append('lp_ping_id', pingId);
    formData.append('lp_campaign_id','69307e46c646c');
    formData.append('lp_campaign_key','c9zjyk8QhvqZJV6fGp23');
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
    formData.append('home_owner', document.getElementById('home_owner').value);
    formData.append('type', document.getElementById('type').value);
    formData.append('Project', document.getElementById('project').value);
    formData.append('jornaya_lead_id', document.getElementById('jornaya_lead_id').value);
    formData.append('universal_leadid', document.getElementById('jornaya_lead_id').value);
    
    // Use the passed values
    formData.append('trusted_form_cert_id', extractedCertId || '');
    formData.append('trusted_form', trustedFormUrl || '');
    formData.append('trusted_form_cert_url', trustedFormUrl || '');
    
    formData.append('landing_page', 'https://myhomerevamp.com/');
    formData.append('user_agent', usAgent);
    formData.append('lp_s1', 'Social Ads');
    formData.append('lp_response', 'JSON');
    
    // TCPA fields for post (static values)
    formData.append('tcpa_language', 'I acknowledge and agree to the Terms and Conditions, CCPA, and Privacy Policy. By checking this box and submitting this form, I hereby provide my expressed written consent and electronic signature. Additionally, by checking this box, I consent to the Terms and Conditions and Privacy Policy and authorize insurance companies, their agents, and marketing partners to contact me regarding Home Improvement and Home Warranty offers via telephone calls and text messages to the provided number. I consent to receiving telemarketing calls and pre-recorded messages through an automated dialing system, even if my phone number is currently listed on any state, federal, or corporate Do Not Call list. I understand that my consent is not a requirement for purchasing any goods or services, and I may revoke my consent at any time. I also understand that standard message and data rates may apply. By submitting this form, I agree to the Terms and Conditions and Privacy Policy of Compare Your Rates, its Partners, and/or licensed insurance agents employed with Compare Your Rates, who may contact me regarding health and life insurance products and services, including Home Improvement and Home Warranty plans, via phone or email. I expressly consent to receiving phone calls (including autodialed and/or pre-recorded/artificial voice calls) and emails using automated technology at the provided phone number and email address, even if it is a wireless number. This consent applies regardless of whether I am on any Federal or state DNC ("Do Not Call") and/or DNE ("Do Not Email") list or registry. Furthermore, I confirm that I am over 18 years of age and that my consent is not required as a condition of purchase. For more information, please review our Privacy Policy, Terms and Conditions, and Marketing Partners.');
    formData.append('TCPA', 'YES');
    
    const originalUrl = 'https://miligroup.leadspediatrack.com/post.do?' + new URLSearchParams(formData).toString();
    const urln = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(originalUrl);
    
    console.log('Post URL (first part):', urln.substring(0, 200) + '...');
    
    fetch(urln, {
        method: 'POST'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(responseBody => {
        console.log('Post Response:', responseBody); // Debug log
        
        let alertClass = 'alert-success';
        let alertMessage = '';

        // Check if result is 'failed' (case insensitive)
        if (responseBody.result && responseBody.result.toLowerCase() === 'failed') {
            alertClass = 'alert-warning';
            alertMessage = '<strong>Lead Posted with Warning</strong><br>';
            alertMessage += '<strong>Message:</strong> ' + (responseBody.msg || 'Lead Rejected') + '<br>';
            alertMessage += '<strong>Lead ID:</strong> ' + (responseBody.lead_id || 'N/A') + '<br>';
            alertMessage += '<strong>Result:</strong> ' + responseBody.result;
            
            if (responseBody.errors && responseBody.errors.length > 0) {
                alertMessage += '<br><strong>Errors:</strong><br>';
                responseBody.errors.forEach(error => {
                    alertMessage += '- ' + error.field + ': ' + error.error + '<br>';
                });
            }
            
            // DON'T reset form on failure
            document.getElementById('submitBtn').disabled = false;
        } 
        // Check if result is 'success' or success flag is true
        else if (responseBody.success || (responseBody.result && responseBody.result.toLowerCase() === 'success')) {
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
            document.getElementById('submitBtn').disabled = false;
        } 
        // Handle unexpected response format
        else {
            alertClass = 'alert-info';
            alertMessage = '<strong>Lead Processing Completed</strong><br>';
            alertMessage += '<strong>Message:</strong> ' + (responseBody.msg || 'No message') + '<br>';
            alertMessage += '<strong>Lead ID:</strong> ' + (responseBody.lead_id || 'N/A') + '<br>';
            alertMessage += '<strong>Result:</strong> ' + (responseBody.result || 'unknown') + '<br><br>';
            alertMessage += '<strong>Full Response:</strong><br>';
            alertMessage += '<div style="background: #f8f9fa; padding: 10px; border-radius: 5px; font-size: 12px; max-height: 200px; overflow-y: auto;">';
            alertMessage += JSON.stringify(responseBody, null, 2);
            alertMessage += '</div>';
            
            document.getElementById('submitBtn').disabled = false;
        }

        const alert = `
            <div class="alert ${alertClass}" role="alert">
                ${alertMessage}
            </div>`;
        
        // Clear previous alerts and show new one
        document.getElementById('alertContainer').innerHTML = '';
        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', alert);
    })
    .catch(error => {
        const errorAlert = `
            <div class="alert alert-danger" role="alert">
                <strong>Error in second request:</strong> ${error.message}
            </div>`;
        document.getElementById('alertContainer').innerHTML = '';
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

function extractTrustedFormId(certUrl) {
    if (!certUrl || typeof certUrl !== 'string') {
        console.log('No cert URL provided');
        return null;
    }

    // Trim spaces
    certUrl = certUrl.trim();
    console.log('Processing TrustedForm URL:', certUrl);

    // Match TrustedForm Cert ID - try multiple patterns
    let match = certUrl.match(/trustedform\.com\/cert\/([a-f0-9\-]+)/i);
    
    if (!match) {
        // Try alternative pattern without dashes
        match = certUrl.match(/trustedform\.com\/cert\/([a-f0-9]+)/i);
    }
    
    if (!match) {
        // Try to extract just the ID part if it's at the end
        match = certUrl.match(/([a-f0-9]{40})/i);
    }

    const result = match ? match[1] : null;
    console.log('Extracted TrustedForm ID:', result);
    return result;
}

function getRandomUserAgent() {
  const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15",
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
    "Mozilla/5.0 (Linux; Android 14; Pixel 7 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (iPad; CPU OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Linux; Android 13; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36",
    "Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Linux; Android 12; Pixel 6a) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 12_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edg/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0",
    "Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-A515F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36",
    "Mozilla/5.0 (iPad; CPU OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_7_8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:121.0) Gecko/20100101 Firefox/121.0"
  ];

  const randomIndex = Math.floor(Math.random() * userAgents.length);
  return userAgents[randomIndex];
}






