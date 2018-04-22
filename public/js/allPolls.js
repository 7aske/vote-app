function renderPolls() {
	let data = JSON.parse(document.getElementById('data').innerHTML);
	console.log(data);
	data.forEach(element => {
		let links = document.getElementById('links');

		let link = document.createElement('div');
		link.setAttribute('id', element.pollId);
		link.classList.add('linkContainer');
		link.innerHTML = `<span class="nameText">${
			element.pollTitle
		}</span><span class="voteText">Votes: ${element.pollVotes.length}</span>`;

		let linkContainer = document.createElement('a');
		linkContainer.setAttribute('href', `/${element.pollId}`);
		linkContainer.classList.add('link');
		linkContainer.appendChild(link);

		links.appendChild(linkContainer);
	});
}

renderPolls();
