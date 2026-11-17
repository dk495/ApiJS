// Static generic MVA consent text (per campaign)
const MVA_CONSENT_TEXT = "By submitting this form, I agree to be contacted by phone, SMS, or email regarding my motor vehicle accident inquiry. I understand that my information may be shared with third-party partners, including attorneys and legal service providers, who may contact me about my potential claim. I consent to receive autodialed and/or pre-recorded calls/text messages at the number provided, including my wireless number if applicable. Consent is not a condition of purchase. Message and data rates may apply. I may opt out at any time. I confirm that the information provided is accurate and that I am the person involved in the accident or authorized to submit this inquiry.";

function buildConsentText() {
    return MVA_CONSENT_TEXT;
}

function pingAPI() {
    // Disable submit button
    document.getElementById('submitBtn').disabled = true;

    const formData = new FormData();
    formData.append('trackdrive_number', '+13092206529');
    formData.append('traffic_source_id', '10002');

    api_tester(document.getElementById('caller_id').value);

    formData.append('caller_id', '+1' + document.getElementById('caller_id').value);
    formData.append('first_name', document.getElementById('first_name').value);
    formData.append('last_name', document.getElementById('last_name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('state', document.getElementById('state').value);
    formData.append('zip', document.getElementById('zip').value);

    // MVA specific fields for ping
    formData.append('had_injury', document.getElementById('had_injury').value);
    formData.append('incident_time', document.getElementById('incident_time').value);
    formData.append('doctor_treatment', document.getElementById('doctor_treatment').value);
    formData.append('have_attorney', document.getElementById('have_attorney').value);
    formData.append('what_injury', document.getElementById('what_injury').value);
    formData.append('accident_description', document.getElementById('accident_description').value);
    formData.append('trustedform_cert_url', document.getElementById('trustedform_cert_url').value);
    formData.append('landing_page_url', document.getElementById('landing_page_url').value);
    formData.append('consent_text', buildConsentText());

    const originalUrl = 'https://divinedeals.trackdrive.com/api/v1/inbound_webhooks/ping/check_for_available_mva_buyers?' + new URLSearchParams(formData).toString();
    const apiUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(originalUrl);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const pingId = data.try_all_buyers.ping_id;
                postPingId(pingId);
            } else {
                document.getElementById("apiResponse").innerHTML = "Ping ok but. Error: " + (data.errors ? data.errors.join(", ") : "Unknown error");
                document.getElementById("apiResponse").classList.add("alert-danger");
                document.getElementById("apiResponse").classList.remove("alert-info");
                document.getElementById('submitBtn').disabled = false;
            }
        })
        .catch(error => {
            document.getElementById("apiResponse").innerHTML = "Error fetching data from the API.";
            document.getElementById("apiResponse").classList.add("alert-danger");
            document.getElementById("apiResponse").classList.remove("alert-info");
            document.getElementById('submitBtn').disabled = false;
        });
}

function postPingId(pingId) {
    const postData = {
        trackdrive_number: "+13092206529",
        traffic_source_id: "10002",
        caller_id: '+1' + document.getElementById('caller_id').value,
        ping_id: pingId,

        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        email: document.getElementById('email').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,

        // MVA specific fields for post
        had_injury: document.getElementById('had_injury').value,
        incident_time: document.getElementById('incident_time').value,
        doctor_treatment: document.getElementById('doctor_treatment').value,
        have_attorney: document.getElementById('have_attorney').value,
        what_injury: document.getElementById('what_injury').value,
        accident_description: document.getElementById('accident_description').value,
        trustedform_cert_url: document.getElementById('trustedform_cert_url').value,
        landing_page_url: document.getElementById('landing_page_url').value,
        consent_text: buildConsentText()
    };

    const originalUrl = 'https://divinedeals.trackdrive.com/api/v1/inbound_webhooks/post/check_for_available_mva_buyers?' + new URLSearchParams(postData).toString();
    const url = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(originalUrl);

    fetch(url)
        .then(response => {
            if (response.status === 200 || response.status === 201) {
                response.text().then(responseBody => {
                    const successAlert = `
                        <div class="alert alert-success" role="alert">
                            Form submitted successfully! Response Body: ${responseBody}
                        </div>`;
                    document.getElementById('alertContainer').innerHTML = '';
                    document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
                    document.getElementById('submitBtn').disabled = false;
                });
            } else if (response.status === 422) {
                response.json().then(data => {
                    const errorAlert = `
                        <div class="alert alert-danger" role="alert">
                            Error. Response Body: ${JSON.stringify(data)}
                        </div>`;
                    document.getElementById('alertContainer').innerHTML = '';
                    document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
                    document.getElementById('submitBtn').disabled = false;
                });
            } else {
                response.text().then(responseBody => {
                    const errorAlert = `
                        <div class="alert alert-danger" role="alert">
                            Form submission failed. Please try again. Response Body: ${responseBody}
                        </div>`;
                    document.getElementById('alertContainer').innerHTML = '';
                    document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
                    document.getElementById('submitBtn').disabled = false;
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('submitBtn').disabled = false;
        });
}

document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    pingAPI();
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