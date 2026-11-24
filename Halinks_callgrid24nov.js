document.getElementById('leadForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;

  // Build the form payload using the exact field names the API expects
  const params = new URLSearchParams();
  params.append('CallerId', document.getElementById('caller_id').value);
  params.append('InboundStateCode', document.getElementById('state').value);
  params.append('InboundZipCode', document.getElementById('zip').value);
  params.append('FirstName', document.getElementById('first_name').value);
  params.append('LastName', document.getElementById('last_name').value);
  params.append('Email', document.getElementById('email').value);
  params.append('StreetAddress', document.getElementById('street_address').value);
  params.append('Birthday', document.getElementById('dob').value);
  params.append('Age', document.getElementById('age').value);
  params.append('FormName', document.getElementById('form_name').value);
  params.append('Jornaya', document.getElementById('Jornaya_lead_id').value);
  params.append('TrustedForm', document.getElementById('trusted_form').value);

  const endpoint = 'https://bid.callgrid.com/api/bid/cmwux5dh800zd06imwjniaxad';

  // Proxy the POST request to avoid CORS issues
  const proxyUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(endpoint);

  fetch(proxyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
  })
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        response.json().then(responseBody => {
          // Remove internal payout key if present
          delete responseBody.retreaver_payout;

          const successAlert = `
            <div class="alert alert-success" role="alert">
              ${response.status} : Form submitted successfully! Response Body: ${JSON.stringify(responseBody)}
            </div>`;
          document.getElementById('alertContainer').innerHTML = successAlert;
        });
        document.getElementById('leadForm').reset();
        submitBtn.disabled = false;
      } else if (response.status === 422) {
        response.json().then(data => {
          const errorAlert = `
            <div class="alert alert-danger" role="alert">
              Error. Response Body: ${JSON.stringify(data)}
            </div>`;
          document.getElementById('alertContainer').innerHTML = errorAlert;
          submitBtn.disabled = false;
        });
      } else {
        response.text().then(responseBody => {
          const errorAlert = `
            <div class="alert alert-danger" role="alert">
              Form submission failed. Please try again. Response Body: ${responseBody}
            </div>`;
          document.getElementById('alertContainer').innerHTML = errorAlert;
          submitBtn.disabled = false;
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('alertContainer').innerHTML = `
        <div class="alert alert-danger" role="alert">
          Network error: ${error.message}
        </div>`;
      submitBtn.disabled = false;
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