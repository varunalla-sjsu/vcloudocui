import { Injectable } from '@angular/core';
import { vFile } from '../models/vFile';

import { Observable,of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiEndpoint:string|undefined=process.env.NG_APP_API_URL;
  private fileList!:vFile[];
  constructor(private http:HttpClient) { 
    
  }
  getFiles(){
    return this.http.get<vFile[]>(this.apiEndpoint+'/files');
  }
}

//const DummyData: vFile[]=[{fileName:'Test.jpg',action:'',uploadTime:new Date(),uploadedBy:'Varun Alla'}]