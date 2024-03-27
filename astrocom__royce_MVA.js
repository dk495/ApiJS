    document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const phone_home = document.getElementById('caller_id').value;
            const formData = new FormData();
            formData.append('Key', 'edafed0df34afb2d941ef775a790d4256effe5f3c9a5099b68e9cc67815f4f67');
formData.append('API_Action', 'submitLead');
formData.append('TYPE', '32');
formData.append('SRC', 'astro');
           formData.append('firstname', document.getElementById('first_name').value);
formData.append('lastname', document.getElementById('last_name').value);
formData.append('phone', document.getElementById('caller_id').value);
formData.append('email', document.getElementById('email').value);
        formData.append('zip', document.getElementById('zip').value);

formData.append('IP_Address', document.getElementById('IP_Address').value);
formData.append('Has_Attorney', document.getElementById('Has_Attorney').value);

formData.append('Found_at_Fault', document.getElementById('Found_at_Fault').value);

formData.append('Injury_Caused_by_MVA', document.getElementById('Injury_Caused_by_MVA').value);

formData.append('Landing_Page', document.getElementById('Landing_Page').value);
        formData.append('xxTrustedFormCertUrl', document.getElementById('xxTrustedFormCertUrl').value);


            
           
    
            const url = 'https://grow.royceagency.com/new_api/api.php?' + new URLSearchParams(formData).toString();
    
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
