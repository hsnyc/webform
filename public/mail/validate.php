<?php
/*****************************************************************************
/* If nothing is posted then we exit */
/****************************************************************************/
if (!$_POST) {
	die("This file cannot be accessed directly!");
}



/*****************************************************************************
/* Define regular expression patterns */
/****************************************************************************/
$expEmail = 			'/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/';
$expLettersOnly = 		'/^[a-zA-Z ]+$/';
$expLettersNumbers = 	'/^[a-zA-Z0-9]*$/';



/**************************************************************************************
/* Define the function for checking the field length */
/*************************************************************************************/
function validateLength($fieldValue, $minLength) {
	return (strlen(trim($fieldValue)) > $minLength);
}



/***********************************************************************************************/
/* Get the posted field values and validate each field */
/***********************************************************************************************/
$name 				= $_POST["name"];
$email 				= $_POST["email"];
$message			= $_POST["message"];

$errorExists 		= false;
$errors 			= "Errors: <ul>";

// Name
if ($name == "" || $name == null) {
	$errorExists = true;
	$errors .= "<li>Please enter a name!</li>";
}

elseif (preg_match($expLettersOnly, $name) !== 1) {
	$errorExists = true;
	$errors .= "<li>The name can only contain letters and spaces!</li>";
}

// Email
if ($email == "" || $email == null) {
	$errorExists = true;
	$errors .= "<li>Please enter an email!</li>";
}

elseif (preg_match($expEmail, $email) !== 1) {
	$errorExists = true;
	$errors .= "<li>The email address format is invalid!</li>";
}

// message
if ($message == "" || $message == null) {
	$errorExists = true;
	$errors .= "<li>Please enter a message!</li>";
}

// If no errors, echo the results
if (!$errorExists) {

	//process mail
	include 'processmail.php';

	if ($mailSent) {

		echo "<h3>Success! The form has been submitted!</h3>"
			. "<p>Details:</p>"
			. "<ul>"
			. "<li>Name: $name</li>"
			. "<li>Email: $email</li>"
			. "<li>Message: $message</li>"
			. "</ul>";

		// header('Location: thank-you.php');
		exit;
	}




} else {
	echo "<h3>Error! Please address the following issues:</h3>"
		. $errors;
}
?>
