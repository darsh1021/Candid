const express  = require('express');
const http = require("http");
const{Server} = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server,
    {
        cors:{
            origin:"https://candid-fawn.vercel.app",
            methods: ["GET","POST"]
        },
    }
);

app.get("/",(req,res) =>{
   res.send("Server is Working");
});

io.on("connection",(socket)=>{
    
    socket.on("join_room", ({ room, username }) => {
    socket.join(room);
    socket.to(room).emit("user_joined", username);
  });

    socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);

  });

    socket.on("typing", ({ room, username }) => {
    socket.to(room).emit("user_typing", username);
  });

});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log("SERVER IS RUNNING yoo");
});
