import { Component, Input, inject } from '@angular/core';
import { Signal, signal } from '@angular/core';
import { Quizes } from '../quizes';

@Component({
  selector: 'question-display',
  imports: [],
  template: /*html*/`
    <div class="question-display container row-flex">
      <div class="question-display-input-section">
        <label for="question-input">Question</label>
        <input id="question-input" [value]="question" (input)="onQuestionChange($event)">
      </div>
      <div class="question-display-input-section">
        <label for="answer-input">Answer</label>
        <input id="answer-input" [value]="answer" (input)="onAnswerChange($event)">
      </div>
      <div class="question-display-button-holder">
        <div class="button question-delete-button" (click)="delete()">
          <i class="fa-solid fa-trash"></i>
        </div>
      </div>
    </div>
  `,
  styles: /*css*/`
    .question-display {
      flex: 0 0 150px;
      margin: 10px;
      padding: 10px;
      border-radius: 10px;
    }

    .question-delete-button {
      font-size: 25px;
      width: 30px;
      height: 30px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 15px;
      color: #cc0000;
      background-color: var(--dark-elem-bg-color);
      border-color: var(--dark-elem-border-color);
      box-shadow: 2px 2px 4px black;
    }

    .question-delete-button:hover {
      background-color: var(--dark-elem-hover-bg-color);
      border-color: var(--dark-elem-hover-border-color);
      box-shadow: 1.2px 1.2px 3px black;
    }

    .question-display-input-section {
      flex: 2;
      position: relative;
    }

    .question-display-button-holder {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }

    .question-display-input-section label {
      font-size: 20px;
      text-shadow: 2px 2px 4px purple;
      font-weight: bold;
      user-select: none;
    }

    .question-display-input-section input {
      font-size: 18px;
      font-weight: bold;
      width: 80%;
      padding: 5px;
      border: 2px solid black;
      border-radius: 10px;
      background-color: #e0e0e0;
    }
  `,
})
export class QuestionDisplay {
  @Input({ required: true }) questionId!: number;
  @Input({ required: true }) question: any;
  @Input({ required: true }) answer: any;
  @Input({ required: true }) delete: any;

  private quizesService = inject(Quizes);

  onQuestionChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.question = input.value;
    this.quizesService.updateQuestion(this.questionId, this.question, this.answer);
  }

  onAnswerChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.answer = input.value;
    this.quizesService.updateQuestion(this.questionId, this.question, this.answer);
  }
}
