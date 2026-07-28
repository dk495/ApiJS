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

// TCPA Text for MVA
const tcpaText = 'By clicking Submit I agree by electronic signature to be contacted by K Pro Insurance through a live agent, artificial or prerecorded voice, and automated SMS text at my residential or cellular number, dialed manually or by autodialer, and by email. By clicking, I am providing my electronic signature expressly authorizing K Pro Insurance to contact me by email, phone or text (including an automatic dialing system or artificial/pre-recorded voice) at the home or cell phone number above. I understand I am not required to sign/agree to this as a condition to purchase.';

// Fixed Landing Page URL
const landingPageUrl = 'https://quotes.kproinsurance.com/mva/';

// MVA Campaign Constants
const MVA_CAMPAIGN_ID = '30934';
const MVA_SUPPLIER_ID = '122688';
const MVA_LP_KEY = 'pz2vam0pgs36xx';
const MVA_LP_SUBID1 = 'Na';

// Form Submission Handler
document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Validate that either trustedform_cert_url is provided
    const trustedformUrl = document.getElementById('trustedform_cert_url').value;
    if (!trustedformUrl.trim()) {
        alert('TrustedForm Certificate URL is required for MVA leads.');
        return;
    }
    
    document.getElementById('submitBtn').disabled = true;

    // Create ping data
    const pingData = new FormData();
    
    // Required fields for PING (ALL fields included)
    pingData.append('lp_campaign_id', MVA_CAMPAIGN_ID);
    pingData.append('lp_supplier_id', MVA_SUPPLIER_ID);
    pingData.append('lp_key', MVA_LP_KEY);
    pingData.append('lp_subid1', MVA_LP_SUBID1);
    pingData.append('zip_code', document.getElementById('zip_code').value);
    pingData.append('ip_address', document.getElementById('ip_address').value);
    pingData.append('landing_page_url', landingPageUrl);
    pingData.append('user_agent', getRandomUserAgent());
    pingData.append('trustedform_cert_url', trustedformUrl);
    pingData.append('tcpa_text', tcpaText);
    
    // MVA Specific Fields for PING
    pingData.append('have_attorney', document.getElementById('have_attorney').value);
    pingData.append('at_fault', document.getElementById('at_fault').value);
    pingData.append('injury_type', document.getElementById('injury_type').value);
    pingData.append('incident_date', document.getElementById('incident_date').value);
    pingData.append('police_report', document.getElementById('police_report').value);
    pingData.append('has_insurance', document.getElementById('has_insurance').value);
    pingData.append('medical_treatment', document.getElementById('medical_treatment').value);
    pingData.append('accident_type', document.getElementById('accident_type').value);
    pingData.append('compensated_before', document.getElementById('compensated_before').value);
    pingData.append('case_description', document.getElementById('case_description').value);
    
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
        console.log('MVA PING Response:', pingResponse);
        
        if (pingResponse.status === 'ACCEPTED') {
            const ping_id = pingResponse.ping_id;
            
            // Create POST data
            const formData = new FormData();
            
            // Required fields for POST (ALL fields included)
            formData.append('lp_campaign_id', MVA_CAMPAIGN_ID);
            formData.append('lp_supplier_id', MVA_SUPPLIER_ID);
            formData.append('lp_key', MVA_LP_KEY);
            formData.append('lp_ping_id', ping_id);
            formData.append('lp_subid1', MVA_LP_SUBID1);
            
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
            
            // Jornaya Lead ID (optional - hidden field)
            const jornayaValue = document.getElementById('jornaya_leadid').value;
            if (jornayaValue) {
                formData.append('jornaya_leadid', jornayaValue);
            }
            
            // MVA Specific Fields for POST
            formData.append('have_attorney', document.getElementById('have_attorney').value);
            formData.append('at_fault', document.getElementById('at_fault').value);
            formData.append('injured', document.getElementById('injured').value);
            formData.append('injury_type', document.getElementById('injury_type').value);
            formData.append('incident_date', document.getElementById('incident_date').value);
            formData.append('police_report', document.getElementById('police_report').value);
            formData.append('has_insurance', document.getElementById('has_insurance').value);
            formData.append('medical_treatment', document.getElementById('medical_treatment').value);
            formData.append('accident_type', document.getElementById('accident_type').value);
            formData.append('compensated_before', document.getElementById('compensated_before').value);
            formData.append('case_description', document.getElementById('case_description').value);
            
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
                console.log('MVA POST Response:', postResponse);
                
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
                console.error('MVA POST Error:', error);
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
        console.error('MVA PING Error:', error);
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

// Phone number formatting helper (optional)
function formatPhoneNumber(value) {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (cleaned.length >= 10) {
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
    }
    
    return value;
}