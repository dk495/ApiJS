// User Agent Function
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

// TCPA Text
const tcpaText = 'By clicking Get A QUOTE I confirm that I am a consumer seeking windows repairs / install services and give my express written consent to be contacted by Renovate Fast and its marketing partners through phone calls, text messages, and/or emails regarding the inquiry I have submitted through this form. I understand that these communications may include autodialed or prerecorded messages, even if my phone number is listed on any state or federal Do Not Call (DNC) registry. I acknowledge that the contact information I have provided will be used solely for the purpose of responding to my request and will be handled in accordance with Renovate Fast Privacy Policy and Terms & Conditions. I also confirm that I am the authorized user of the contact details submitted. I understand that my consent is not a condition of purchase, and I may opt out of receiving communications at any time.';

// Fixed Landing Page URL
const landingPageUrl = 'https://windows.renovatefast.com/';

document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('submitBtn').disabled = true;

    // Create ping data
    const pingData = new FormData();
    
    // Required fields for PING
    pingData.append('lp_campaign_id', '25454');
    pingData.append('lp_supplier_id', '103160');
    pingData.append('lp_key', 'd6e2tdw6xcjyr2');
    pingData.append('affid', '11219');
    pingData.append('zip_code', document.getElementById('zip_code').value);
    pingData.append('ip_address', document.getElementById('ip_address').value);
    pingData.append('landing_page_url', landingPageUrl);
    pingData.append('user_agent', getRandomUserAgent());
    pingData.append('trustedform_cert_url', document.getElementById('trustedform_cert_url').value);
    pingData.append('tcpa_text', tcpaText);
    pingData.append('ownership', document.getElementById('ownership').value);
    pingData.append('credit_rating', document.getElementById('credit_rating').value);
    pingData.append('work_type', document.getElementById('work_type').value);
    pingData.append('num_windows', document.getElementById('num_windows').value);
    pingData.append('window_material', document.getElementById('window_material').value);
    pingData.append('time_frame', document.getElementById('time_frame').value);
    
   
    // Make PING request
    fetch('https://api.leadprosper.io/ping', {
        method: 'POST',
        body: new URLSearchParams(pingData),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => response.json())
    .then(pingResponse => {
        console.log('PING Response:', pingResponse);
        
        if (pingResponse.status === 'ACCEPTED') {
            const ping_id = pingResponse.ping_id;
            
            // Create POST data
            const formData = new FormData();
            
            // Required fields for POST
            formData.append('lp_campaign_id', '25454');
            formData.append('lp_supplier_id', '103160');
            formData.append('lp_key', 'd6e2tdw6xcjyr2');
            formData.append('lp_ping_id', ping_id);
            formData.append('affid', '11219');
            formData.append('first_name', document.getElementById('first_name').value);
            formData.append('last_name', document.getElementById('last_name').value);
            formData.append('phone', document.getElementById('phone').value);
            formData.append('email', document.getElementById('email').value);
            formData.append('address', document.getElementById('address').value);
            formData.append('city', document.getElementById('city').value);
            formData.append('state', document.getElementById('state').value);
            formData.append('zip_code', document.getElementById('zip_code').value);
            formData.append('ip_address', document.getElementById('ip_address').value);
            formData.append('landing_page_url', landingPageUrl);
            formData.append('user_agent', getRandomUserAgent());
            formData.append('trustedform_cert_url', document.getElementById('trustedform_cert_url').value);
            formData.append('tcpa_text', tcpaText);
            formData.append('ownership', document.getElementById('ownership').value);
            formData.append('credit_rating', document.getElementById('credit_rating').value);
            formData.append('work_type', document.getElementById('work_type').value);
            formData.append('num_windows', document.getElementById('num_windows').value);
            formData.append('window_material', document.getElementById('window_material').value);
            formData.append('time_frame', document.getElementById('time_frame').value);
            formData.append('property_type', document.getElementById('property_type').value);
            
           
            
            // Make POST request
            fetch('https://api.leadprosper.io/post', {
                method: 'POST',
                body: new URLSearchParams(formData),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => response.json())
            .then(postResponse => {
                console.log('POST Response:', postResponse);
                
                let alertClass, message;
                
                      if (postResponse.status === 'ACCEPTED') {
                    alertClass = 'alert-success';
                    message = `Lead submitted successfully! Lead ID: ${postResponse.lead_id}, Payout: $${postResponse.payout}`;
                    document.getElementById('leadForm').reset();
}
                else if (postResponse.status === 'DUPLICATED') {
                    alertClass = 'alert-warning';
                    message = `Duplicate lead detected. Lead ID: ${postResponse.lead_id}, Message: ${postResponse.message}`;
                }
                else if (postResponse.status === 'ERROR') {
                    alertClass = 'alert-danger';
                    message = `Error: ${postResponse.message} (Code: ${postResponse.code})`;
                }
                else {
                    alertClass = 'alert-info';
                    message = `Unknown response: ${JSON.stringify(postResponse)}`;
                }
                
                const alert = `
                    <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
                        ${message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`;
                
                document.getElementById('alertContainer').innerHTML = alert;
                document.getElementById('submitBtn').disabled = false;
            })
            .catch(error => {
                console.error('POST Error:', error);
                const alert = `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        Network error during POST request: ${error.message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`;
                document.getElementById('alertContainer').innerHTML = alert;
                document.getElementById('submitBtn').disabled = false;
            });
        } else {
            // PING failed
            const alert = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    PING rejected: ${pingResponse.message} (Code: ${pingResponse.code})
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>`;
            document.getElementById('alertContainer').innerHTML = alert;
            document.getElementById('submitBtn').disabled = false;
        }
    })
    .catch(error => {
        console.error('PING Error:', error);
        const alert = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                Network error during PING request: ${error.message}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`;
        document.getElementById('alertContainer').innerHTML = alert;
        document.getElementById('submitBtn').disabled = false;
    });
});







