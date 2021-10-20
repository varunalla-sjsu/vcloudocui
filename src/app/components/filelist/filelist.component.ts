import { Component, OnInit ,ViewChild } from '@angular/core';
import { vFile } from 'src/app/models/vFile';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FileService } from 'src/app/services/file.service';
@Component({
  selector: 'app-filelist',
  templateUrl: './filelist.component.html',
  styleUrls: ['./filelist.component.css']
})
export class FilelistComponent implements OnInit {

  dataSource=new MatTableDataSource<vFile>([]);
  displayColumns:string[]=['fileName','description','uploadedBy','uploadTime','action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private fileService: FileService){}
  ngOnInit(): void {
    this.fileService.getFiles().subscribe((response:vFile[])=>{
         this.dataSource=new MatTableDataSource<vFile>(response);
    });
  }
  ngAfterViewInit(){
      this.dataSource.paginator=this.paginator;
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

    });
  }

}