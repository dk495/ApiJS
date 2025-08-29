document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();
            document.getElementById('submitBtn').disabled = true;
            
            // Get form values
            const formData = {
                CID: document.getElementById('phone').value,
                zip: document.getElementById('zip').value,
                first_name: document.getElementById('first_name').value,
                last_name: document.getElementById('last_name').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                email: document.getElementById('email').value,
                state: document.getElementById('state').value,
                exposeCallerId: 'yes',
                ip: document.getElementById('ip_address').value,
                residence_status: document.getElementById('residence_status').value,
                dob: document.getElementById('dob').value,
                requires_SR22_filing: document.getElementById('requires_SR22_filing').value,
                self_credit_rating: document.getElementById('self_credit_rating').value,
                gender: document.getElementById('gender').value,
                marital_status: document.getElementById('marital_status').value,
                incident_type: document.getElementById('incident_type').value,
                car_year: document.getElementById('car_year').value,
                car_make: document.getElementById('car_make').value,
                car_model: document.getElementById('car_model').value,
                current_insurance_company: document.getElementById('current_insurance_company').value,
                policy_start_date: document.getElementById('policy_start_date').value,
                jornaya: document.getElementById('leadid').value
            };

            // Build URL with query parameters
            
            
              // Build URL with query parameters
            const baseUrl = 'https://rtb.ringba.com/v1/production/e36947e4ca1c419696e288882a84a651.json?';
            const queryParams = new URLSearchParams(formData).toString();
            const apiUrl = baseUrl + queryParams;

            const apiUrlNew = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(apiUrl)


            // Make the API call
            fetch(apiUrlNew, {
                method: 'GET'
            })
            .then(response => {
                if (response.status === 200 || response.status === 201) {
                    response.json().then(responseBody => {
                        const successAlert = `
                            <div class="alert alert-success" role="alert">
                                ${response.status} : Form submitted successfully! Response Body: ${JSON.stringify(responseBody)}
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

        // Function to handle the contextmenu event
        function disableRightClick(event) {
            // Prevent the default right-click behavior
            event.preventDefault();
        }

        // Attach the event listener to the document
        document.addEventListener('contextmenu', disableRightClick);
