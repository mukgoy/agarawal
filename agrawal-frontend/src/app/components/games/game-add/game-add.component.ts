import { Component } from '@angular/core';

@Component({
  selector: 'app-game-add',
  templateUrl: './game-add.component.html',
  styleUrls: ['./game-add.component.scss'],
})
export class GameAddComponent {
  num1: number = 0; 
  num2: number = 0;
  score = 0;
  maxScore = 0;
  question = "";
  answer = "";
  result = "";
  correctAnswer = 0;


  constructor() {
  }

  ngOnInit() {
    this.generateQuestion();
  }

  generateQuestion() {
    this.num1 = Math.floor(Math.random() * 10); // 0-9
    this.num2 = Math.floor(Math.random() * 10);
    this.question = this.num1 + " + " + this.num2;
    this.answer = "";
    this.result = "";
  }

  checkAnswer() {
    // debugger;
    if(!this.answer){
      return;
    }
    
    let userAnswer = parseInt(this.answer);
    this.correctAnswer = this.num1 + this.num2;

    this.maxScore++;
    if (userAnswer === this.correctAnswer) {
      this.result = "green";
      this.score++;
    } else {
      this.result = "red";
    }
  }

}
