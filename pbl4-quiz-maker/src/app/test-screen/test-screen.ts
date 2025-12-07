import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-screen',
  imports: [],
  template: /*html*/`
    <div style="margin: 20px;">
      <p>
        *Put quiz {{id()}} here*
      </p>
      <a href="/home">Go back to Home Screen</a>
    </div>
  `,
  styles: ``,
})
export class TestScreen {
  id = signal('');
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.id.set(params['id']);
    });
  }
}
