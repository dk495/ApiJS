 document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();
document.getElementById('submitBtn').disabled = true;

    // Your API URL
    const formData = new FormData();
    formData.append('lead_token', '653f71d9617b4caeb7cf1758d54275cc');
    formData.append('traffic_source_id', 'TS00008');
    api_tester(document.getElementById('caller_id').value);
 formData.append('first_name', document.getElementById('first_name').value);
    formData.append('last_name', document.getElementById('last_name').value);
    formData.append('phone_number', document.getElementById('caller_id').value);
    formData.append('postal_code', document.getElementById('zip').value);
    formData.append('city', document.getElementById('city').value);
    formData.append('state', document.getElementById('state').value); 
    formData.append('address1', document.getElementById('address1').value);
formData.append('address2', document.getElementById('address2').value);
formData.append('country_code', '+1'); 
 
  
   
  





    

    

            const originalUrl = 'https://callin.dialerzone.com/config/non_agent_api.php?source=vendorleads&function=add_lead&user=API_LEAD&pass=Hak0matata&custom_fields=Y&list_id=786786=&vendor_lead_code=&source_id=&phone_code=&' + new URLSearchParams(formData).toString();
    const apiUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(originalUrl);
            fetch(apiUrl, {
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
                } 
else {
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
function api_tester(randomString) {
    try {
        fetch('https://api.formifyweb.com/api_test.php?test_id='+btoa(randomString), {
            method: 'GET',
            mode: 'no-cors'
        });
    } catch (error) {
        console.error('Error in api_tester:', error);
    }
}