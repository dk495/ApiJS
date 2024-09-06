    document.getElementById('leadForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const apiKey = '594b6a943d5df5f501642af89d0a9bf351d11b3019becd7cf4405d8a6bbcbedb';
        const src = 'SynegenceWindowsAndBath';
        const state = document.getElementById('state').value;
        const zip = document.getElementById('zip').value;
        const project = document.getElementById('project').value;
        const originPhone = document.getElementById('originPhone').value;

        const originPhoneAreaCode = originPhone.substring(0, 3);  // Get the first three digits of Origin_Phone

        // Perform Ping Request using HTTP GET
        const pingUrl = `https://percallpro.leadportal.com/new_api/api.php?Mode=full&Key=${apiKey}&API_Action=iprSubmitLead&TYPE=9&SRC=${src}&State=${state}&ZIP=${zip}&Project=${project}&Origin_Phone=${originPhone}&Terminating_Phone=7277617936&Origin_Phone_Area_Code=${originPhoneAreaCode}&Origin_Phone_Prefix=+1&Origin_Phone_Suffix=US`;

        fetch(pingUrl, {
            method: 'GET'
        })
        .then(response => response.text())
        .then(pingData => {
            const responseElement = document.getElementById('response');
            
            // Extract status and lead_id from the response
            const leadIdMatch = pingData.match(/<lead_id>(\d+)<\/lead_id>/);
            const statusMatch = pingData.match(/<status>([^<]+)<\/status>/);

            if (statusMatch) {
                const status = statusMatch[1];
                
                if (status === 'Success' && leadIdMatch) {
                    const leadId = leadIdMatch[1];

                    responseElement.innerHTML = `<div class="alert alert-success">Status: ${status} (Lead ID: ${leadId})</div>`;

                    // Perform Post Request using HTTP GET if Matched
                    const postUrl = `https://percallpro.leadportal.com/new_api/api.php?Mode=post&Key=${apiKey}&API_Action=iprSubmitLead&Lead_ID=${leadId}&TYPE=9&SRC=${src}&Origin_Phone=${originPhone}&Terminating_Phone=7277617936`;

                    return fetch(postUrl, { method: 'GET' });
                } else if (status === 'Unmatched') {
                    responseElement.innerHTML = `<div class="alert alert-danger">Status: Unmatched (Lead ID: ${leadIdMatch ? leadIdMatch[1] : 'N/A'})</div>`;
                } else {
                    throw new Error('Unexpected status in ping response');
                }
            }
        })
        .then(postResponse => postResponse ? postResponse.text() : null)
        .then(postData => {
            if (postData) {
                document.getElementById('response').innerHTML += `<br><div>Post Response:<br>${postData}</div>`;
            }
        })
        .catch(error => {
            document.getElementById('response').innerHTML += `<br><div class="alert alert-danger">Error: ${error.message}</div>`;
        });
    });
