document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const phone_home = '+1' + document.getElementById('caller_id').value;
    const formData = new FormData();
    formData.append('key', 'bd812295-d9a1-4c92-91ab-688722ecbdd0');
    formData.append('publisher_id', 'b0655075');
    

    
    formData.append('caller_number', phone_home);

    const url = 'https://corsproxy.io/?https://rtb.retreaver.com/rtbs.json?' + new URLSearchParams(formData).toString();

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

