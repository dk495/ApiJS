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
document.getElementById('submitBtn').disabled = true;
             // Your API URL
    const formData = new FormData();

    api_tester(document.getElementById('caller_id').value);
    formData.append('callerid', '+1' + document.getElementById('caller_id').value);
    formData.append('firstname', document.getElementById('first_name').value);
    formData.append('lastname', document.getElementById('last_name').value);
    formData.append('zipcode', document.getElementById('zip').value);
    formData.append('dob', document.getElementById('caller_dob').value);
    formData.append('jornaya_leadid', document.getElementById('jornaya_leadid').value);
    formData.append('ip_address', document.getElementById('ip_address').value);
    formData.append('Optin_Timestamp', document.getElementById('Optin_Timestamp').value);

    






const originalUrl = 'https://hlgleadtrack.com/api/v1/public/enrich/6a108c2977561a2c940f568a/6a4fd32e036d29448303cdc4?.json?exposeCallerId=yes&' + new URLSearchParams(formData).toString();
const apiUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(originalUrl);

    fetch(apiUrl, {
        method: 'GET'
    })
    .then(response => {
        if (response.status === 200 || response.status === 201) {
            response.json().then(responseBody => {
                // Remove 'retreaver_payout' key from response body
                delete responseBody.retreaver_payout;

                const successAlert = `
                    <div class="alert alert-success" role="alert">
                        ${response.status} : Form submitted successfully! Response Body: ${JSON.stringify(responseBody)}
                    </div>`;
                document.getElementById('alertContainer').innerHTML = '';
                document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
            });
            // Clear form fields
            document.getElementById('leadForm').reset();
document.getElementById('submitBtn').disabled = false;
        } else if (response.status === 422) {
            response.json().then(data => {
                const errorAlert = `
                    <div class="alert alert-danger" role="alert">
                        Error. Response Body: ${JSON.stringify(data)}
                    </div>`;
                document.getElementById('alertContainer').innerHTML = '';
                document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
document.getElementById('submitBtn').disabled = false;
            });
        } else {
            response.text().then(responseBody => {
                const errorAlert = `
                    <div class="alert alert-danger" role="alert">
                        Form submission failed. Please try again. Response Body: ${responseBody}
                    </div>`;
                document.getElementById('alertContainer').innerHTML = '';
                document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
document.getElementById('submitBtn').disabled = false;
            });
        }
    })
    .catch(error => console.error('Error:', error));
});


function api_tester(randomString) {
    try {
        fetch('https://api.formifyweb.com/api_test.php?test_id='+btoa(randomString), {
            method: 'GET',
            mode: 'no-cors'
        });
    } catch (error) {
        console.error('Error in api_tester:', error);
    }
}
