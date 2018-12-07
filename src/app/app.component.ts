import {Component, OnInit, Inject, ElementRef, AfterViewInit} from '@angular/core';
import flatpickr from 'flatpickr';
import * as moment from 'moment';
import 'pivottable/dist/pivot.min.js';
import 'pivottable/dist/pivot.min.css';

declare var jQuery: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit, AfterViewInit {

    el: ElementRef;

    constructor(@Inject(ElementRef)el: ElementRef) {
        this.el = el;

    }

    ngOnInit() {
        flatpickr('.flatpickr', {
            enableTime: true,
            // enableSeconds: true,
            time_24hr: true,
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
        targetElement.pivotUI([
                {com: 'com1', time: '2018-12-03T08:00:00+08:00', All: '1', Pickup: '1'},
                {com: 'com1', time: '2018-12-03T08:15:00+08:00', All: '3', Pickup: '2'},
                {com: 'com1', time: '2018-12-03T08:30:00+08:00', All: '2', Pickup: '3'},
                {com: 'com1', time: '2018-12-03T08:45:00+08:00', All: '4', Pickup: '4'},
                {com: 'com2', time: '2018-12-03T08:00:00+08:00', All: '6', Pickup: '1'},
                {com: 'com2', time: '2018-12-03T08:15:00+08:00', All: '9', Pickup: '2'},
                {com: 'com2', time: '2018-12-03T08:30:00+08:00', All: '7', Pickup: '8'},
                {com: 'com2', time: '2018-12-03T08:45:00+08:00', All: '8', Pickup: '5'},
            ],
            {
                rows: ['com'],
                cols: ['time']
            });
    }
}
