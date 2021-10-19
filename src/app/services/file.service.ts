import { Injectable } from '@angular/core';
import { vFile } from '../models/vFile';

import { Observable,of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }
  getFiles(): Observable<vFile[]>{
    return of(DummyData);
  }
}

const DummyData: vFile[]=[{fileName:'Test.jpg',action:'',uploadTime:new Date(),uploadedBy:'Varun Alla'}]