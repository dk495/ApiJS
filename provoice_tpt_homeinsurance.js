function formatDate(inputDate) {
  // Split the input date into year, month, and day
  const [year, month, day] = inputDate.split('-');

  // Concatenate the month, day, and year in the desired order (MMDDYYYY)
  const formattedDate = `${year}/${month}/${day}`;

  return formattedDate;
}  
  document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();
document.getElementById('submitBtn').disabled = true;
            
            const formData = new FormData();
            formData.append('lp_campaign_id', '66b2bb39202db');
formData.append('lp_campaign_key', 'zKHC8JFwPgnVLbjkycNW');
 formData.append('phone_home', document.getElementById('phone_home').value);
formData.append('lp_caller_id', document.getElementById('phone_home').value);

formData.append('lp_response', 'JSON');
            formData.append('first_name', document.getElementById('first_name').value);
formData.append('last_name', document.getElementById('last_name').value);
formData.append('city', document.getElementById('city').value);
formData.append('state', document.getElementById('state').value);
formData.append('email_address', document.getElementById('email').value);
formData.append('address', document.getElementById('address').value);
formData.append('landing_page', document.getElementById('landing_page').value);
formData.append('ip_address', document.getElementById('ip_address').value);
formData.append('email_address', document.getElementById('email').value);
const formattedDate = formatDate(document.getElementById('dob').value);
formData.append('dob', formattedDate); 
formData.append('property_type', document.getElementById('property_type').value);
formData.append('property_age', document.getElementById('property_age').value);
formData.append('roof_type', document.getElementById('roof_type').value);
formData.append('square_footage', document.getElementById('square_footage').value);
formData.append('stories', document.getElementById('stories').value);
formData.append('bedrooms', document.getElementById('bedrooms').value);
formData.append('bathrooms', document.getElementById('Bathrooms').value);
formData.append('home_occupancy', document.getElementById('home_occupancy').value);
formData.append('home_value', document.getElementById('home_value').value);
formData.append('currently_insured', document.getElementById('currently_insured').value);
formData.append('current_Insurance_Company', document.getElementById('current_Insurance_Company').value);
formData.append('gender', document.getElementById('gender').value);
formData.append('credit_score', document.getElementById('credit_score').value);
formData.append('homeowner', document.getElementById('home_owner').value);
formData.append('married', document.getElementById('married').value);
formData.append('educaton_level', document.getElementById('educaton_level').value);
formData.append('employment_status', document.getElementById('employment_status').value);
formData.append('claim_filed', document.getElementById('claim_filed').value);
formData.append('zip_code', document.getElementById('zip_code').value);

formData.append('tcpa_language', 'By completing the form, I hereby affirm my acceptance of the Terms and Conditions, CCPA, and Privacy Policy . I grant permission to myhomeRevamp, their contractors, and partners (refer to our partners list) to communicate with me through email, phone, and text messages using the provided contact number. I consent to receiving offers from these entities, even if my contacts are listed on the "State and Federal Do Not Call List." I acknowledge that these marketing communications may be transmitted using an automatic telephone dialing system or pre-recorded messages. I understand that my consent is not a prerequisite for making a purchase and that I retain the right to revoke it at any time. This declaration includes compliance with the California Notice.');
 formData.append('call_recording_url', document.getElementById('call_recording_url').value);

            formData.append('trustedform_url', document.getElementById('trusted_form_cert_id').value);
            formData.append('jornaya', document.getElementById('jornaya_lead_id').value);
         formData.append('trusted_form_cert_id', document.getElementById('trusted_form_cert_id').value);
            formData.append('jornaya_lead_id', document.getElementById('jornaya_lead_id').value);
            
           
    
            const url = 'https://pointerleads.leadspediatrack.com/post.do?' + new URLSearchParams(formData).toString();
    
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
        });
