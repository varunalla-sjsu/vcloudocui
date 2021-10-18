import { Component, OnInit ,ViewChild } from '@angular/core';
import { vFile } from 'src/app/models/vFile';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-filelist',
  templateUrl: './filelist.component.html',
  styleUrls: ['./filelist.component.css']
})
export class FilelistComponent implements OnInit {
  displayColumns:string[]=['fileName','uploadedBy','uploadTime','action'];
  dataSource=new MatTableDataSource<vFile>(DummyData);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator;
  }

}
const DummyData: vFile[]=[{fileName:'Test.jpg',action:'',uploadTime:new Date(),uploadedBy:'Varun Alla'}]