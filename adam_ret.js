    document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const phone_home = document.getElementById('caller_id').value;
            const formData = new FormData(this);
            formData.append('key', '931f8efa-58b5-4206-842f-e5a3bb5e87f3');

formData.append('caller_number', phone_home);
            formData.append('firstname', document.getElementById('first_name').value);
        
            formData.append('lastname', document.getElementById('last_name').value);
            formData.append('statute_of_limitations', document.getElementById('sol').value);
            formData.append('email', document.getElementById('email').value);

formData.append('accident_date', document.getElementById('accident_date').value);
formData.append('call_time_stamp', document.getElementById('call_time_stamp').value);
formData.append('injured', document.getElementById('injured').value);

            
           
    
            const url = 'https://retreaverdata.com/data_writing?' + new URLSearchParams(formData).toString();
    
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
