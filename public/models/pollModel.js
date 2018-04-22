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
// // Set up local database schema
// db
// 	.defaults({
// 		polls: [
// 			{
// 				pollId: '', // Unique poll ID
// 				pollTitle: '', // Poll Title(Question)
// 				pollOptions: [
// 					// Choices in the poll
// 					{
// 						index: 0, // Poll choice index for rendering
// 						optionName: '' // Poll choice name
// 					}
// 				],
// 				pollVotes: [
// 					// Poll votes
// 					{
// 						voteId: '', // Unique user/vote ID
// 						voteOption: '', // Option name
// 						votePoints: 0 // Amount of points per vote, typicaly 1
// 					}
// 				]
// 			}
// 		]
// 	})
// 	.write();
