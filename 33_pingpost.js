
document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData();
   

    formData.append('password', document.getElementById('verticals').value);
formData.append('duration', '1');

formData.append('zip', document.getElementById('zip').value);
    
    

    const url = 'https://corsproxy.io/?https://calls.33mileradius.com/api/v3/?' + new URLSearchParams(formData).toString();

    fetch(url, {
        method: 'POST'
    })
    .then(response => response.json().then(responseBody => {
        let alertClass = 'alert-success';
        let alertMessage = 'Ping successfully!';

        if (!responseBody.supported==1) {
            alertClass = 'alert-danger';
            
        }

        const alert = `
            <div class="alert ${alertClass}" role="alert">
                ${response.status} : ${alertMessage}
            </div>`;
        
        document.getElementById('alertContainer').innerHTML = '';
        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', alert);

       
        if (response.status === 200 || response.status === 201) {
 if (responseBody.supported==1) {
            fetchSecondApi(responseBody.ping_id,document.getElementById('verticals').value);
        }
            document.getElementById('leadForm').reset();
        }
    }))
    .catch(error => {
        const errorAlert = `
            <div class="alert alert-danger" role="alert">
                Error: ${error.message}
            </div>`;
        document.getElementById('alertContainer').innerHTML = '';
        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
    });
});
function fetchSecondApi(pingid,verticals) {

    fetch('https://corsproxy.io/?https://calls.33mileradius.com/api/v3/?password='+verticals+'&ping_id='+pingid+'&callback', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(responseBody => {
        let alertClass = 'alert-success';
        let alertMessage = 'Second request successful! Response Body: ' + JSON.stringify(responseBody);

        

        const alert = `
            <div class="alert ${alertClass}" role="alert">
                ${alertMessage}
            </div>`;
        
        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', alert);
    })
    .catch(error => {
        const errorAlert = `
            <div class="alert alert-danger" role="alert">
                Error in second request: ${error.message}
            </div>`;
        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
    });
}


               
