import { Component, OnInit, ViewChildren } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  chart: any;

  newArray = [{

    sensor: "humidity", devices: [{
      deviceName: "d1",
      time: ['Thu Jan 01 1970 23:30:00 GMT+0530 (India Standard Time)', 'Thu Jan 01 1970 05:30:00 GMT+0530 (India Standard Time)', 'Thu Jan 01 1970 10:30:00 GMT+0530 (India Standard Time)'],
      thresold: [10, 20, 30]
    }
      , {
      deviceName: "d2",
      time: ['Thu Jan 01 1970 23:30:00 GMT+0530 (India Standard Time)', 'Thu Jan 01 1970 05:30:00 GMT+0530 (India Standard Time)', 'Thu Jan 01 1970 10:30:00 GMT+0530 (India Standard Time)'],
      thresold: [10, 20, 30]
    }
    ]
  },
  {
    sensor: "temperature", devices: [{
      deviceName: "d1",
      time: ['Thu Jan 01 1970 23:30:00 GMT+0530 (India Standard Time)', 'Thu Jan 01 1970 05:30:00 GMT+0530 (India Standard Time)', 'Thu Jan 01 1970 10:30:00 GMT+0530 (India Standard Time)'],
      thresold: [10, 20, 30]
    }
      , {
      deviceName: "d2",
      time: ['Thu Jan 01 1970 23:30:00 GMT+0530 (India Standard Time)', 'Thu Jan 01 1970 05:30:00 GMT+0530 (India Standard Time)', 'Thu Jan 01 1970 10:30:00 GMT+0530 (India Standard Time)'],
      thresold: [10, 20, 30]
    }
    ]
  }];
  @ViewChildren('mycharts') allMyCanvas: any;
  Linechart: any;
  newArray1:any= [];
  charts: any;
  constructor() { }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.newArray.forEach((x) => {
      x.devices.forEach(element => {

          var time = element.time;
          var thresold = element.thresold;

          var res = this.getDeviceData(time, thresold);

          setTimeout(()=>{
            this.allMyCanvas = 
            this.allMyCanvas.map((mycanvas,i)=>{
               
                    this.charts[i].y = new Chart(mycanvas.nativeElement.getContext('2d'),{
                   
                        type: 'line',
                        data: {
                            datasets: 
                             [{
                                //label: element.deviceName,
                                backgroundColor: '#008080',
                                borderColor: '#00BFFF',
                                fill: false,
                                 data:[{
                                  x: new Date(0),
                                  y: 35
                              }, {
                                  x: new Date(10000),
                                  y: 55
                              }, {
                                  x: new Date(20000),
                                  y: 45
                              }, {
                                  x: new Date(30000),
                                  y: 2
                              }],
                            },
                        //     {
                        //         label: 'Height Sensor data',
                        //         backgroundColor: '#708090',
                        //         borderColor: '##556B2F',
                        //         fill: false,
                        //         data: [{
                        //             x: new Date(0),
                        //             y: 100
                        //         }, {
                        //             x: new Date(10000),
                        //             y: 20
                        //         }, {
                        //             x: new Date(20000),
                        //             y: 50
                        //         }, {
                        //             x: new Date(30000),
                        //             y: 2.5
                        //         }],
                        //     },
                             ]
                         }
                         
                        ,
                        options: {
                            responsive: true,
                            title: {
                                display: true,
                                text: 'Temperature Sensor'
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
                                        labelString: 'Thresold'
                                    }
                                }]
                            }
                        },
                     
                        
                    })
                    
                
            })
        },1000)




      });
      this.newArray1.push(this.Linechart);
  })

this.allMyCanvas=this.newArray1
 
  }

  getDeviceData(keys, values) {



    var result = []

    for (let i = 0; i < keys.length; i++) {

        result.push({ x: keys[i], y: values[i] })

    }
    return result;
}

}
