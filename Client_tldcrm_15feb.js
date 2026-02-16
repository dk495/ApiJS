document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const phone_home = document.getElementById('caller_id').value;
    const formData = new FormData();
    formData.append('CID', phone_home);
    document.getElementById('alertContainer').innerHTML = '';

    api_tester(document.getElementById('caller_id').value);
   
    // PING URL
    const url = 'https://msb.tldcrm.com/api/vendor/ping/33445/f34308c88e73b545f2424b4db0d6e660/'+phone_home;
    const apiUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(url);

    // First do PING
    fetch(apiUrl, {
        method: 'GET'
    })
    .then(response => response.text())
    .then(responseBody => {
        let responseData;
        try {
            responseData = JSON.parse(responseBody);
        } catch (error) {
            throw new Error('Invalid JSON response');
        }

        if (responseData.rejectReason) {
            // PING failed
            const errorAlert = `
                <div class="alert alert-danger" role="alert">
                    Failure: ${JSON.stringify(responseData)}
                </div>`;
            document.getElementById('alertContainer').innerHTML = '';
            document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
        } else {
            // PING successful, now do POST
            delete responseData.bidAmount;
            
            // Prepare POST data
            const postData = new URLSearchParams();
            postData.append('first_name', document.getElementById('first_name').value);
            postData.append('last_name', document.getElementById('last_name').value);
            postData.append('email', document.getElementById('email').value);
            postData.append('phone', document.getElementById('caller_id').value.replace(/\D/g, ''));
            postData.append('dob', document.getElementById('dob').value);
            postData.append('state', document.getElementById('state').value);

            // POST URL
            const postUrl = 'https://msb.tldcrm.com/post?vendor_id=33445&post_key=f34308c88e73b545f2424b4db0d6e660';
            const proxyPostUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(postUrl);

            // Send POST request
            return fetch(proxyPostUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: postData.toString()
            })
            .then(response => response.text())
            .then(postResponseCode => {
                const code = parseInt(postResponseCode.trim());
                
                if (code >= 1 && code <= 16) {
                    // POST success
                    const successAlert = `
                        <div class="alert alert-success" role="alert">
                            Success: PING OK - Lead submitted successfully (Code: ${code})
                        </div>`;
                    document.getElementById('alertContainer').innerHTML = '';
                    document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
                    
                    // Clear form fields
                    document.getElementById('leadForm').reset();
                } else {
                    // POST failed
                    const errorAlert = `
                        <div class="alert alert-danger" role="alert">
                            PING OK but POST failed (Code: ${code})
                        </div>`;
                    document.getElementById('alertContainer').innerHTML = '';
                    document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
                }
            });
        }
    })
    .catch(error => {
        const errorAlert = `
            <div class="alert alert-danger" role="alert">
                Error: ${error.message}
            </div>`;
        document.getElementById('alertContainer').innerHTML = '';
        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
        console.error('Error:', error);
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
