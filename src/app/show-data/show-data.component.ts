import { Component, OnInit, ViewChildren } from '@angular/core';
import { Chart } from 'chart.js';
import { ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { UploadService } from '../shared/upload.service';
import { formatDate, DatePipe } from '@angular/common';
import * as jspdf from 'jspdf';
// import * as ChartAnnotation from 'chartjs-plugin-annotation';
import html2canvas from 'html2canvas';
import { ChartOptions } from 'chart.js';
import * as ChartAnnotation from 'chartjs-plugin-annotation';



interface Post {
  startDate: Date | 'dd-MM-yyyy';
}
//  Chart.plugins.register([ChartAnnotation]);

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.css']
})
export class ShowDataComponent implements OnInit {

  newArray = []
  showForm = true;
  showcharts = false;
  // newArray=[{"sensor": "gpssensor", "devices": 
  // [{"1": {"recordedAt": ["2020-09-03 11:18:59.393184", "2020-09-03 11:19:13.185658", "2020-09-03 11:20:14.093465", "2020-09-03 11:20:48.663235"], 
  // "sensorValue": [80, 100, 10, 10]}}, {"2": {"recordedAt": ["2020-09-03 11:21:51.853583"],
  //  "sensorValue": [75]}}, {"2": {"recordedAt": ["2020-09-03 11:29:13.834524"], "sensorValue": [175]}}]}, 
  //  {"sensor": "tempsensor", "devices":
  //   [{"1": {"recordedAt": ["2020-09-03 11:18:59.393184", "2020-09-03 11:19:13.185658", "2020-09-03 11:20:14.093465", "2020-09-03 11:20:48.663235", "2020-09-03 11:20:56.973454", "2020-09-03 11:21:01.233405", "2020-09-03 11:21:08.773484"], 
  //   "sensorValue": [12, 120, 120, 12, 12, 120, 120]}}, {"2": {"recordedAt": ["2020-09-03 11:21:16.513460"], "sensorValue": [120]}}, 
  //   {"2": {"recordedAt": ["2020-09-03 11:21:51.853583"], "sensorValue": [120]}}, 
  //   {"2": {"recordedAt": ["2020-09-03 11:29:13.834524"], "sensorValue": [120]}}]},
  //    {"sensor": "heightsensor", "devices": [{"1": {"recordedAt": ["2020-09-03 11:18:59.393184", "2020-09-03 11:21:08.773484"], "sensorValue": [32, 143]}},
  //     {"2": {"recordedAt": ["2020-09-03 11:21:16.513460"], "sensorValue": [143]}}, {"2": {"recordedAt": ["2020-09-03 11:21:51.853583"], "sensorValue": [143]}}, 
  //     {"2": {"recordedAt": ["2020-09-03 11:29:13.834524"], "sensorValue": [130]}}]}]
  fileUploads: Array<any> = new Array<any>();

  post: Post = {
    startDate: new Date(Date.now())
  }
  str5: string = '';
  newData: Array<any> = new Array<any>();


  generateReport = this.formBuilder.group({
    applicationname: new FormControl('', Validators.required),
    startDate: [formatDate(this.post.startDate, 'dd-MM-yyyy', 'en'), [Validators.required]]
  })

