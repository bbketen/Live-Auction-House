import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'auction-app';
  Bid = 1;
  Bidder = "";
  obj= {
    bids:{
      name:"",
      bid:0,
      bidDate: new Date()
    }
  }
  deadline = new Date("2019-03-08T18:00:00");
  interval;
  timer=0;
  userName = "";
  timeChecker = 0;
  socket = io('http://localhost:5000');

  constructor(){  }

  ngOnInit(){
    this.socket.on('user', (msg)=>{
      this.userName = msg;
      console.log(msg);
    })
    this.socket.on("found", (data)=>{
      console.log(data);
      if(data[0] != undefined){
        if(data[0].bids.bid != 1){
          let d = new Date().toISOString();
          console.log(d);
          if(this.timeChecker != 1){
            this.timer = ((Date.parse(d) - Date.parse(data[0].bids.bidDate))/1000)|0
            clearInterval(this.interval);
            this.startTimer();
          }
          this.Bidder = data[0].bids.name;
          if(data[1] != undefined){
            this.Bid = data[1].bids.bid+1;
          }
        }
      }
    })
    this.socket.on('deleted', (msg) => {
      console.log(msg);
      this.Bid = 1;
      this.Bidder = "";
      this.timer = 0;
      clearInterval(this.interval);
    })
    this.socket.emit("find");
  }


  startTimer(){
    this.interval = setInterval(() => {
      this.timer++
    }, 1000)
  }

  sendMessage(name,bid) {
    this.obj.bids.bid = bid;
    this.obj.bids.name = name;
    this.obj.bids.bidDate = new Date();
    this.socket.emit('insert', this.obj);
    this.socket.emit("find");
  }

  refresh(){
    this.socket.emit('delete');
    this.socket.emit("find");
  }
}
