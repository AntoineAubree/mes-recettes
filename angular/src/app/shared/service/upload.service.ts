import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';


@Injectable({
    providedIn: 'root'
})
export class UploadService {


    constructor(private httpClient: HttpClient) { }


}