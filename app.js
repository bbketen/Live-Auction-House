let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/AuctionHouses', (err) => {
  if(err){
    console.log("error" + err);
  } else{
    console.log("mongodb connected");
  }
})

let schema = mongoose.Schema;


let Auction = new schema({
  bids:{
    name:String,
    bid:Number,
    bidDate:Date
  },
  deadLine:Date
})
const id = mongoose.Types.ObjectId("5c9247757f34f23b40cfd3ba");

let clients = [];

let bidModel = mongoose.model('auction', Auction);
//let ObjectId = mongoose.Types.ObjectId;

io.on("connection", socket =>{
  console.log("User connected");
  clients.push(socket.id);
  
  if(clients != []){
    for(let i = 0; i< clients.length; i++){
      if(io.sockets.connected[clients[i]] != undefined){
        io.sockets.connected[clients[i]].emit("user", "User" + (i + 1));
      }
    }
  }


  socket.on("disconnect", function() {
    console.log("user disconnected");
    io.emit("user", "User" + Object.keys(io.sockets.connected).length);
  });

  socket.on("find", function(msg){
    bidModel.aggregate([
      { $unwind: '$bids'},
      { $sort: {
        "bids.bid" : -1
      }},
      { $limit : 2}
    ], function(err,msg){
      if(err){
        console.log(err);
      } else{
        io.emit("found", msg);
        console.log(msg);
      }
    })
  })

  socket.on("insert", function(msg){
    console.log(msg.bids);
    bidModel.findOneAndUpdate({_id:id}, {
      $push: {
        bids:msg.bids
      }
    }, {new:true} ,function(err,msg){
      if(err){
        console.log(err);
      } else{
        console.log(msg);
      }
    })
  })

  socket.on("delete", function(){
    bidModel.findOneAndUpdate({_id:id}, {
      $unset: {
        bids:[]
      }
    }, function(err){
      if(err){
        console.log(err);
      } else{
        io.emit("deleted", "deleted")
      }
    })
  })
})

http.listen(5000, () => {
  console.log("started on port 5000");
});
