// Object literal that creates input tags for adding new options
let Option = {
	index: 0, // Starting index of the first option
	addInput: function() {
		// Crate the parent element for the input and remove button
		let inputDiv = document.createElement('div');
		inputDiv.setAttribute('class', 'inputDiv');

		// Create the input element
		let input = document.createElement('input');
		input.setAttribute('name', `option${this.index}`); // Add a unique index
		input.setAttribute('type', 'text'); // Require the input to be text
		input.setAttribute('placeholder', 'Option'); // Add a placeholder to inform the user
		input.required = true; // Set the input to be required
		inputDiv.appendChild(input); // Add the input the parent div

		// Create the remove button
		let buttonRemove = document.createElement('button');
		buttonRemove.classList.add('btn', 'btn-form');
		buttonRemove.setAttribute('type', 'button'); // Prevent button from submiting the form
		buttonRemove.setAttribute('onclick', 'Option.removeRemove(event)'); // Add functionality
		buttonRemove.innerHTML = `<i class="fa fa-trash"></i>`; // Trashcan icon
		inputDiv.appendChild(buttonRemove); // Add the button to the parent div

		this.index++; // Increase the index
		return inputDiv; // Return the created div with input and button elements
	},
	removeRemove: function(event) {
		// Removing the option from the form
		event.target.parentElement.remove();
	}
};

// Render new options
document.querySelector('#newOptionBtn').addEventListener('click', function() {
	let form = document.querySelector('#poll');
	form.appendChild(Option.addInput()); // addInput function returns a HTML element
});
