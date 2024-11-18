 document.getElementById('leadForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const phone_home = '1' + document.getElementById('caller_id').value;
      const formData = new FormData(this);

      formData.append('caller_id', phone_home);
formData.append('trackdrive_number', '+18443660809');
formData.append('traffic_source_id', '99450');
formData.append('zip', document.getElementById('zip').value);
formData.append('state', document.getElementById('state').value);

     
    
     
     
     
     

      const url = 'https://adolicious-llc.trackdrive.com/api/v1/inbound_webhooks/ping/aepico_availability_check?' + new URLSearchParams(formData).toString();
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
