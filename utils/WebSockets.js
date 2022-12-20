class WebSockets {
  users = [];
  connection(client) {
    // event fired when the chat room is disconnected
    client.on('disconnect', () => {
      console.log('chat room is disconnected');
      this.users = this.users.filter(user => user.socketId !== client.id);
    });
    // add identity of user mapped to the socket id
    client.on('identity', userId => {
      console.log('identity');
      this.users.push({
        socketId: client.id,
        userId: userId,
      });
    });
    // subscribe person to chat & other user as well
    client.on('subscribe', (room, otherUserId = '') => {
      console.log('subscribe');
      console.log(otherUserId);
      this.subscribeOtherUser(room, otherUserId);
      client.join(room);
    });
    // mute a chat room
    client.on('unsubscribe', room => {
      console.log('unsubscribe');
      client.leave(room);
    });
  }

  subscribeOtherUser(room, otherUserId) {
    const userSockets = this.users.filter(user => user.userId === otherUserId);
    userSockets.map(userInfo => {
      const _id = userInfo.socketId;
      const socketConn = global.io.sockets.connected[`${_id}`];
      if (socketConn) {
        socketConn.join(room);
      }
    });
  }
}

module.exports = new WebSockets();
