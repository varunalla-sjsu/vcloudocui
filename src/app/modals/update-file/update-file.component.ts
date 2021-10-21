import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { vFile } from 'src/app/models/vFile';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-update-file',
  templateUrl: './update-file.component.html',
  styleUrls: ['./update-file.component.css']
})
export class UpdateFileComponent implements OnInit {
  vFile!: vFile;
  fromDialog!: string;
  public files: NgxFileDropEntry[] = [];
  constructor(
    public dialogRef: MatDialogRef<UpdateFileComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: vFile,
    private fileService: FileService,
    private _snackBar:MatSnackBar
  ) {
    this.vFile = data;
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }
  uploadFileEvt(lfile: any) {
    if (lfile.target.files && lfile.target.files[0]) {
      let file=lfile.target.files[0];
      this.fileService.getPreSignedUrl(this.data.fileid,file.type,'',true).subscribe((psurl:any)=>{
        let header = new Headers();
        header.append('Content-Type', file.type);
      //  header.append('Content-Disposition','attachment; filename="'+this.origFileName+'"');
            
            const formData=new FormData();
            formData.append('file',file);
            this.fileService.uploadFile(psurl.url,file,header).subscribe((data:any)=>{
              console.log('uploaded');
              this._snackBar.open('File Updated', 'Dismiss');
              
            //  this.router.navigate(['/dashboard']);
            });
      });
    }
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
