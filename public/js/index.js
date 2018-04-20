var form = document.querySelector('#poll');

var Option = {
	index: -1,
	addInput: function() {
		this.index++;
		let inputDiv = document.createElement('div');
		inputDiv.setAttribute('class', 'inputDiv');

		let input = document.createElement('input');
		input.setAttribute('name', `option${this.index}`);
		input.setAttribute('type', 'text');
		inputDiv.appendChild(input);

		let button = document.createElement('button');
		button.classList.add('btn', 'btn-default', 'btn-form');
		button.setAttribute('type', 'button');
		button.setAttribute('onclick', 'Option.confirm(event)');
		button.innerHTML = `<i class="fa fa-check"></i>`;
		inputDiv.appendChild(button);

		let buttonRemove = document.createElement('button');
		buttonRemove.classList.add('btn', 'btn-default', 'btn-form');
		buttonRemove.setAttribute('type', 'button');
		buttonRemove.setAttribute('onclick', 'Option.remove(event)');
		buttonRemove.innerHTML = `<i class="fa fa-trash"></i>`;
		inputDiv.appendChild(buttonRemove);

		return inputDiv;
	},
	confirm: function(event) {
		let button = event.target;
		let input = event.target.previousSibling;
		button.nextSibling.disabled = true;
		button.nextSibling.style.filter = 'opacity(0.1)';
		input.readOnly = true;
		input.style.borderTopColor = '#dfc1c1ff';
		button.innerHTML = '<i class="fa fa-edit"></i>';
		button.setAttribute('onclick', 'Option.edit(event)');
	},
	edit: function(event) {
		let button = event.target;
		let input = event.target.previousSibling;
		button.nextSibling.disabled = false;
		button.nextSibling.style.filter = 'opacity(1)';
		input.readOnly = false;
		input.style.borderTopColor = '#dfc1c100';
		button.innerHTML = '<i class="fa fa-check"></i>';
		button.setAttribute('onclick', 'Option.confirm(event)');
	},
	remove: function(event) {
		event.target.parentElement.remove();
	}
};
function submitForm() {
	form.submit();
}
document.querySelector('#newOptionBtn').addEventListener('click', function() {
	form.appendChild(Option.addInput());
});
