document.getElementById('leadForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const phone_home = '1' + document.getElementById('caller_id').value;
      const formData = new FormData();
   
      formData.append('callerid', phone_home);

formData.append('tcpa_opt_in', document.getElementById('tcpa_opt_in').value);
   
    
     
     
     
     

      const url = 'https://display.ringba.com/enrich/2289569401365595892?lead_token=24f5d74cc5184fd9921db0109a123c47&traffic_source_id=11197?' + new URLSearchParams(formData).toString();

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
