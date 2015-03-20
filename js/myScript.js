`/**
 * Created by Austin on 1/22/15.
 */


function Quiz() {
    this.step = 0;
    this.answerArray = [];
    this.score = 0;
    this.answers = [];
    this.chx = document.getElementsByTagName('input');


    this.questionSwap = function () {
        document.getElementById('question').innerHTML = allQuestions[this.step].question;
        document.getElementById('answer0').innerHTML = allQuestions[this.step].choices[0];
        document.getElementById('answer1').innerHTML = allQuestions[this.step].choices[1];
        document.getElementById('answer2').innerHTML = allQuestions[this.step].choices[2];
        document.getElementById('answer3').innerHTML = allQuestions[this.step].choices[3];
    };

    this.showScore = function() {
        if(this.step===18) {
            this.calculateScore();
            document.getElementById('question').innerHTML = "User Score";
            document.getElementById('answer0').innerHTML = "Amount Correct";
            document.getElementById('answer1').innerHTML = "Amount InCorrect";
            document.getElementById('answer2').innerHTML = "Percent Correct";
            document.getElementById('answer3').innerHTML = "";
            document.getElementById("0").type = "text";
            document.getElementById("0").value = this.score;
            document.getElementById("1").type = "text";
            document.getElementById("1").value = 19 - this.score;
            document.getElementById("2").type = "text";
            document.getElementById("2").value = this.score / 19 * 100 + "%";
            document.getElementById("3").type = "text";
            document.getElementById("3").value = "";
        }
    };
    //checks if the answer submitted is correct, if it is the users score goes up
    //j keeps track of how many radio buttons weren't selected, if all 4 aren't selected
    //then the user is alerted to click one and the question is redone
    //All radio buttons are deselected before function finishes and next question is loaded

    this.calculateScore = function() {
        for (var i = 0;i<this.answerArray.length;i++) {
            this.score+=this.answerArray[i];
        }
    };

    this.checkAnswer = function() {
        for(var i = 0; i<this.chx.length-2;i++) {
            if(this.chx[i].checked) {
                if(allQuestions[this.step].correctAnswer ===i) {
                    this.answerArray.push(1);
            } else this.answerArray.push(0);
            }
        }
    };
    this.trackAnswers = function() {
        for(var i = 0;i<this.chx.length-2;i++) {
            if(this.chx[i].checked) {
                this.answers.splice(this.step,1,i);
                console.log(this.answers);
            }
        }
    };

    this.didAnswer = function() {
        for(var i = 0, j=0;i<this.chx.length-2;i++) {
            if(this.chx[i].checked === false) {
                j++;
            }
        }
        if(j===4) {
            alert("You must click at least one answer");
            quiz.step--;
        }
    };

    this.clearRadio = function() {
        for (var i=0; i<this.chx.length-2; i++) {
            this.chx[i].checked = false;
        }
    };


    this.reCheckRadio = function() {
        for(var i = 0;i<this.chx.length-2;i++) {
            if(i === this.answers[this.step]) {
                this.chx[i].checked = true;
            }
        }
    };
};

var quiz = new Quiz();
quiz.questionSwap();

var backQuestion = function() {
    if(quiz.step===0) {
        alert("You are at the beginning, you can't go back any further");
    } else {
        quiz.step--;
        quiz.answerArray.pop();
        quiz.questionSwap();
        quiz.reCheckRadio();
    }

};

var nextQuestionTrigger = function() {
    quiz.didAnswer();
    quiz.trackAnswers();
    quiz.checkAnswer();
    quiz.showScore();
    quiz.step++;
    //console.log("forward" + quiz.step)
    quiz.clearRadio();
    quiz.questionSwap();
    quiz.reCheckRadio();
};

document.getElementById("next").addEventListener("click", function () {
    $(".main-area").fadeOut(300,function() {
        nextQuestionTrigger();
        $(".main-area").fadeIn(300)
    });

});
document.getElementById("back").addEventListener("click", function() {
    $(".main-area").fadeOut(300, "swing", function () {
        backQuestion();
        $(".main-area").fadeIn(300, "swing")
    });
});