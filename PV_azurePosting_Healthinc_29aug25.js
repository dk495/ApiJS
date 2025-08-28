   document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();
            document.getElementById('submitBtn').disabled = true;
            
            const formData = {
                campaign_id: '3573',
                first_name: document.getElementById('first_name').value,
                last_name: document.getElementById('last_name').value,
                phone_home: document.getElementById('phone_home').value,
                email_address: document.getElementById('email_address').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                zip_code: document.getElementById('zip_code').value,
                current_insurer: document.getElementById('current_insurer').value,
                policy_expiry_day: document.getElementById('policy_expiry_day').value,
                policy_expiry_month: document.getElementById('policy_expiry_month').value,
                policy_expiry_year: document.getElementById('policy_expiry_year').value,
                gender: document.getElementById('gender').value,
                marital_status: document.getElementById('marital_status').value,
                occupation: document.getElementById('occupation').value,
                annual_income: document.getElementById('annual_income').value,
                household_number: document.getElementById('household_number').value,
                birth_day: document.getElementById('birth_day').value,
                birth_month: document.getElementById('birth_month').value,
                birth_year: document.getElementById('birth_year').value,
                height_feet: document.getElementById('height_feet').value,
                height_inches: document.getElementById('height_inches').value,
                weight_pounds: document.getElementById('weight_pounds').value
            };

            // Set the POST URL
            const url = 'https://prod-91.westus.logic.azure.com/workflows/16250eca33614d4992fc4bc4b8af69cf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=NV1jCjTmiPkMe4VrjqnbKvQiKRi2XeGCJgCtH2tSUy4';
            
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
                        document.getElementById('submitBtn').disabled = false;
                    });
                } else {
                    response.text().then(responseBody => {
                        const errorAlert = `
                            <div class="alert alert-danger" role="alert">
                                Form submission failed. Please try again. Response Body: ${responseBody}
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
                        Network error occurred. Please try again.
                    </div>`;
                document.getElementById('alertContainer').innerHTML = '';
                document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
                document.getElementById('submitBtn').disabled = false;
            });
        });