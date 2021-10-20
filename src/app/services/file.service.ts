import { Injectable } from '@angular/core';
import { vFile } from '../models/vFile';

import { Observable,of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';

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
  getPreSignedUrl(filename:string ,contentType:string ,description:string){
    //build request
    return  this.http.post<string>(this.apiEndpoint+'/upload/sign',{
      filename:filename,
      contentType:contentType,
      description:description
    })
  }
  uploadFile(url:string,body:any,headers:any){
    return this.http.put(url,body,{headers});
  }
  downloadUrl(filename:string){
    return this.http.post(this.apiEndpoint+'/downloadsign',{fileName:filename});
  }
  deleteFile(filename:string){
    return this.http.post(this.apiEndpoint+'/deletefile',{fileName:filename});
  }
}

//const DummyData: vFile[]=[{fileName:'Test.jpg',action:'',uploadTime:new Date(),uploadedBy:'Varun Alla'}]