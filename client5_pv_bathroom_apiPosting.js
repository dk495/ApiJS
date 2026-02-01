// client5_pv_bathroom_apiPosting.js
document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // API tester function call
    api_tester(document.getElementById('phone').value);

    const form = document.getElementById('leadForm');
    const alertBox = document.getElementById('alertContainer');

    // Static values
    const sub_id = "dmarketing";
    const test_lead = "true";
    const unique_id = generateUniqueId();
    const usAgent = getRandomUserAgent();

    // TCPA Statement
    const tcpa_statement = "By completing the form, I hereby affirm my acceptance of the Terms and Conditions, CCPA , and Privacy Policy . I grant permission to Remodeling Loans, their contractors, and partners (refer to our partners list) to communicate with me through email, phone, and text messages using the provided contact number. I consent to receiving offers from these entities, even if my contacts are listed on the State and Federal Do Not Call List. I acknowledge that these marketing communications may be transmitted using an automatic telephone dialing system or pre-recorded messages. I understand that my consent is not a prerequisite for making a purchase and that I retain the right to revoke it at any time. This declaration includes compliance with the California Notice.";

    // Ping Data for initial check
    const pingData = {
        sub_id: sub_id,
        unique_id: unique_id,
        client_ip_address: form.client_ip_address.value,
        test_lead: test_lead,
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
        tcpa_statement: tcpa_statement,
        home_type: form.home_type.value,
        remodel_type: form.remodel_type.value
    };

    const API_KEY = "a4025f8c-3e5f-438a-a2eb-ca391c650c96";
    
    // Show loading message
    alertBox.innerHTML = `<div class="alert alert-info">⏳ Checking lead coverage...</div>`;

    // CORRECT PROXY FORMAT - Using FormData
    const pingFormData = new FormData();
    pingFormData.append('url', 'https://www.clickthesis.com/api/apilead/homeservicesping');
    pingFormData.append('method', 'POST');
    pingFormData.append('headers', JSON.stringify({
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }));
    pingFormData.append('data', JSON.stringify(pingData));

    // Send PING request through Formify proxy
    fetch('https://api.formifyweb.com/proxify.php', {
        method: 'POST',
        body: pingFormData
    })
    .then(res => {
        console.log("Ping response status:", res.status);
        if (!res.ok) {
            throw new Error(`Ping failed with status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        console.log("Ping Response:", data);
        
        // Check if ping was accepted
        if (data.accepted === true) {
            // Prepare full lead data
            const leadData = {
                ping_id: data.pingId,
                sub_id: sub_id,
                unique_id: unique_id,
                client_ip_address: form.client_ip_address.value,
                test_lead: test_lead,
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
                tcpa_statement: tcpa_statement,
                home_type: form.home_type.value,
                remodel_type: form.remodel_type.value
            };
            
            alertBox.innerHTML = `<div class="alert alert-info">✅ Ping Accepted. Posting full lead...</div>`;
            
            // Prepare POST request
            const postFormData = new FormData();
            postFormData.append('url', 'https://www.clickthesis.com/api/apilead/homeservices');
            postFormData.append('method', 'POST');
            postFormData.append('headers', JSON.stringify({
                'x-api-key': API_KEY,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }));
            postFormData.append('data', JSON.stringify(leadData));
            
            // Send POST request through Formify proxy
            return fetch('https://api.formifyweb.com/proxify.php', {
                method: 'POST',
                body: postFormData
            })
            .then(res => {
                console.log("Post response status:", res.status);
                if (!res.ok) {
                    throw new Error(`Post failed with status: ${res.status}`);
                }
                return res.json();
            })
            .then(postData => {
                console.log("Post Response:", postData);
                
                if (postData.accepted === true) {
                    alertBox.innerHTML = `<div class="alert alert-success">✅ Lead Submitted Successfully</div>`;
                } else {
                    alertBox.innerHTML = `<div class="alert alert-warning">⚠️ Lead Not Accepted</div>`;
                }
            });
            
        } else {
            alertBox.innerHTML = `<div class="alert alert-danger">❌ Ping Not Accepted</div>`;
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alertBox.innerHTML = `<div class="alert alert-danger">❌ Error: ${error.message}</div>`;
    });
});

// Helper functions (keep your existing ones)
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

function generateUniqueId() {
    const randomNum = Math.floor(100 + Math.random() * 900);
    return `Uid${randomNum}`;
}
