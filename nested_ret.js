function getCurrentTimestampMinus3Days() {
  // Get current timestamp in milliseconds
  var currentTimestamp = new Date().getTime();

  // Subtract 3 days (in milliseconds)
  var threeDaysInMillis = 3 * 24 * 60 * 60 * 1000;
  var newTimestamp = currentTimestamp - threeDaysInMillis;

  // Create a new Date object with the adjusted timestamp
  var adjustedDate = new Date(newTimestamp);

  // Format the result in HH:MM:SS DD-MM-YYYY format
  var formattedResult =
    ('0' + adjustedDate.getHours()).slice(-2) +
    ':' +
    ('0' + adjustedDate.getMinutes()).slice(-2) +
    ':' +
    ('0' + adjustedDate.getSeconds()).slice(-2) +
    ' ' +
    ('0' + adjustedDate.getDate()).slice(-2) +
    '-' +
    ('0' + (adjustedDate.getMonth() + 1)).slice(-2) +
    '-' +
    adjustedDate.getFullYear();

  return formattedResult;
}
 document.getElementById('leadForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const phone_home = '+1' + document.getElementById('caller_id').value;
      const formData = new FormData();
      
      
   
     
      formData.append('key', '06bbae9b-0d45-4b00-8dd8-ee5b84dc9f0f');
formData.append('caller_number', phone_home);

formData.append('firstname', document.getElementById('first_name').value);
formData.append('lastname', document.getElementById('last_name').value);


formData.append('address', document.getElementById('address').value);
formData.append('time_stamp',  document.getElementById('time_stamp').value);






      const url = 'https://retreaverdata.com/data_writing?' + new URLSearchParams(formData).toString();

      fetch(url, {
        method: 'POST'
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