  get applicationname() {
    return this.generateReport.get('applicationname');
  }
  get startDate() {

    return this.generateReport.get('startDate');
  }
  generatePDF() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf.jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('newPDF.pdf');
    });
  }
  abc() {
    var i = 1;
    this.fileUploads.forEach(async e => {



      await this.service.fileFetch(e).toPromise().then((res: any) => { this.newData[this.newData.length] = res })


    })
  }
  id: any;
  applicationData:any;
  async onFormSubmit() {
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
    // console.log(this.applicationname.value,this.id);
    var chartData: any;
    await this.service.getChartData(this.applicationname, str4, this.id).toPromise().then(
      (res: any) => {
        console.log(res)
        this.newArray = res["sensorData"];
        this.showForm = false
        this.applicationData = res["application"]
        console.log(this.applicationData)


        this.showcharts = true;

        var applicationNumber = Object.keys(res["application"]).length;
        for (let i = 0; i < applicationNumber; i++) {
          this.charts.push({ "id": i + 1, "chart": [] })
        }
        console.log(this.charts)
      }, () => {
        alert("No Data fetched!");
      }

    );
    //  console.log(this.newArray);  
    this.ngAfterViewInit();

  }






  @ViewChildren('mycharts') allMyCanvas: any;
  charts: any = [];
  // Linechart: any;
  newArray1: any = [];
  pie: any;



  constructor(public service: UploadService, public formBuilder: FormBuilder, private elementRef: ElementRef) {


  }

  ngOnInit(): void {
    this.service.getFiles()
      .then((res: any) => {
        this.fileUploads = res;

        setTimeout(() => {
          this.abc()
        }, 3000)
      });

      

  }
  // ngAfterViewChecked(){

  // }
  ngAfterViewInit() {
    setTimeout(() => {
      this.newArray.forEach((x) => {
        // x.devices.forEach(element => {
        var res = this.CreateDataset(x.devices)
        // var time = element.time;
        // var thresold = element.thresold;

        //  var res = this.getDeviceData(time, thresold);

        // console.log(res)
        this.pie = {

          type: 'bubble',
          data: {
            datasets: res

          },
          
          options: {
            responsive: true,
            title: {
              display: true,
              text: "Sensor : " + x.sensor
            },
            scales: {
              xAxes: [{
                type: 'time',
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Time'
                },
                ticks: {
                  major: {
                    fontStyle: 'bold',
                    fontColor: '#FF0000'
                  }
                }
              }],
              yAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Sensor Values'
                  // labelString: 'Threshold'
                }
              }]
            },
            annotation: {
              annotations: [{
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: +(this.applicationData[x.sensor].split(' ')[0]),
                borderColor: "red",
                borderWidth: 2,
                label: {
                  enabled: false,
                  content: 'Min'
                }
              },
              {
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: +(this.applicationData[x.sensor].split(' ')[1]),
                borderColor: "red",
                borderWidth: 2,
                label: {
                  enabled: false,
                  content: 'Max'
                }
              }
            ]
              
            }
            
          }  as ChartOptions,
         plugins: [ChartAnnotation]
          
           
        





        }
       

        // })
        this.newArray1.push(this.pie);


      })
      //  this.allMyCanvas = this.newArray1

      this.createCharts(this.newArray1)
    }, 1000)

  }


  Cancel() {
    this.showForm = true;
    this.showcharts = false;
  }

 

  getDeviceData(keys, values) {



    var result = []

    for (let i = 0; i < keys.length; i++) {

      result.push({ x: keys[i], y: values[i] })

    }
    return result;
  }

  createCharts(c) {

    let canvasCharts = this.allMyCanvas._results;  // Get array with all canvas
    // console.log(canvasCharts)

    canvasCharts.map((myCanvas, i) => {
      this.charts[i].chart = new Chart(<HTMLCanvasElement>myCanvas.nativeElement.getContext('2d'), c[i])
    })






  }
  CreateDataset(sensorData) {
    var dataObj = []
    sensorData.forEach(element => {
      var deviceName = Object.keys(element)[0]
      var val = Object.values(element)[0]

      var time = Object.values(val)[1];
      var thresold = Object.values(val)[0];


      var res = this.getDeviceData(time, thresold);
      // res.push([1,2,3])

      var randColor = this.generateRandomColor()
      dataObj.push({ label: "Device Name: " + deviceName, backgroundColor: randColor, borderColor: randColor, fill: false, data: res })

    });
    console.log(dataObj)
    return dataObj;
  }
  generateRandomColor() {
    var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  }

}