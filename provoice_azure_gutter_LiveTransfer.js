    document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();
document.getElementById('submitBtn').disabled = true;
            
                    const formData = {
        campaign_id: '3675',
        phone_home: document.getElementById('phone_home').value,
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        email_address: document.getElementById('email').value,
        address: document.getElementById('address').value,
        ip_address: document.getElementById('ip_address').value,
        gutters_​service: document.getElementById('gutters_​service').value,
gutters_​material: document.getElementById('gutters_​material').value,
        zip_code: document.getElementById('zip_code').value
    };

    // Set the POST URL
    const url = 'https://prod-90.westus.logic.azure.com:443/workflows/52e33d1346e14e58bc5649a28ae3cd0f/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xXfvjlVJ9WU4C5A1pE3lo4-QhW4FLzPcYyq6RahBXzI';
    
            fetch(url, {
                method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Specify that we are sending JSON data
        },
        body: JSON.stringify(formData) //
            })
            .then(response => {
                if (response.status === 200) {
                    response.text().then(responseBody => {
                        const successAlert = `
                            <div class="alert alert-success" role="alert">
                                200 : Form submitted successfully! Response Body: ${responseBody}
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
                                201 : Form submitted successfully! Response Body: ${responseBody}
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
                                Error. Response Body: ${JSON.stringify(data)}
                            </div>`;
                        document.getElementById('alertContainer').innerHTML = '';
                        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
                    });
document.getElementById('submitBtn').disabled = false;
                } else {
                    response.text().then(responseBody => {
                        const errorAlert = `
                            <div class="alert alert-danger" role="alert">
                                Form submission failed. Please try again. Response Body: ${responseBody}
                            </div>`;
                        document.getElementById('alertContainer').innerHTML = '';
                        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
                    });
document.getElementById('submitBtn').disabled = false;
                }
            })
            .catch(error => console.error('Error:', error));
        });