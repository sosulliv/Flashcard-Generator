var inquirer = require('inquirer');

var cards = require('./cards.js');

var questions = require('./question.json');

var createQuestion = require('./createQuestion.js');

var file = "question.json";

var questionsArray = [];

var args = process.argv;


var currentQuestion = 0;
var answerRight = 0;
var answerWrong = 0;

function askQuestion() {
    inquirer.prompt([{
        type: 'input',
        message: questionsArray[currentQuestion].userquestion + '\nAnswer: ',
        name: 'userGuess'
    }]).then(function(answers) {
        console.log('\n');

        if (answers.userGuess.toLowerCase() === questionsArray[currentQuestion].answer.toLowerCase()) {
            console.log('Correct');
            answerRight++;
        } else {
            console.log('Wrong');
            answerWrong++;
        }

        console.log(questionsArray[currentQuestion].answer);
        console.log('--------------------------------------------------------------------------------\n');

        if (currentQuestion < questionsArray.length - 1) {
            currentQuestion++;
            askQuestion();
        } else {
            console.log('End Game');
            console.log('Correct Answers: ' + answerRight);
            console.log('Incorrect Answers: ' + answerWrong);

        console.log('--------------------------------------------------------------------------------\n');

            inquirer.prompt([{
                type: 'confirm',
                message: 'Play Again?',
                name: 'playAgain'
            }]).then(function(answers) {
                if (answers.playAgain) {
                    currentQuestion = 0;
                    answerRight = 0;
                    answerWrong = 0;

                    askQuestion();
                } else {
                    console.log('Good Riddance');
                }
            })
        }
    })
}


if (args[2] === "add") {

    console.log(args[2]);

    var createQuestion = new createQuestion.createQuestion(file, args[3], args[4], args[5]);


} else if (args[2] === "game") {


    if (args[3] === "basic") {


        for (var i = 0; i < questions.basic.length; i++) {
            var q = new cards.BasicCard(questions.basic[i].question, questions.basic[i].answer);
            questionsArray.push(q);
        }

        askQuestion();


    } else if (args[3] === "cloze") {


        for (var i = 0; i < questions.cloze.length; i++) {
            var q = new cards.ClozeCard(questions.cloze[i].question, questions.cloze[i].answer);
            questionsArray.push(q);
        }

        askQuestion();
    } else {

        console.log("To play please choose a question type");
        console.log("For easy: type basic into index 3");
        console.log("For hard: type cloze into index 3");
    }
} else {
    console.log("To add a question please type add in index 2");
    console.log("To play game please type game in index 2");
}

