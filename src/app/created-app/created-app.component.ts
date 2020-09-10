import { Component, OnInit } from '@angular/core';
import { UploadService } from "../shared/upload.service"
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-created-app',
  templateUrl: './created-app.component.html',
  styleUrls: ['./created-app.component.css']
})
export class CreatedAppComponent implements OnInit {
 
  newData:Array<any>= new Array<any>();
  fileUploads: Array<any>;
  constructor(private toastr : ToastrService, public service: UploadService) { }

 
   ngOnInit() {
   this.showFiles();
   setTimeout(() => {
    this.abc()},1500);   
 
  }
    showFiles() {
     this.service.getFiles().then((res:any)=> this.fileUploads= res);

  
    console.log(this.fileUploads);

  } 
    abc() {
      // var i=1;
     this.fileUploads.forEach(async e=> {
      
        await this.service.fileFetch(e).toPromise().then((res: any)=> this.newData[this.newData.length] = res)
     
     })
  }

  details(data:any)
  {
this.toastr.show(JSON.stringify(data),'Application Info')
console.log(data)
  }
}
