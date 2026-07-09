// Global variable to store the current timestamp
let currentTimestamp = '';

// Function to update timestamp in real-time
function updateTimestamp() {
    const now = new Date();
    const timestamp = now.getFullYear() + '-' + 
                     String(now.getMonth() + 1).padStart(2, '0') + '-' + 
                     String(now.getDate()).padStart(2, '0') + ' ' + 
                     String(now.getHours()).padStart(2, '0') + ':' + 
                     String(now.getMinutes()).padStart(2, '0') + ':' + 
                     String(now.getSeconds()).padStart(2, '0');
    
    currentTimestamp = timestamp;
    document.getElementById('timestampDisplay').textContent = timestamp;
}

// Update timestamp every second
setInterval(updateTimestamp, 1000);

// Initial timestamp update
updateTimestamp();

document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    // Disable button and show loading spinner
    submitBtn.disabled = true;
    loadingSpinner.style.display = 'inline-block';
    
    // Clear previous alerts
    document.getElementById('alertContainer').innerHTML = '';

    // Get form values
    let phoneNumber = document.getElementById('caller_id').value.trim();
    const firstName = document.getElementById('first_name').value.trim();
    const lastName = document.getElementById('last_name').value.trim();
    const zipCode = document.getElementById('zip').value.trim();
    const dob = document.getElementById('caller_dob').value;
    const jornayaLeadId = document.getElementById('jornaya_leadid').value.trim() || '';

    // Remove any non-digit characters from phone
    phoneNumber = phoneNumber.replace(/\D/g, '');

    // Validate phone number (should be 10 digits)
    if (phoneNumber.length !== 10) {
        showAlert('danger', 'Please enter a valid 10-digit phone number. You entered ' + phoneNumber.length + ' digits.');
        submitBtn.disabled = false;
        loadingSpinner.style.display = 'none';
        return;
    }

    // Validate zip code
    if (!/^[0-9]{5}$/.test(zipCode)) {
        showAlert('danger', 'Please enter a valid 5-digit zip code.');
        submitBtn.disabled = false;
        loadingSpinner.style.display = 'none';
        return;
    }

    // Validate date of birth
    if (!dob) {
        showAlert('danger', 'Please select your date of birth.');
        submitBtn.disabled = false;
        loadingSpinner.style.display = 'none';
        return;
    }

    // Use the current timestamp
    const timestamp = currentTimestamp;

    // Get IP address
    getIPAddress().then(ipAddress => {
        // Build the URL with parameters
        const baseUrl = 'https://hlgleadtrack.com/api/v1/public/enrich/6a108c2977561a2c940f568a/6a4fd32e036d29448303cdc4';
        
        // Create form data for POST request
        const formData = new FormData();
        formData.append('callerid', phoneNumber);
        formData.append('firstname', firstName);
        formData.append('lastname', lastName);
        formData.append('ZipCode', zipCode);
        formData.append('jornaya_leadid', jornayaLeadId);
        formData.append('dob', dob);
        formData.append('Optin_Timestamp', timestamp);
        formData.append('ip_address', ipAddress);

        // Convert FormData to URLSearchParams for the proxy
        const params = new URLSearchParams();
        for (let [key, value] of formData.entries()) {
            params.append(key, value);
        }

        const fullUrl = baseUrl + '?' + params.toString();
        
        // Use the proxy service with POST method
        const apiUrl = 'https://api.formifyweb.com/proxifynew.php?url=' + encodeURIComponent(fullUrl);

        console.log('Sending POST request to:', apiUrl);
        console.log('Form Data:', Object.fromEntries(formData));

        // Call api_tester for tracking
        api_tester(phoneNumber);

        // Make the API call with POST method
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString()
        })
        .then(response => {
            console.log('Response status:', response.status);
            
            // Get response as text first
            return response.text().then(text => {
                console.log('Raw response:', text);
                
                // Try to parse as JSON
                let responseData;
                try {
                    responseData = JSON.parse(text);
                } catch (e) {
                    responseData = text;
                }
                
                return { status: response.status, data: responseData, raw: text };
            });
        })
        .then(({ status, data, raw }) => {
            // Check if response has rejectReason (like in your example)
            if (data && typeof data === 'object' && data.rejectReason) {
                // Rejected
                showAlert('danger', `❌ Failure: ${data.rejectReason}`);
                showResponseDetails(data);
                console.error('Rejection reason:', data.rejectReason);
            } 
            // Check for error messages
            else if (data && typeof data === 'object' && data.error) {
                showAlert('danger', `❌ Error: ${data.error}`);
                showResponseDetails(data);
                console.error('Error:', data.error);
            }
            // Check for invalid callerid in message
            else if (data && typeof data === 'object' && data.message && 
                     (data.message.toLowerCase().includes('invalid') || 
                      data.message.toLowerCase().includes('error'))) {
                showAlert('danger', `❌ API Error: ${data.message}`);
                showResponseDetails(data);
                console.error('API Error:', data.message);
            }
            // Check for success
            else if (status === 200 || status === 201) {
                // Check if there's any error indicator
                let hasError = false;
                let errorMsg = '';
                
                if (typeof data === 'object' && data !== null) {
                    if (data.status === 'error' || data.status === 'failed') {
                        hasError = true;
                        errorMsg = data.message || data.status;
                    }
                }
                
                if (hasError) {
                    showAlert('danger', `❌ Error: ${errorMsg}`);
                    showResponseDetails(data);
                } else {
                    // Success - remove bidAmount if present (like in your example)
                    if (data && typeof data === 'object' && data.bidAmount) {
                        delete data.bidAmount;
                    }
                    
                    showAlert('success', '✅ Form submitted successfully!');
                    showResponseDetails(data);
                    console.log('Success Response:', data);
                    document.getElementById('leadForm').reset();
                }
            } 
            // Status 422 validation error
            else if (status === 422) {
                showAlert('danger', `❌ Validation Error (${status})`);
                showResponseDetails(data);
                console.error('Validation error:', data);
            } 
            // Other status codes
            else {
                // Try to extract error message from response
                let errorMsg = `Status: ${status}`;
                if (typeof data === 'object' && data !== null) {
                    if (data.message) errorMsg = data.message;
                    else if (data.error) errorMsg = data.error;
                }
                showAlert('danger', `❌ Submission failed: ${errorMsg}`);
                showResponseDetails(data);
                console.error('Error response:', data);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            showAlert('danger', '❌ Network error. Please check your connection and try again.');
        })
        .finally(() => {
            // Re-enable button and hide spinner
            submitBtn.disabled = false;
            loadingSpinner.style.display = 'none';
        });
    }).catch(error => {
        console.error('Error getting IP address:', error);
        showAlert('danger', 'Could not retrieve IP address. Please try again.');
        submitBtn.disabled = false;
        loadingSpinner.style.display = 'none';
    });
});

