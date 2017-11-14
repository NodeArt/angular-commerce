import {Component, Inject} from '@angular/core';
import {IConnector, Q, Query} from 'a2c-firestore-connector';

@Component({
  selector: 'app-root',
  template: `<p>Hello, App!</p>`,
  styles: [``],
})
export class AppComponent {
  constructor(@Inject('IConnector') private connector: IConnector) {
    this.init();
  }

  private init(): void {
    const q: Q = new Query('products')
      .where('name', '==', 'Kurtka')
      .where('price', '>=', 120)
      .where('price', '<=', 320)
      .or('color', 'red')
      .or('color', 'green')
      .or('size', 'xl')
      .or('size', 'l')
      .or('size', 's')
      .build();

    console.log(q);

    this.connector.get(q)
      .subscribe(d => console.log('Done', d));
  }
}
