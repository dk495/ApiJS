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

// TCPA Text for Roofing
const tcpaText = 'By clicking the "Submit" button, I provide my electronic signature and represent that I am at least 18 and agree to this website\'s Privacy Policy and Terms and Conditions. I also provide my express written consent and authorization to the owner of this website and/or the agents of one or more of the listed Partners to contact me for marketing/telemarketing purposes such as Medicare Supplement Plans, Medicare Advantage, Prescription Drug Plans, Auto Insurance, Life or Final Expense Insurance, at the number and address provided above, including my wireless number if provided, using live operators, automated telephone dialing systems, artificial voice or pre-recorded messages, text messages and/or emails, if applicable, even if I have previously registered the provided number on any Federal or State Do Not Call Registry. I understand that my consent is not required as a condition of purchasing goods or services and can be revoked at any time.';


// Fixed Landing Page URL
const landingPageUrl = 'https://topamericaninsurance.com/';

// Roofing Campaign Constants
const ROOFING_CAMPAIGN_ID = '20674';
const ROOFING_SUPPLIER_ID = '103162';
const ROOFING_LP_KEY = 'kyw2s63qzt2wjq';
const ROOFING_AFFID = '11219';

// Form Submission Handler
document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Validate that either trustedform_cert_url is provided
    const trustedformUrl = document.getElementById('trustedform_cert_url').value;
    if (!trustedformUrl.trim()) {
        alert('TrustedForm Certificate URL is required for roofing leads.');
        return;
    }
    
    document.getElementById('submitBtn').disabled = true;

    // Create ping data
    const pingData = new FormData();
    
    // Required fields for PING
    pingData.append('lp_campaign_id', ROOFING_CAMPAIGN_ID);
    pingData.append('lp_supplier_id', ROOFING_SUPPLIER_ID);
    pingData.append('lp_key', ROOFING_LP_KEY);
    pingData.append('affid', ROOFING_AFFID);
    pingData.append('zip_code', document.getElementById('zip_code').value);
    pingData.append('ip_address', document.getElementById('ip_address').value);
    pingData.append('landing_page_url', landingPageUrl);
    pingData.append('user_agent', getRandomUserAgent());
    pingData.append('trustedform_cert_url', trustedformUrl);
    pingData.append('tcpa_text', tcpaText);
    pingData.append('ownership', document.getElementById('ownership').value);
    pingData.append('credit_rating', document.getElementById('credit_rating').value);
    pingData.append('roof_type', document.getElementById('roof_type').value);
    pingData.append('replace_or_repair', document.getElementById('replace_or_repair').value);
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
        console.log('Roofing PING Response:', pingResponse);
        
        if (pingResponse.status === 'ACCEPTED') {
            const ping_id = pingResponse.ping_id;
            
            // Create POST data
            const formData = new FormData();
            
            // Required fields for POST
            formData.append('lp_campaign_id', ROOFING_CAMPAIGN_ID);
            formData.append('lp_supplier_id', ROOFING_SUPPLIER_ID);
            formData.append('lp_key', ROOFING_LP_KEY);
            formData.append('lp_ping_id', ping_id);
            formData.append('affid', ROOFING_AFFID);
            
            // Personal Information
            formData.append('first_name', document.getElementById('first_name').value);
            formData.append('last_name', document.getElementById('last_name').value);
            formData.append('phone', document.getElementById('phone').value);
            formData.append('email', document.getElementById('email').value);
            
            // Address Information
            formData.append('address', document.getElementById('address').value);
          
            formData.append('city', document.getElementById('city').value);
            formData.append('state', document.getElementById('state').value);
            formData.append('zip_code', document.getElementById('zip_code').value);
            
            // System Fields
            formData.append('ip_address', document.getElementById('ip_address').value);
            formData.append('landing_page_url', landingPageUrl);
            formData.append('user_agent', getRandomUserAgent());
            formData.append('trustedform_cert_url', trustedformUrl);
            formData.append('tcpa_text', tcpaText);
            
            // Roofing Specific Fields
            formData.append('ownership', document.getElementById('ownership').value);
            formData.append('credit_rating', document.getElementById('credit_rating').value);
            formData.append('roof_type', document.getElementById('roof_type').value);
            formData.append('replace_or_repair', document.getElementById('replace_or_repair').value);
            
            formData.append('time_frame', document.getElementById('time_frame').value);
            formData.append('best_contact_time', document.getElementById('best_contact_time').value);
            
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
                console.log('Roofing POST Response:', postResponse);
                
                let alertClass, message;
                
                if (postResponse.status === 'ACCEPTED') {
                    alertClass = 'alert-success';
                    message = `Lead submitted successfully! Lead ID: ${postResponse.lead_id}`;
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
                console.error('Roofing POST Error:', error);
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
        console.error('Roofing PING Error:', error);
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

// Prevent right-click
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

// Form validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('leadForm');
    
    // Add input validation
    const inputs = form.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
        });
    });
    
    // Special validation for trustedform_cert_url
    const trustedformInput = document.getElementById('trustedform_cert_url');
    trustedformInput.addEventListener('blur', function() {
        if (!this.value.trim()) {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
        }
    });

});

