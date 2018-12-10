import {Component, OnInit, Inject, ElementRef, AfterViewInit} from '@angular/core';
import flatpickr from 'flatpickr';
import * as moment from 'moment';
import csvjson from 'csvjson';

declare var jQuery: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit, AfterViewInit {

    el: ElementRef;
    csv: string;
    json: string;

    constructor(@Inject(ElementRef)el: ElementRef) {
        this.el = el;
        this.csv = '"sr","name","age","gender"\n' +
            '    "1","rocky","33","male"\n' +
            '    "2","jacky","22","male"\n' +
            '    "3","suzy","21","female"';
        const options = {
            delimiter : ',', // optional
            quote     : '"' // optional
        };
        this.json = csvjson.toObject(this.csv, options);
    }

    ngOnInit() {
        flatpickr('.flatpickr', {
            enableTime: true,
            // enableSeconds: true,
            // time_24hr: true,
            altInput: true,
            altFormat: 'Y-m-d h:i:S K',
            maxDate: 'today',
            onChange: (selectedDates, dateStr, instance) => {
                console.log(moment(dateStr).format());
            }
        });
    }

    ngAfterViewInit() {

        if (!this.el ||
            !this.el.nativeElement ||
            !this.el.nativeElement.children) {
            console.log('cant build without element');
            return;
        }

        const container = this.el.nativeElement;
        const inst = jQuery(container);
        const targetElement = inst.find('#output');

        if (!targetElement) {
            console.log('cant find the pivot element');
            return;
        }

        // this helps if you build more than once as it will wipe the dom for that element
        while (targetElement.firstChild) {
            targetElement.removeChild(targetElement.firstChild);
        }

        // here is the magic
        targetElement.pivotUI(this.json,
            {
                rows: ['name'],
                cols: ['gender']
            });
    }
}
