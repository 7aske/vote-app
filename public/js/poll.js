let url = new URL(window.location);
let pollId = url.pathname.replace(/[/]/g, ''); // Parse the poll ID from the url
let urlText = document.querySelector('#copyUrlText');

// Add the poll address to the copy input for easier sharing
urlText.value = url;
function copyLocation(event) {
	urlText.select(); // Select the text from the input container
	document.execCommand('copy'); // Add the text to the clipboard

	setTimeout(() => {
		urlText.value = 'Link copied!'; // Notify user
	}, 300); // Set timeout to prevent doubleclick errors
	setTimeout(() => {
		urlText.value = url; // Return to original value
	}, 2000);
}
// Constructor function that renders options and visualization bars
function PollOption(option, votes) {
	(this.option = option),
		(this.votes = votes),
		(this.renderOption = function() {
			// Create individual form elements for each of the options for voting
			let form = document.createElement('form');
			form.setAttribute('id', this.option);
			form.setAttribute('action', `${pollId}/${this.option}`); // Submit vote path
			form.setAttribute('method', 'POST');
			form.classList.add('pollForm'); // Styling

			let optionName = document.createElement('input');
			optionName.readOnly = true; // Prevent the options to be edited in poll view
			optionName.value = this.option;

			// Create the label to show the amount of votes per option
			let label = document.createElement('label');
			label.setAttribute('for', this.option);
			label.innerHTML = this.votes;

			// Create the button to to vote
			let button = document.createElement('button');
			button.classList.add('btn', 'btn-default', 'btn-form', 'btn-vote');
			button.innerHTML = '<i class="fa fa-plus-square"></i>';
			button.setAttribute('type', 'submit');

			// Append created elements to the form
			form.appendChild(optionName);
			form.appendChild(label);
			form.appendChild(button);

			// Return the created form
			return form;
		}),
		(this.renderBar = function(voteSum) {
			// Render visualization bars per option
			// Import the parent element width for visualization bar rendering
			let width = document.querySelector('#barsContainer').offsetWidth;

			// Init fillWidth dynamicly as it can have two states
			let fillWidth = voteSum == 0 ? 5 : width / voteSum * this.votes;

			// Crate the visualization bar container
			let bar = document.createElement('div');
			bar.classList.add('bar');
			bar.style.width = width + 'px'; // Set the bar container to the max width

			// Create the text element
			let text = document.createElement('p');
			text.innerHTML = this.option; // Adding the text

			// Crate the fill bar that represents the votes
			let fill = document.createElement('div');
			fill.classList.add('fill'); // Styling
			fill.style.width = fillWidth + 'px'; // Set witdth

			// Add the text and visualization bar to bar container
			bar.appendChild(text);
			bar.appendChild(fill);

			// Return the crated bar container
			return bar;
		});
}

// Rendering the data retrieved from the database
function renderPoll() {
	// Get data written to document
	let data = JSON.parse(document.getElementById('data').innerHTML);

	// Clear contents of the data <div>
	document.getElementById('data').remove();

	// Init sum of all votes used for visualization bar rendering
	let voteSum = 0;

	// Set the title of the page to poll title
	document.querySelector('#title').innerHTML = data.pollTitle;

	// Add vote points together for every option and every vote for that option
	data.pollOptions.forEach(option => {
		data.pollVotes.forEach(vote => {
			if (vote.voteOption == option.optionName) {
				voteSum += vote.votePoints; // Result is the sum of all votes
			}
		});
	});

	// Render each option with its votes using the PollOption creator function
	data.pollOptions.forEach(option => {
		let votes = 0; // Reset the amount of votes after each option iteration
		data.pollVotes.forEach(vote => {
			if (vote.voteOption == option.optionName) {
				votes += vote.votePoints;
			}
		});
		document // Render the option
			.querySelector('#resultContainer')
			.appendChild(new PollOption(option.optionName, votes).renderOption());
		document // Render the option visualization bar
			.querySelector('#barsContainer')
			.appendChild(new PollOption(option.optionName, votes).renderBar(voteSum));
	});
}

// Request the db data once the page has been loaded
document.addEventListener('DOMContentLoaded', renderPoll);
