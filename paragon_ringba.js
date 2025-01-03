    document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const phone_home = '+1' + document.getElementById('caller_id').value;
            const formData = new FormData();
            formData.append('callerid', phone_home);
            formData.append('first_name', document.getElementById('first_name').value);
            formData.append('last_name', document.getElementById('last_name').value);
            
	formData.append('Number', document.getElementById('caller_id').value);
            formData.append('email', document.getElementById('email').value);

formData.append('state', document.getElementById('state').value);

formData.append('postal_code', document.getElementById('zipcode').value);
formData.append('incident_date', document.getElementById('year_of_accident').value);
formData.append('injured', document.getElementById('were_you_injured').value);
formData.append('fault', document.getElementById('was_the_accident_your_fault').value);
formData.append('attorney', document.getElementById('do_you_have_an_attorney').value);

            
           
    
            const url = 'https://display.ringba.com/enrich/2345219883672798636?' + new URLSearchParams(formData).toString();

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
