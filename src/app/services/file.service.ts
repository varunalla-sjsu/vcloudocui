import { Injectable } from '@angular/core';
import { vFile } from '../models/vFile';

import { Observable,of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FileService {
  fileList!:vFile[];
  constructor(private http:HttpClient) { }
  getFiles(): Observable<vFile[]>{
    return of(DummyData);
  }
}

const DummyData: vFile[]=[{fileName:'Test.jpg',action:'',uploadTime:new Date(),uploadedBy:'Varun Alla'}]