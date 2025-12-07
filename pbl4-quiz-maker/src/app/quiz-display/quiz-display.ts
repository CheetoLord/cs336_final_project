import { Component, Input } from '@angular/core';

@Component({
  selector: 'quiz-display',
  imports: [],
  template: /*html*/`
    <div class="quiz-display container">
      <h3>{{quiz.title}}</h3>
      <p>Number of Questions: {{quiz.questionCount}}</p>
      <a href="/test"><div class="button quiz-display-button">Take Quiz</div></a>
      <a href="/edit/{{quiz.id}}"><div class="button quiz-display-button">Edit Quiz</div></a>
    </div>
  `,
  styles: /*css*/`
    .quiz-display {
      flex: 0 0 150px;
      margin: 10px;
      padding: 10px;
      border-radius: 10px;
    }

    .quiz-display-button {
      margin-top: 10px;
      padding: 10px;
      border-radius: 5px;
      background-color: var(--dark-elem-bg-color);
      border-color: var(--dark-elem-border-color);
      color: white;
    }

    .quiz-display-button:hover {
      background-color: var(--dark-elem-hover-bg-color);
      border-color: var(--dark-elem-hover-border-color);
      font-weight: bold;
    }
  `,
})
export class QuizDisplay {
  @Input({ required: true }) quiz: any;
}
