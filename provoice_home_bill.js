document.getElementById('leadForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    const formData = new FormData();
    const taskSelect = document.getElementById("taskSelect");
    const selectedOption = taskSelect.options[taskSelect.selectedIndex];

    formData.append('apiId', selectedOption.getAttribute('data-apiid'));
    formData.append('apiPassword', selectedOption.getAttribute('data-apipassword'));
    formData.append('productId', selectedOption.getAttribute('data-productid'));
    formData.append('price', '0');
    formData.append('zip', document.getElementById('zip').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('phone', document.getElementById('phone').value);
    formData.append('tcpa', document.getElementById('tcpa').value);
    formData.append('firstName', document.getElementById('firstName').value);
    formData.append('lastName', document.getElementById('lastName').value);
    formData.append('address', document.getElementById('address').value);
    formData.append('ipAddress', document.getElementById('ipAddress').value);
    formData.append('landingPage', document.getElementById('landingPage').value);
    formData.append('taskId', taskSelect.value);
    formData.append('tcpaText', 'By completing the form, I hereby affirm my acceptance of the Terms and Conditions, CCPA , and Privacy Policy . I grant permission to myhomeRevamp, their contractors, and partners (refer to our partners list) to communicate with me through email, phone, and text messages using the provided contact number. I consent to receiving offers from these entities, even if my contacts are listed on the "State and Federal Do Not Call List." I acknowledge that these marketing communications may be transmitted using an automatic telephone dialing system or pre-recorded messages. I understand that my consent is not a prerequisite for making a purchase and that I retain the right to revoke it at any time. This declaration includes compliance with the California Notice.');

    try {
        const response = await fetch('https://corsproxy.io/?https://leads.billy-partners.com/fullpost/?'+ new URLSearchParams(formData).toString(), {
            method: 'POST'
        });

        if (response.ok) {
            const responseBody = await response.json();
            const { status, ...responseData } = responseBody;
            if (status !== 'reject') {
                document.getElementById('leadForm').reset();
                
            }
            showAlert(`Form submitted successfully! Response Body: ${JSON.stringify(responseData)}`, 'success');
        } else {
            const errorText = await response.text();
            showAlert(`Form submission failed: ${errorText}`, 'danger');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('An error occurred. Please try again.', 'danger');
    } finally {
        submitButton.disabled = false;
    }
});

function showAlert(message, type) {
    const alertContainer = document.getElementById('alertContainer');
    alertContainer.innerHTML = `
        <div class="alert alert-${type}" role="alert">
            ${message}
        </div>`;
}
