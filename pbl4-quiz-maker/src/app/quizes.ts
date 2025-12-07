import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Timestamp, query, orderBy, collectionData, addDoc, collection, Firestore, serverTimestamp, where } from '@angular/fire/firestore';
import { CollectionReference, DocumentData } from '@angular/fire/compat/firestore';



export interface Question {
  id: number;
  term: string;
  definition: string;
}

export interface Quiz {
  id: number;
  title: string;
  qCount: number;
  questions: number[];
}

export interface User {
  username: string;
  password: string;
  quizes: number[];
}



export interface QuestionReq {
  id: number;
  term: string;
  definition: string;
}

export interface QuizReq {
  id: number;
  title: string;
  questionCount: number;
  questions: string;
}

export interface UserReq {
  username: string;
  password: string;
  quizes: string;
}



@Injectable({
  providedIn: 'root',
})
export class Quizes {
  firestore = inject(Firestore);

  fetchedQuizes$: Observable<QuizReq[]>;
  fetchedQuestions$: Observable<QuestionReq[]>;

  quizes = signal<Quiz[]>([]);
  questions = signal<Question[]>([]);
  maxQuizID = signal<number>(0);
  maxQuestionID = signal<number>(0);

  userCollection: any;
  quizCollection: any;
  questionCollection: any;

  constructor() {
    this.userCollection = collection(this.firestore, 'users');
    this.quizCollection = collection(this.firestore, 'quizes');
    this.questionCollection = collection(this.firestore, 'questions');
    
    const quizQuery = query(this.quizCollection, orderBy('id', 'asc'));
    this.fetchedQuizes$ = collectionData(quizQuery) as Observable<QuizReq[]>;
    
    const questionQuery = query(this.questionCollection, orderBy('id', 'asc'));
    this.fetchedQuestions$ = collectionData(questionQuery) as Observable<QuestionReq[]>;



    this.fetchedQuizes$.subscribe((quizData) => {
      const quizzes: Quiz[] = quizData.map(quiz => ({
        id: quiz.id,
        title: quiz.title,
        qCount: quiz.questionCount,
        questions: quiz.questions.split(',').map(Number),
      }));
      this.quizes.set(quizzes);
      const maxId = quizzes.reduce((max, quiz) => quiz.id > max ? quiz.id : max, 0);
      this.maxQuizID.set(maxId);
    });

    this.fetchedQuestions$.subscribe((questionData) => {
      const questions: Question[] = questionData.map(question => ({
        id: question.id,
        term: question.term,
        definition: question.definition,
      }));
      this.questions.set(questions);
      const maxId = questions.reduce((max, question) => question.id > max ? question.id : max, 0);
      this.maxQuestionID.set(maxId);
    });

  }

  newQuiz(title: string) {
    const newQuizID = this.maxQuizID() + 1;
    this.maxQuizID.set(newQuizID);
    const newQuiz: Quiz = {
      id: newQuizID,
      title: title,
      qCount: 0,
      questions: [],
    };
    addDoc(this.quizCollection, {id: newQuiz.id, title: newQuiz.title, questionCount: newQuiz.qCount, questions: newQuiz.questions.join(',')});
  }


}
