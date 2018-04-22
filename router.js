// Importing basic dependencies
const express = require('express');
const path = require('path');
const url = require('url');

// Import the SHA1 hashing algorithm and random id generator
const sha1 = require('sha1');
const shortid = require('shortid');

// Initialize mongoose mongodb atlas
const mongoose = require('mongoose');
const Poll = require('./public/models/pollModel');

// Initialize the express router
const router = express.Router();

// Landing page route
router.get('/', (req, res) => {
	res.render('index');
});

// GET access to the database JSON file for testing
router.get('/allpolls', (req, res) => {
	Poll.find({})
		.exec()
		.then(result =>
			res.render('allpolls', {
				body: JSON.stringify(result)
			})
		);
});

// Basic ID based route to individual polls
router.get('/:pollid', (req, res) => {
	// Get the requested poll ID from the URL
	let id = req.params.pollid;
	let query = {
		pollId: id
	};
	// Query the database for the poll
	Poll.findOne(query)
		.exec()
		.then(poll => {
			console.log(poll);
			if (typeof poll != 'undefined') {
				//let options = poll.pollOptions;
				res.render('poll', {
					body: JSON.stringify(poll)
				});
			} else {
				res.redirect('/');
			}
		})
		.catch(err => {
			console.log(err);
		});
});

// Route for submitting new polls
router.post('/newpoll', (req, res) => {
	let oInd = 0; // Option index propery for database manipluation
	let id = shortid.generate(); // Generating a unique poll ID
	let options = []; // Poll options array that will be pushed to the database

	// Iterating over body key:value pairs
	for (key in req.body) {
		if (key != 'title') {
			// First key:value pair in body is the title so we are skipping it
			options.push({
				// Adding each of the sent options to the array
				optionIndex: oInd,
				optionName: req.body[key]
			});
			oInd++;
		}
	}

	let poll = new Poll({
		pollId: id,
		pollTitle: req.body.title,
		pollOptions: options,
		pollVotes: []
	});
	poll
		.save()
		.then(result => console.log(result))
		.catch(err => console.log(err));
	res.redirect('/' + id);
});

// Route for submiting votes
router.post('/:pollid/:vote', (req, res) => {
	// Parsing the poll ID and the vote from the url
	let id = req.params.pollid;
	let vote = req.params.vote;

	// Hashing the users IP address to ensure db privacy
	let hash = sha1(req.ip);

	// Define query params
	let query = {
		pollId: id
	};

	// Query the database for the given poll
	let newVotes = new Array();
	let newVote = {
		voteId: hash,
		voteOption: vote,
		votePoints: 1
	};
	let poll = new Object();
	Poll.findOne({ pollId: id })
		.exec()
		.then(result => {
			newVotes = result.pollVotes;
		});
	newVotes.push({
		voteId: hash,
		voteOption: vote,
		votePoints: 1
	});
	Poll.update({ pollId: id }, { $push: { pollVotes: newVote } })
		.exec()
		.then(
			setTimeout(() => {
				res.redirect(`/${id}`);
			}, 200)
		);
});

module.exports = router;
