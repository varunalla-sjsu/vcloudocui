import { Component, ElementRef, Inject, OnInit ,ViewChild } from '@angular/core';
import { vFile } from 'src/app/models/vFile';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FileService } from 'src/app/services/file.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'dialog-content',
  templateUrl: 'dialog-content.html',
})
export class UpdateDialog {
  @ViewChild('fileInput') fileInput!: ElementRef;
  fileAttr = 'Choose File';
  constructor(private fileService: FileService,@Inject(MAT_DIALOG_DATA) public data: any,private _snackBar:MatSnackBar) {}
  uploadFileEvt(lfile: any) {
    if (lfile.target.files && lfile.target.files[0]) {
      let file=lfile.target.files[0];
      this.fileService.getPreSignedUrl(this.data.file.fileid,file.type,'',true).subscribe((psurl:any)=>{
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
    } else {
      this.fileAttr = 'Choose File';
    }
  }
}


@Component({
  selector: 'app-filelist',
  templateUrl: './filelist.component.html',
  styleUrls: ['./filelist.component.css']
})
export class FilelistComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;
  fileAttr = 'Choose File';
  dataSource=new MatTableDataSource<vFile>([]);
  displayColumns:string[]=['fileName','description','uploadedBy','uploadTime','updateTime','action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private fileService: FileService,private router: Router,private _snackBar:MatSnackBar,public dialog: MatDialog){}
  ngOnInit(): void {
    this.updateFiles();
  }
  ngAfterViewInit(){
      this.dataSource.paginator=this.paginator;
  }
  updateFiles(){
    this.fileService.getFiles().subscribe((response:vFile[])=>{
      this.dataSource=new MatTableDataSource<vFile>(response);
    });
  }
  downloadUrl(id:vFile){
    this.fileService.downloadUrl(id.fileid).subscribe((data:any)=>{
      console.log(data);

      window.open(data.fileUrl, "_blank");
    });
  }
  deleteFile(file:vFile){
    this.fileService.deleteFile(file.fileid).subscribe((data:any)=>{
      console.log(data);

      this._snackBar.open('File Deleted', 'Dismiss');
      this.updateFiles();
    });
  }
  openDialog(vfile:vFile) {
    this.dialog.open(UpdateDialog, {
      data: {
        file:vfile
      }
    });
  }
  updateFile(filename:string){

  }
  uploadFileEvt(lfile: any,vfile:vFile) {
    if (lfile.target.files && lfile.target.files[0]) {
      let file=lfile.target.files[0];
      this.fileService.getPreSignedUrl(vfile.fileid,file.type,'',true).subscribe((psurl:any)=>{
        let header = new Headers();
        header.append('Content-Type', file.type);
        header.append('Content-Disposition','attachment; filename="'+vfile.origFileName+'"');
            
            const formData=new FormData();
            formData.append('file',file);
            this.fileService.uploadFile(psurl.url,file,header).subscribe((data:any)=>{
              console.log('uploaded');
              this._snackBar.open('File Updated', 'Dismiss');
              
            //  this.router.navigate(['/dashboard']);
            });
      });
    } else {
      this.fileAttr = 'Choose File';
    }
  }
}