import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UploadService } from '../shared/upload.service';
import { formatDate, DatePipe } from '@angular/common';
import { strict } from 'assert';




interface Post {
  startDate: Date | 'dd-MM-yyyy';
}

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css']
})
export class GenerateReportComponent implements OnInit {
  fileUploads: Array<any> = new Array<any>();

  constructor(public service: UploadService, public formBuilder: FormBuilder) { }

  post: Post = {
    startDate: new Date(Date.now())
  }
  str5: string = '';
  newData: Array<any> = new Array<any>();

  //  datePipe = new DatePipe('en');
  // setDob = this.datePipe.transform(this.startDate, 'dd-MM-yyyy');

  generateReport = this.formBuilder.group({
    applicationname: new FormControl('', Validators.required),
    startDate: [formatDate(this.post.startDate, 'dd-MM-yyyy', 'en'), [Validators.required]]
    // startDate: [formatDate(this.post.startDate,'dd-MM-yyyy', 'en-IN'), [Validators.required]]
  })



  ngOnInit(): void {
    this.service.getFiles()
      .then((res: any) => {
        this.fileUploads = res;
        
        setTimeout(() => {
          this.abc()
        }, 3000)
      });
  }


  get applicationname() {
    return this.generateReport.get('applicationname');
  }
  get startDate() {

    return this.generateReport.get('startDate');
  }

  abc() {
    var i = 1;
    this.fileUploads.forEach(async e => {

      

        await this.service.fileFetch(e).toPromise().then((res: any) => {this.newData[this.newData.length] = res })
      
    })
  }
  id: any;
  async onFormSubmit() {
    // console.log(this.applicationName.value);
    this.newData.forEach(e => {

      if (e.applicationname === this.applicationname.value) {
        this.id = e.applicationid
      }
    })

    var str: string = this.startDate.value;

    var str1: string = str.substring(0, str.indexOf('-'))

    var str2: string = str.substring(str.lastIndexOf('-') + 1, str.length)

    var str3: string = str.substring(str.indexOf('-'), str.lastIndexOf('-') + 1)

    var str4: string = str2 + str3 + str1;
    console.log(this.applicationname.value,this.id);
    await this.service.getReport(this.applicationname, str4, this.id).toPromise().then((res: any) => this.str5 =res);
    console.log(this.str5);
  }

}
