document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('submitBtn').disabled = true;
    
    const formData = {
        campaign_id: '5603', // Hardcoded campaign ID as per requirements
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        phone_home: document.getElementById('phone_home').value,
        email_address: document.getElementById('email_address').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip_code: document.getElementById('zip_code').value,
        call_recording: document.getElementById('call_recording').value
    };

    // Set the POST URL from requirements
    const url = 'https://defaultf627e282ecc74de9b64dfcfbe7a9db.02.environment.api.powerplatform.com/powerautomate/automations/direct/workflows/d231e82ca8a84ce0b693efd150ed459f/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=u474G4R8eVRRAVlcWjXoJyU5EOB7KWSy0cMyn0pJAoo';
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.status === 200) {
            response.text().then(responseBody => {
                const successAlert = `
                    <div class="alert alert-success" role="alert">
                        200 : Telemarketing lead submitted successfully! Response: ${responseBody}
                    </div>`;
                document.getElementById('alertContainer').innerHTML = '';
                document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
            });
            // Clear form fields
            document.getElementById('leadForm').reset();
            document.getElementById('submitBtn').disabled = false;
        } else if (response.status === 201) {
            response.text().then(responseBody => {
                const successAlert = `
                    <div class="alert alert-success" role="alert">
                        201 : Telemarketing lead submitted successfully! Response: ${responseBody}
                    </div>`;
                document.getElementById('alertContainer').innerHTML = '';
                document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
            });
            // Clear form fields
            document.getElementById('leadForm').reset();
            document.getElementById('submitBtn').disabled = false;
        } else if (response.status === 422) {
            response.json().then(data => {
                const errorAlert = `
                    <div class="alert alert-danger" role="alert">
                        Validation Error. Response: ${JSON.stringify(data)}
                    </div>`;
                document.getElementById('alertContainer').innerHTML = '';
                document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
                document.getElementById('submitBtn').disabled = false;
            });
        } else {
            response.text().then(responseBody => {
                const errorAlert = `
                    <div class="alert alert-danger" role="alert">
                        Lead submission failed. Please try again. Status: ${response.status}, Response: ${responseBody}
                    </div>`;
                document.getElementById('alertContainer').innerHTML = '';
                document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
                document.getElementById('submitBtn').disabled = false;
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const errorAlert = `
            <div class="alert alert-danger" role="alert">
                Network error occurred. Please check your connection and try again.
            </div>`;
        document.getElementById('alertContainer').innerHTML = '';
        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
        document.getElementById('submitBtn').disabled = false;
    });
});