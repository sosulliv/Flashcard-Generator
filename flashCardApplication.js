// Require the 'inquirer' package
var inquirer = require('inquirer');

// Import the flash cards constructor implementations
var flashCards = require('./flashCards.js');
// Import the full list of questions
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
            console.log('Correct!');
            answerRight++;
        } else {
            console.log('Incorrect!');
            answerWrong++;
        }

        console.log(questionsArray[currentQuestion].answer);
        console.log('-------------------------------------\n');

        if (currentQuestion < questionsArray.length - 1) {
            currentQuestion++;
            askQuestion();
        } else {
            console.log('Game Over!');
            console.log('Correct Answers: ' + answerRight);
            console.log('Incorrect Answers: ' + answerWrong);

            console.log('-------------------------------------\n');

            inquirer.prompt([{
                type: 'confirm',
                message: 'Would you like to play again?',
                name: 'playAgain'
            }]).then(function(answers) {
                if (answers.playAgain) {
                    currentQuestion = 0;
                    answerRight = 0;
                    answerWrong = 0;

                    askQuestion();
                } else {
                    console.log('Thanks for playing! Goodbye!');
                }
            })
        }
    })
}


if (args[2] === "add") {

    console.log(args[2]);

    var createQuestion = new createQuestion.createQuestion(file, args[3], args[4], args[5]);


} else if (args[2] === "game") {

   // console.log(args[2]);

    if (args[3] === "basic") {

       // console.log(args[3]);

        for (var i = 0; i < questions.basic.length; i++) {
            var q = new flashCards.BasicCard(questions.basic[i].question, questions.basic[i].answer);
            questionsArray.push(q);
        }

        askQuestion();


    } else if (args[3] === "cloze") {

        //console.log(args[3]);

        for (var i = 0; i < questions.cloze.length; i++) {
            var q = new flashCards.ClozeCard(questions.cloze[i].question, questions.cloze[i].answer);
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

// Begin asking the questions!
