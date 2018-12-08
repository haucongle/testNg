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
        targetElement.pivotUI([
                {Com: 'CSO_ACHIEVERS', Accepted: '2', Successful: '2', Unsuccessful: '0'},
                {Com: 'CSO_CLAIMS', Accepted: '1', Successful: '1', Unsuccessful: '0'},
                {Com: 'CSO_DPS', Accepted: '3', Successful: '2', Unsuccessful: '1'},
                {Com: 'CSO_ESH', Accepted: '5', Successful: '4', Unsuccessful: '1'},
                {Com: 'CSO_GI', Accepted: '31', Successful: '27', Unsuccessful: '4'},
                {Com: 'CSO_GI CLAIMS', Accepted: '4', Successful: '4', Unsuccessful: '0'},
                {Com: 'CSO_HEALTH CONNECT', Accepted: '6', Successful: '4', Unsuccessful: '2'},
                {Com: 'CSO_LIFE INSURANCE CLAIMS', Accepted: '9', Successful: '9', Unsuccessful: '0'},
                {Com: 'CSO_MAIN CS', Accepted: '44', Successful: '39', Unsuccessful: '5'},
            ],
            {
                rows: ['Com'],
                cols: ['Accepted']
            });
    }
}
