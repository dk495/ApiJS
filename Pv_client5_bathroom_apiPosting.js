// Pv_client2_bathroom_apiPosting_clickthesis.js
document.getElementById('leadForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    // Disable submit button to prevent double submission
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Processing...';
    
    // Generate unique ID for this submission
    const uniqueId = generateUniqueId();
    
    // Call API tester
    api_tester(document.getElementById('phone').value);

    const form = document.getElementById('leadForm');
    const alertBox = document.getElementById('alertContainer');
    const usAgent = getRandomUserAgent();
    
    // Static values as per requirements
    const STATIC_VALUES = {
        sub_id: "dmarketing",
        test_lead: "true",
        tcpa_statement: "By completing the form, I hereby affirm my acceptance of the Terms and Conditions, CCPA , and Privacy Policy . I grant permission to Remodeling Loans, their contractors, and partners (refer to our partners list) to communicate with me through email, phone, and text messages using the provided contact number. I consent to receiving offers from these entities, even if my contacts are listed on the State and Federal Do Not Call List. I acknowledge that these marketing communications may be transmitted using an automatic telephone dialing system or pre-recorded messages. I understand that my consent is not a prerequisite for making a purchase and that I retain the right to revoke it at any time. This declaration includes compliance with the California Notice."
    };

    try {
        // Show loading
        alertBox.innerHTML = `<div class="alert alert-info">⏳ Checking lead coverage...</div>`;

        // Prepare Ping Data
        const pingData = {
            sub_id: STATIC_VALUES.sub_id,
            unique_id: uniqueId,
            client_ip_address: form.client_ip_address.value,
            test_lead: STATIC_VALUES.test_lead,
            trusted_form_cert_url: form.trusted_form_cert_url.value,
            website_url: form.website_url.value,
            state: form.state.value,
            zip_code: form.zip_code.value,
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

        console.log("Ping Data to send:", pingData);
        
        // IMPORTANT: For testing, use ZIP 99999 as per documentation
        if (pingData.zip_code === "99999") {
            console.log("Using test ZIP code for acceptance");
        }
        
        // Step 1: Ping API using proxy
        // Use FormData approach for proxy to avoid CORS issues
        const pingProxyUrl = "https://api.formifyweb.com/proxify.php";
        
        console.log("Sending ping to proxy:", pingProxyUrl);
        
        // Create FormData for proxy
        const pingFormData = new FormData();
        pingFormData.append('url', 'https://www.clickthesis.com/api/apilead/homeservicesping');
        pingFormData.append('method', 'POST');
        pingFormData.append('headers', JSON.stringify({
            'x-api-key': 'a4025f8c-3e5f-438a-a2eb-ca391c650c96',
            'Content-Type': 'application/json'
        }));
        pingFormData.append('data', JSON.stringify(pingData));
        
        const pingResponse = await fetch(pingProxyUrl, {
            method: 'POST',
            body: pingFormData
        });

        console.log("Ping response status:", pingResponse.status);
        
        if (!pingResponse.ok) {
            throw new Error(`Ping failed with status: ${pingResponse.status}`);
        }

        const pingResult = await pingResponse.json();
        console.log("Ping Result received:", pingResult);
        
        if (pingResult.accepted === true) {
            // Ping accepted - prepare full lead data
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
                last_name: form.last_name.value,
                email: form.email.value,
                phone: form.phone.value,
                street_address: form.street_address.value,
                city: form.city.value,
                state: form.state.value,
                zip_code: form.zip_code.value,
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

            console.log("Full Lead Data to send:", leadData);
            
            alertBox.innerHTML = `<div class="alert alert-info">✅ Coverage Available! Estimated: $${pingResult.bidPrice}. Submitting full lead...</div>`;
            
            // Step 2: Post full lead using proxy
            // Create FormData for post proxy
            const postFormData = new FormData();
            postFormData.append('url', 'https://www.clickthesis.com/api/apilead/homeservices');
            postFormData.append('method', 'POST');
            postFormData.append('headers', JSON.stringify({
                'x-api-key': 'a4025f8c-3e5f-438a-a2eb-ca391c650c96',
                'Content-Type': 'application/json'
            }));
            postFormData.append('data', JSON.stringify(leadData));
            
            console.log("Sending post to proxy...");
            
            const postResponse = await fetch(pingProxyUrl, {
                method: 'POST',
                body: postFormData
            });

            console.log("Post response status:", postResponse.status);
            
            if (!postResponse.ok) {
                throw new Error(`Post failed with status: ${postResponse.status}`);
            }

            const leadResult = await postResponse.json();
            console.log("Lead Result received:", leadResult);
            
            if (leadResult.accepted === true) {
                // Lead sold successfully
                alertBox.innerHTML = `
                <div class="alert alert-success">
                    <h5>✅ Lead Sold Successfully!</h5>
                    <p><strong>Commission:</strong> $${leadResult.commissionAmount}</p>
                    <p><strong>Lead ID:</strong> ${leadResult.leadId}</p>
                    <p><strong>Processing Time:</strong> ${leadResult.processingTime} seconds</p>
                    ${leadResult.redirectUrl ? `
                    <a href="${leadResult.redirectUrl}" target="_blank" class="btn btn-success btn-sm mt-2">
                        Redirect Consumer Now
                    </a>
                    <p class="mt-2 mb-0"><small>Auto-redirecting in 5 seconds...</small></p>
                    ` : ''}
                </div>`;
                
                // Auto-redirect after 5 seconds if redirect URL exists
                if (leadResult.redirectUrl) {
                    setTimeout(() => {
                        window.location.href = leadResult.redirectUrl;
                    }, 5000);
                }
                
            } else {
                // Lead not sold
                alertBox.innerHTML = `
                <div class="alert alert-warning">
                    <h5>⚠️ Lead Not Sold</h5>
                    <p><strong>Lead ID:</strong> ${leadResult.leadId || 'N/A'}</p>
                    <p><strong>Errors:</strong> ${leadResult.errorMessages ? leadResult.errorMessages.join(', ') : 'No specific errors'}</p>
                    <p><strong>Processing Time:</strong> ${leadResult.processingTime || 'N/A'} seconds</p>
                </div>`;
            }
            
        } else {
            // Ping not accepted
            alertBox.innerHTML = `
            <div class="alert alert-danger">
                <h5>❌ No Coverage Available</h5>
                <p><strong>Ping ID:</strong> ${pingResult.pingId || 'N/A'}</p>
                <p><strong>Reason:</strong> ${pingResult.errorMessages ? pingResult.errorMessages.join(', ') : 'No specific reason provided'}</p>
                <p><strong>Processing Time:</strong> ${pingResult.processingTime || 'N/A'} seconds</p>
            </div>`;
        }
        
    } catch (error) {
        console.error("Full Error:", error);
        alertBox.innerHTML = `
        <div class="alert alert-danger">
            <h5>❌ Network Error</h5>
            <p>${error.message}</p>
            <p class="mb-0"><small>Check browser console (F12) for more details</small></p>
        </div>`;
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Submit Lead';
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

// Debug: Log when script loads
console.log("PV Bathroom Lead Form JavaScript loaded successfully");
