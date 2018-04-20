const express = require('express');
const router = express.Router();
const path = require('path');
const url = require('url');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');

const adapter = new FileSync('./public/db/db.json');
const db = low(adapter);

// db.defaults({
// 	polls: [
// 		{
// 			pollId: '',
// 			pollTitle: '',
// 			pollOptions: [
// 				{
// 					index: 0,
// 					optionName: ''
// 				}
// 			],
// 			pollVotes: [
// 				{
// 					voteId: '',
// 					voteOption: '',
// 					votePoints: 0
// 				}
// 			]
// 		}
// 	]
// });
router.post('/newpoll', (req, res) => {
	console.log(req.body);
	let oInd = -1;
	let id = shortid.generate();
	let options = [];
	for (key in req.body) {
		oInd++;
		options.push({
			index: oInd,
			option: req.body[key]
		});
	}
	let poll = {
		pollId: id,
		pollTitle: '',
		pollOptions: options,
		pollVotes: [
			{
				voteId: '',
				voteOption: '',
				votePoints: 0
			}
		]
	};
	console.log(poll);
	db
		.get('polls')
		.push(poll)
		.write();
	res.redirect('/' + id);
});
router.post('/:pollid/:vote', (req, res) => {
	let id = req.params.pollid;
	let vote = req.params.vote;

	let poll = db
		.get('polls')
		.find({ pollId: id })
		.value();
	let newVotes = poll.pollVotes;
	newVotes.push({
		voteId: shortid.generate(),
		voteOption: vote,
		votePoints: 1
	});
	db
		.get('polls')
		.find({ pollId: id })
		.assign({ pollVotes: newVotes })
		.write();
	res.redirect(`/${id}`);
});
router.get('/', (req, res) => {
	res.render('index');
});
router.get('/:pollid', (req, res) => {
	let id = req.params.pollid;
	let poll = db
		.get('polls')
		.find({ pollId: id })
		.value();
	if (typeof poll != undefined) {
		res.render('poll', {
			pollOptions: poll.pollOptions
		});
	}
});

module.exports = router;
