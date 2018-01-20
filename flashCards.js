
exports.BasicCard = function(question, answer) {
	this.userquestion = question;
	this.answer = answer;
}



exports.ClozeCard = function(question, answer) {
	var textToLower = question.toLowerCase();
	var clozeToLower = answer.toLowerCase();

	if (!textToLower.includes(clozeToLower)) {
		console.log('ERROR: cloze-deletion does not appear within full text -- <' + answer + '>');
		return;
	}

	this.question = question;
	this.answer = answer;
	this.userquestion = question.replace(answer, '...');
}
