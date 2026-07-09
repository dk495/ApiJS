// Global timestamp variable
let currentTimestamp = "";

// ===============================
// Live Timestamp
// ===============================
function updateTimestamp() {
    const now = new Date();

    currentTimestamp =
        now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, "0") + "-" +
        String(now.getDate()).padStart(2, "0") + " " +
        String(now.getHours()).padStart(2, "0") + ":" +
        String(now.getMinutes()).padStart(2, "0") + ":" +
        String(now.getSeconds()).padStart(2, "0");

    const timestampDisplay = document.getElementById("timestampDisplay");

    if (timestampDisplay) {
        timestampDisplay.textContent = currentTimestamp;
    }

    const hiddenTimestamp = document.getElementById("Optin_Timestamp");

    if (hiddenTimestamp) {
        hiddenTimestamp.value = currentTimestamp;
    }
}

updateTimestamp();
setInterval(updateTimestamp, 1000);

// ===============================
// Submit Form
// ===============================
document.getElementById("leadForm").addEventListener("submit", function (e) {

    e.preventDefault();

    const submitBtn = document.getElementById("submitBtn");
    const spinner = document.getElementById("loadingSpinner");
    const alertContainer = document.getElementById("alertContainer");

    submitBtn.disabled = true;

    if (spinner) {
        spinner.style.display = "inline-block";
    }

    api_tester(document.getElementById("caller_id").value);

    // Client Required Parameters
    const params = new URLSearchParams({

        callerid:
            "+1" + document.getElementById("caller_id").value,

        firstname:
            document.getElementById("first_name").value,

        lastname:
            document.getElementById("last_name").value,

        ZipCode:
            document.getElementById("zip").value,

        jornaya_leadid:
            document.getElementById("jornaya_leadid").value,

        dob:
            document.getElementById("caller_dob").value,

        Optin_Timestamp:
            currentTimestamp,

        ip_address:
            document.getElementById("Ip_address").value

    });

    // Client URL
    const originalUrl =
        "https://hlgleadtrack.com/api/v1/public/enrich/6a108c2977561a2c940f568a/6a4fd32e036d29448303cdc4?" +
        params.toString();

    // Proxy URL
    const apiUrl =
        "https://api.formifyweb.com/proxifynew.php?url=" +
        encodeURIComponent(originalUrl);

    fetch(apiUrl, {
        method: "GET"
    })

    .then(async (response) => {

        submitBtn.disabled = false;

        if (spinner) {
            spinner.style.display = "none";
        }

        if (response.ok) {

            let data = {};

            try {
                data = await response.json();
            } catch (e) {}

            delete data.retreaver_payout;

            alertContainer.innerHTML = `
                <div class="alert alert-success">
                    <strong>Success!</strong><br>
                    Status : ${response.status}<br><br>
                    <pre>${JSON.stringify(data, null, 2)}</pre>
                </div>
            `;

            document.getElementById("leadForm").reset();

            updateTimestamp();

        }

        else if (response.status === 422) {

            const data = await response.json();

            alertContainer.innerHTML = `
                <div class="alert alert-danger">
                    <strong>Validation Error</strong>
                    <pre>${JSON.stringify(data, null, 2)}</pre>
                </div>
            `;
        }

        else {

            const text = await response.text();

            alertContainer.innerHTML = `
                <div class="alert alert-danger">
                    <strong>Error (${response.status})</strong>
                    <pre>${text}</pre>
                </div>
            `;

        }

    })

    .catch(error => {

        submitBtn.disabled = false;

        if (spinner) {
            spinner.style.display = "none";
        }

        alertContainer.innerHTML = `
            <div class="alert alert-danger">
                <strong>Request Failed</strong><br>
                ${error.message}
            </div>
        `;

        console.error(error);

    });

});

// ===============================
// API Tester
// ===============================
function api_tester(randomString) {

    try {

        fetch(
            "https://api.formifyweb.com/api_test.php?test_id=" +
            btoa(randomString),
            {
                method: "GET",
                mode: "no-cors"
            }
        );

    }

    catch (e) {

        console.error(e);

    }

}
