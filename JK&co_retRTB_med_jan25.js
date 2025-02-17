document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const phone_home = '+1' + document.getElementById('caller_id').value;
    const formData = new FormData();
    formData.append('key', '9e0dd95b-83b5-4818-a9b2-5e42f01c3b80');
   
    formData.append('publisher_id', '4abd32bc');
 formData.append('caller_number', phone_home);
    formData.append('inbound_number', '8889912180');
 formData.append('truecall_id', document.getElementById('truecall_id').value);
 formData.append('dialed_number', phone_home);
formData.append('first_name', document.getElementById('first_name').value);
formData.append('last_name', document.getElementById('last_name').value);
formData.append('email', document.getElementById('email').value);
formData.append('zip', document.getElementById('zip').value);
formData.append('city', document.getElementById('city').value);
formData.append('state', document.getElementById('state').value);
formData.append('address1', document.getElementById('address').value);
    

    

    
   
api_tester(document.getElementById('caller_id').value);
    const url = 'https://rtb.retreaver.com/rtbs.json?' + new URLSearchParams(formData).toString();
const apiUrl = 'https://api.formifyweb.com/proxify.php?url=' + encodeURIComponent(url);

    fetch(apiUrl, {
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
