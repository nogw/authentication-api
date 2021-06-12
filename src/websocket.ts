import * as socketio from "socket.io";

const socketListeners = (io: any) => {
  io.sockets.on("connection", (socket: socketio.Socket) => {
    socket.on("join", (room) => {
      socket.join(room)
  
      socket.on("jwt", (jwt) => {
        socket.broadcast.to(room).emit("auth", jwt)
      })
    })
  })
}

export default {
  socketListeners
}