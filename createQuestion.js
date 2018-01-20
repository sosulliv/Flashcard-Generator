var fs = require('fs');

exports.createQuestion = function (file, questiontype, question, answer){

	console.log(file+ questiontype+ question+ answer);
fs.readFile(file, 'utf-8', function(err, data) {
	if (err) throw err

	var arrayOfObjects = JSON.parse(data);

   //console.log(arrayOfObjects.questiontype);


    if (questiontype==="cloze") {

     arrayOfObjects.cloze.push(

     	{"question": question,
	"answer":answer}




) 
      } else if (questiontype==="basic") {

      arrayOfObjects.basic.push(

     	{"question": question,
	"answer":answer}



);

      } else { 
      	console.log("please enter a question type of basic or cloze");

      } 


	fs.writeFile(file, JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
		if (err) throw err
		console.log('Done!')
	})
})

 };



//appendJsonToFile("question.json", "basic", "Who am I?", "Sean");