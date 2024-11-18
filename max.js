document.getElementById("availabilityForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const callerid = '+1'+ document.getElementById("callerid").value;
    const zip = document.getElementById("zip").value;

    const postData = {
        callerid: callerid,
        campaignid: "CA904fb698ec7042fdae597404d6357bc8",
        zip: zip
    };

    // Send a POST request to the API endpoint
    fetch("https://corsproxy.io/?https://h24tqy5tg9.execute-api.us-west-1.amazonaws.com/nld-availability", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "6uTudDvFIV1ScpNfQrFW1HCmfmBy7DK4K2Qp4Vmi"
        },
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.available) {
             const successDiv = document.getElementById("availabilityAlert");
            successDiv.textContent = "Success! Availability is confirmed. Posting Now";
            successDiv.classList.remove("alert-danger");
            successDiv.classList.add("alert-success");
            successDiv.style.display = "block";
            ringbapost(callerid,zip);
        } else {

            // If available is false, display an error message
            const errorDiv = document.getElementById("availabilityAlert");
            errorDiv.textContent = "{available:false} Not posting Call";
            errorDiv.style.display = "block";
        }
    })
    .catch(error => {
        // Handle any network or API request errors here
        console.error(error);
    });
});
function ringbapost(callerid,zip)
{
const formData = new FormData(document.getElementById("availabilityForm"));
formData.append('callerid', callerid);
formData.append('zip', zip);
const url = 'https://display.ringba.com/enrich/2289891381943994323?' + new URLSearchParams(formData).toString();

      const xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            const successAlert = `
              <div class="alert alert-success" role="alert">
                Form submitted successfully!
              </div>`;
            document.getElementById('availabilityForm').insertAdjacentHTML('beforeend', successAlert);
            // Clear form fields
            document.getElementById('availabilityForm').reset();
          } else if (xhr.status === 0) {
            // If status is 0 (CORS error), consider the form submitted
            const successAlert = `
              <div class="alert alert-success" role="alert">
                Form submitted successfully!
              </div>`;
            document.getElementById('availabilityForm').insertAdjacentHTML('beforeend', successAlert);
            // Clear form fields
            document.getElementById('availabilityForm').reset();
          } else {
            const errorAlert = `
              <div class="alert alert-danger" role="alert">
                Form submission failed. Please try again.
              </div>`;
            document.getElementById('availabilityForm').insertAdjacentHTML('beforeend', errorAlert);
          }
        }
      };
      xhr.send(formData);
}
