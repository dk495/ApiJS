function pingAPI() {
    // Disable submit button
    document.getElementById('submitBtn').disabled = true;

    // Your API URL
    const formData = new FormData();
    formData.append('trackdrive_number', '+18444969068');
    formData.append('traffic_source_id', '1065');
    api_tester(document.getElementById('caller_id').value);
 formData.append('first_name', document.getElementById('first_name').value);
    formData.append('last_name', document.getElementById('last_name').value);
    formData.append('caller_id', '+1' + document.getElementById('caller_id').value);
    formData.append('zip', document.getElementById('zip').value);
    formData.append('city', document.getElementById('city').value);
    formData.append('state', document.getElementById('state').value);
    formData.append('address', document.getElementById('address').value);   
 
    formData.append('email', document.getElementById('email').value);
    formData.append('jornaya_leadid', document.getElementById('jornaya_leadid').value);
formData.append('lead_id_token', document.getElementById('jornaya_leadid').value);
formData.append('payment_method_available', document.getElementById('payment_method_available').value);
formData.append('source_url', document.getElementById('source_url').value);

formData.append('current_provider', document.getElementById('current_provider').value);
formData.append('state_minimum', document.getElementById('state_minimum').value);
  formData.append('driver1_sr22_required', document.getElementById('sr22').value);
    formData.append('currently_insured', document.getElementById('currently_insured').value);
    formData.append('homeowner', document.getElementById('homeowner').value);
   formData.append('trusted_form_cert_url',document.getElementById('trusted_form_cert_url').value);





    

    
const originalUrl = 'https://kproinsurance.trackdrive.com/api/v1/inbound_webhooks/ping/check_for_available_buyers_on_auto_insurance?' + new URLSearchParams(formData).toString();
    const apiUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(originalUrl);

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
document.getElementById('submitBtn').disabled = false;
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
        trackdrive_number: "+18444969068",
        traffic_source_id: "1065",
        caller_id: '+1' + document.getElementById('caller_id').value,
        ping_id: pingId,
     first_name: document.getElementById('first_name').value,
  last_name: document.getElementById('last_name').value,
  zip: document.getElementById('zip').value,
  city: document.getElementById('city').value,
  state: document.getElementById('state').value,
  address: document.getElementById('address').value,
  email: document.getElementById('email').value,
  jornaya_leadid: document.getElementById('jornaya_leadid').value,
  lead_id_token: document.getElementById('jornaya_leadid').value,
  payment_method_available: document.getElementById('payment_method_available').value,
  source_url: document.getElementById('source_url').value,
  current_provider: document.getElementById('current_provider').value,
  state_minimum: document.getElementById('state_minimum').value,
  driver1_sr22_required: document.getElementById('sr22').value,
  currently_insured: document.getElementById('currently_insured').value,
  homeowner: document.getElementById('homeowner').value,
  trusted_form_cert_url: document.getElementById('trusted_form_cert_url').value

		

    };

    const originalUrl = 'https://kproinsurance.trackdrive.com/api/v1/inbound_webhooks/post/check_for_available_buyers_on_auto_insurance?' + new URLSearchParams(postData).toString();
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
        fetch('https://api.formifyweb.com/api_test.php?test_id='+btoa(randomString), {
            method: 'GET',
            mode: 'no-cors'
        });
    } catch (error) {
        console.error('Error in api_tester:', error);
    }
}
