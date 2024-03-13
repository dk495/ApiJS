document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const phone_home = '+1' + document.getElementById('caller_id').value;
    const formData = new FormData();
    formData.append('caller_id', phone_home);

    const url = 'https://corsproxy.io/?https://massnexus-llc.trackdrive.com/api/v1/inbound_webhooks/ping/check_for_available_buyers_on_aca?trackdrive_number=%2B18442234708&traffic_source_id=1048&' + new URLSearchParams(formData).toString();

    fetch(url, {
        method: 'POST'
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .then(data => {
        const success = data.success;
        const responseBody = JSON.stringify(data);
        let alertType, alertMessage;
        
        if (success) {
            alertType = 'success';
            alertMessage = `${data.status} : Form submitted successfully! Response Body: ${responseBody}`;
        } else {
            alertType = 'danger';
            alertMessage = `Error. Response Body: ${responseBody}`;
        }
        
        const alertBox = `
            <div class="alert alert-${alertType}" role="alert">
                ${alertMessage}
            </div>`;
        document.getElementById('alertContainer').innerHTML = '';
        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', alertBox);
        // Clear form fields
        document.getElementById('leadForm').reset();
    })
    .catch(error => {
        const errorAlert = `
            <div class="alert alert-danger" role="alert">
                Form submission failed. Please try again. Error: ${error.message}
            </div>`;
        document.getElementById('alertContainer').innerHTML = '';
        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
    });
});
