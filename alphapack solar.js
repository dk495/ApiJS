document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Create FormData object
    const formData = new FormData();

    // Append form data
    formData.append('lp_campaign_id', '65b169ab1fdb5');
    formData.append('lp_campaign_key', 'dm9fbzwrRh3D4KVGZX7c');
    formData.append('first_name', document.getElementById('first_name').value);
    formData.append('last_name', document.getElementById('last_name').value);
    formData.append('phone_home', document.getElementById('phone_home').value);
    formData.append('address', document.getElementById('address').value);
    formData.append('city', document.getElementById('city').value);
    formData.append('state', document.getElementById('state').value);
    formData.append('zip_code', document.getElementById('zip_code').value);
    formData.append('email_address', document.getElementById('email_address').value);
    formData.append('ip_address', document.getElementById('ip_address').value);
    formData.append('credit_score', document.getElementById('credit_score').value);
    formData.append('utility_provider', document.getElementById('utility_provider').value);
    formData.append('electric_bill', document.getElementById('electric_bill').value);
    formData.append('roof_shade', document.getElementById('roof_shade').value);
    formData.append('tcpa_language', document.getElementById('tcpa_language').value);
    formData.append('landing_page', document.getElementById('landing_page').value);
formData.append('lp_response', 'JSON');

    // Add jornaya field if needed
    // formData.append('jornaya', document.getElementById('jornaya').value);

    // Add additional fields
    // formData.append('jornaya', document.getElementById('jornaya').value);

const url = 'https://pointerleads.leadspediatrack.com/post.do?' + new URLSearchParams(formData).toString();

      fetch(url, {
        method: 'POST'
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
                } else if (response.status === 422) {
                    response.json().then(data => {
                        const errorAlert = `
                            <div class="alert alert-danger" role="alert">
                                Error. Response Body: ${JSON.stringify(data)}
                            </div>`;
                        document.getElementById('alertContainer').innerHTML = '';
                        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
                    });
                } else {
                    response.text().then(responseBody => {
                        const errorAlert = `
                            <div class="alert alert-danger" role="alert">
                                Form submission failed. Please try again. Response Body: ${responseBody}
                            </div>`;
                        document.getElementById('alertContainer').innerHTML = '';
                        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
                    });
                }
            })
            .catch(error => console.error('Error:', error));
        });