import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'dns';



@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http : HttpClient) { }


fileFetch(e: any){
    return this.http.get(e);
}
getdeviceList(){
  return this.http.get("https://u2ufyvymt6.execute-api.us-east-2.amazonaws.com/Prod/device-list");
}

//fileUpload(file: any, name:any) {

    // const contentType = ".json";
    private getS3Bucket(): any {
    const bucket = new S3(
          {
                      
          }
      );
      return bucket;
        }
      fileUpload(file: any, name:any) {
        console.log(file, name)
        const contentType = ".json";
      const params = {
          Bucket: 'applicationsensordata',
          Key:  name,
          Body: file,
          ACL: 'public-read',
          ContentType: contentType
        
      };
      this.getS3Bucket().upload(params, function (err, data) {
          if (err) {
            console.log(data)
              console.log('EROOR: ',JSON.stringify( err));
              return false;
          }
          console.log('File Uploaded.', data);
          return true;
      });
      // alert("Application Created")

    }

    allocatingDevice(file: any) {
      return this.http.post("https://244n2ckdj2.execute-api.ap-south-1.amazonaws.com/Prod/registerdevice",file).subscribe(s=> {console.log(s.toString())})
  }

    getFiles():Promise<any> {
      var fileUploads = new Array<any>();
  
      const params = {
        Bucket: 'applicationsensordata'
        // Prefix: 'SensorApplications/'
      };
  
      this.getS3Bucket().listObjects(params, async function (err, data) {
        if (err) {
          console.log('There was an error getting your files: ' + err);
          return;
        }
  
        console.log('Successfully get files.', data);
  
        const fileDatas = data.Contents;
           await fileDatas.forEach(function (file) {
    
          fileUploads.push(( 'https://applicationsensordata.s3.ap-south-1.amazonaws.com/'
           +
            // params.Bucket + '/' + 
           file.Key)
           );
           
        });
        console.log(fileUploads[1])
      });
    //   return new Promise((resolve, reject) => {
    //     console.log('f1');
    //     resolve();
    // });
      return new Promise((resolve,reject) =>{ resolve( fileUploads);});
      //.map((res: any)=> res.json()).toPromise();
  
      // return Observable.of(fileUploads);
    }

    getReport(name: any, date: any, id: any)
    {
      // console.log(name="id:"+id)
    //  return this.http.get("https://244n2ckdj2.execute-api.ap-south-1.amazonaws.com/Prod/getReport?applicationname=application1&date=03-09-2020&applicationid=1");
      return this.http.get("https://244n2ckdj2.execute-api.ap-south-1.amazonaws.com/Prod/getReport"+"?applicationname="+name.value+"&date="+date+"&applicationid="+id);
    }
    getChartData(name: any, date: any,applicationId:any){
      return this.http.get("https://244n2ckdj2.execute-api.ap-south-1.amazonaws.com/Prod/sensorwisereport"+"?applicationname="+name.value+"&date="+date+'&applicationid='+applicationId);
    }
    getDeviceList(){
      return this.http.get('https://u2ufyvymt6.execute-api.us-east-2.amazonaws.com/Prod/device-list');
    }
   }
