document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const phone_home = document.getElementById('caller_number').value;
    
    api_tester(phone_home);
    
    const formData = new URLSearchParams();
    formData.append('key', 'dfa4c5da-8ffe-4932-8424-6a47a49465a4');
    formData.append('caller_number', phone_home);
    formData.append('first_name', document.getElementById('first_name').value);
    formData.append('last_name', document.getElementById('last_name').value);
    formData.append('address', document.getElementById('address').value);
    formData.append('city', document.getElementById('city').value);
    formData.append('state', document.getElementById('state').value);
    formData.append('zip', document.getElementById('zip').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('ip_address', document.getElementById('ip_address').value);
    formData.append('jornaya_leadid', document.getElementById('jornaya_leadid').value);
    formData.append('original_lead_submit_date', document.getElementById('original_lead_submit_date').value);
    formData.append('residence_status', document.getElementById('residence_status').value);
    formData.append('driver1_dob', document.getElementById('driver1_dob').value);
    formData.append('driver1_gender', document.getElementById('driver1_gender').value);
    formData.append('driver1_marital_status', document.getElementById('driver1_marital_status').value);
    formData.append('vehicle1_year', document.getElementById('vehicle1_year').value);
    formData.append('vehicle1_make', document.getElementById('vehicle1_make').value);
    formData.append('vehicle1_model', document.getElementById('vehicle1_model').value);
    formData.append('insurance_company', document.getElementById('insurance_company').value);

    const url = 'https://retreaverdata.com/data_writing?' + formData.toString();
    const apiUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(url);

    fetch(apiUrl, {
        method: 'POST'
    })
    .then(response => {
        if (response.status === 200 || response.status === 201) {
            response.json().then(responseBody => {
                const successAlert = `
                    <div class="alert alert-success" role="alert">
                        ${response.status} : Form submitted successfully! Response Body: ${JSON.stringify(responseBody)}
                    </div>`;
                document.getElementById('alertContainer').innerHTML = '';
                document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
            });
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
