import {Component} from '@angular/core';

@Component({
    selector: 'app-clock',
    templateUrl: './clock.component.html'
})
export class ClockComponent {
    curTime:number;
     constructor() {
    setInterval(() => {
      this.curTime = new Date().getTime();
    }, 1);
}
}