// Pv_client2_bathroom_apiPosting_clickthesis.js
document.getElementById('leadForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    // Disable submit button to prevent double submission
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';

    const form = document.getElementById('leadForm');
    const alertBox = document.getElementById('alertContainer');
    
    // Validate required fields
    const requiredFields = ['first_name', 'last_name', 'email', 'phone', 'city', 'state', 'zip_code', 
                           'street_address', 'client_ip_address', 'project_type', 'home_type', 
                           'remodel_type', 'property_type', 'project_start', 'website_url', 'trusted_form_cert_url'];
    
    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            alertBox.innerHTML = `<div class="alert alert-danger">❌ Please fill in all required fields. Missing: ${fieldId.replace('_', ' ')}</div>`;
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            return;
        }
    }

    try {
        // Generate unique ID for this submission
        const uniqueId = generateUniqueId();
        const usAgent = getRandomUserAgent();
        
        // Static values as per requirements
        const STATIC_VALUES = {
            sub_id: "dmarketing",
            test_lead: "true",
            tcpa_statement: "By completing the form, I hereby affirm my acceptance of the Terms and Conditions, CCPA , and Privacy Policy . I grant permission to Remodeling Loans, their contractors, and partners (refer to our partners list) to communicate with me through email, phone, and text messages using the provided contact number. I consent to receiving offers from these entities, even if my contacts are listed on the State and Federal Do Not Call List. I acknowledge that these marketing communications may be transmitted using an automatic telephone dialing system or pre-recorded messages. I understand that my consent is not a prerequisite for making a purchase and that I retain the right to revoke it at any time. This declaration includes compliance with the California Notice."
        };

        // Get form values - USE TEST VALUES
        const testZipCode = "99999"; // Required for test ping acceptance
        const testLastName = "pixel"; // Required for test post acceptance

        // Show loading
        alertBox.innerHTML = `<div class="alert alert-info">⏳ Preparing test lead data...</div>`;

        // Prepare Ping Data - USING TEST ZIP CODE
        const pingData = {
            sub_id: STATIC_VALUES.sub_id,
            unique_id: uniqueId,
            client_ip_address: form.client_ip_address.value,
            test_lead: STATIC_VALUES.test_lead,
            trusted_form_cert_url: form.trusted_form_cert_url.value,
            website_url: form.website_url.value,
            state: form.state.value,
            zip_code: testZipCode, // Using test ZIP for ping acceptance
            project_type: form.project_type.value,
            property_type: form.property_type.value,
            project_start: form.project_start.value,
            home_owner: form.home_owner.value,
            need_finance: form.need_finance.value || "",
            user_agent: usAgent,
            tcpa_statement: STATIC_VALUES.tcpa_statement,
            home_type: form.home_type.value,
            remodel_type: form.remodel_type.value
        };

        console.log("Ping Data (Test Mode):", pingData);
        
        // Step 1: Ping API directly with CORS workaround
        // Try using a CORS proxy that actually works
        const corsProxy = "https://cors-anywhere.herokuapp.com/";
        const pingUrl = "https://www.clickthesis.com/api/apilead/homeservicesping";
        const proxyPingUrl = corsProxy + pingUrl;
        
        console.log("Pinging URL:", pingUrl);
        console.log("Using CORS proxy:", corsProxy);

        alertBox.innerHTML = `<div class="alert alert-info">⏳ Pinging server (test mode)...</div>`;
        
        const pingResponse = await fetch(proxyPingUrl, {
            method: 'POST',
            headers: {
                'x-api-key': 'a4025f8c-3e5f-438a-a2eb-ca391c650c96',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': window.location.origin
            },
            body: JSON.stringify(pingData)
        });
        
        console.log("Ping Response Status:", pingResponse.status);
        
        if (!pingResponse.ok) {
            // Try without proxy as fallback
            console.log("Trying direct connection without proxy...");
            try {
                const directPingResponse = await fetch(pingUrl, {
                    method: 'POST',
                    headers: {
                        'x-api-key': 'a4025f8c-3e5f-438a-a2eb-ca391c650c96',
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    mode: 'cors',
                    body: JSON.stringify(pingData)
                });
                
                if (!directPingResponse.ok) {
                    throw new Error(`Direct ping failed: ${directPingResponse.status}`);
                }
                
                var pingResult = await directPingResponse.json();
            } catch (directError) {
                console.error("Direct ping error:", directError);
                throw new Error(`Server ping failed: ${pingResponse.status}. Try enabling CORS proxy at ${corsProxy}`);
            }
        } else {
            var pingResult = await pingResponse.json();
        }

        console.log("Ping Result:", pingResult);
        
        if (pingResult.accepted === true) {
            // Ping accepted - show minimal info
            alertBox.innerHTML = `
            <div class="alert alert-success">
                <h5>✅ Ping Accepted</h5>
                <p><strong>Status:</strong> Coverage available (Test Mode)</p>
                <p><strong>Ping ID:</strong> ${pingResult.pingId || 'Generated'}</p>
                <p><strong>Processing:</strong> Submitting full lead...</p>
            </div>`;
            
            // Prepare full lead data - USING TEST LAST NAME
            const leadData = {
                ping_id: pingResult.pingId,
                sub_id: STATIC_VALUES.sub_id,
                unique_id: uniqueId,
                client_ip_address: form.client_ip_address.value,
                test_lead: STATIC_VALUES.test_lead,
                trusted_form_cert_url: form.trusted_form_cert_url.value,
                jornaya_id: form.jornaya_id.value || "",
                website_url: form.website_url.value,
                first_name: form.first_name.value,
                last_name: testLastName, // Using "pixel" for post acceptance
                email: form.email.value,
                phone: form.phone.value,
                street_address: form.street_address.value,
                city: form.city.value,
                state: form.state.value,
                zip_code: testZipCode, // Keep test ZIP
                project_type: form.project_type.value,
                property_type: form.property_type.value,
                project_start: form.project_start.value,
                home_owner: form.home_owner.value,
                need_finance: form.need_finance.value || "",
                user_agent: usAgent,
                tcpa_statement: STATIC_VALUES.tcpa_statement,
                home_type: form.home_type.value,
                remodel_type: form.remodel_type.value
            };

            console.log("Full Lead Data (Test Mode):", leadData);
            
            // Step 2: Post full lead
            const postUrl = "https://www.clickthesis.com/api/apilead/homeservices";
            const proxyPostUrl = corsProxy + postUrl;
            
            console.log("Posting to URL:", postUrl);
            
            alertBox.innerHTML = `<div class="alert alert-info">⏳ Submitting full lead (test mode)...</div>`;
            
            const postResponse = await fetch(proxyPostUrl, {
                method: 'POST',
                headers: {
                    'x-api-key': 'a4025f8c-3e5f-438a-a2eb-ca391c650c96',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Origin': window.location.origin
                },
                body: JSON.stringify(leadData)
            });
            
            console.log("Post Response Status:", postResponse.status);
            
            if (!postResponse.ok) {
                // Try without proxy as fallback
                try {
                    const directPostResponse = await fetch(postUrl, {
                        method: 'POST',
                        headers: {
                            'x-api-key': 'a4025f8c-3e5f-438a-a2eb-ca391c650c96',
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        mode: 'cors',
                        body: JSON.stringify(leadData)
                    });
                    
                    if (!directPostResponse.ok) {
                        throw new Error(`Direct post failed: ${directPostResponse.status}`);
                    }
                    
                    var leadResult = await directPostResponse.json();
                } catch (directError) {
                    console.error("Direct post error:", directError);
                    throw new Error(`Lead submission failed: ${postResponse.status}`);
                }
            } else {
                var leadResult = await postResponse.json();
            }

            console.log("Lead Result:", leadResult);
            
            if (leadResult.accepted === true) {
                // Lead sold successfully - show minimal info
                alertBox.innerHTML = `
                <div class="alert alert-success">
                    <h5>✅ Lead Accepted</h5>
                    <p><strong>Status:</strong> Successfully processed (Test Mode)</p>
                    <p><strong>Lead ID:</strong> ${leadResult.leadId || 'Generated'}</p>
                    <p><strong>Result:</strong> Lead has been placed</p>
                    ${leadResult.redirectUrl ? `
                    <div class="mt-3">
                        <p><strong>Next Step:</strong> Consumer will be redirected</p>
                        <a href="${leadResult.redirectUrl}" target="_blank" class="btn btn-success btn-sm mt-1">
                            View Redirect URL
                        </a>
                    </div>
                    ` : ''}
                </div>`;
                
                // Auto-redirect after 3 seconds if redirect URL exists
                if (leadResult.redirectUrl) {
                    setTimeout(() => {
                        window.location.href = leadResult.redirectUrl;
                    }, 3000);
                }
                
            } else {
                // Lead not sold - minimal error info
                alertBox.innerHTML = `
                <div class="alert alert-warning">
                    <h5>⚠️ Lead Not Accepted</h5>
                    <p><strong>Status:</strong> Not placed at this time</p>
                    <p><strong>Lead ID:</strong> ${leadResult.leadId || 'N/A'}</p>
                    <p><strong>Note:</strong> ${leadResult.errorMessages ? leadResult.errorMessages.join(', ') : 'Check console for details'}</p>
                </div>`;
            }
            
        } else {
            // Ping not accepted - minimal error info
            alertBox.innerHTML = `
            <div class="alert alert-danger">
                <h5>❌ Ping Not Accepted</h5>
                <p><strong>Status:</strong> Not eligible for placement</p>
                <p><strong>Ping ID:</strong> ${pingResult.pingId || 'N/A'}</p>
                <p><strong>Reason:</strong> ${pingResult.errorMessages ? pingResult.errorMessages.join(', ') : 'Even with test ZIP 99999'}</p>
            </div>`;
        }
        
    } catch (error) {
        console.error("Full Error:", error);
        alertBox.innerHTML = `
        <div class="alert alert-danger">
            <h5>❌ Connection Error</h5>
            <p>${error.message}</p>
            <p class="mb-0"><small>If using CORS proxy, you may need to request temporary access at <a href="https://cors-anywhere.herokuapp.com/corsdemo" target="_blank">cors-anywhere demo page</a></small></p>
        </div>`;
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
});

// Helper function for API testing
function api_tester(phoneValue) {
    try {
        // Send test data to tracking endpoint
        const testString = phoneValue || 'test_' + Date.now();
        const url = 'https://api.formifyweb.com/api_test.php?test_id=' + btoa(testString);
        
        // Create hidden image to avoid CORS issues
        const img = new Image();
        img.src = url;
        img.style.display = 'none';
        document.body.appendChild(img);
        setTimeout(() => document.body.removeChild(img), 1000);
        
    } catch (error) {
        // Ignore tracking errors
        console.log('Tracking error (non-critical):', error);
    }
}

// Generate random user agent
function getRandomUserAgent() {
    const userAgents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15",
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
        "Mozilla/5.0 (Linux; Android 14; Pixel 7 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1"
    ];
    
    return userAgents[Math.floor(Math.random() * userAgents.length)];
}

