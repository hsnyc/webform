$(function() {
/*************************************************************************
Define some regular expressions
/************************************************************************/
var expEmail = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
	expLettersOnly = /^[a-zA-Z ]+$/,
	expLettersNumbers = /^[a-zA-Z0-9]*$/;


/*************************************************************************
yes, declaring a GLOBAL for errors
**************************************************************************/
var error = false;

/*************************************************************************
Perform input fields validation
*************************************************************************/
function validateFields(name, value){

	var errorText = "";
	error = false;

	// Test for which field is sent
	switch ( name ) {

		case "name":

			var sibling = $("input[name='name']").siblings( ".errors" );

			//check for empty values
			if ($.trim(value) == "" || value == null) {

				// console.log("Name is empty");
				errorText = "Please enter your name!<br />";

				// Display the error message below the field
				sibling.html(errorText);
				error = true;
			}

			//check for numbers or other characters in name
			else if ( !expLettersOnly.test( value ) ) {
				errorText = "The name can only contain letters and spaces!";

				// Display the error message below the field
				sibling.html(errorText);
				error = true;
			}

			else {
				// Clear the error message below the field
				sibling.html("");
			}

			break;

		case "email":

			var sibling = $("input[name='email']").siblings( ".errors" );

			//check for empty values
			if ($.trim(value) == "" || value == null) {

				// console.log("Email is empty");
				errorText = "Please enter your email!<br />";

				// Display the error message below the field
				sibling.html(errorText);
				error = true;
			}

			//check for valid email format
			else if ( !expEmail.test( value ) ) {
				errorText = "The email address format is invalid!";

				// Display the error message below the field
				sibling.html(errorText);
				error = true;
			}

			else {
				// Clear the error message below the field
				sibling.html("");
			}

			break;

		case "textarea":

			var sibling = $("textarea[name='textarea']").siblings( ".errors" );

			//check for empty values
			if ($.trim(value) == "" || value == null) {

				// console.log("Textarea is empty");
				errorText = "Please enter your message!<br />";

				// Display the error message below the field
				sibling.html(errorText);
				error = true;
			}

			else {
				// Clear the error message below the field
				sibling.html("");
			}

			break;

		}//<-- end switch -->//

			// return error;
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
for (var i = 0; i < inputs.length; i++) {
	validateFields( inputs[i].attr('name'), inputs[i].val());

//break loop if error is encountered
	if (error == true) {
		break;
	}
}//<-- end of for loop

// inputs.forEach(function(field) {
// 	checkEmptyFields( field.attr('name'), field.val() );
// })

	if (error == true) {
			//stop here
			console.log("Got ERRORS");
	}

	else {

		console.log("NO ERRORS");

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

});
