import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Options } from 'ng5-slider';
import { UploadService } from "../shared/upload.service"
import { ToastrService } from 'ngx-toastr';




interface SliderDetails {
  start: string;
  value: number;
  highValue?: number;
  floor: number;
  ceil: number;
  step: any;
}
@Component({
  selector: 'app-create-thing',
  templateUrl: './create-thing.component.html',
  styleUrls: ['./create-thing.component.css']
})



export class CreateThingComponent implements OnInit {
id: string;
  registrationForm = this.fb.group({
    SensorName: ['', [Validators.required]],
    SensorBoolean:['', [Validators.required]],
    Threshold: ['', [Validators.required]],
    SensorType:  ['', [Validators.required]]

  })
  ThingNameForm = this.fb.group({
    ThingName:['',[Validators.required]]
  })

  state: boolean;

  

  resetForm(): void {
    this.registrationForm.reset();
    this.ThingNameForm.reset();
    this.dataArray.splice(0,this.dataArray.length);
    this.booleanArray.splice(0,this.booleanArray.length);
    
  }

  isSubmitted = false;

  dataArray : Array<any> = new Array<any>();
  booleanArray: Array<any> = new Array<any>();
  sensorDataArray : Array<any> = new Array<any>();
  constructor(private toastr: ToastrService, public fb: FormBuilder, public service: UploadService) { }
 
  ngOnInit(): void {
    
  }

  get SensorName() {
    return this.registrationForm.get('SensorName');
  }

  get Threshold(){
    return this.registrationForm.get('Threshold');
  }
  get ThingName(){
    return this.ThingNameForm.get('ThingName');
  }
  get SensorBoolean(){
    return this.registrationForm.get('SensorBoolean')
  }
  get SensorType(){
    return this.registrationForm.get('SensorType')
  } 


  onAddbutton(){
    if(this.SensorType.value == '1'){
      this.dataArray[this.dataArray.length]= this.registrationForm.value;console.log(this.registrationForm.value)
      console.log(this.Threshold.value);

    }
    else{

      this.booleanArray[this.booleanArray.length] = this.registrationForm.value;
      console.log(this.registrationForm.value);
    }
  }
    newguid()
    {
      return 'xxxxx'.replace(/[x]/g, function(c) {
        var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      })
    }

    sliders: SliderDetails[] = [
      {
        start: "PressureSensor",
        value: 1,
        highValue: 2,
        floor: -5,
        ceil: 5,
        step :0.1
      },
      {
        start: "tempsensor",
        value: 2,
        highValue: 2,
        floor: 0,
        step: 0.1,
        ceil: 100
      },
      {
        start: "OpticalSensor",
        value: 30,
        highValue: 60,
        floor: -100,
        step: 0.1,
        ceil: 100
      }
  ,
      {
        start: "heightsensor",
        highValue : 3,
        value: 0,
        floor: 5,
        step: 0.1,
        ceil: 100
      },
      {
        start: "gpssensor",
        highValue : 5 ,
        value: 0,
        floor: 0,
        step: 1,
        ceil: 10
      }
    ];
  


    sliderOptions(slider: SliderDetails): Options {
   
      return {
        floor: slider.floor,
        ceil: slider.ceil,
        step: slider.step,
        keyboardSupport: false
     
        
      };
    }




   onSubmit() {
    var newobject= {'applicationid': null};

this.id=this.newguid();
let i = 0;

if(this.dataArray.length>0){
  this.dataArray.forEach(e => {console.log(e['SensorName'], e['Threshold']); i++
var a = e['Threshold'][0];
var b = e['Threshold'][1];
var c= a+' '+b;

  newobject[e['SensorName']] =c;
 
 
 })
}
if(this.booleanArray.length>0){
  this.booleanArray.forEach(e => {console.log(e['SensorName'], e['SensorBoolean']); i++

if(e['SensorBoolean']== "true")
{
  this.state= true;
  newobject[e['SensorName']] =this.state;
}
else{
  this.state= false;
  newobject[e['SensorName']] =this.state;
}
  
  })
}

newobject['applicationname']= this.ThingName.value;
newobject['applicationid'] = this.newguid();
this.sensorDataArray.push(newobject);

console.log(JSON.stringify( this.sensorDataArray[0]));
    this.service.fileUpload(JSON.stringify(this.sensorDataArray[0]), this.ThingName.value);
    this.toastr.success('Application Created','Congrats',{timeOut:3000});
    this.resetForm();
  }
}
