import { Component, inject, computed, signal } from '@angular/core';
import { Quizes } from '../quizes';
import { QuizDisplay } from '../quiz-display/quiz-display';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search-screen',
  imports: [QuizDisplay, FormsModule],
  template: /*html*/`
    <h1 class="centered title">Welcome to the Quiz Maker!</h1>
    <div class="row-flex centered" style="margin-bottom: 20px;">
      <input type="text" id="quiz-filter-input" name="quiz-filter-input" placeholder="Search for Quizes" [ngModel]="filterstr()" (ngModelChange)="filterstr.set($event)">
    </div>
    <div class="col-flex quiz-container">
      @for (quiz of filteredQuizes(); track $index) {
        <quiz-display [quiz]="quiz"></quiz-display>
      }
      <div class="new-quiz-button container button centered" (click)="popupNewQuizCreation()">
        <h3>Create a New Quiz!</h3>
      </div>
    </div>

    <div class="new-quiz-creation-container">
      <div class="new-quiz-creation-menu">
        <form>
          <h2 class="centered">Create a New Quiz</h2>
          <input type="text" id="quiz-title" name="quiz-title" placeholder="Enter quiz title" [(ngModel)]="title_input">
          <p id="quiz-creation-empty-error" class="centered">Quiz title cannot be blank!</p>
          <div id="quiz-creation-buttons-container" class="row-flex">
            <div id="create-button" class="button" (click)="createNewQuiz()">Create Quiz</div>
            <div id="cancel-button" class="button" (click)="hideNewQuizCreation()">Cancel</div>
          </div>
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
      max-height: 70vh;
      overflow-y: auto;
      scrollbar-color: gray transparent; /* make sure the scrollbar track doesnt clip the border */
    }



    #quiz-filter-input {
      width: 50%;
      padding: 10px;
      border: 2px solid black;
      border-radius: 10px;
      font-size: 16px;
      text-align: center;
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
      top: 30%;
      left: 30%;
      bottom: 30%;
      right: 30%;
      background-color: #dddddd;
      margin: 20px auto;
      padding: 20px;
      border: 4px solid black;
      border-radius: 15px;
    }

    #quiz-title {
      display: block;
      width: 80%;
      margin: 0 auto;
      text-align: center;
      padding: 10px;
      border: 2px solid black;
      border-radius: 10px;
      background-color: #e0e0e0;
      font-size: 20px;
    }

    #quiz-creation-empty-error {
      color: red;
      display: none;
      margin-top: 10px;
      margin-bottom: 0px;
    }

    #quiz-creation-buttons-container {
      margin-top: 10px;
    }

    #create-button, #cancel-button {
      display: inline-block;
      flex: 1;
      padding: 10px;
      border-radius: 10px;
      text-align: center;
      border-color: black;
    }

    #create-button {
      background-color: #4CAF50;
      color: white;
    }

    #cancel-button {
      background-color: #f44336;
      color: white;
    }

    #create-button:hover {
      background-color: #45a049;
      font-weight: bold;
    }

    #cancel-button:hover {
      background-color: #da190b;
      font-weight: bold;
    }

  `,
})
export class SearchScreen {
  quizesService = inject(Quizes);
  quizes = toSignal(this.quizesService.fetchedQuizes$, { initialValue: [] });
  filterstr = signal('');
  
  filteredQuizes = computed(() => {
    const filter = this.filterstr().toLowerCase();
    return this.quizes().filter(quiz => 
      quiz.title.toLowerCase().includes(filter)
    );
  });

  title_input: string = '';

  popupNewQuizCreation() {
    // popup menu
    const container = document.querySelector('.new-quiz-creation-container') as HTMLElement;
    container.style.display = 'block';
    // clear input field
    const titleInput = document.getElementById('quiz-title') as HTMLInputElement;
    titleInput.value = '';
    // hide error message
    const errorMsg = document.getElementById('quiz-creation-empty-error') as HTMLElement;
    errorMsg.style.display = 'none';
  }

  hideNewQuizCreation() {
    const container = document.querySelector('.new-quiz-creation-container') as HTMLElement;
    container.style.display = 'none';
  }

  createNewQuiz() {
    if (this.title_input.trim() === '') {
      const errorMsg = document.getElementById('quiz-creation-empty-error') as HTMLElement;
      errorMsg.style.display = 'block';
      return;
    }
    this.quizesService.newQuiz(this.title_input);
    this.hideNewQuizCreation();
  }
}
