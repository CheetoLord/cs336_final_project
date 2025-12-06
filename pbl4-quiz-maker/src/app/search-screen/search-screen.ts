import { Component, inject } from '@angular/core';
import { Route } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Quizes } from '../quizes';

@Component({
  selector: 'app-search-screen',
  imports: [AsyncPipe],
  template: /*html*/`
    <h1 class="centered">Welcome to the Quiz Maker!</h1>
    <div class="col-flex">
      @for (quiz of (quizes | async); track $index) {
        <div class="quiz-display container">
          <h3>{{quiz.title}}</h3>
          <p>Number of Questions: {{quiz.questionCount}}</p>
          <a href="/test"><div class="button">Take Quiz</div></a>
          <a href="/edit/{{quiz.id}}"><button>Edit Quiz</button></a>
        </div>
      }
    </div>
  `,
  styles: /*css*/`
    .quiz-display {
      flex: 0 0 150px;
      margin: 10px;
      padding: 10px;
      border-radius: 10px;
    }
  `,
})
export class SearchScreen {
  quizesService = inject(Quizes);
  quizes = this.quizesService.fetchedQuizes$;
}
