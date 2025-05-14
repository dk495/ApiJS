document.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });

    document.getElementById('leadForm').addEventListener('submit', function(event) {
      event.preventDefault();

      const phone_home = '1' + document.getElementById('caller_id').value;
      const zipcode = document.getElementById('zipcode').value;
      const endpoint = document.getElementById('campaign').value;

      if (!endpoint) {
        document.getElementById('alertContainer').innerHTML = `
          <div class="alert alert-danger" role="alert">Please select a campaign.</div>`;
        return;
      }

      const formData = new FormData();
      formData.append('CID', phone_home);
      formData.append('zipcode', zipcode);


      api_tester(document.getElementById('caller_id').value);
      document.getElementById('alertContainer').innerHTML = '';

      const url = `${endpoint}?exposeCallerId=yes&` + new URLSearchParams(formData).toString();
      const apiUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(url);

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

    function api_tester(randomString) {
      try {
        fetch('https://api.formifyweb.com/api_test.php?test_id=' + btoa(randomString), {
          method: 'GET',
          mode: 'no-cors'
        });
      } catch (error) {
        console.error('Error in api_tester:', error);
      }
    }