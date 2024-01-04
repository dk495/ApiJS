function pingAPI() {
    // Your API URL
    var apiUrl = "https://corsproxy.io/?https://verbalking.trackdrive.com/api/v1/inbound_webhooks/ping/check_for_available_aca_buyer?trackdrive_number=+18884900065&traffic_source_id=1002";

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Display the API response in the Bootstrap alert
            document.getElementById("apiResponse").innerHTML = JSON.stringify(data, null, 2);
            document.getElementById("apiResponse").classList.add("alert-success");
            document.getElementById("apiResponse").classList.remove("alert-info");
        })
        .catch(error => {
            // Display an error message in the Bootstrap alert
            document.getElementById("apiResponse").innerHTML = "Error fetching data from the API.";
            document.getElementById("apiResponse").classList.add("alert-danger");
            document.getElementById("apiResponse").classList.remove("alert-info");
        });
}
document.getElementById('leadForm').addEventListener('submit', function(event) {
      event.preventDefault();
     const postData = {
        trackdrive_number: "+18772661868",
	traffic_source_id: "1003",
	
	caller_id: document.getElementById('caller_id').value,
	ping_id : document.getElementById('ping_id').value
	
	
  	  };
    
            const url = 'https://corsproxy.io/?https://verbalking.trackdrive.com/api/v1/inbound_webhooks/post/check_for_available_aca_buyer';
    
            fetch(url, {
                method: "POST",
        headers: {
            "Content-Type": "application/json"
          
        },
        body: JSON.stringify(postData)
            })
            .then(response => {
                if (response.status === 200) {
                    response.text().then(responseBody => {
                        const successAlert = `
                            <div class="alert alert-success" role="alert">
                                200 : Form submitted successfully! Response Body: ${responseBody}
                            </div>`;
                        document.getElementById('alertContainer').innerHTML = '';
                        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
                    });
                    // Clear form fields
                    document.getElementById('leadForm').reset();
                } else if (response.status === 201) {
                    response.text().then(responseBody => {
                        const successAlert = `
                            <div class="alert alert-success" role="alert">
                                201 : Form submitted successfully! Response Body: ${responseBody}
                            </div>`;
                        document.getElementById('alertContainer').innerHTML = '';
                        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
                    });
                    // Clear form fields
                    document.getElementById('leadForm').reset();
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
        });
