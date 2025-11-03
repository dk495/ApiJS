    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    });

    // Form submission handler
    document.getElementById('leadForm').addEventListener('submit', function(event) {
      event.preventDefault();

      // Collect form data
      const formData = {
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        email: document.getElementById('email').value,
        phone_1: '1' + document.getElementById('phone_1').value,
        address_1: document.getElementById('address_1').value,
        address_2: document.getElementById('address_2').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zipcode: document.getElementById('zipcode').value
      };

      const endpoint = document.getElementById('campaign').value;

      if (!endpoint) {
        document.getElementById('alertContainer').innerHTML = `
          <div class="alert alert-danger" role="alert">Please select a campaign.</div>`;
        return;
      }

      // Prepare URL parameters
      const params = new URLSearchParams();
      params.append('CID', formData.phone_1);
      params.append('zipcode', formData.zipcode);
      params.append('exposeCallerId', 'yes');
      params.append('subid', 'yes');
      
      // Add additional fields
      params.append('first_name', formData.first_name);
      params.append('last_name', formData.last_name);
      params.append('email', formData.email);
      params.append('address_1', formData.address_1);
      if (formData.address_2) params.append('address_2', formData.address_2);
      params.append('city', formData.city);
      params.append('state', formData.state);

      const url = `${endpoint}?${params.toString()}`;
      const apiUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(url);

      // Clear previous alerts
      document.getElementById('alertContainer').innerHTML = '';
      
      // Make API call
      fetch(apiUrl, { method: 'GET' })
        .then(response => response.text())
        .then(responseBody => {
          let responseData;
          try {
            responseData = JSON.parse(responseBody);
          } catch (error) {
            throw new Error('Invalid JSON response');
          }

          if (responseData.rejectReason) {
            const errorAlert = `
              <div class="alert alert-danger" role="alert">
                Failure: ${JSON.stringify(responseData)}
              </div>`;
            document.getElementById('alertContainer').innerHTML = errorAlert;
          } else {
            delete responseData.bidAmount;
            const successAlert = `
              <div class="alert alert-success" role="alert">
                Success: ${JSON.stringify(responseData)}
              </div>`;
            document.getElementById('alertContainer').innerHTML = successAlert;
            document.getElementById('leadForm').reset();
          }
        })
        .catch(error => {
          const errorAlert = `
            <div class="alert alert-danger" role="alert">
              Error: ${error.message}
            </div>`;
          document.getElementById('alertContainer').innerHTML = errorAlert;
          console.error('Error:', error);
        }
    }
  