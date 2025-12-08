import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-screen',
  imports: [],
  template: /*html*/`
  <div style="margin: 20px;">
    <p>
      Insert edit screen for quiz {{id()}} here.
    </p>
    <a href="/home">Go back to Home Screen</a>
  </div>
  `,
  styles: ``,
})
export class EditScreen {
  id = signal('');
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.id.set(params['id']);
    });
  }
}
