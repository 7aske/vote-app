const mongoose = require('mongoose');

const pollSchema = mongoose.Schema({
	pollId: String,
	pollTitle: String,
	pollOptions: [
		{
			optionIndex: Number,
			optionName: String
		}
	],
	pollVotes: [
		{
			voteId: String,
			voteOption: String,
			votePoints: Number
		}
	]
});
module.exports = mongoose.model('Poll', pollSchema);
