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
        // Try different phone number formats
        const phoneFormats = [
            phoneNumber,                           // 1234567890
            '1' + phoneNumber,                     // 11234567890
            '+' + '1' + phoneNumber,               // +11234567890
            phoneNumber.substring(0, 3) + '-' + phoneNumber.substring(3, 6) + '-' + phoneNumber.substring(6, 10), // 123-456-7890
            '(' + phoneNumber.substring(0, 3) + ') ' + phoneNumber.substring(3, 6) + '-' + phoneNumber.substring(6, 10) // (123) 456-7890
        ];

        // Try each format
        tryPhoneFormats(phoneFormats, firstName, lastName, zipCode, dob, jornayaLeadId, timestamp, ipAddress)
            .then(result => {
                if (result.success) {
                    showAlert('success', '✅ Form submitted successfully!');
                    showResponseDetails(result.data);
                    console.log('Success Response:', result.data);
                    document.getElementById('leadForm').reset();
                } else {
                    showAlert('danger', `❌ ${result.message}`);
                    showResponseDetails(result.data);
                    console.error('Error:', result.data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showAlert('danger', '❌ All phone number formats failed. Please check the phone number.');
            })
            .finally(() => {
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

// Function to try different phone formats
function tryPhoneFormats(phoneFormats, firstName, lastName, zipCode, dob, jornayaLeadId, timestamp, ipAddress) {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        let lastError = null;

        function tryNextFormat(index) {
            if (index >= phoneFormats.length) {
                // All formats failed
                resolve({
                    success: false,
                    message: 'All phone number formats failed. Last error: ' + (lastError || 'Unknown error'),
                    data: lastError
                });
                return;
            }

            const phoneNumber = phoneFormats[index];
            console.log(`Trying format ${index + 1}: ${phoneNumber}`);

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

            const fullUrl = baseUrl + '?' + params.toString();
            const apiUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(fullUrl);

            console.log(`Sending request (format ${index + 1}):`, fullUrl);

            // Call api_tester for tracking
            api_tester(phoneNumber);

            // Make the API call
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString()
            })
            .then(response => {
                return response.text().then(text => {
                    console.log(`Response (format ${index + 1}):`, text);
                    
                    let responseData;
                    try {
                        responseData = JSON.parse(text);
                    } catch (e) {
                        responseData = text;
                    }
                    
                    return { status: response.status, data: responseData };
                });
            })
            .then(({ status, data }) => {
                // Check if response contains error about caller ID
                let hasCallerIdError = false;
                let errorMessage = '';
                
                if (typeof data === 'object' && data !== null) {
                    // Check for "Invalid caller ID" in response
                    if (data.response && data.response.message && 
                        data.response.message.toLowerCase().includes('invalid caller')) {
                        hasCallerIdError = true;
                        errorMessage = data.response.message;
                    } else if (data.message && data.message.toLowerCase().includes('invalid caller')) {
                        hasCallerIdError = true;
                        errorMessage = data.message;
                    } else if (data.response && data.response.code === 4003) {
                        hasCallerIdError = true;
                        errorMessage = data.response.message || 'Invalid caller ID';
                    }
                }
                
                if (hasCallerIdError) {
                    // This format failed, try next one
                    console.log(`Format ${index + 1} failed:`, errorMessage);
                    lastError = data;
                    tryNextFormat(index + 1);
                } else if (status === 200 || status === 201) {
                    // Success!
                    // Remove bidAmount if present
                    if (data && typeof data === 'object' && data.bidAmount) {
                        delete data.bidAmount;
                    }
                    resolve({
                        success: true,
                        data: data
                    });
                } else {
                    // Other error, try next format
                    console.log(`Format ${index + 1} failed with status ${status}`);
                    lastError = data;
                    tryNextFormat(index + 1);
                }
            })
            .catch(error => {
                console.error(`Error with format ${index + 1}:`, error);
                lastError = error.message;
                tryNextFormat(index + 1);
            });
        }

        // Start with first format
        tryNextFormat(0);
    });
}

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
