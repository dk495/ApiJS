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
    const phoneNumber = document.getElementById('caller_id').value.trim();
    const firstName = document.getElementById('first_name').value.trim();
    const lastName = document.getElementById('last_name').value.trim();
    const zipCode = document.getElementById('zip').value.trim();
    const dob = document.getElementById('caller_dob').value;
    const state = document.getElementById('state').value;
    const jornayaLeadId = document.getElementById('jornaya_leadid').value.trim() || '';

    // Validate phone number (should be 10 digits)
    if (!/^[0-9]{10}$/.test(phoneNumber)) {
        showAlert('danger', 'Please enter a valid 10-digit phone number.');
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

    // Use the current timestamp (the one displayed on screen)
    const timestamp = currentTimestamp;

    // Get IP address (using ipify.org)
    getIPAddress().then(ipAddress => {
        // Build the URL with parameters
        const baseUrl = 'https://hlgleadtrack.com/api/v1/public/enrich/6a108c2977561a2c940f568a/6a4fd32e036d29448303cdc4';
        
        const params = new URLSearchParams();
        params.append('callerid', phoneNumber);
        params.append('firstname', firstName);
        params.append('lastname', lastName);
        params.append('ZipCode', zipCode);
        params.append('jornaya_leadid', jornayaLeadId);
        params.append('dob', dob);
        params.append('Optin_Timestamp', timestamp);
        params.append('ip_address', ipAddress);
        
        // Add state if selected
        if (state) {
            params.append('state', state);
        }

        const fullUrl = baseUrl + '?' + params.toString();
        
        // Use the proxy service
        const apiUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(fullUrl);

        // Call api_tester for tracking
        api_tester(phoneNumber);

        // Make the API call
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.status === 200 || response.status === 201) {
                return response.json().then(responseBody => {
                    showAlert('success', `${response.status} : Form submitted successfully!`);
                    console.log('Response Body:', responseBody);
                    document.getElementById('leadForm').reset();
                    // Reset timestamp display continues updating
                });
            } else if (response.status === 422) {
                return response.json().then(data => {
                    showAlert('danger', `Error ${response.status}: Validation failed.`);
                    console.log('Error Details:', data);
                });
            } else {
                return response.text().then(responseBody => {
                    showAlert('danger', `Form submission failed. Status: ${response.status}`);
                    console.log('Response Body:', responseBody);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showAlert('danger', 'Network error. Please check your connection and try again.');
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
            return '0.0.0.0';
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
    
    // Auto-dismiss success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            const alert = alertContainer.querySelector('.alert');
            if (alert) {
                alert.classList.remove('show');
                setTimeout(() => {
                    alert.remove();
                }, 150);
            }
        }, 5000);
    }
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