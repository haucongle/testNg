import {Component, OnInit} from '@angular/core';
import flatpickr from 'flatpickr';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        flatpickr('.flatpickr', {
            enableTime: true,
            time_24hr: true,
            altInput: true,
            altFormat: 'Y-m-d h:i K',
            dateFormat: 'Y-m-d\\TH:i:S',
            maxDate: 'today',
            onChange: (selectedDates, dateStr, instance) => {
                console.log(dateStr);
            }
        });
    }
}
