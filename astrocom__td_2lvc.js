    document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const phone_home = '+1' + document.getElementById('caller_id').value;
            const formData = new FormData();
            formData.append('lead_token', 'f020e6405f2249dc8335eeb7320916df');
formData.append('traffic_source_id', '10077');
           formData.append('first_name', document.getElementById('first_name').value);
formData.append('last_name', document.getElementById('last_name').value);
formData.append('caller_id', document.getElementById('caller_id').value);
formData.append('email', document.getElementById('email').value);
formData.append('state', document.getElementById('state').value);
formData.append('zip', document.getElementById('zip').value);
formData.append('ip_address', document.getElementById('ip_address').value);
formData.append('currently_represented', document.getElementById('currently_represented').value);
formData.append('hospitalized_or_treated', document.getElementById('hospitalized_or_treated').value);
formData.append('person_at_fault', document.getElementById('person_at_fault').value);
formData.append('auto_accident_in_past_2_years', document.getElementById('auto_accident_in_past_2_years').value);
formData.append('injury_type', document.getElementById('injury_type').value);
formData.append('spoken_language', document.getElementById('spoken_language').value);

            
           
    
            const url = 'https://live-calls-network.trackdrive.com/api/v1/leads?' + new URLSearchParams(formData).toString();
    
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
