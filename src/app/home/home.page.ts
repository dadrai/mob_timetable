﻿import { Component, ElementRef, Injectable, NgZone, QueryList, ViewChildren } from '@angular/core';
import { ApiService } from '../api.service';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { ActionSheetController, Gesture, GestureController, IonCard } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})
export class HomePage {

  headers: HttpHeaders;
  days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  day:any=[];
  groups: any = [];
  today: any;
  Группа: any;
  RaspGr: any = [];
  Gruppa: any;
  DenNedeli: any;
  TipNedeli: any;
  Disciplina: any;
  DataZ: any;
  VremyaS: any;
  VremyaPo: any;
  Prepod: any;
  Ayditoriya: any;
  DateToday='Нет занятий'
  groupa:any;
  id_group:any;
 // groupa: string = '1001';
  date = new Date();
  vibor_day = this.date.getDay();

  week_today=this.getWeekNumber(this.date) + 18;
  chek_day:any=[];
  k:boolean=false;
  
  constructor(
    public _apiService: ApiService,
    public actionShCtrl: ActionSheetController,
    private http: HttpClient,
    private gestureCtrl:GestureController,
    private zone: NgZone
  ) {
    this.headers = new HttpHeaders();
    this.headers.append("Accept", 'application/json');
    this.headers.append('Accept-Charset', 'utf-8');
    this.headers.append('Content-Type', 'application/json; charset=utf-8');
    this.headers.append('Accept-Control-Allow-Origin', '*');
    this.getGroups();
    this.chek()
  this.d();
    //this.refresh();
    //this.getRaspGr();
    //this.getDateToday();
   


  }

  proverka() {
    console.log("124");
  }

 
  getWeekNumber(d:Date) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    let q = d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    let k = yearStart.getTime();
    var weekNo = Math.ceil(( ( (q - k) / 86400000) + 1)/7);
    // Return array of year and week number
    console.log('Week= '+weekNo);
    return weekNo;
    
}

pred_week(item:any){
  this.week_today-=1;
  this.vibor_day=6;
  console.log('Pr_wekk= '+this.week_today);
  item.close();
  return this.week_today;
}
next_week(item:any){
  this.week_today+=1;
  this.vibor_day=1;
  console.log('Nxt_wekk= '+this.week_today);
  item.close();
  return this.week_today;
}


chek(){
  
    this.chek_day[this.vibor_day-1]="checked";
    console.log('Chek =  '+this.chek_day);
  
}

  getGroups() {
    this._apiService.getGroups().subscribe((res: any) => {
      console.log(" getGroups SUCC ++++", res);
      this.groups = res;
      

    }, (error: any) => {
      console.log("getGroups ERrr ---", error);
    })
  }

  // getRaspGr(){

  //   this._apiService.getRaspGr().subscribe((res:any) => {
  //     console.log("getRaspG SUCC ++++", res);
  //     this.RaspGr = res;

  //   }, (error: any)=>{
  //     console.log("getRaspG ERrr ---", error);
  //   })
  // }

  getRaspGr() {
    this.d();
    const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
      "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

    var url = 'http://localhost/timetable/src/app/backend/getRaspGr.php?' + 'id_group=' + this.id_group
      + '&vibor_day=' + this.vibor_day +'&week_today='+this.week_today;
    this.http.get(url).subscribe((res: any) => {
      console.log("getRaspG SUCC ++++", res);
      this.RaspGr = res;
      if (res!=''){let dateStr = this.RaspGr[0].DataZ;
        let date = new Date(dateStr);
        this.DateToday = date.getDate() + " " + monthNames[date.getMonth()];
        console.log('DATA=' + this.DateToday);}
        else this.DateToday='Нет занятий';
      
    }, (error: any) => {
      console.log(url, "getRaspG ERrr ---", error);
    })
  }
ch_day(day:any){
this.vibor_day=day;
}

d(){
  
  this.day[0]="";
  this.day[1]="";
  this.day[2]="";
  this.day[3]="";
  this.day[4]="";
  this.day[5]="";
this.day[this.vibor_day-1]="act";
}

  refresh(item: any): void {
    // if (this.k==false) { this.k=true;  window.location.reload();  console.log('-' , this.k);}
    // else{console.log('+')}
    item.location.reload();
}
  // getDateToday(){
  //   let date: Date = new Date();  

  //   const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
  //   "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

  //  this.DateToday = date.getDate() + " " + monthNames[date.getMonth()];

  // }


}
