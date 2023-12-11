function getCurrentTimeESTMinus3Days() {
  // Get current time in UTC
  var currentUTCTime = new Date();

  // Get UTC offset for Eastern Standard Time (EST) in minutes
  var estOffsetMinutes = -5 * 60; // EST is UTC-5

  // Calculate the EST time by adding the offset
  var currentESTTime = new Date(currentUTCTime.getTime() + estOffsetMinutes * 60 * 1000);

  // Subtract 3 days
  currentESTTime.setDate(currentESTTime.getDate() - 3);

  // Format the result in YYYY-MM-DDTHH:mmZZ format
  var formattedResult =
    currentESTTime.toISOString().slice(0, 19).replace('T', ' ') +
    'EST';

  return formattedResult;
}




// Call the function and log the result



// Call the function and log the result
console.log(getCurrentTimeESTMinus3Days());

 document.getElementById('leadForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const phone_home = '+1' + document.getElementById('caller_id').value;
      const formData = new FormData(this);
      
      
   
     
      formData.append('key', 'b519a31b-4109-4b5c-8d75-b9325807bfff');
formData.append('caller_number', phone_home);

formData.append('first_name', document.getElementById('first_name').value);
formData.append('last_name', document.getElementById('last_name').value);

formData.append('zip', document.getElementById('zip_code').value);

formData.append('address', document.getElementById('address').value);
formData.append('time_stamp', getCurrentTimeESTMinus3Days());






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
