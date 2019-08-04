

// Function declaration
function multiply(num1, num2) {
	return num1 * num2;
}

// Function expression
var multiply = function (num1, num2) {
	return num1 * num2;
};


// BOTH WILL GIVE THE CORRECT RESULT

// The function is declared before it is called
function multiply(num1, num2) {
	return num1 * num2;
}
multiply(3, 4); // returns 12


// The function is called before it is declared
multiply(3, 5); // returns 15
function multiply(num1, num2) {
	return num1 * num2;
}



// Calling a function after it's expressed will work
var multiply = function(num1, num2) {
	return num1 * num2;
};
multiply(3, 4); // returns 12


// Calling a function before it's expressed will NOT work
multiply(3, 5); // returns Uncaught TypeError: multiply is not a function
var mulitply = function (num1, num2) {
	return num1 * num2;
};
