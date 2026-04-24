document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values and validate
    let phoneNumber = document.getElementById('caller_id').value;
    const zipCode = document.getElementById('zip').value;
    
    // Remove any non-digit characters from phone
    phoneNumber = phoneNumber.replace(/\D/g, '');
    
    // Validate phone number (must be 10 digits)
    if (phoneNumber.length !== 10) {
        const errorAlert = `
            <div class="alert alert-danger" role="alert">
                Error: Phone number must be exactly 10 digits. Example: 5858675309
            </div>`;
        document.getElementById('alertContainer').innerHTML = errorAlert;
        return;
    }
    
    // Validate zip code (must be 5 digits)
    if (!zipCode || zipCode.length !== 5 || isNaN(zipCode)) {
        const errorAlert = `
            <div class="alert alert-danger" role="alert">
                Error: Zip code must be exactly 5 digits. Example: 14450
            </div>`;
        document.getElementById('alertContainer').innerHTML = errorAlert;
        return;
    }
    
    // Format phone with '1' prefix for ANI (per Soleo spec)
    const ani = '1' + phoneNumber;
    const apiKey = 'w6w8pmx6dxqbrn8hqeoyobx';
    
    // Build correct Soleo URL (NOT .json extension, no exposeCallerId)
    // According to Soleo spec: https://api.soleo.com/expresscall?Parameter=Value
    const soleoUrl = `https://api.soleo.com/expresscall?APIKey=${apiKey}&PostalCode=${zipCode}&ANI=${ani}`;
    
    console.log('Soleo Request URL:', soleoUrl);
    
    // Use proxy to avoid CORS
    const proxyUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(soleoUrl);
    
    // Clear previous alerts
    document.getElementById('alertContainer').innerHTML = '';
    
    // Show loading state
    const loadingAlert = `
        <div class="alert alert-info" role="alert">
            Searching for sponsored listings...
        </div>`;
    document.getElementById('alertContainer').insertAdjacentHTML('beforeend', loadingAlert);
    
    // Make the request (MUST be GET, not POST per Soleo spec)
    fetch(proxyUrl, {
        method: 'GET',  // Changed from POST to GET
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.text(); // Get as text first to debug
    })
    .then(responseBody => {
        console.log('Raw response:', responseBody);
        
        let responseData;
        try {
            responseData = JSON.parse(responseBody);
        } catch (error) {
            // If parsing fails, show the raw response for debugging
            throw new Error(`Invalid JSON response. Raw response: ${responseBody.substring(0, 200)}`);
        }
        
        // Check if response has businesses (Soleo success format)
        if (responseData.businesses && responseData.businesses.length >= 0) {
            const sponsoredCount = responseData.summary?.resultsCount?.sponsored || 0;
            
            let successHtml = `
                <div class="alert alert-success" role="alert">
                    <strong>Success!</strong> Found ${sponsoredCount} sponsored listings.<br>
                    <strong>Valid Until:</strong> ${responseData.summary?.validUntil || 'N/A'}<br>
                    <strong>API Response:</strong>
                    <pre class="mt-2 mb-0" style="background:#f8f9fa; padding:10px; border-radius:5px; overflow-x:auto;">${JSON.stringify(responseData, null, 2)}</pre>
                </div>`;
            
            // Display business details if any
            if (responseData.businesses && responseData.businesses.length > 0) {
                successHtml += `<div class="alert alert-info" role="alert">`;
                responseData.businesses.forEach((business, index) => {
                    successHtml += `
                        <strong>Business ${index + 1}:</strong> ${business.name || 'N/A'}<br>
                        <strong>Category:</strong> ${business.categoryName || business.categoryID || 'N/A'}<br>
                        <strong>Display Phone:</strong> ${business.displayPhoneNumber || 'N/A'}<br>
                        <strong>Completion Phone:</strong> ${business.completionPhoneNumber || 'N/A'}<br>
                        ${business.monetizationCriteria ? `<strong>Monetization Value:</strong> $${business.monetizationCriteria.value || '0'}<br>` : ''}
                        <hr>
                    `;
                });
                successHtml += `</div>`;
            }
            
            document.getElementById('alertContainer').innerHTML = successHtml;
            
            // Clear form fields on success
            document.getElementById('leadForm').reset();
        } else {
            // Response didn't have expected structure
            throw new Error(`Unexpected response format: ${JSON.stringify(responseData)}`);
        }
        
        // Call api_tester for analytics
        api_tester(phoneNumber);
    })
    .catch(error => {
        console.error('Error:', error);
        const errorAlert = `
            <div class="alert alert-danger" role="alert">
                <strong>Error:</strong> ${error.message}<br><br>
                <small>Possible issues:<br>
                - Check your API key is valid<br>
                - Ensure the proxy server is working<br>
                - Verify the zip code has sponsored listings<br>
                - Try using trialapi.soleo.com for testing</small>
            </div>`;
        document.getElementById('alertContainer').innerHTML = errorAlert;
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
