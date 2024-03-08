function pingAPI() {
    // Your API URL
    var Url = "https://corsproxy.io/?https://tracker.salespoint.ai/ping?pid=AF931e95e3b3054b55a018cb389a7f639a&cid=CAce309013251447b3b99ce8f0c68445cf&caller_id=";
    var caller_id = '+1' + document.getElementById('caller_id').value;
    var state = document.getElementById('state').value;
    var apiUrl = Url + caller_id + '&state=' + state;

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Check if ping was successful
            if (data.success === true && data.status === 'rejected') {
                // Display response as it is
                document.getElementById("apiResponse").innerHTML = "Ping Success But Rejected" + JSON.stringify(data);
                document.getElementById("apiResponse").classList.add("alert-info");
                document.getElementById("apiResponse").classList.remove("alert-danger");
            } else if (data.success === true && data.status === 'accepted') {
                // If status is accepted, call postPingId
                postPingId();
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

function postPingId() {
    const postData = {
               
        pid:'AF931e95e3b3054b55a018cb389a7f639a',
	cid:'CAce309013251447b3b99ce8f0c68445cf',
	caller_id: '+1' + document.getElementById('caller_id').value,
	first_name: document.getElementById('first_name').value,
	last_name: document.getElementById('last_name').value,
	state: document.getElementById('state').value,
	zip: document.getElementById('zip').value,
	city: document.getElementById('city').value
    };

    const url = 'https://corsproxy.io/?https://tracker.salespoint.ai/post';

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
// Reset form fields
                document.getElementById('leadForm').reset();
            response.text().then(responseBody => {
                const successAlert = `
                    <div class="alert alert-success" role="alert">
                        Ping/Post successfully! Response Body: ${responseBody}
                    </div>`;
                document.getElementById('alertContainer').innerHTML = '';
                document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
            });
        } else if (response.status === 422) {
            response.json().then(data => {
                const errorAlert = `
                    <div class="alert alert-danger" role="alert">
                        Ping ok but post failed. Response Body: ${JSON.stringify(data)}
                    </div>`;
                document.getElementById('alertContainer').innerHTML = '';
                document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
            });
        } else {
            response.text().then(responseBody => {
                const errorAlert = `
                    <div class="alert alert-danger" role="alert">
                        Ping ok but post failed. Please try again. Response Body: ${responseBody}
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
