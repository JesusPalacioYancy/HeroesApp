import { Component } from '@angular/core';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent {

  public publishers = [
    { id: 'dc_comics', desc: 'DC - Comics' },
    { id: 'marvel-comics', desc: 'Marvel - Comics' }
  ];

}
