 document.getElementById('leadForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const phone_home = '+1' + document.getElementById('caller_id').value;
      const formData = new FormData();
    
      formData.append('caller_id', phone_home);

     

      formData.append('tcpa_opt_in', document.getElementById('tcpa_opt_in').value);

        

      formData.append('traffic_source_id', document.getElementById('traffic_source_id').value);
      formData.append('lead_token', document.getElementById('lead_token').value);

      const url = 'https://slate-agency-llc.trackdrive.com/api/v1/leads?' + new URLSearchParams(formData).toString();

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
    });
