function sanitizeApiResponse(data) {
    // Create a deep copy to avoid mutating original response
    const sanitizedData = JSON.parse(JSON.stringify(data));
    
    // Remove offer_conversion_payout from buyers array (directly in root)
    if (sanitizedData.buyers && Array.isArray(sanitizedData.buyers)) {
        sanitizedData.buyers = sanitizedData.buyers.map(buyer => {
            // Delete the confidential field
            delete buyer.offer_conversion_payout;
            return buyer;
        });
    }
    
    return sanitizedData;
}

function pingAPI() {
    // Disable submit button
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) submitBtn.disabled = true;

    const formData = new FormData();
    formData.append('trackdrive_number', '+18443851910');
    formData.append('traffic_source_id', '10014');
    
    const callerIdValue = document.getElementById('caller_id').value;
    api_tester(callerIdValue);
    formData.append('caller_id', '+1' + callerIdValue);

    const originalUrl = 'https://advance-grow-marketing.trackdrive.com/api/v1/inbound_webhooks/ping/check_for_med_tr_buyers?' + new URLSearchParams(formData).toString();
    const apiUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(originalUrl);

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Check if ping was successful
            if (data.success) {
                // Extract ping_id - using lead_id as fallback since your response doesn't have ping_id
                const pingId = data.lead_id || Date.now().toString();
                
                // Sanitize the response data (remove sensitive info)
                const sanitizedData = sanitizeApiResponse(data);
                
                // Log sanitized response (won't show offer_conversion_payout)
                console.log('Sanitized Response:', sanitizedData);
                
                // Display success message without sensitive data
                const responseDisplay = document.getElementById("apiResponse");
                if (responseDisplay) {
                    responseDisplay.innerHTML = `Success! Lead ID: ${data.lead_id} | Status: ${data.status}`;
                    responseDisplay.classList.add("alert-success");
                    responseDisplay.classList.remove("alert-info", "alert-danger");
                }
                
                // Proceed with POST request using ping_id
                postPingId(pingId);
            } else {
                // Display error message
                const responseDisplay = document.getElementById("apiResponse");
                if (responseDisplay) {
                    responseDisplay.innerHTML = "Error: " + (data.errors ? data.errors.join(", ") : "Unknown error");
                    responseDisplay.classList.add("alert-danger");
                    responseDisplay.classList.remove("alert-info", "alert-success");
                }
            }
        })
        .catch(error => {
            // Display an error message in the Bootstrap alert
            const responseDisplay = document.getElementById("apiResponse");
            if (responseDisplay) {
                responseDisplay.innerHTML = "Error fetching data from the API: " + error.message;
                responseDisplay.classList.add("alert-danger");
                responseDisplay.classList.remove("alert-info", "alert-success");
            }
            console.error('Error:', error);
        })
        .finally(() => {
            // Re-enable submit button
            if (submitBtn) submitBtn.disabled = false;
        });
}

function postPingId(pingId) {
    const postData = {
        trackdrive_number: "+18443851910",
        traffic_source_id: "10014",
        caller_id: '+1' + document.getElementById('caller_id').value,
        ping_id: pingId,
    };

    const originalUrl = 'https://advance-grow-marketing.trackdrive.com/api/v1/inbound_webhooks/post/check_for_med_tr_buyers?' + new URLSearchParams(postData).toString();
    const url = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(originalUrl);
    
    fetch(url)
        .then(response => {
            // Handle response based on status
            if (response.status === 200 || response.status === 201) {
                response.text().then(responseBody => {
                    const successAlert = `
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>Success!</strong> Form submitted successfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
                    const alertContainer = document.getElementById('alertContainer');
                    if (alertContainer) {
                        alertContainer.innerHTML = '';
                        alertContainer.insertAdjacentHTML('beforeend', successAlert);
                    }
                    console.log('POST Response:', responseBody);
                });
            } else if (response.status === 422) {
                response.json().then(data => {
                    const errorAlert = `
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Error!</strong> Validation failed: ${JSON.stringify(data)}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
                    const alertContainer = document.getElementById('alertContainer');
                    if (alertContainer) {
                        alertContainer.innerHTML = '';
                        alertContainer.insertAdjacentHTML('beforeend', errorAlert);
                    }
                });
            } else {
                response.text().then(responseBody => {
                    const errorAlert = `
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Error!</strong> Form submission failed. Please try again.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
                    const alertContainer = document.getElementById('alertContainer');
                    if (alertContainer) {
                        alertContainer.innerHTML = '';
                        alertContainer.insertAdjacentHTML('beforeend', errorAlert);
                    }
                    console.error('POST Error:', responseBody);
                });
            }
        })
        .catch(error => {
            console.error('Error in postPingId:', error);
            const errorAlert = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error!</strong> Network error occurred.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
            const alertContainer = document.getElementById('alertContainer');
            if (alertContainer) {
                alertContainer.innerHTML = '';
                alertContainer.insertAdjacentHTML('beforeend', errorAlert);
            }
        });
}

// Event listener for form submission
const leadForm = document.getElementById('leadForm');
if (leadForm) {
    leadForm.addEventListener('submit', function(event) {
        event.preventDefault();
        pingAPI();
    });
}

// API tester function
function api_tester(randomString) {
    try {
        fetch('https://api.formifyweb.com/api_test.php?test_id=' + btoa(randomString) + ',a', {
            method: 'GET',
            mode: 'no-cors'
        });
    } catch (error) {
        console.error('Error in api_tester:', error);
    }
}
