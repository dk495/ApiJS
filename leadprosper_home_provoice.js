document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const pingData = new FormData();
           pingData.append('lp_campaign_id', '26064');
pingData.append('lp_supplier_id', '74509');
pingData.append('lp_key', 'xvzltlqmntj1xd');
pingData.append('sub1', '1H');

 
pingData.append('firstname', document.getElementById('first_name').value);
pingData.append('lastname', document.getElementById('last_name').value);
pingData.append('phone', document.getElementById('phone').value);
const inputValue = document.getElementById("leadcreationdate").value; 
const formattedDate = inputValue.replace("T", " ") + ":00";
pingData.append('leadcreationdate', formattedDate);
 pingData.append('address', document.getElementById('address').value);
    pingData.append('email', document.getElementById('email').value);
     pingData.append('yearbuilt', document.getElementById('yearbuilt').value);
           
pingData.append('city', document.getElementById('city').value);
pingData.append('state', document.getElementById('state').value);
pingData.append('monthscontinuallyinsured', document.getElementById('monthscontinuallyinsured').value);
    pingData.append('currentprovider', document.getElementById('currentprovider').value);
    pingData.append('gender', document.getElementById('gender').value);

pingData.append('zipcode', document.getElementById('zip_code').value);
    pingData.append('dateofbirth', document.getElementById('dob').value);
    pingData.append('propertytype', document.getElementById('propertytype').value);
    pingData.append('insured', document.getElementById('insured').value);
    pingData.append('stories', document.getElementById('stories').value);

        
            pingData.append('jornaya_leadid', document.getElementById('jornaya_lead_id').value);

    const pingUrl = 'https://api.leadprosper.io/ping?' + new URLSearchParams(pingData).toString();

    fetch(pingUrl, {
        method: 'POST',
headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
    })
    .then(response => response.json())
    .then(pingResponse => {
        if (pingResponse.status === 'ACCEPTED') {
            const ping_id = pingResponse.ping_id;

            const formData = new FormData();
                  formData.append('lp_campaign_id', '26064');
formData.append('lp_supplier_id', '74509');
formData.append('lp_key', 'xvzltlqmntj1xd');
            formData.append('sub1', '1H');
            formData.append('firstname', document.getElementById('first_name').value);
formData.append('lastname', document.getElementById('last_name').value);
formData.append('city', document.getElementById('city').value);
formData.append('state', document.getElementById('state').value);
formData.append('phone', document.getElementById('phone').value);
formData.append('leadcreationdate', formattedDate);
 formData.append('dateofbirth', document.getElementById('dob').value);
    formData.append('propertytype', document.getElementById('propertytype').value);
    formData.append('insured', document.getElementById('insured').value);
    formData.append('stories', document.getElementById('stories').value);
             formData.append('address', document.getElementById('address').value);
formData.append('email', document.getElementById('email').value);
            formData.append('yearbuilt', document.getElementById('yearbuilt').value);
formData.append('zipcode', document.getElementById('zip_code').value);
formData.append('monthscontinuallyinsured', document.getElementById('monthscontinuallyinsured').value);
    formData.append('currentprovider', document.getElementById('currentprovider').value);
    formData.append('gender', document.getElementById('gender').value);
            formData.append('jornaya_leadid', document.getElementById('jornaya_lead_id').value);
            formData.append('lp_ping_id', ping_id); // Include the ping_id from the ping response

            const postUrl = 'https://api.leadprosper.io/post?' + new URLSearchParams(formData).toString();

            fetch(postUrl, {
                method: 'POST',
headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
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
                    });
                    document.getElementById('submitBtn').disabled = false;
                } else {
                    response.text().then(responseBody => {
                        const errorAlert = `
                            <div class="alert alert-danger" role="alert">
                                Form submission failed. Please try again. Response Body: ${responseBody}
                            </div>`;
                        document.getElementById('alertContainer').innerHTML = '';
                        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
                    });
                    document.getElementById('submitBtn').disabled = false;
                }
            })
            .catch(error => console.error('Error:', error));
        } else {
            const errorAlert = `
                <div class="alert alert-danger" role="alert">
                    Ping failed. Response Body: ${JSON.stringify(pingResponse)}
                </div>`;
            document.getElementById('alertContainer').innerHTML = '';
            document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
            document.getElementById('submitBtn').disabled = false;
        }
    })
    .catch(error => console.error('Error:', error));
});
function formatDateTime(date) {
  const pad = num => String(num).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
         `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

    
