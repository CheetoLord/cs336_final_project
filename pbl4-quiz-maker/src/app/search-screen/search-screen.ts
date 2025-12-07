import { Component, inject } from '@angular/core';
import { Route } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Quizes } from '../quizes';
import { QuizDisplay } from '../quiz-display/quiz-display';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-screen',
  imports: [AsyncPipe, QuizDisplay, FormsModule],
  template: /*html*/`
    <h1 class="centered">Welcome to the Quiz Maker!</h1>
    <div class="col-flex quiz-container">
      @for (quiz of (quizes | async); track $index) {
        <quiz-display [quiz]="quiz"></quiz-display>
      }
      <div class="new-quiz-button container button centered" (click)="popupNewQuizCreation()">
        <h3>Create a New Quiz!</h3>
      </div>
    </div>

    <div class="new-quiz-creation-container">
      <div class="new-quiz-creation-menu">
        <form (submit)="createNewQuiz()">
          <h2>Create a New Quiz</h2>
          <label for="quiz-title">Quiz Title:</label><br>
          <input type="text" id="quiz-title" name="quiz-title" [(ngModel)]="title_input"><br><br>
          <input type="submit" value="Create Quiz">
          <button type="button" (click)="hideNewQuizCreation()">Cancel</button>
        </form>
      </div>
    </div>
  `,

  styles: /*css*/`

    .quiz-container {
      width: 60%;
      margin: 0 auto;
      padding: 20px;
      border: 4px solid black;
      border-radius: 15px;
      background-color: #f0f0f0;
      max-height: 80vh;
      overflow-y: auto;
    }



    .new-quiz-button {
      margin: 10px;
      padding: 10px;
      border-radius: 10px;
    }



    .new-quiz-creation-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(5px);
      display: none;
    }

    .new-quiz-creation-menu {
      position: absolute;
      top: 20%;
      left: 20%;
      bottom: 20%;
      right: 20%;
      background-color: #dddddd;
      margin: 20px auto;
      padding: 20px;
      border: 4px solid black;
      border-radius: 15px;
    }

    #quiz-title {
      width: 80%;
      margin: 0 auto;
      text-align: center;
      padding: 10px;
      border: 2px solid black;
      border-radius: 10px;
      background-color: #e0e0e0;
    }

  `,
})
export class SearchScreen {
  quizesService = inject(Quizes);
  quizes = this.quizesService.fetchedQuizes$;

  title_input: string = '';

  popupNewQuizCreation() {
    const container = document.querySelector('.new-quiz-creation-container') as HTMLElement;
    container.style.display = 'block';
    const titleInput = document.getElementById('quiz-title') as HTMLInputElement;
    titleInput.value = '';
  }

  hideNewQuizCreation() {
    const container = document.querySelector('.new-quiz-creation-container') as HTMLElement;
    container.style.display = 'none';
  }

  createNewQuiz() {
    this.quizesService.newQuiz(this.title_input);
    this.hideNewQuizCreation();
  }
}
