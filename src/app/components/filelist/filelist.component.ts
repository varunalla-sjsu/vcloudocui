import { Component, OnInit ,ViewChild } from '@angular/core';
import { vFile } from 'src/app/models/vFile';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FileService } from 'src/app/services/file.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-filelist',
  templateUrl: './filelist.component.html',
  styleUrls: ['./filelist.component.css']
})
export class FilelistComponent implements OnInit {

  dataSource=new MatTableDataSource<vFile>([]);
  displayColumns:string[]=['fileName','description','uploadedBy','uploadTime','action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private fileService: FileService,private router: Router,private _snackBar:MatSnackBar){}
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

}