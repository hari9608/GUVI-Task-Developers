$(document).ready(function() {
	// get the current user's username from local storage
	// var session_key = localStorage.getItem('session_key');
	// get the user's profile data from MongoDB
/*	$.ajax({
		url: './php/profile.php',
		type: 'GET',
		data: { session_key: session_key},
		dataType: 'json',
		success: function(data) {
			// populate the form with the user's profile data
			if(data.success)
			{
				$('#username').val(data.username);
				$('#dob').val(data.dob);
				$('#age'.val(data.age));
				$('#contact-address').val(data.contactAddress);
			}else{
				localStorage.removeItem('session_key');
				window.location.href = './login.html';
			}
			//alert(data.session_key);
			//alert(data.message);
		},
		error: function() {
			alert('Failed to get user profile data.');
		}
	});*/

	// handle form submission
	$('#profile-form').submit(function(event) {
		event.preventDefault();
		// var session_key = localStorage.getItem('session_key');
		// get the form data
		var dob = $('#dob').val();
		var date = new Date();
		var dob_ = new Date(dob);
		var y2 = date.getFullYear();
		var y1 = dob_.getFullYear();
		var age = y2 - y1;
		var username = $('#username').val();
		var contactAddress = $('#contact-address').val();

		// send the updated profile data to MongoDB
		$.ajax({
			url: './php/profile.php',
			type: 'POST',
			data: {
				username: username,
				age: age,
				dob: dob,
				contactAddress: contactAddress
			},
			success: function(data) {

				alert('Profile updated successfully.');
			},
			error: function() {
				alert('Failed to update profile.');
			}
		});
	});
});
