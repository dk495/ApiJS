document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('submitBtn').disabled = true;

    const formData = new FormData();
    formData.append('lp_campaign_id', '66f45cf061fcf');
    formData.append('lp_campaign_key', 'VgLGXC9Q8xfRwn3drbT4');
    formData.append('phone_home', document.getElementById('phone_home').value);
    formData.append('lp_caller_id', document.getElementById('phone_home').value);
    formData.append('lp_response', 'JSON');
    formData.append('first_name', document.getElementById('first_name').value);
    formData.append('last_name', document.getElementById('last_name').value);
    formData.append('city', document.getElementById('city').value);
    formData.append('state', document.getElementById('state').value);
    formData.append('email_address', document.getElementById('email').value);
    formData.append('address', document.getElementById('address').value);
    formData.append('landing_page', 'https://myhomerevamp.com/window/');
    formData.append('windows_service', document.getElementById('windows_service').value);
    formData.append('windows_number', document.getElementById('windows_number').value);
    formData.append('zip_code', document.getElementById('zip_code').value);
    formData.append('trustedform_url', document.getElementById('trusted_form_cert_id').value);
    formData.append('jornaya', document.getElementById('jornaya_lead_id').value);
    formData.append('trusted_form_cert_id', document.getElementById('trusted_form_cert_id').value);
    formData.append('jornaya_lead_id', document.getElementById('jornaya_lead_id').value);

    const url = 'https://pointerleads.leadspediatrack.com/post.do?' + new URLSearchParams(formData).toString();

    fetch(url, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            const successAlert = `
                <div class="alert alert-success" role="alert">
                    200 : Form submitted successfully! Lead ID: ${data.lead_id} | Message: ${data.msg}
                </div>`;
            document.getElementById('alertContainer').innerHTML = successAlert;
        } else {
            const errorAlert = `
                <div class="alert alert-danger" role="alert">
                    Error. Lead submission failed: ${data.msg}
                </div>`;
            document.getElementById('alertContainer').innerHTML = errorAlert;
        }
        // Re-enable the submit button
        document.getElementById('submitBtn').disabled = false;
        // Clear form fields
        document.getElementById('leadForm').reset();
    })
    .catch(error => {
        const errorAlert = `
            <div class="alert alert-danger" role="alert">
                Form submission failed. Please try again. Error: ${error.message}
            </div>`;
        document.getElementById('alertContainer').innerHTML = errorAlert;
        document.getElementById('submitBtn').disabled = false;
    });
});
