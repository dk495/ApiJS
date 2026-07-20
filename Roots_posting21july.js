document.getElementById('leadForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const alertContainer = document.getElementById('alertContainer');

    submitBtn.disabled = true;
    alertContainer.innerHTML = '';

    // Fire and forget
    api_tester(document.getElementById('caller_id').value);

    const formData = new FormData();
    formData.append('phone', '+1' + document.getElementById('caller_id').value);
    formData.append('state', document.getElementById('state').value);
    formData.append('zip', document.getElementById('zip').value);

    const originalUrl =
        'https://api.enrollhere.com/dialer/availability/byQueue/afce5efa-f0c8-4437-aa4b-fb2602ff9a6d?' +
        new URLSearchParams(formData).toString();

    const apiUrl =
        'https://api.formifyweb.com/proxify.php?url=' +
        encodeURIComponent(originalUrl);

    // 15 second timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    fetch(apiUrl, {
        method: 'GET',
        signal: controller.signal
    })
        .then(async (response) => {

            clearTimeout(timeout);

            const text = await response.text();

            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                data = text;
            }

            if (response.ok) {

                if (typeof data === "object" && data !== null) {
                    delete data.retreaver_payout;
                }

                alertContainer.innerHTML = `
                    <div class="alert alert-success" role="alert">
                        ${response.status} : Form submitted successfully!<br><br>
                        <pre>${JSON.stringify(data, null, 2)}</pre>
                    </div>
                `;

                document.getElementById('leadForm').reset();

            } else {

                alertContainer.innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        <strong>Error ${response.status}</strong><br><br>
                        <pre>${typeof data === 'object' ? JSON.stringify(data, null, 2) : data}</pre>
                    </div>
                `;
            }

        })
        .catch(error => {

            clearTimeout(timeout);

            let message = "Unknown error.";

            if (error.name === "AbortError") {
                message = "Request timed out after 15 seconds.";
            } else {
                message = error.message;
            }

            alertContainer.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    ${message}
                </div>
            `;

            console.error(error);

        })
        .finally(() => {
            submitBtn.disabled = false;
        });
});


function api_tester(randomString) {
    try {
        fetch(
            'https://api.formifyweb.com/api_test.php?test_id=' + btoa(randomString),
            {
                method: 'GET',
                mode: 'no-cors'
            }
        );
    } catch (error) {
        console.error('api_tester error:', error);
    }
}
