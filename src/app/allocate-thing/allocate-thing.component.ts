import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { UploadService } from '../shared/upload.service';
import { rejects } from 'assert';
import { resolve } from 'dns';
import { async } from 'rxjs/internal/scheduler/async';
import { JwtHelperService } from "@auth0/angular-jwt";
import { getMaxListeners } from 'process';
import { CommentStmt } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';


interface allocationDetail {
  applicationid: string,
  deviceid: string
}
@Component({
  selector: 'app-allocate-thing',
  templateUrl: './allocate-thing.component.html',
  styleUrls: ['./allocate-thing.component.css']
})
export class AllocateThingComponent implements OnInit {
  public helper = new JwtHelperService();
  constructor(private toastr: ToastrService, public service: AuthService, public serv: UploadService) { }

  newDeviceListone: any;
  newArray: Array<any> = new Array<any>();
  fileUploads: Array<any> = new Array<any>();
  newData: Array<any> = new Array<any>();
  userInfo: any;
  user: string;
  AllocateThing = new FormGroup({
    applicationname: new FormControl('', Validators.required),
    deviceName: new FormControl('', Validators.required)
  });

  vehicleNamelist: Array<any> = new Array<any>();
  newDeviceList: any;
  vehicleNumberlist: Array<any> = new Array<any>();
  i: number;

  async ngOnInit() {
    await this.serv.getDeviceList().toPromise().then(
      (res: any) => {
        this.newDeviceListone = res
        console.log(this.newDeviceListone)
      }, () => {
        alert("No Data fetched for Devices !");
      }
    );
    for (let key in this.newDeviceListone) {
      this.user = key.toString();
    }

    this.userInfo = this.helper.decodeToken(localStorage.getItem("token"));
   
    this.serv.getFiles()
      .then((res: any) => {
        this.fileUploads = res;
        setTimeout(() => {
          this.abc()
        }, 3000)
      });
    this.setData();

  }
  getDeviceList() {

  }
  setData() {

    for (let i = 0; i < this.newDeviceListone[this.user].length; i++) {
      this.newArray.push(this.newDeviceListone[this.user][i][0])

    }
    console.log(this.newArray)

  }
  get applicationname() {
    return this.AllocateThing.get('applicationname');
  }

  get deviceName() {
    return this.AllocateThing.get('deviceName');
  }
  id: string;
  onFormSubmit() {
    var newObjectone: allocationDetail = { applicationid: null, deviceid: null }
    this.newData.forEach(e => {

      if (e.applicationname === this.applicationname.value) {
        this.id = e.applicationid
      }
    })

    newObjectone.applicationid = this.id;

    newObjectone.deviceid = this.deviceName.value;

    console.log(JSON.stringify(newObjectone));
    this.serv.allocatingDevice(JSON.stringify(newObjectone))
    this.toastr.success('Device Allocated', 'Congrats', {
      timeOut: 2000
    })
    this.AllocateThing.reset();
  }

  abc() {

    this.fileUploads.forEach(async e => {



      await this.serv.fileFetch(e).toPromise().then((res: any) => this.newData[this.newData.length] = res)

    })

  }
}
