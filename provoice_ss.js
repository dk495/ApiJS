 document.getElementById('leadForm').addEventListener('submit', function(event) {
      event.preventDefault();
      
      const formData = new FormData();

       formData.append('Key', document.getElementById('Key').value);
      formData.append('API_Action', document.getElementById('API_Action').value);
      formData.append('Mode', document.getElementById('Mode').value);

formData.append('TYPE', document.getElementById('TYPE').value);
formData.append('SRC', document.getElementById('SRC').value);
formData.append('Landing_Page', document.getElementById('Landing_Page').value);


formData.append('TCPA_Consent', document.getElementById('TCPA_Consent').value);
formData.append('IP_Address', document.getElementById('IP_Address').value);


formData.append('leadid_token', document.getElementById('leadid_token').value);



      formData.append('Driver_1_First_Name', document.getElementById('Driver_1_First_Name').value);
      formData.append('Driver_1_Last_Name', document.getElementById('Driver_1_Last_Name').value);
      formData.append('Driver_1_Daytime_Phone', document.getElementById('Driver_1_Daytime_Phone').value);

      formData.append('Driver_1_Email', document.getElementById('Driver_1_Email').value);
      formData.append('Driver_1_Birthdate', document.getElementById('Driver_1_Birthdate').value);
      formData.append('Driver_1_Gender', document.getElementById('Driver_1_Gender').value);
      formData.append('Driver_1_Zip', document.getElementById('Driver_1_Zip').value);
      formData.append('Driver_1_City', document.getElementById('Driver_1_City').value);
      formData.append('Driver_1_State', document.getElementById('Driver_1_State').value);
      formData.append('Driver_1_Address', document.getElementById('Driver_1_Address').value);


formData.append('Vehicle_1_Year', document.getElementById('Vehicle_1_Year').value);
formData.append('Vehicle_1_Make', document.getElementById('Vehicle_1_Make').value);
formData.append('Vehicle_1_Model', document.getElementById('Vehicle_1_Model').value);


formData.append('Format', 'JSON');


     
      


      const url = 'https://sunshineadvance.leadportal.com/new_api/api.php?' + new URLSearchParams(formData).toString();

      fetch(url, {
        method: 'POST',
	content: 'application/json'
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
