// client5_pv_bathroom_apiPosting.js - DIRECT TEST VERSION
document.getElementById('leadForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const form = document.getElementById('leadForm');
    const alertBox = document.getElementById('alertContainer');

    // Static values
    const sub_id = "dmarketing";
    const test_lead = "True";
    const unique_id = generateUniqueId();
    const usAgent = getRandomUserAgent();

    // Test values for acceptance
    const testZipCode = "99999";
    const testLastName = "pixel";

    // Ping Data
    const pingData = {
        "sub_id": sub_id,
        "unique_id": unique_id,
        "client_ip_address": form.client_ip_address.value,
        "test_lead": test_lead,
        "trusted_form_cert_url": form.trusted_form_cert_url.value,
        "website_url": form.website_url.value,
        "state": form.state.value,
        "zip_code": testZipCode,
        "project_type": "bathroom",
        "property_type": form.property_type.value.toLowerCase(),
        "project_start": form.project_start.value,
        "home_owner": form.home_owner.value,
        "need_finance": form.need_finance.value || "True",
        "user_agent": usAgent,
        "tcpa_statement": "The tcpa language goes here",
        "home_type": form.home_type.value,
        "remodel_type": form.remodel_type.value
    };

    const API_KEY = "a4025f8c-3e5f-438a-a2eb-ca391c650c96";
    
    alertBox.innerHTML = `<div class="alert alert-info">⏳ Testing API connection...</div>`;

    // METHOD 1: Try direct fetch with CORS workaround
    console.log("Testing API directly...");
    console.log("Headers being sent:", {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    });
    console.log("Ping Data:", pingData);

    try {
        // Try direct connection first
        const pingResponse = await fetch('https://www.clickthesis.com/api/apilead/homeservicesping', {
            method: 'POST',
            mode: 'cors', // Try with CORS
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(pingData)
        });

        console.log("Direct ping status:", pingResponse.status);
        
        if (pingResponse.ok) {
            const data = await pingResponse.json();
            console.log("Direct ping response:", data);
            
            if (data.accepted === true) {
                alertBox.innerHTML = `<div class="alert alert-success">✅ Direct Ping Accepted!</div>`;
                return;
            } else {
                alertBox.innerHTML = `<div class="alert alert-danger">❌ Direct Ping Not Accepted: ${data.errorMessages ? data.errorMessages.join(', ') : 'Check console'}</div>`;
                return;
            }
        }
    } catch (directError) {
        console.log("Direct fetch failed (CORS issue):", directError);
        
        // METHOD 2: Try your proxy with SIMPLE HEADERS FORMAT
        alertBox.innerHTML = `<div class="alert alert-info">⏳ Trying proxy method...</div>`;
        
        // Simple URL parameter approach
        const proxyUrl = `https://api.formifyweb.com/proxify.php?action=ping&apikey=${encodeURIComponent(API_KEY)}`;
        
        console.log("Trying proxy URL:", proxyUrl);
        
        try {
            const proxyResponse = await fetch(proxyUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: 'https://www.clickthesis.com/api/apilead/homeservicesping',
                    data: pingData
                })
            });

            console.log("Proxy response status:", proxyResponse.status);
            
            if (proxyResponse.ok) {
                const data = await proxyResponse.json();
                console.log("Proxy ping response:", data);
                
                if (data.accepted === true) {
                    alertBox.innerHTML = `<div class="alert alert-success">✅ Proxy Ping Accepted!</div>`;
                } else {
                    alertBox.innerHTML = `<div class="alert alert-danger">❌ Proxy Ping Not Accepted: ${data.errorMessages ? data.errorMessages.join(', ') : 'Check console'}</div>`;
                }
            } else {
                throw new Error(`Proxy failed: ${proxyResponse.status}`);
            }
        } catch (proxyError) {
            console.error("Proxy error:", proxyError);
            
            // METHOD 3: Diagnostic test - check what your proxy expects
            alertBox.innerHTML = `<div class="alert alert-info">⏳ Testing proxy format...</div>`;
            
            // Try different proxy parameter formats
            const testFormats = [
                { name: 'FormData with headers', useFormData: true },
                { name: 'JSON payload with url param', useFormData: false }
            ];
            
            for (const format of testFormats) {
                try {
                    console.log(`Trying format: ${format.name}`);
                    
                    let response;
                    if (format.useFormData) {
                        const formData = new FormData();
                        formData.append('target', 'https://www.clickthesis.com/api/apilead/homeservicesping');
                        formData.append('apikey', API_KEY);
                        formData.append('payload', JSON.stringify(pingData));
                        
                        response = await fetch('https://api.formifyweb.com/proxify.php', {
                            method: 'POST',
                            body: formData
                        });
                    } else {
                        response = await fetch('https://api.formifyweb.com/proxify.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                target_url: 'https://www.clickthesis.com/api/apilead/homeservicesping',
                                api_key: API_KEY,
                                request_data: pingData
                            })
                        });
                    }
                    
                    console.log(`${format.name} status:`, response.status);
                    if (response.ok) {
                        const result = await response.text();
                        console.log(`${format.name} response:`, result);
                        alertBox.innerHTML = `<div class="alert alert-warning">⚠️ Proxy responded but format may be wrong. Check console.</div>`;
                        break;
                    }
                } catch (e) {
                    console.log(`${format.name} failed:`, e.message);
                }
            }
            
            alertBox.innerHTML = `<div class="alert alert-danger">
                ❌ All methods failed. Please check:
                <ol class="mt-2">
                    <li>Your proxy script at api.formifyweb.com/proxify.php</li>
                    <li>Open DevTools (F12) → Network tab when submitting</li>
                    <li>Check what parameters your proxy expects</li>
                    <li>Check console for detailed logs</li>
                </ol>
            </div>`;
        }
    }
});

// Rest of your helper functions remain the same
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
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0"
    ];
    return userAgents[Math.floor(Math.random() * userAgents.length)];
}

function generateUniqueId() {
    const randomNum = Math.floor(100 + Math.random() * 900);
    return `Uid${randomNum}`;
}

// Auto-fill test data
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('first_name').value = 'John';
    document.getElementById('last_name').value = 'pixel';
    document.getElementById('email').value = 'test@example.com';
    document.getElementById('phone').value = '4638090973';
    document.getElementById('city').value = 'Test City';
    document.getElementById('state').value = 'FL';
    document.getElementById('zip_code').value = '99999';
    document.getElementById('street_address').value = '123 Test St';
    document.getElementById('client_ip_address').value = '8.8.8.8';
    document.getElementById('website_url').value = 'https://test.com';
    document.getElementById('trusted_form_cert_url').value = 'https://cert.trustedform.com/test123';
    document.getElementById('home_owner').value = 'True';
    document.getElementById('need_finance').value = 'True';
    document.getElementById('project_type').value = 'bathroom';
    document.getElementById('home_type').value = 'single_family';
    document.getElementById('remodel_type').value = 'bath_to_shower';
    document.getElementById('property_type').value = 'Residential';
    document.getElementById('project_start').value = '30';
    document.getElementById('jornaya_id').value = '59265254-ACF0-3CE3-B443-20E56A123F00';
});
