function pingAPI() {
    // Disable submit button
    document.getElementById('submitBtn').disabled = true;

    // Your API URL
    const formData = new FormData();
    formData.append('trackdrive_number', '+18449291290');
    formData.append('traffic_source_id', '1084');
    api_tester(document.getElementById('caller_id').value);
    formData.append('caller_id', '+1' + document.getElementById('caller_id').value);
formData.append('first_name', document.getElementById('first_name').value);
formData.append('last_name',  document.getElementById('last_name').value);
formData.append('email', document.getElementById('email').value);
formData.append('address', document.getElementById('address1').value);
formData.append('address2', document.getElementById('address2').value);
formData.append('city', document.getElementById('city').value);
formData.append('state', document.getElementById('state').value);
formData.append('zip', document.getElementById('zip').value);
formData.append('original_lead_submit_date', document.getElementById('original_lead_submit_date').value);
formData.append('ip_address', document.getElementById('ip_address').value);
formData.append('current_company', document.getElementById('company').value);
formData.append('landing_page', document.getElementById('landing_page_url').value);
formData.append('vehicle1_make', document.getElementById('carmake').value);
formData.append('vehicle1_model', document.getElementById('carmodel').value);
formData.append('tcpa_opt_in', 'By clicking the Get Quotes button, you represent that you are 18+ years of age and agree to the Privacy Policy and Terms & Conditions. By clicking the Get Quotes button, you agree by your electronic signature that you give express written consent to receive marketing communications regarding insurance products and services by automatic dialing system and pre-recorded calls and artificial voice messages from mytopinsurancedeals.com and one or more of its Marketing partners at the phone number and e-mail address provided by you, including wireless numbers, if applicable, even if you have previously registered the provided number on the Do Not Call Registry. SMS/MMS and data messaging rates may apply. Your consent is not required to get a quote or purchase. To receive quotes without providing consent, please call at (205) 685-2234. Carrier data rates may apply. TCPA LeadID’s are used with the information for compliance and consent can be revoked through any reasonable means.');

    
const originalUrl = 'https://pay-per-call-program-corp.trackdrive.com/api/v1/inbound_webhooks/ping/check_for_available_buyers?' + new URLSearchParams(formData).toString();
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
        trackdrive_number: "+18449291290",
        traffic_source_id: "1084",
        caller_id: '+1' + document.getElementById('caller_id').value,
        ping_id: pingId,

        first_name: document.getElementById('first_name').value,
        last_name:  document.getElementById('last_name').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address1').value,
        address2: document.getElementById('address2').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
        original_lead_submit_date: document.getElementById('original_lead_submit_date').value,
        ip_address: document.getElementById('ip_address').value,
        current_company: document.getElementById('company').value,
        landing_page: document.getElementById('landing_page_url').value,
        vehicle1_make: document.getElementById('carmake').value,
        vehicle1_model: document.getElementById('carmodel').value
	
		

    };

    const originalUrl = 'https://pay-per-call-program-corp.trackdrive.com/api/v1/inbound_webhooks/post/check_for_available_buyers?' + new URLSearchParams(postData).toString();
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
