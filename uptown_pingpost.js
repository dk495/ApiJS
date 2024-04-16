function pingAPI() {
    // Disable submit button
    document.getElementById('submitBtn').disabled = true;

    // Your API URL
    const formData = new FormData();
    formData.append('trackdrive_number', '+18336160467');
    formData.append('traffic_source_id', '1063');
    
    formData.append('caller_id', '+1' + document.getElementById('caller_id').value);
formData.append('zip', document.getElementById('zip').value);
formData.append('state', document.getElementById('state').value);
formData.append('city', document.getElementById('city').value);
formData.append('first_name', document.getElementById('first_name').value);
    formData.append('last_name', document.getElementById('last_name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('dob', document.getElementById('dob').value);
const originalUrl = 'https://verbalking.trackdrive.com/api/v1/inbound_webhooks/ping/check_medicare_buyer_availability?' + new URLSearchParams(formData).toString();
    const apiUrl = 'https://corsproxy.io/?' + originalUrl;

    // Fetch data from the API
   fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Check if ping was successful
            if (data.success) {
                // Extract ping_id
                const pingId = data.try_all_buyers.ping_id;

                // Proceed with POST request using ping_id
                postPingId(pingId);
            } else {
                // Display error message
                document.getElementById("apiResponse").innerHTML = "Ping ok but. Error: " + data.errors.join(", ");
                document.getElementById("apiResponse").classList.add("alert-danger");
                document.getElementById("apiResponse").classList.remove("alert-info");
            }
        })
        .catch(error => {
            // Display an error message in the Bootstrap alert
            document.getElementById("apiResponse").innerHTML = "Error fetching data from the API.";
            document.getElementById("apiResponse").classList.add("alert-danger");
            document.getElementById("apiResponse").classList.remove("alert-info");
        });
}

function postPingId(pingId) {
    const postData = {
        trackdrive_number: "+18336160467",
        traffic_source_id: "1063",
        caller_id: '+1' + document.getElementById('caller_id').value,
        ping_id: pingId,
	zip: document.getElementById('zip').value,
	state: document.getElementById('state').value,
	city: document.getElementById('city').value,
	first_name: document.getElementById('first_name').value,
	last_name: document.getElementById('last_name').value,
	dob:document.getElementById('dob').value,
	email:document.getElementById('email').value

    };

    const originalUrl = 'https://verbalking.trackdrive.com/api/v1/inbound_webhooks/post/check_medicare_buyer_availability';
const url = 'https://corsproxy.io/?' + encodeURIComponent(originalUrl);
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    })
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
});
