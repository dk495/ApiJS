 const urls = {
      btn1: 'https://display.ringba.com/enrich/2605196623352956627?',
      btn2: 'https://display.ringba.com/enrich/2605196637965911765?',
      btn3: 'https://display.ringba.com/enrich/2605193159939982737?'
    };

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

    document.querySelectorAll('button[type="button"]').forEach(button => {
      button.addEventListener('click', function(event) {
        event.preventDefault();
        const phone_home = '+1' + document.getElementById('caller_id').value;
        const formData = new FormData();
        formData.append('callerid', phone_home);
formData.append('zip_code', document.getElementById('Zipcode').value);
document.getElementById('alertContainer').innerHTML = '';
        api_tester(document.getElementById('caller_id').value);

        const url = urls[event.target.id] + new URLSearchParams(formData).toString();
        const apiUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(url);
        fetch(apiUrl, {
          method: 'GET'
        })
        .then(response => {
          if (response.status === 200 || response.status === 201) {
            response.text().then(responseBody => {
              const successAlert = `
                <div class="alert alert-success" role="alert">
                  ${response.status} : Form submitted successfully! Response Body: ${responseBody}
                </div>`;
              document.getElementById('alertContainer').innerHTML = '';
              document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
            });
            // Clear form fields
            
          } else if (response.status === 422) {
            response.json().then(data => {
              const errorAlert = `
                <div class="alert alert-danger" role="alert">
                  Error. Response Body: ${JSON.stringify(data)}
                </div>`;
              document.getElementById('alertContainer').innerHTML = '';
              document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
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
      });
    });
