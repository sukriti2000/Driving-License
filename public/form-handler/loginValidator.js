$(document).ready(function() {
    $('#hide-signup').on('click', function() {
        $('#signupForm').css('display', 'none');
    $('#loginForm').css('display', 'block');
    $("#Log-in-heading").html('<h1>LOG-IN</h1>');
      });
    $("#signupForm").submit(function(event) {
      // Prevent form submission until validation is complete
      event.preventDefault();

      // Reset previous error messages
      $(".error").text("");

      // Get form values
      const userName = $("#userName").val().trim();
      const password = $("#password").val().trim();
      const confirmPassword = $("#confirmPassword").val().trim();
      const userType = $("#userType").val();

      // Validate UserName (Required field)
      if (!userName) {
        $("#userNameError").text("UserName is required.");
        return;
      }

      // Validate Password (Required field)
      if (!password) {
        $("#passwordError").text("Password is required.");
        return;
      }

      // Validate Confirm Password (Required field and match with password)
      if (!confirmPassword) {
        $("#confirmPasswordError").text("Confirm Password is required.");
        return;
      }

      if (password !== confirmPassword) {
        $("#confirmPasswordError").text("Passwords do not match.");
        return;
      }

      // Validate User Type (Required field and should not be "Select")
      if (userType === "Select") {
        $("#userTypeError").text("Please select a valid User Type.");
        return;
      }

      // If all validations pass, submit the form
      this.submit();
    });
  });

  $(document).ready(function() {
    $('#hide-signin').on('click', function() {
        $('#signupForm').css('display', 'block');
         $('#loginForm').css('display', 'none');
         $("#Log-in-heading").html('<h1>SIGN-UP</h1>');
      });
    $("#loginForm").submit(function(event) {
      // Prevent form submission until validation is complete
      event.preventDefault();

      // Reset previous error messages
      $(".error").text("");

      // Get form values
      const userName = $("#loginUserName").val();
      const password = $("#checkPassword").val();
      console.log(userName);
      // Validate UserName (Required field)
      if (!userName) {
        $("#loginUserNameError").text("UserName is required.");
        return;
      }

      // Validate Password (Required field)
      if (!password) {
        $("#checkPasswordError").text("Password is required.");
        return;
      }

      // If all validations pass, submit the form
      this.submit();
    });
  });
