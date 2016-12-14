$(function() {
/*************************************************************************
Define some regular expressions
/************************************************************************/
var expEmail = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
	expLettersOnly = /^[a-zA-Z ]+$/,
	expLettersNumbers = /^[a-zA-Z0-9]*$/;


/*************************************************************************
Validate form on typing
*************************************************************************/
$( "#form" ).on( "keyup", "input.validate-locally", function() {
	validateField( $(this) );
});


/*************************************************************************
Check empty fields
*************************************************************************/
function checkEmptyFields(name, value){

	var errorText = "",
	error = false;
	// field = $("#form .validate-locally");
	// siblings = field.siblings( ".errors" );

	// Test for which field is sent
	switch ( name ) {

		case "name":

			var sibling = $("input[name='name']").siblings( ".errors" );

			if ($.trim(value) == "" || value == null) {
				console.log("Name is empty");
				errorText = "Please enter your name!<br />";

				// Display the error message below the field
				sibling.html(errorText);
				return error = true;
			}

			break;

		case "email":

			var sibling = $("input[name='email']").siblings( ".errors" );

			if ($.trim(value) == "" || value == null) {
				console.log("Email is empty");
				errorText = "Please enter your email!<br />";

				// Display the error message below the field
				sibling.html(errorText);
				return error = true;
			}

			break;

		case "textarea":
			var sibling = $("textarea[name='textarea']").siblings( ".errors" );

			if ($.trim(value) == "" || value == null) {
				console.log("Textarea is empty");
				errorText = "Please enter your message!<br />";

				// Display the error message below the field
				sibling.html(errorText);
				return error = true;
			}

			else {
				// Clear the error message below the field
				sibling.html("");
			}

			break;

			}

}


/*************************************************************************
On form submit, do an AJAX call
*************************************************************************/
$( "#form" ).submit(function(e) {
	// Prevent the form from submitting by default
	e.preventDefault();

//Get input fields and set some variables
var name = 	$("#name"),
email = $("#email"),
textarea = $("#textarea");

var inputs = [name, email, textarea];

//Check if input fields are empty
// for (var i = 0, i < inputs.length, i++) {
// 	checkEmptyFields(inputs[i]);
// 	console.log("looping: " + inputs[i]);
// }

// for each(var inp in inputs) {
// 	checkEmptyFields(inp);
// 	console.log("looping: " + inp);
// }

// inputs.forEach(function(input) {
//
// });

inputs.forEach(function(field) {
	checkEmptyFields( field.attr('name'), field.val() );
})


	if (checkEmptyFields() == true) {
			//stop here
			console.log("Got to checkEmptyFields");
	}

	//Check for name min length
	else if (!validateLength( name, 2 )) {
		errorText += "The name is too short!<br />";

		// Display the error message below the field
		siblings.html(errorText);
	}


	else {

		// Get the form action
		var $this = $( this ),
		action = $this.attr( "action" );

		// Do an AJAX request
		$.post(
			action,
			$this.serialize(),
			function( data ) {
				// We display the returned message
				$( ".ajax-message" ).html( data ).show();

				// Depending on the nature of the message, we apply success or error classes
				$( ".ajax-message:contains('Error!')" ).removeClass( "ajax-success" ).addClass( "ajax-error" );
				$( ".ajax-message:contains('Success!')" ).removeClass( "ajax-error" ).addClass( "ajax-success" );
			}
		);
	}


});


/*************************************************************************
Function that checks if a field has the correct minimum length
/************************************************************************/
function validateLength( fieldValue, minLength ) {
	// We remove trailing and leading whitespace
	return ( $.trim( fieldValue ).length > minLength );
}


/*************************************************************************
Function that validates a field
/************************************************************************/
function validateField( field ) {
	var errorText = "",
		error = false,
		value = field.val(),
		siblings = field.siblings( ".errors" );

	// Test for which field is sent
	switch ( field.attr( "name" ) ) {
		case "name":

			if ( !expLettersOnly.test( value ) ) {
				error = true;
				errorText += "The name can only contain letters and spaces!";
			}

			break;

		case "email":
			if ( !expEmail.test( value ) ) {
				error = true;
				errorText += "The email address format is invalid!";
			}

			break;

	}

	// Display the error message below the field
	siblings.html(errorText);

	// If there are errors return false
	return !error;
}
});
