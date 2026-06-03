function postPingId(pingId) {

    const postData = {
        trackdrive_number: "+18442236518",
        traffic_source_id: "1000",
        caller_id: '+1' + document.getElementById('caller_id').value,
        ping_id: pingId,
        caller_state: document.getElementById('state').value,
        caller_zip: document.getElementById('zip').value,
        dob: formatDOB(document.getElementById('dob').value),
    };

    const originalUrl =
        'https://phoenixbpo.trackdrive.com/api/v1/inbound_webhooks/post/check_for_aca_buyers?' +
        new URLSearchParams(postData).toString();

    const url =
        'https://api.formifyweb.com/proxify.php?url=' +
        encodeURIComponent(originalUrl);

    fetch(url)
        .then(response => {

            if (response.status === 200 || response.status === 201) {

                response.json().then(data => {

                    // ✅ REMOVE unwanted fields from buyers
                    if (data.buyers && Array.isArray(data.buyers)) {
                        data.buyers.forEach(buyer => {
                            delete buyer.offer_conversion_payout;
                            delete buyer.current_conversion_duration;
                        });
                    }

                    const successAlert = `
                        <div class="alert alert-success" role="alert">
                            Form submitted successfully!
                            <pre>${JSON.stringify(data, null, 2)}</pre>
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