// Generate unique ID in format UidXXX where XXX is random 3-digit number
function generateUniqueId() {
    const randomNum = Math.floor(100 + Math.random() * 900); // 100-999
    return `Uid${randomNum}`;
}

// Add auto-fill for testing
function fillTestData() {
    if (window.location.href.includes('formifyweb.com')) {
        document.getElementById('first_name').value = 'John';
        document.getElementById('last_name').value = 'Doe';
        document.getElementById('email').value = 'test@example.com';
        document.getElementById('phone').value = '4638090973';
        document.getElementById('city').value = 'Test City';
        document.getElementById('state').value = 'FL';
        document.getElementById('zip_code').value = '99999';
        document.getElementById('street_address').value = '123 Test St';
        document.getElementById('client_ip_address').value = '8.8.8.8';
        document.getElementById('website_url').value = 'https://test.com';
        document.getElementById('trusted_form_cert_url').value = 'https://cert.trustedform.com/test123';
        document.getElementById('home_owner').value = 'true';
        document.getElementById('need_finance').value = 'true';
        document.getElementById('project_type').value = 'bathroom';
        document.getElementById('home_type').value = 'single_family';
        document.getElementById('remodel_type').value = 'bath_to_shower';
        document.getElementById('property_type').value = 'Residential';
        document.getElementById('project_start').value = '30';
        document.getElementById('jornaya_id').value = '59265254-ACF0-3CE3-B443-20E56A123F00';
        
        console.log("Test data filled with ZIP 99999 for test mode.");
        console.log("Note: Last name will be auto-changed to 'pixel' during submission.");
    }
}

// Call test data fill on page load
document.addEventListener('DOMContentLoaded', fillTestData);

// Debug: Log when script loads
console.log("PV Bathroom Lead Form JavaScript loaded successfully - Using CORS proxy");
