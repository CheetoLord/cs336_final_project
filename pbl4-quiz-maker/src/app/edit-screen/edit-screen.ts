import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionDisplay } from '../question-display/question-display';
import { Quizes } from '../quizes';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-edit-screen',
  imports: [QuestionDisplay, CdkDropList, CdkDrag],
  template: /*html*/`
    <div id="back-button" class="button" (click)="goToSearchScreen()">
      <i class="fa-solid fa-arrow-left"></i> Back
    </div>
    <h1 class="centered title">{{title}}</h1>
    <div class="example-list questions-container" (cdkDropListDropped)="drop($event)" cdkDropList>
      @for (question of questions(); track $index) {
        <div class="question-display" cdkDrag>
          <question-display [questionId]="question.id" [delete]="deleter(question.id)" [question]="question.term" [answer]="question.definition"></question-display>
        </div>
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

    .question-display {
      display: block;
      padding: 0;
      margin: 10px;
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


    .cdk-drag-preview {
      box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
                  0 8px 10px 1px rgba(0, 0, 0, 0.14),
                  0 3px 14px 2px rgba(0, 0, 0, 0.12);
      border-radius: 10px;
      padding: 0px;
      margin: 0px;
    }

    .cdk-drag-placeholder {
      opacity: 0;
    }

    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    .question-display:last-child {
      border: none;
    }

    .cdk-drop-list-dragging .question-display:not(.cdk-drag-placeholder) {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
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


  drop(event: CdkDragDrop<string[]>) {
    const questions = [...this.questions()];
    moveItemInArray(questions, event.previousIndex, event.currentIndex);
    this.questions.set(questions);
    const questionIDs = questions.map(q => q.id);
    this.quizesService.updateQuizQuestions(this.id(), questionIDs);
  }
}
