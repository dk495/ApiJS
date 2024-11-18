document.getElementById('leadForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const phone_home = '1' + document.getElementById('caller_id').value;
      const formData = new FormData(this);

      formData.append('caller_id', phone_home);
formData.append('trackdrive_number', '+12094436698');
formData.append('traffic_source_id', '11310');
formData.append('first_name', document.getElementById('first_name').value);
formData.append('last_name', document.getElementById('last_name').value);
formData.append('zip', document.getElementById('zip').value);
formData.append('state', document.getElementById('state').value);
formData.append('jornaya_leadid', document.getElementById('jornaya_leadid').value);
formData.append('original_lead_submit_date', document.getElementById('original_lead_submit_date').value);
formData.append('tcpa_opt_in', document.getElementById('tcpa_opt_in').value);

     
    
     
     
     
     

      const url = 'https://elite-calls-com.trackdrive.com/api/v1/inbound_webhooks/ping/check_elite_buyers_medicare?' + new URLSearchParams(formData).toString();
const target='https://corsproxy.io/?' + encodeURIComponent(url);
      const xhr = new XMLHttpRequest();
      xhr.open('GET', target);

     xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Parse the JSON response
        const response = JSON.parse(xhr.responseText);

        // Display the "success" property
        if (response.success === false) {
          const errorAlert = `
            <div class="alert alert-danger" role="alert">
              Form submitted successfully Status: false
            </div>`;
          document.getElementById('leadForm').insertAdjacentHTML('beforeend', errorAlert);
        } else {
          const successAlert = `
            <div class="alert alert-success" role="alert">
              Form submitted successfully Status: Success!
            </div>`;
          document.getElementById('leadForm').insertAdjacentHTML('beforeend', successAlert);
        }

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
  xhr.send();
});
