document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const pingData = new FormData();
           pingData.append('lp_campaign_id', '26066');
pingData.append('lp_supplier_id', '74511');
pingData.append('lp_key', 'mmedcdz0jbd2ly');
pingData.append('SubID1', '1A');



 
pingData.append('first_name', document.getElementById('first_name').value);
pingData.append('last_name', document.getElementById('last_name').value);
pingData.append('phone', document.getElementById('phone').value);
pingData.append('email', document.getElementById('email').value);
    pingData.append('date_of_birth', document.getElementById('date_of_birth').value);
const inputValue = document.getElementById("leadcreationdate").value; 
const [datePart, timePart] = inputValue.split("T"); // "2025-04-17", "00:54"
  const [year, month, day] = datePart.split("-");
  const timeWithSeconds = timePart + ":00"; // Add seconds
  const formattedDate = `${month}/${day}/${year} ${timeWithSeconds}`;
pingData.append('Lead_Creation_Date', formattedDate);
pingData.append('vehicle1_year', document.getElementById('vehicle1_year').value);
    pingData.append('address', document.getElementById('address').value);
pingData.append('vehicle1_make', document.getElementById('vehicle1_make').value);
pingData.append('vehicle1_model', document.getElementById('vehicle1_model').value);
            pingData.append('currently_insured', document.getElementById('currently_insured').value);
pingData.append('monthscontinuallyinsured', document.getElementById('monthscontinuallyinsured').value);
    pingData.append('auto_current_insurer', document.getElementById('currentprovider').value);
    pingData.append('gender', document.getElementById('gender').value);

    
  	 pingData.append('dui', document.getElementById('dui').value);
pingData.append('city', document.getElementById('city').value);
pingData.append('state', document.getElementById('state').value);
pingData.append('licensed', document.getElementById('licensed').value);
pingData.append('sr22', document.getElementById('sr22').value);
pingData.append('vehicle_count', document.getElementById('vehicle_count').value);
pingData.append('tickets', document.getElementById('tickets').value);
pingData.append('state_minimum', document.getElementById('state_minimum').value);
pingData.append('zip_code', document.getElementById('zip_code').value);

        
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
                  formData.append('lp_campaign_id', '26066');
formData.append('lp_supplier_id', '74511');
formData.append('lp_key', 'mmedcdz0jbd2ly');
formData.append('SubID1', '1A');
            formData.append('first_name', document.getElementById('first_name').value);
formData.append('last_name', document.getElementById('last_name').value);
formData.append('city', document.getElementById('city').value);
formData.append('state', document.getElementById('state').value);
formData.append('phone', document.getElementById('phone').value);
formData.append('email', document.getElementById('email').value);
            formData.append('Lead_Creation_Date', formattedDate);
formData.append('vehicle1_year', document.getElementById('vehicle1_year').value);
formData.append('vehicle1_make', document.getElementById('vehicle1_make').value);
formData.append('vehicle1_model', document.getElementById('vehicle1_model').value);
formData.append('zip_code', document.getElementById('zip_code').value);
 formData.append('currently_insured', document.getElementById('currently_insured').value);
  formData.append('date_of_birth', document.getElementById('date_of_birth').value);
formData.append('vehicle_count', document.getElementById('vehicle_count').value);
formData.append('tickets', document.getElementById('tickets').value);
            formData.append('address', document.getElementById('address').value);
  	 formData.append('dui', document.getElementById('dui').value);
formData.append('licensed', document.getElementById('licensed').value);
formData.append('sr22', document.getElementById('sr22').value);
            formData.append('monthscontinuallyinsured', document.getElementById('monthscontinuallyinsured').value);
    formData.append('auto_current_insurer', document.getElementById('currentprovider').value);
    formData.append('gender', document.getElementById('gender').value);
formData.append('state_minimum', document.getElementById('state_minimum').value);
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

    
