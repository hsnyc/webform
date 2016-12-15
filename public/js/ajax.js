$(function() {

/*************************************************************************
Use this file instead of validate.js if you want to let validate.php do
the validation.
*************************************************************************/

/*************************************************************************
On form submit, do an AJAX call
*************************************************************************/
$( "#form" ).submit(function(e) {
	// Prevent the form from submitting by default
	e.preventDefault();

		// Get the form action
		var $this = $( this ),
		action = $this.attr( "action" );

		// Do an AJAX request
		$.post(
			action,
			$this.serialize(),
			function( data ) {

				// Depending on the nature of the message, we apply success or error classes
				if (data.includes('Success!')) {
					console.log("Success!");

					$( ".ajax-message" ).removeClass( "ajax-error" ).addClass( "ajax-success" );

					//hide form
					$("#contact form").css("display", "none");

				}

				else if (data.includes('Error!')){
					console.log("Errors!");

					$( ".ajax-message" ).removeClass( "ajax-success" ).addClass( "ajax-error" );

				}

				// We display the returned message
				$( ".ajax-message" ).html( data ).show();


				// $( ".ajax-message:contains('Error!')" ).removeClass( "ajax-success" ).addClass( "ajax-error" );
				// $( ".ajax-message:contains('Success!')" ).removeClass( "ajax-error" ).addClass( "ajax-success" );
			}
		);
	});

});
