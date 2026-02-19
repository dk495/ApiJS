 document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData();

formData.append('CallerId', document.getElementById('caller_id').value);
formData.append('InbloundStateCode', document.getElementById('state').value);
formData.append('InboundZipCode', document.getElementById('zip').value);




const originalUrl = 'https://bid.callgrid.com/api/bid/cmk2uqzxf01du06k08ah98qtx?exposeCallerId=yes&' + new URLSearchParams(formData).toString();
const url = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(originalUrl);

    fetch(url, {
        method: 'POST'
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



