import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionDisplay } from '../question-display/question-display';
import { Quizes } from '../quizes';
import { deleteUser } from '@angular/fire/auth';

@Component({
  selector: 'app-edit-screen',
  imports: [QuestionDisplay],
  template: /*html*/`
    <div id="back-button" class="button" (click)="goToSearchScreen()">
      <i class="fa-solid fa-arrow-left"></i> Back
    </div>
    <h1 class="centered title">{{title}}</h1>
    <div class="col-flex questions-container">
      @for (question of questions(); track $index) {
        <question-display [questionId]="question.id" [delete]="deleter(question.id)" [question]="question.term" [answer]="question.definition"></question-display>
      }
      <div class="new-question-button container button centered" (click)="makeNewQuestion()">
        <h3>New Question</h3>
      </div>
    </div>
  `,
  styles: /*css*/`
    .questions-container {
      width: 60%;
      margin: 0 auto;
      padding: 20px;
      border: 4px solid black;
      border-radius: 15px;
      background-color: #f0f0f0;
      max-height: 80vh;
      overflow-y: auto;
      scrollbar-color: gray transparent; /* make sure the scrollbar track doesnt clip the border */
    }



    .new-question-button {
      margin: 10px;
      padding: 10px;
      border-radius: 10px;
    }


    #back-button {
      position: absolute;
      left: 10px;
      top: 10px;
      border-radius: 10px;
    }

  `,
})
export class EditScreen {
  id = signal(0);

  quizesService = inject(Quizes);
  questions = signal<any[]>([]);
  quiz = signal<any>(null);
  
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.id.set(parseInt(params['id']));
    });

    this.quizesService.fetchedQuestions$.subscribe((_) => {
      this.questions.set(this.quizesService.getQuizQuestions(this.id()));
      this.quiz.set(this.quizesService.getQuizByID(this.id()));
    });
  }

  makeNewQuestion() {
    this.quizesService.newQuestion(this.id(), '', '');
  }

  deleter(id: number) {
    return () => {
      this.quizesService.deleteQuestionFromQuiz(this.id(), id);
    };
  }

  get title(): string {
    return this.quiz() ? this.quiz().title : '...';
  }


  goToSearchScreen(): void {
    window.location.href = `/`;
  }
}
