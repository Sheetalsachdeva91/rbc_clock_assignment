import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  @ViewChild("hrHand", { static: false }) hrHand: ElementRef;
  @ViewChild("minHand", { static: false }) minHand: ElementRef;
  @ViewChild("secHand", { static: false }) secHand: ElementRef;
  public currentDate: Date;
  public initialTimer;
  public newSeconds;
  public daysArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  public dDate = new Date();
  public dHour: any;
  public dMinute: string;
  public dSecond: string;
  public ampm: string;
  public day: string;
  public digitalTimer;
  public currDate = new Date();
  public newHour;
  public newMinutes;
  public modifiedDate;
  public hours;
  public minutes;
  public seconds;
  public meridian;
  public incrementingTimer;
  public value;
  ngOnInit() {
    this.initialTimer = setInterval(() => {
      this.currentDate = new Date();
      this.updateClock(this.currentDate);
    }, 1000);

    this.digitalTimer = setInterval(() => {
      let date = new Date();
      this.updateDigital(date, "");
    }, 1000);

  }

  updateClock(date) {
    // console.log('date',date);
    this.secHand.nativeElement.style.transform =
      "rotate(" + date.getSeconds() * 6 + "deg)";
    this.minHand.nativeElement.style.transform =
      "rotate(" + date.getMinutes() * 6 + "deg)";
    this.hrHand.nativeElement.style.transform =
      "rotate(" + (date.getHours() * 30 + date.getMinutes() * 0.5) + "deg)";
  }

  updateDigital(date, meridian) {
    this.hours = date.getHours();
    if (meridian === "AM") {
      this.ampm = "AM";
    } else if (meridian === "PM") {
      this.ampm = "PM";
    } else {
      this.ampm = this.hours >= 12 ? "PM" : "AM";
    }
    this.dHour = this.hours % 12;
    this.dHour = this.dHour ? this.dHour : 12;
    this.dHour = this.dHour < 10 ? "0" + this.dHour : this.dHour;

    this.minutes = date.getMinutes();
    this.dMinute =
      this.minutes < 10 ? "0" + this.minutes : this.minutes.toString();

    this.seconds = date.getSeconds();
    this.dSecond =
      this.seconds < 10 ? "0" + this.seconds : this.seconds.toString();
  }

  onTimeChange(data) {
    console.log("data.target.value", data);
    this.value= data.target.value;
    let timeSplit = data.target.value.split(":"),
      hours: number,
      minutes,
      seconds,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    seconds = "0";
    if (hours > 12) {
      this.meridian = "PM";
      hours -= 12;
    } else if (hours < 12) {
      this.meridian = "AM";
      if (hours === 0) {
        hours = 12;
      }
    } else {
      this.meridian = "PM";
    }
    this.currentDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      hours,
      minutes,
      seconds
    );
    console.log("meridian", this.meridian);

    clearInterval(this.initialTimer);
    clearInterval(this.digitalTimer);
    this.newHour = this.currentDate.getHours();
    this.hours = this.newHour;
    this.newMinutes = this.currentDate.getMinutes();
    this.minutes = this.newMinutes;
    this.newSeconds = this.currentDate.getSeconds();
    this.seconds = this.newSeconds;

    const inputMinutes =
      (this.currentDate.getMinutes() < 10 ? "0" : "") +
      this.currentDate.getMinutes();
    const inputHours =
      (this.currentDate.getHours() < 10 ? "0" : "") +
      this.currentDate.getHours();

    var inputTime = inputHours + ":" + inputMinutes;
    (document.getElementById(
      "dtimeInput"
    ) as HTMLInputElement).value = inputTime;
    (document.getElementById(
      "timeInput"
    ) as HTMLInputElement).value = inputTime;

    var timeControl = document.querySelector('input[type="time"]');
    //timeControl.value = '15:30';

    this.modifiedDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      this.newHour,
      this.newMinutes,
      this.newSeconds
    );
    clearInterval(this.incrementingTimer);
    this.incrementingTimer = setInterval(() => {
      this.increment(this.modifiedDate);
    }, 1000);
    setInterval(() => {
      this.modifiedClock(this.modifiedDate);
      this.updateDigital(this.modifiedDate, this.meridian);
    }, 1000);
  }

  increment(newDate) {
    newDate.setSeconds(newDate.getSeconds() + 1);
    if (newDate.getSeconds() === 60) {
      newDate.setMinutes()(newDate.getMinutes()() + 1);
    }
    if (newDate.getMinutes() === 60) {
      newDate.setHours()(newDate.getHours()() + 1);
    }
    this.modifiedDate = newDate;
  }

  modifiedClock(modifiedDate) {
    this.secHand.nativeElement.style.transform =
      "rotate(" + modifiedDate.getSeconds() * 6 + "deg)";
    this.minHand.nativeElement.style.transform =
      "rotate(" + modifiedDate.getMinutes() * 6 + "deg)";
    this.hrHand.nativeElement.style.transform =
      "rotate(" +
      (this.currentDate.getHours() * 30 + modifiedDate.getMinutes() * 0.5) +
      "deg)";
  }
}
