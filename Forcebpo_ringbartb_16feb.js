document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('submitBtn').disabled = true;
    
    // Date formatting function
    function formatDateToMMDDYYYY(dateString) {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${month}/${day}/${year}`;
    }
    
    // Your API URL
    const formData = new FormData();

    api_tester(document.getElementById('caller_id').value);
    
    // Fixed phone number format
    formData.append('caller_number', '+1' + document.getElementById('caller_id').value);
    
    formData.append('first_name', document.getElementById('first_name').value);
    formData.append('last_name', document.getElementById('last_name').value);
    formData.append('state', document.getElementById('state').value);
    formData.append('caller_zip', document.getElementById('zip').value);
    
    // Format date to MM/DD/YYYY
    const rawDate = document.getElementById('caller_dob').value;
    const formattedDate = formatDateToMMDDYYYY(rawDate);
    formData.append('caller_dob', formattedDate);

    const originalUrl = 'https://display.ringba.com/enrich/2851074795024418190.json?exposeCallerId=yes&' + new URLSearchParams(formData).toString();
    const apiUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(originalUrl);

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
            document.getElementById('submitBtn').disabled = false;
        } else {
            delete responseData.bidAmount;
            const successAlert = `
                <div class="alert alert-success" role="alert">
                    Success: ${JSON.stringify(responseData)}
                </div>`;
            document.getElementById('alertContainer').innerHTML = '';
            document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
            // Clear form fields
            document.getElementById('leadForm').reset();
            document.getElementById('submitBtn').disabled = false;
        }
    })
    .catch(error => {
        const errorAlert = `
            <div class="alert alert-danger" role="alert">
                Error: ${error.message}
            </div>`;
        document.getElementById('alertContainer').innerHTML = '';
        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
        document.getElementById('submitBtn').disabled = false;
        console.error('Error:', error);
    });
}); // <-- This closes the main addEventListener function

function api_tester(randomString) {
    try {
        fetch('https://api.formifyweb.com/api_test.php?test_id='+btoa(randomString), {
            method: 'GET',
            mode: 'no-cors'
        });
    } catch (error) {
        console.error('Error in api_tester:', error);
    }
} // <-- This closes the api_tester function
