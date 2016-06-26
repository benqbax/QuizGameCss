var questionArea = document.getElementById('questions');
var alternatives = {
	alt1 : document.getElementById('alt1'),
	alt2 : document.getElementById('alt2'),
	alt3 : document.getElementById('alt3')
}

alternatives.alt1.addEventListener('click', function(){
			checkGuess(0, questions[current]);
});


alternatives.alt2.addEventListener('click', function(){
			checkGuess(1, questions[current]);
});

alternatives.alt3.addEventListener('click', function(){
			checkGuess(2, questions[current]);
});

var replayArea = document.getElementById('replay');



var numOfRight = 0;
var current = 0;

var questions = new Array();

createQuestion('What is Canadas national animal?' , ['Beaver', 'Duck', 'Horse'], 0);
createQuestion( 'What is converted into alcohol during brewing?' , ['Grain', 'Sugar' , 'Water'], 1);
createQuestion( 'In what year was Prince Andrew born? ' , ['1955', '1960', '1970'], 1);


// constructor function
function Question(question, alternatives, correct){
    this.question = question;
    this.alternatives = alternatives;
    this.correct = correct;
}
// returns the question
Question.prototype.getQuestion = function() {
	return this.question;
};

// returns the correct alternative
Question.prototype.getCorrect = function(){
	return this.alternatives[this.correct];
};

// returns the alternatives
Question.prototype.getAlternatives = function() {
	return this.alternatives;
};

//pushes new question to question list
function createQuestion(question, alternatives, correct){
	var instance = new Question(question, alternatives, correct);
	questions.push(instance);
}

//loads the question to questionarea
function loadQuestion(curr){

	var question = questions[curr];
	console.log("current is now", current);
	console.log(question.getQuestion())
	
	questionArea.innerHTML=" ";
	questionArea.innerHTML=question.getQuestion();
}

//loads the alternatives to alterative area
function loadAlt(curr){
	
	var question = questions[curr];

	alternatives.alt1.innerHTML=" ";
	alternatives.alt1.innerHTML= question.getAlternatives()[0];
	
	alternatives.alt2.innerHTML=" ";
	alternatives.alt2.innerHTML= question.getAlternatives()[1];

	alternatives.alt3.innerHTML=" ";
	alternatives.alt3.innerHTML= question.getAlternatives()[2];
	
}

//load next

function checkGuess(guess,question){
	
		
		var correctAnswer = question.getCorrect();
		var guessAnswer = question.alternatives[guess]
		console.log("The correct answer is:", correctAnswer);
		console.log("You answered:", guessAnswer);
		if(guessAnswer === correctAnswer){
			numOfRight +=1;
			console.log("Correct");
			
		}
		else{
			console.log("Wrong");
		}


		if (current < questions.length-1){
			current +=1;
			loadQuestion(current);
			loadAlt(current);
		}
		else{
			questionArea.innerHTML="You have answered all the questions";

			var createButton = document.createElement('div');
			var text = document.createTextNode("Replay");
			createButton.appendChild(text);


			var done = document.createElement('div');
			var donetext = document.createTextNode(numOfRight + " out off "+questions.length + " questions correct");
			done.appendChild(donetext);
			done.id = "done"

			createButton.id = "replaymatch"
			createButton.addEventListener('click', function(){
				replay();
			});
			replayArea.appendChild(done);
			replayArea.appendChild(createButton);

			alternatives.alt1.innerHTML = "";
			alternatives.alt2.innerHTML = "";
			alternatives.alt3.innerHTML = "";


	
	}
	
};

function replay(){
	
	
	current = 0;
	numOfRight = 0;
	loadQuestion(current);
	loadAlt(current);
	replayArea.innerHTML="";
	
}


window.onload = function(){
	loadQuestion(current);
	loadAlt(current)

};