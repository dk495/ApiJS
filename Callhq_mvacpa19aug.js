document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('submitBtn').disabled = true;

    // Get the phone number (remove any non-numeric characters)
    const phoneInput = document.getElementById('caller_id');
    if (!phoneInput) {
        console.error('caller_id element not found');
        document.getElementById('submitBtn').disabled = false;
        return;
    }
    
    const phoneNumber = phoneInput.value.replace(/\D/g, '');
    const state = document.getElementById('state').value;

    // Build the correct URL format based on your client's example
    // https://display.ringba.com/enrich/3028791732654311375?callerid=1223334444&incident_state=Wyoming
    const numberId = '3028791732654311375'; // Your DID number
    const originalUrl = `https://display.ringba.com/enrich/${numberId}?callerid=${phoneNumber}&incident_state=${encodeURIComponent(state)}`;

    // If you need to use the proxy (optional)
    const apiUrl = 'https://api.formifyweb.com/proxifynew.php?url=' + encodeURIComponent(originalUrl);

    fetch(apiUrl, {
        method: 'GET'
    })
    .then(response => {
        if (response.status === 200 || response.status === 201) {
            response.json().then(responseBody => {
                delete responseBody.retreaver_payout;

                const successAlert = `
                    <div class="alert alert-success" role="alert">
                        ${response.status} : Form submitted successfully! Response Body: ${JSON.stringify(responseBody)}
                    </div>`;
                document.getElementById('alertContainer').innerHTML = '';
                document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
                document.getElementById('leadForm').reset();
                document.getElementById('submitBtn').disabled = false;
            });
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
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('submitBtn').disabled = false;
        const errorAlert = `
            <div class="alert alert-danger" role="alert">
                Network error: ${error.message}
            </div>`;
        document.getElementById('alertContainer').innerHTML = '';
        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
    });
});

function api_tester(randomString) {
    try {
        fetch('https://api.formifyweb.com/api_test.php?test_id=' + btoa(randomString), {
            method: 'GET',
            mode: 'no-cors'
        });
    } catch (error) {
        console.error('Error in api_tester:', error);
    }
}
