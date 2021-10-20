import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {
  description!:string;
  public files: NgxFileDropEntry[] = [];
  constructor(private fileService:FileService,private router: Router,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  public uploadFile(){
    console.log('upload clicked');
    let description=this.description||"";
    let file:NgxFileDropEntry=this.files[0];
    let filename=file;
    const fileEntry = file.fileEntry as FileSystemFileEntry;
    
        fileEntry.file((file: File) => {
          this.fileService.getPreSignedUrl(file.name,file.type,description,false).subscribe((psurl:any)=>{
            console.log(psurl);

        let header = new Headers();
        header.append('Content-Type', file.type);
        header.append('Content-Disposition','attachment; filename="'+file.name+'"');
            
            const formData=new FormData();
            formData.append('file',file);
            this.fileService.uploadFile(psurl.url,file,header).subscribe((data:any)=>{
              console.log('uploaded');
              this._snackBar.open('File Uploaded', 'Dismiss');
              
              this.router.navigate(['/dashboard']);
            });
          });
        });
    
  }
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  public fileOver(event:any){
    console.log(event);
  }

  public fileLeave(event:any){
    console.log(event);
  }

}
