<html>
<head>
  <title> Client MVA Ping/Post </title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <style>
    body {
      background-color: #f8f9fa;
    }
    .container {
      background-color: #ffffff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h2 {
      color: #007bff;
      margin-bottom: 20px;
    }
    .form-control {
      border-radius: 50px;
    }
    .btn-primary {
      border-radius: 50px;
      background-color: #007bff;
      border-color: #007bff;
    }
    .btn-primary:hover {
      background-color: #0056b3;
      border-color: #0056b3;
    }
    .alert {
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container mt-5">
    <h2 class="text-center"> Client MVA Ping/Post </h2>
    <form id="leadForm">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="first_name">First Name</label>
            <input type="text" class="form-control" id="first_name" placeholder="First Name" required>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="last_name">Last Name</label>
            <input type="text" class="form-control" id="last_name" placeholder="Last Name" required>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="caller_id">Phone (ex: 7103847563)</label>
            <input type="text" class="form-control" id="caller_id" placeholder="Phone" required>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" placeholder="john@example.com" required>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="state">Accident State</label>
            <select class="form-control" id="state" required>
              <option value="">Select State</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="zip">Zipcode</label>
            <input type="text" class="form-control" id="zip" placeholder="5 digit" required>
          </div>
        </div>
      </div>

      <!-- MVA Specific Fields -->
      <hr>
      <h5 class="text-primary mt-4 mb-3">Accident Information</h5>

      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label for="had_injury">Were you injured?</label>
            <select class="form-control" id="had_injury" required>
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="incident_time">When did the incident occur?</label>
            <select class="form-control" id="incident_time" required>
              <option value="">Select</option>
              <option value="less_than_1_month">Less than 1 month</option>
              <option value="less_than_1_year">Less than 1 year</option>
              <option value="less_than_2_years">Less than 2 years</option>
              <option value="more_than_2_years">More than 2 years</option>
            </select>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="doctor_treatment">Did you get treatment for your injury?</label>
            <select class="form-control" id="doctor_treatment" required>
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label for="have_attorney">Are you currently represented by an attorney?</label>
            <select class="form-control" id="have_attorney" required>
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="what_injury">Where were you hurt?</label>
            <input type="text" class="form-control" id="what_injury" placeholder="e.g., neck, back, head" required>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="accident_description">Accident Description</label>
            <input type="text" class="form-control" id="accident_description" placeholder="Brief description" required>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="trustedform_cert_url">TrustedForm Certificate URL</label>
            <input type="text" class="form-control" id="trustedform_cert_url" placeholder="https://cert.trustedform.com/..." required>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="landing_page_url">Landing Page URL</label>
            <input type="text" class="form-control" id="landing_page_url" placeholder="https://..." required>
          </div>
        </div>
      </div>

      <button type="button" class="btn btn-primary" id="submitBtn" onclick="pingAPI()">Ping/Post</button>
    </form>
    <div id="alertContainer"></div>

    <!-- Display API response using Bootstrap alert -->
    <div class="alert alert-info mt-3" role="alert" id="apiResponse"></div>
  </div>

  <!-- Bootstrap JS and dependencies -->
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
  <script src="https://js.formifyweb.com/client_mvapingpost18nov.js"></script>

  <script>
    function disableRightClick(event) {
      event.preventDefault();
    }
    document.addEventListener('contextmenu', disableRightClick);
  </script>
</body>
</html>