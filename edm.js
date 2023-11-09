    document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();
   
           


 const postData = {
        first_name: document.getElementById('first_name').value,
	last_name: document.getElementById('last_name').value,
	email: document.getElementById('email').value,
	home_number_phone: document.getElementById('caller_id').value,
	address : document.getElementById('address').value,
	city : document.getElementById('city').value,
	zip_code:document.getElementById('zip_code').value,
	state : document.getElementById('zip_code').value
	
  	  };
    
            const url = 'https://corsproxy.io/?https://east-1.calltools.io/api/contacts/';
    
            fetch(url, {
                method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "3ec654a62ef65506b1ccb16b1945156baa8edb7d",
	    "Authorization":"Token 3ec654a62ef65506b1ccb16b1945156baa8edb7d"
        },
        body: JSON.stringify(postData)
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
</script>

  <!-- Custom script for form submission and notification -->
   <script>
        document.addEventListener("contextmenu", function (e) {
            e.preventDefault(); // Prevent the context menu from appearing
        });