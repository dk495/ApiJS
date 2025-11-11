    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    });

    // Form submission handler
    document.getElementById('leadForm').addEventListener('submit', function(event) {
      event.preventDefault();

      // Collect form data
      const formData = {
        phone_1: '1' + document.getElementById('phone_1').value,
        zipcode: document.getElementById('zipcode').value
      };

      const endpoint = 'https://rtb.ringba.com/v1/production/c3afebf1948d4a9f855c701eb9359bd9.json';

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
         });
    });

  

