// API test function
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

// Initialize form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set accident_sol to 1 by default (as per requirements)
  document.getElementById('accident_sol').value = '1';
});

// Form submission handler
document.getElementById('leadForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Get all form values - NO VALIDATION
  const formData = {
    key: 'f4a2246c-14b8-463b-a056-4f8c3b0693ea',
    publisher_id: 'fff54dea',
    caller_number: document.getElementById('caller_number').value.trim(),
    first_name: document.getElementById('first_name').value.trim(),
    last_name: document.getElementById('last_name').value.trim(),
    email: document.getElementById('email').value.trim(),
    accident_sol: document.getElementById('accident_sol').value,
    accident_date: document.getElementById('accident_date').value.trim(),
    were_you_at_fault: document.getElementById('were_you_at_fault').value,
    have_attorney: document.getElementById('have_attorney').value,
    injured: document.getElementById('injured').value,
    injury_type: document.getElementById('injury_type').value,
    doctor_treatment: document.getElementById('doctor_treatment').value,
    ip: document.getElementById('ip_address').value.trim(),
    source_url: document.getElementById('source_url').value.trim(),
    caller_state: document.getElementById('caller_state').value,
    caller_zip: document.getElementById('caller_zip').value.trim(),
    trusted_form_url: document.getElementById('trusted_form_url').value.trim(),
    settlement: document.getElementById('settlement').value
  };
  
  // Call API tester with phone number or random string
  api_tester(formData.caller_number || 'test' + Date.now());
  
  // Clear previous alerts
  document.getElementById('alertContainer').innerHTML = '';
  
  // Build RTB URL
  const queryParams = new URLSearchParams();
  for (const [key, value] of Object.entries(formData)) {
    queryParams.append(key, value);
  }
  
  const rtbUrl = `https://rtb.retreaver.com/rtbs.json?${queryParams.toString()}`;
  const proxyUrl = `https://api.formifyweb.com/proxify.php?url=${encodeURIComponent(rtbUrl)}`;
  
  // Show loading state
  const submitBtn = document.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Processing...';
  submitBtn.disabled = true;
  
  // Make the API call through proxy
  fetch(proxyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
  .then(response => response.text())
  .then(responseBody => {
    let responseData;
    try {
      responseData = JSON.parse(responseBody);
    } catch (error) {
      // If response is not JSON, show raw response
      const errorAlert = `
        <div class="alert alert-warning" role="alert">
          <strong>Non-JSON Response:</strong><br>
          <pre>${responseBody}</pre>
        </div>`;
      document.getElementById('alertContainer').innerHTML = errorAlert;
      return;
    }
    
    // Handle response
    if (responseData.rejectReason) {
      const errorAlert = `
        <div class="alert alert-danger" role="alert">
          <strong>Submission Failed:</strong><br>
          Reason: ${responseData.rejectReason || 'Unknown error'}<br>
          Status: ${responseData.status || 'N/A'}
        </div>`;
      document.getElementById('alertContainer').innerHTML = errorAlert;
    } else {
      // Remove bidAmount from response for display
      if (responseData.bidAmount) {
        delete responseData.bidAmount;
      }
      
      const successAlert = `
        <div class="alert alert-success" role="alert">
          <strong>Submission Successful!</strong><br>
          Call ID: ${responseData.callId || 'N/A'}<br>
          Destination: ${responseData.destination || 'N/A'}<br>
          Status: ${responseData.status || 'N/A'}
        </div>`;
      document.getElementById('alertContainer').innerHTML = successAlert;
      
      // Reset form but keep accident_sol as 1
      document.getElementById('leadForm').reset();
      document.getElementById('accident_sol').value = '1';
    }
  })
  .catch(error => {
    const errorAlert = `
      <div class="alert alert-danger" role="alert">
        <strong>Error:</strong> ${error.message}
      </div>`;
    document.getElementById('alertContainer').innerHTML = errorAlert;
    console.error('Form submission error:', error);
  })
  .finally(() => {
    // Restore button state
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
});