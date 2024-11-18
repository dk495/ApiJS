document.getElementById('leadForm').addEventListener('submit', function(event) {
      event.preventDefault();
document.getElementById('submitBtn').disabled = true;
      const phone_home = '+1' + document.getElementById('caller_id').value;
      const formData = new FormData();
formData.append('pid', 'AF931e95e3b3054b55a018cb389a7f639a');
	formData.append('cid', 'CA410c413f4e764c548573b64aea6de9ec');  
  formData.append('first_name', document.getElementById('first_name').value);
      formData.append('last_name', document.getElementById('last_name').value);
      formData.append('caller_id', phone_home);

     
      formData.append('zip', document.getElementById('zip').value);
formData.append('city', document.getElementById('city').value);
      formData.append('state', document.getElementById('state').value);
	  
   

 
const originalUrl = 'https://tracker.salespoint.ai/post?' + new URLSearchParams(formData).toString();
const url = 'https://api.codetabs.com/v1/proxy/?quest=' + encodeURIComponent(originalUrl);
      

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