// Function to get IP address
function getIPAddress() {
    return fetch('https://api.ipify.org?format=json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to get IP address');
            }
            return response.json();
        })
        .then(data => data.ip)
        .catch(error => {
            console.error('Error fetching IP:', error);
            // Return a fallback IP
            return '127.0.0.1';
        });
}

// Function to show alerts
function showAlert(type, message) {
    const alertContainer = document.getElementById('alertContainer');
    const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
    
    const alertHTML = `
        <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `;
    
    alertContainer.innerHTML = '';
    alertContainer.insertAdjacentHTML('beforeend', alertHTML);
}

// Function to show response details
function showResponseDetails(data) {
    const alertContainer = document.getElementById('alertContainer');
    
    let responseText = '';
    if (typeof data === 'object' && data !== null) {
        responseText = JSON.stringify(data, null, 2);
    } else {
        responseText = String(data);
    }
    
    const responseHTML = `
        <div class="alert alert-info mt-2" role="alert" style="font-size: 14px;">
            <strong>📋 Response Details:</strong>
            <pre style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin-top: 10px; white-space: pre-wrap; word-break: break-all; max-height: 300px; overflow-y: auto;">${responseText}</pre>
        </div>
    `;
    
    alertContainer.insertAdjacentHTML('beforeend', responseHTML);
}

// API tester function
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

// Form validation on input
document.getElementById('zip').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 5);
});

document.getElementById('caller_id').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
});
