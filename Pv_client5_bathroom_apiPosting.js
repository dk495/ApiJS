// Pv_client2_bathroom_apiPosting_clickthesis.js
document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Call API tester
    api_tester(document.getElementById('phone').value);

    const form = document.getElementById('leadForm');
    const alertBox = document.getElementById('alertContainer');
    const usAgent = getRandomUserAgent();

    // Static values
    const STATIC_VALUES = {
        sub_id: "dmarketing",
        test_lead: "true",
        tcpa_statement: "By completing the form, I hereby affirm my acceptance of the Terms and Conditions, CCPA , and Privacy Policy . I grant permission to Remodeling Loans, their contractors, and partners (refer to our partners list) to communicate with me through email, phone, and text messages using the provided contact number. I consent to receiving offers from these entities, even if my contacts are listed on the State and Federal Do Not Call List. I acknowledge that these marketing communications may be transmitted using an automatic telephone dialing system or pre-recorded messages. I understand that my consent is not a prerequisite for making a purchase and that I retain the right to revoke it at any time. This declaration includes compliance with the California Notice."
    };

    // Generate unique ID
    const uniqueId = generateUniqueId();
    
    // Test values for acceptance (as per documentation)
    const testZipCode = "99999"; // For ping acceptance
    const testLastName = "pixel"; // For post acceptance

    // Ping Data (minimal - for initial check)
    const pingData = {
        sub_id: STATIC_VALUES.sub_id,
        unique_id: uniqueId,
        client_ip_address: form.client_ip_address.value,
        test_lead: STATIC_VALUES.test_lead,
        trusted_form_cert_url: form.trusted_form_cert_url.value,
        website_url: form.website_url.value,
        state: form.state.value,
        zip_code: testZipCode, // Using test ZIP
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

    // Full Lead Data (for final post)
    const leadData = {
        ping_id: "", // Will be populated after ping response
        sub_id: STATIC_VALUES.sub_id,
        unique_id: uniqueId,
        client_ip_address: form.client_ip_address.value,
        test_lead: STATIC_VALUES.test_lead,
        trusted_form_cert_url: form.trusted_form_cert_url.value,
        jornaya_id: form.jornaya_id.value || "",
        website_url: form.website_url.value,
        first_name: form.first_name.value,
        last_name: testLastName, // Using test last name
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

    const API_KEY = "a4025f8c-3e5f-438a-a2eb-ca391c650c96";
    
    // Using formifyweb.com proxy
    const pingProxyUrl = "https://api.formifyweb.com/proxify.php";
    const postProxyUrl = "https://api.formifyweb.com/proxify.php";

    // Show loading
    alertBox.innerHTML = `<div class="alert alert-info">⏳ Checking lead coverage...</div>`;

    // Step 1: Create FormData for ping
    const pingFormData = new FormData();
    pingFormData.append('url', 'https://www.clickthesis.com/api/apilead/homeservicesping');
    pingFormData.append('method', 'POST');
    pingFormData.append('headers', JSON.stringify({
        'x-api-key': API_KEY,
        'Content-Type': 'application/json'
    }));
    pingFormData.append('body', JSON.stringify(pingData));

    // Step 1: Ping the server via formify proxy
    fetch(pingProxyUrl, {
        method: 'POST',
        body: pingFormData
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`Ping failed: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        console.log("Ping Response:", data);
        
        if (data.accepted === true) {
            // Ping accepted - proceed with full post
            leadData.ping_id = data.pingId;
            
            alertBox.innerHTML = `<div class="alert alert-info">✅ Ping Accepted. Posting full lead...</div>`;
            
            // Step 2: Create FormData for post
            const postFormData = new FormData();
            postFormData.append('url', 'https://www.clickthesis.com/api/apilead/homeservices');
            postFormData.append('method', 'POST');
            postFormData.append('headers', JSON.stringify({
                'x-api-key': API_KEY,
                'Content-Type': 'application/json'
            }));
            postFormData.append('body', JSON.stringify(leadData));
            
            // Step 2: Post full lead via formify proxy
            return fetch(postProxyUrl, {
                method: 'POST',
                body: postFormData
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Post failed: ${res.status}`);
                }
                return res.json();
            })
            .then(postResponse => {
                console.log("Post Response:", postResponse);
                
                if (postResponse.accepted === true) {
                    // Lead sold successfully
                    alertBox.innerHTML = `<div class="alert alert-success">✅ Lead Submitted Successfully</div>`;
                    
                } else {
                    // Lead not sold
                    alertBox.innerHTML = `<div class="alert alert-warning">⚠️ Lead Not Accepted</div>`;
                }
            });
            
        } else {
            // Ping not accepted
            alertBox.innerHTML = `<div class="alert alert-danger">❌ Ping Not Accepted</div>`;
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alertBox.innerHTML = `<div class="alert alert-danger">❌ Network Error: ${error.message}</div>`;
    });
});

// Helper function for API testing
function api_tester(phoneValue) {
    try {
        fetch('https://api.formifyweb.com/api_test.php?test_id=' + btoa(phoneValue), {
            method: 'GET',
            mode: 'no-cors'
        });
    } catch (error) {
        console.error('Error in api_tester:', error);
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
    const randomNum = Math.floor(100 + Math.random() * 900);
    return `Uid${randomNum}`;
}

// Auto-fill test data
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.href.includes('formifyweb.com')) {
        document.getElementById('first_name').value = 'John';
        document.getElementById('last_name').value = 'pixel'; // Directly using pixel for testing
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
    }
});
