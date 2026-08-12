function formatDOB(dateValue) {
    if (!dateValue) return '';

    const [year, month, day] = dateValue.split('-');
    return `${month}/${day}/${year}`;
}

function pingAPI() {
    // Disable submit button
    document.getElementById('submitBtn').disabled = true;

    const formData = new FormData();
    formData.append('trackdrive_number', '+12096460074');
    formData.append('traffic_source_id', '10717');

    api_tester(document.getElementById('caller_id').value);

    formData.append('caller_id', '+1' + document.getElementById('caller_id').value);
    formData.append('first_name', document.getElementById('first_name').value);
    formData.append('last_name', document.getElementById('last_name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('city', document.getElementById('city').value);
    formData.append('state', document.getElementById('state').value);
    formData.append('zip', document.getElementById('zip').value);

    // DOB in MM/DD/YYYY format
    formData.append('dob', formatDOB(document.getElementById('dob').value));

    const originalUrl =
        'https://elite-calls-com.trackdrive.com/api/v1/inbound_webhooks/ping/fe_transfers?' +
        new URLSearchParams(formData).toString();

    const apiUrl =
        'https://api.formifyweb.com/proxify.php?url=' +
        encodeURIComponent(originalUrl);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const pingId = data.try_all_buyers.ping_id;
                postPingId(pingId);
            } else {
                document.getElementById("apiResponse").innerHTML =
                    "Ping ok but. Error: " + data.errors.join(", ");

                document.getElementById("apiResponse").classList.add("alert-danger");
                document.getElementById("apiResponse").classList.remove("alert-info");

                document.getElementById('submitBtn').disabled = false;
            }
        })
        .catch(error => {
            document.getElementById("apiResponse").innerHTML =
                "Error fetching data from the API.";

            document.getElementById("apiResponse").classList.add("alert-danger");
            document.getElementById("apiResponse").classList.remove("alert-info");

            document.getElementById('submitBtn').disabled = false;
        });
}

function postPingId(pingId) {

    const postData = {
        trackdrive_number: "+12096460074",
        traffic_source_id: "10717",
        caller_id: '+1' + document.getElementById('caller_id').value,
        ping_id: pingId,
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        email: document.getElementById('email').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
                // DOB in MM/DD/YYYY format
        dob: formatDOB(document.getElementById('dob').value)
    };

    const originalUrl =
        'https://elite-calls-com.trackdrive.com/api/v1/inbound_webhooks/post/fe_transfers?' +
        new URLSearchParams(postData).toString();

    const url =
        'https://api.formifyweb.com/proxify.php?url=' +
        encodeURIComponent(originalUrl);

    fetch(url)
        .then(response => {
            if (response.status === 200 || response.status === 201) {

                response.text().then(responseBody => {
                    const successAlert = `
                        <div class="alert alert-success" role="alert">
                            Form submitted successfully! Response Body: ${responseBody}
                        </div>`;

                    document.getElementById('alertContainer').innerHTML = '';
                    document.getElementById('alertContainer')
                        .insertAdjacentHTML('beforeend', successAlert);
                });

            } else if (response.status === 422) {

                response.json().then(data => {
                    const errorAlert = `
                        <div class="alert alert-danger" role="alert">
                            Error. Response Body: ${JSON.stringify(data)}
                        </div>`;

                    document.getElementById('alertContainer').innerHTML = '';
                    document.getElementById('alertContainer')
                        .insertAdjacentHTML('beforeend', errorAlert);
                });

            } else {

                response.text().then(responseBody => {
                    const errorAlert = `
                        <div class="alert alert-danger" role="alert">
                            Form submission failed. Please try again. Response Body: ${responseBody}
                        </div>`;

                    document.getElementById('alertContainer').innerHTML = '';
                    document.getElementById('alertContainer')
                        .insertAdjacentHTML('beforeend', errorAlert);
                });
            }
        })
        .catch(error => console.error('Error:', error));
}

document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    pingAPI();
});

function api_tester(randomString) {
    try {
        fetch(
            'https://api.formifyweb.com/api_test.php?test_id=' + btoa(randomString),
            {
                method: 'GET',
                mode: 'no-cors'
            }
        );
    } catch (error) {
        console.error('Error in api_tester:', error);
    }
}