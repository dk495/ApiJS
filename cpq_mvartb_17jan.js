// Get client IP address
async function getClientIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error fetching IP:', error);
    return '127.0.0.1';
  }
}

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
document.addEventListener('DOMContentLoaded', async function() {
  // Set initial values for hidden fields
  document.getElementById('ip_address').value = await getClientIP();
  document.getElementById('source_url').value = window.location.href;
  document.getElementById('trusted_form_url').value = window.location.href;
  
  // Format phone number input
  const phoneInput = document.getElementById('caller_number');
  phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
      if (value.length <= 3) {
        value = value;
      } else if (value.length <= 6) {
        value = '(' + value.substring(0, 3) + ') ' + value.substring(3);
      } else {
        value = '(' + value.substring(0, 3) + ') ' + value.substring(3, 6) + '-' + value.substring(6, 10);
      }
    }
    e.target.value = value;
  });
});

// Form submission handler
document.getElementById('leadForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  // Get all form values
  const formData = {
    key: 'f4a2246c-14b8-463b-a056-4f8c3b0693ea',
    publisher_id: 'fff54dea',
    caller_number: document.getElementById('caller_number').value.replace(/\D/g, ''),
    first_name: document.getElementById('first_name').value,
    last_name: document.getElementById('last_name').value,
    email: document.getElementById('email').value,
    accident_sol: document.getElementById('accident_sol').value,
    accident_date: document.getElementById('accident_date').value,
    were_you_at_fault: document.getElementById('were_you_at_fault').value,
    have_attorney: document.getElementById('have_attorney').value,
    injured: document.getElementById('injured').value,
    injury_type: document.getElementById('injury_type').value,
    doctor_treatment: document.getElementById('doctor_treatment').value,
    ip: document.getElementById('ip_address').value,
    source_url: document.getElementById('source_url').value,
    caller_state: document.getElementById('caller_state').value,
    caller_zip: document.getElementById('caller_zip').value,
    trusted_form_url: document.getElementById('trusted_form_url').value,
    settlement: document.getElementById('settlement').value
  };
  
  // Validate required fields are filled
  for (const [key, value] of Object.entries(formData)) {
    if (value === '' && key !== 'caller_number') {
      const errorAlert = `
        <div class="alert alert-danger" role="alert">
          Please fill in all required fields. Missing: ${key.replace(/_/g, ' ')}
        </div>`;
      document.getElementById('alertContainer').innerHTML = errorAlert;
      return;
    }
  }
  
  // Validate phone number
  const phoneDigits = formData.caller_number.replace(/\D/g, '');
  if (phoneDigits.length < 10) {
    const errorAlert = `
      <div class="alert alert-danger" role="alert">
        Please enter a valid 10-digit phone number
      </div>`;
    document.getElementById('alertContainer').innerHTML = errorAlert;
    return;
  }
  
  // Call API tester
  api_tester(phoneDigits);
  
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
  
  try {
    // Make the API call through proxy
    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
    
    const responseText = await response.text();
    let responseData;
    
    try {
      responseData = JSON.parse(responseText);
    } catch (error) {
      throw new Error('Invalid JSON response from server');
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
      
      // Reset form
      document.getElementById('leadForm').reset();
      
      // Reset hidden fields
      document.getElementById('accident_sol').value = '1';
      document.getElementById('ip_address').value = await getClientIP();
      document.getElementById('source_url').value = window.location.href;
      document.getElementById('trusted_form_url').value = window.location.href;
    }
  } catch (error) {
    const errorAlert = `
      <div class="alert alert-danger" role="alert">
        <strong>Error:</strong> ${error.message}
      </div>`;
    document.getElementById('alertContainer').innerHTML = errorAlert;
    console.error('Form submission error:', error);
  } finally {
    // Restore button state
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});

// Real-time validation for date format
document.getElementById('accident_date').addEventListener('blur', function(e) {
  const datePattern = /^\d{2}-\d{2}-\d{4}$/;
  if (e.target.value && !datePattern.test(e.target.value)) {
    e.target.classList.add('is-invalid');
    const feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    feedback.textContent = 'Please use MM-DD-YYYY format';
    e.target.parentNode.appendChild(feedback);
  } else {
    e.target.classList.remove('is-invalid');
    const feedback = e.target.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
      feedback.remove();
    }
  }
});

// Real-time validation for state (2 letters)
document.getElementById('caller_state').addEventListener('input', function(e) {
  e.target.value = e.target.value.toUpperCase().replace(/[^A-Z]/g, '').substring(0, 2);
});

// Real-time validation for zip code (5 digits)
document.getElementById('caller_zip').addEventListener('input', function(e) {
  e.target.value = e.target.value.replace(/\D/g, '').substring(0, 5);
});