$(document).ready(function() {
    // Waiting for submmission:
    $('#login-form').submit(function(event) {
      event.preventDefault(); // prevent default form submission
      
      // get form data
    var formData = {
      username: $('#username').val(),
      email: $('#email').val(),
      password: $('#password').val(),
      confirm_password: $('#confirm-password').val()
    };

       //   alert('connecting to php.');
      // send data to server using AJAX
      $.ajax({
        type: 'POST',
        url: './php/login.php',
        data: formData,
        dataType: 'json',
        success: function(response) {
          if (response.success) {
            // redirect to profile page
          ///  localStorage.setItem('session_key',response.session_id);            
            //alert(response.session_id);
            window.location.href = 'profile.html';

          } else {
            // display error message
            alert(response.message);
          }
        },
        error: function() {
          // display error message
          alert('Invalid username or password.');
        }
      });
    });
  });
