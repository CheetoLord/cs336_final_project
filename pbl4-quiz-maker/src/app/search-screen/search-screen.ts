import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Quizes } from '../quizes';

@Component({
  selector: 'app-search-screen',
  imports: [AsyncPipe, RouterLink, FormsModule],
  template: /*html*/`
    <div class="app-container">
      <h1 class="hero-title">Welcome to the Quiz Maker</h1>
      <div class="top-actions">
        <button class="button" (click)="openCreate()">Create New +</button>
      </div>
      <div>
        @for (category of (categories$ | async); track $index) {
          <details class="dropdown">
            <summary>{{ category }}</summary>
            <div class="cards-grid">
              @for (quiz of (quizes | async); track $index) {
                @if ((quiz.category ?? 'My Quizzes') === category) {
                  <div class="card">
                    <h3>{{ quiz.title }}</h3>
                    <p>Number of Questions: {{ quiz.questionCount }}</p>
                    <div class="actions">
                      <a routerLink="/test" class="button">Take Quiz</a>
                      <button class="btn-secondary">Edit Quiz</button>
                    </div>
                  </div>
                }
              }
            </div>
          </details>
        }
      </div>

      @if (showCreate()) {
        <div class="modal-backdrop" (click)="closeCreate()">
          <div class="modal-card" (click)="$event.stopPropagation()">
            <h3>Create a New Quiz</h3>
            <form (ngSubmit)="onCreateQuiz()">
              <div style="margin-bottom:10px;">
                <label for="title">Title</label><br />
                <input id="title" name="title" [(ngModel)]="newQuizTitle" placeholder="e.g., Web Dev" required />
              </div>
              <div style="margin-bottom:10px;">
                <label for="category">Category</label><br />
                <select id="category" name="category" [(ngModel)]="selectedCategory">
                  @for (category of (categories$ | async); track $index) {
                    <option [value]="category">{{ category }}</option>
                  }
                  <option value="__new__">Create new category…</option>
                </select>
              </div>
              @if (selectedCategory === '__new__') {
                <div style="margin-bottom:10px;">
                  <label for="newCat">New Category Name</label><br />
                  <input id="newCat" name="newCat" [(ngModel)]="newCategoryName" placeholder="e.g., Frontend" />
                </div>
              }
              <div class="actions">
                <button type="submit">Add Quiz</button>
                <button type="button" class="btn-secondary" (click)="closeCreate()">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class SearchScreen {
  quizesService = inject(Quizes);
  quizes = this.quizesService.fetchedQuizes$;

  // Derived categories from quiz data, defaulting to "My Quizzes" when missing
  categories$: Observable<string[]> = this.quizes.pipe(
    map(list => {
      const cats = new Set<string>();
      cats.add('My Quizzes');
      list?.forEach(q => cats.add(q.category ?? 'My Quizzes'));
      return Array.from(cats);
    })
  );

  // Form state
  newQuizTitle = '';
  selectedCategory = 'My Quizzes';
  newCategoryName = '';
  showCreate = signal(false);

  async onCreateQuiz() {
    const chosenCategory = this.selectedCategory === '__new__'
      ? (this.newCategoryName?.trim() || 'My Quizzes')
      : this.selectedCategory;

    await this.quizesService.addQuiz(this.newQuizTitle.trim(), chosenCategory);
    this.resetForm();
    this.closeCreate();
  }

  resetForm() {
    this.newQuizTitle = '';
    this.selectedCategory = 'My Quizzes';
    this.newCategoryName = '';
  }

  openCreate() {
    this.showCreate.set(true);
  }

  closeCreate() {
    this.showCreate.set(false);
  }
}
<<<<<<< HEAD
import { Component, inject, computed, signal } from '@angular/core';
=======
import { Component, inject, signal } from '@angular/core';
import { Route, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
>>>>>>> 1deee4f (updated UI and functionality)
import { Quizes } from '../quizes';
import { QuizDisplay } from '../quiz-display/quiz-display';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search-screen',
<<<<<<< HEAD
  imports: [QuizDisplay, FormsModule],
  template: /*html*/`
    <h1 class="centered title">Welcome to the Quiz Maker!</h1>
    <div class="row-flex centered" style="margin-bottom: 20px;">
      <input type="text" id="quiz-filter-input" name="quiz-filter-input" placeholder="Search for Quizes" [ngModel]="filterstr()" (ngModelChange)="filterstr.set($event)">
    </div>
    <div class="col-flex quiz-container">
      @for (quiz of filteredQuizes(); track $index) {
        <quiz-display [quiz]="quiz"></quiz-display>
=======
  imports: [AsyncPipe, RouterLink, FormsModule],
  template: /*html*/`
    <div class="app-container">
      <h1 class="hero-title">Welcome to the Quiz Maker</h1>
      <div class="top-actions">
        <button class="button" (click)="openCreate()">Create New +</button>
      </div>
      <div>
        @for (category of (categories$ | async); track $index) {
          <details class="dropdown">
            <summary>{{ category }}</summary>
            <div class="cards-grid">
              @for (quiz of (quizes | async); track $index) {
                @if ((quiz.category ?? 'My Quizzes') === category) {
                  <div class="card">
                    <h3>{{ quiz.title }}</h3>
                    <p>Number of Questions: {{ quiz.questionCount }}</p>
                    <div class="actions">
                      <a routerLink="/test" class="button">Take Quiz</a>
                      <button class="btn-secondary">Edit Quiz</button>
                    </div>
                  </div>
                }
              }
            </div>
          </details>
        }
      </div>

      @if (showCreate()) {
        <div class="modal-backdrop" (click)="closeCreate()">
          <div class="modal-card" (click)="$event.stopPropagation()">
            <h3>Create a New Quiz</h3>
            <form (ngSubmit)="onCreateQuiz()">
              <div style="margin-bottom:10px;">
                <label for="title">Title</label><br />
                <input id="title" name="title" [(ngModel)]="newQuizTitle" placeholder="e.g., Web Dev" required />
              </div>
              <div style="margin-bottom:10px;">
                <label for="category">Category</label><br />
                <select id="category" name="category" [(ngModel)]="selectedCategory">
                  @for (category of (categories$ | async); track $index) {
                    <option [value]="category">{{ category }}</option>
                  }
                  <option value="__new__">Create new category…</option>
                </select>
              </div>
              @if (selectedCategory === '__new__') {
                <div style="margin-bottom:10px;">
                  <label for="newCat">New Category Name</label><br />
                  <input id="newCat" name="newCat" [(ngModel)]="newCategoryName" placeholder="e.g., Frontend" />
                </div>
              }
              <div class="actions">
                <button type="submit">Add Quiz</button>
                <button type="button" class="btn-secondary" (click)="closeCreate()">Cancel</button>
              </div>
            </form>
          </div>
        </div>
>>>>>>> 1deee4f (updated UI and functionality)
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
<<<<<<< HEAD

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
=======
  styles: ``,
})
export class SearchScreen {
  quizesService = inject(Quizes);
  quizes = this.quizesService.fetchedQuizes$;

  // Derived categories from quiz data, defaulting to "My Quizzes" when missing
  categories$: Observable<string[]> = this.quizes.pipe(
    map(list => {
      const cats = new Set<string>();
      cats.add('My Quizzes');
      list?.forEach(q => cats.add(q.category ?? 'My Quizzes'));
      return Array.from(cats);
    })
  );

  // Form state
  newQuizTitle = '';
  selectedCategory = 'My Quizzes';
  newCategoryName = '';
  showCreate = signal(false);

  async onCreateQuiz() {
    const chosenCategory = this.selectedCategory === '__new__'
      ? (this.newCategoryName?.trim() || 'My Quizzes')
      : this.selectedCategory;

    await this.quizesService.addQuiz(this.newQuizTitle.trim(), chosenCategory);
    this.resetForm();
    this.closeCreate();
  }

  resetForm() {
    this.newQuizTitle = '';
    this.selectedCategory = 'My Quizzes';
    this.newCategoryName = '';
  }

  openCreate() {
    this.showCreate.set(true);
  }

  closeCreate() {
    this.showCreate.set(false);
>>>>>>> 1deee4f (updated UI and functionality)
  }
}
