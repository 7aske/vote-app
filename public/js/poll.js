let url = new URL(window.location);
let pollId = url.pathname.replace(/[/]/g, '');
let resultContainer = document.querySelector('#resultContainer');
let PollOption = {
	render: function(option, votes) {
		let form = document.createElement('form');
		form.setAttribute('id', option);
		form.setAttribute('action', `${pollId}/${option}`);
		form.setAttribute('method', 'POST');

		let optionName = document.createElement('input');
		optionName.readOnly = true;
		optionName.value = option;

		let label = document.createElement('label');
		label.setAttribute('for', option);
		label.innerHTML = votes;

		let button = document.createElement('button');
		button.classList.add('btn', 'btn-default', 'btn-form', 'btn-vote');
		button.innerHTML = '<i class="fa fa-plus-square"></i>';
		button.setAttribute('type', `submit`);

		form.appendChild(optionName);
		form.appendChild(label);
		form.appendChild(button);
		return form;
	}
};
function requestData() {
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			renderPoll(JSON.parse(this.responseText));
		}
	};
	xhttp.open('GET', '../db/db.json', true);
	xhttp.send();
}
function renderPoll(data) {
	let array = data.polls;
	let result;
	array.forEach(element => {
		if (element.pollId == pollId) {
			result = element;
		}
	});
	console.log(result.pollOptions);
	result.pollOptions.forEach(option => {
		let votes = 0;
		result.pollVotes.forEach(vote => {
			if (vote.voteOption == option.option) {
				votes += vote.votePoints;
			}
		});
		resultContainer.appendChild(PollOption.render(option.option, votes));
	});
}
requestData();
