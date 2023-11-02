 document.getElementById('leadForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const phone_home = '+1' + document.getElementById('caller_id').value;
      const formData = new FormData(this);
      formData.append('first_name', document.getElementById('first_name').value);
      formData.append('last_name', document.getElementById('last_name').value);
      formData.append('caller_id', phone_home);

      formData.append('email', document.getElementById('email').value);
      formData.append('dob', document.getElementById('dob').value);
      formData.append('zip', document.getElementById('zip').value);
      formData.append('city', document.getElementById('city').value);
      formData.append('state', document.getElementById('state').value);
formData.append('source_url', document.getElementById("source_url").value);

      formData.append('address', document.getElementById('address').value);
      formData.append('address2', document.getElementById('address2').value); 

        
     
      formData.append('original_lead_submit_date', document.getElementById('original_lead_submit_date').value);
      formData.append('jornaya_leadid', document.getElementById('jornaya_leadid').value);
      formData.append('traffic_source_id', document.getElementById('traffic_source_id').value);
      formData.append('lead_token', document.getElementById('lead_token').value);

      const url = '	https://global-digital-media.trackdrive.com/api/v1/leads?' + new URLSearchParams(formData).toString();

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