import { inject, Injectable } from '@angular/core';
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
  }

}
