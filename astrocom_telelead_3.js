    document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const phone_home = document.getElementById('caller_id').value;
            const formData = new FormData(this);
            formData.append('key', '9a81292b-9a10-4f48-967f-a2bc4bbd59d5');
formData.append('uid', '6819248f-199f-4a17-bded-3fb2a2d78230');
            formData.append('first_name', document.getElementById('first_name').value);
            formData.append('last_name', document.getElementById('last_name').value);
            formData.append('phone_number', phone_home);
formData.append('callid', phone_home);
            formData.append('email', document.getElementById('email').value);
formData.append('adress', document.getElementById('adress').value);
formData.append('state', document.getElementById('state').value);
formData.append('city', document.getElementById('city').value);
formData.append('zip_code', document.getElementById('zipcode').value);
formData.append('opt-in', document.getElementById('opt-in').value);
formData.append('date_of_accident', document.getElementById('date_of_accident').value);
formData.append('were_you_injured', document.getElementById('were_you_injured').value);
formData.append('was_the_accident_your_fault', document.getElementById('was_the_accident_your_fault').value);
formData.append('do_you_have_an_attorney', document.getElementById('do_you_have_an_attorney').value);
formData.append('describe_what_happened', document.getElementById('describe_what_happened').value);
formData.append('journaya', document.getElementById('journaya').value);
formData.append('trusted_form', document.getElementById('trusted_form').value);
            
           
    
            const url = 'https://corsproxy.io/?https://api.telelead.com/tcpanel/tcpanel/leadupdate?' + new URLSearchParams(formData).toString();
    
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