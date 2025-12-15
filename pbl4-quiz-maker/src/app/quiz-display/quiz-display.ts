import { Component, Input } from '@angular/core';

@Component({
  selector: 'quiz-display',
  imports: [],
  template: /*html*/`
    <div class="quiz-display container row-flex">
      <div id="quiz-display-info-holder">
        <h3>{{quiz.title}}</h3>
        <p>{{qCountStr()}}</p>
      </div>
      <div id="quiz-display-button-holder">
        <div class="button quiz-display-button" id="edit-quiz-button" (click)="goToEditScreen(quiz.id)">
          <i class="fa-solid fa-pen"></i>
        </div>
        <div class="button quiz-display-button" id="take-quiz-button" (click)="goToTakeScreen(quiz.id)">
          <i class="fa-solid fa-play"></i>
        </div>
      </div>
    </div>
  `,
  styles: /*css*/`
    .quiz-display {
      flex: 0 0 150px;
      margin: 10px;
      padding: 10px;
      border-radius: 10px;
    }

    #edit-quiz-button, #take-quiz-button {
      font-size: 30px;
      width: 40px;
      height: 40px;
      margin-right: 20px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 15px;
    }

    .quiz-display-button {
      margin-top: 10px;
      padding: 10px;
      border-radius: 5px;
      background-color: var(--dark-elem-bg-color);
      border-color: var(--dark-elem-border-color);
      color: white;
      box-shadow: 2px 2px 4px black;
    }

    .quiz-display-button:hover {
      background-color: var(--dark-elem-hover-bg-color);
      border-color: var(--dark-elem-hover-border-color);
      font-weight: bold;
      box-shadow: 1.2px 1.2px 3px black;
    }

    #quiz-display-info-holder {
      flex: 1;
    }

    #quiz-display-button-holder {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    #quiz-display-info-holder h3 {
      font-size: 28px;
      text-shadow: 2px 2px 4px purple;
    }

    #quiz-display-info-holder p {
      font-size: 20px;
      font-weight: bold;
    }
  `,
})
export class QuizDisplay {
  @Input({ required: true }) quiz: any;

  qCountStr(): string {
    const qCount = this.quiz.questions.split(",").length;
    console.log('Quiz ID:', this.quiz.id, this.quiz.questions.split(","), this.quiz.questions);
    if (this.quiz.questions === '') {
      return 'No Questions';
    }
    if (qCount === 1) {
      return '1 Question';
    }
    return `${qCount} Questions`;
  }


  goToEditScreen(quizId: string): void {
    window.location.href = `/edit/${quizId}`;
  }

  goToTakeScreen(quizId: string): void {
    window.location.href = `/test/${quizId}`;
  }
}
