import { Injectable } from '@angular/core';
import { stringify } from 'querystring';

@Injectable({
    providedIn: 'root'
})
export class FormatTimeService {

    constructor() { }

    getFormatTimeService(totalTime: number): string {
        let hoursTime = Math.trunc(totalTime / 60);
        let minutesTime = totalTime % 60;
        let minutesTimeString: string;
        if (totalTime % 60 < 10) {
            minutesTimeString = '0' + minutesTime;
        } else {
            minutesTimeString = minutesTime.toString();
        }
        return (hoursTime + 'H' + minutesTimeString);
    }
}