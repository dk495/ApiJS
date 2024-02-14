
    document.getElementById('leadForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const phone_home = '+1' + document.getElementById('caller_id').value;
      const formData = new FormData();
      
      
   
      formData.append('traffic_source_id', '1000');
      formData.append('lead_token', '9da5b4b9f61143adad8a501f74e9f974');
formData.append('caller_id', phone_home);

formData.append('first_name', document.getElementById('first_name').value);
formData.append('last_name', document.getElementById('last_name').value);
formData.append('email', document.getElementById('email').value);
formData.append('zip', document.getElementById('zip').value);
formData.append('city', document.getElementById('city').value);
formData.append('state', document.getElementById('state').value);
formData.append('address', document.getElementById('address').value);
formData.append('address2', document.getElementById('address2').value);
formData.append('cc_debt', document.getElementById('cc_debt').value);
formData.append('unsecured_debt_total', document.getElementById('unsecured_debt_total').value);



formData.append('jornaya_leadid', document.getElementById('jornaya_leadid').value);

      const url = 'https://dialhub.trackdrive.com/api/v1/leads?' + new URLSearchParams(formData).toString();

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
 
        document.addEventListener("contextmenu", function (e) {
            e.preventDefault(); // Prevent the context menu from appearing
        });
