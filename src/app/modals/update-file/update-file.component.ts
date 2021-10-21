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
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fileService: FileService,
    private _snackBar:MatSnackBar
  ) {
    console.log('data', data);
    this.vFile = data.file as vFile;
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }
  uploadFileEvt() {
    let file:NgxFileDropEntry=this.files[0];
    let filename=file;
    const fileEntry = file.fileEntry as FileSystemFileEntry;
    
        fileEntry.file((file: File) => {
          this.fileService.getPreSignedUrl(this.vFile.fileid,file.type,'',true).subscribe((psurl:any)=>{
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
