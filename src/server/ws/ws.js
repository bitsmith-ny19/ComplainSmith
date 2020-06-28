const { getIDAndPictureByUsername, saveMessageToDB } = require('../utils/dbUtils');
const moment = require('moment');
const db = require('../models/elephantsql');
const redis = require('../redis/redis');
moment().format();

module.exports = (http) => {
  const io = require('socket.io')(http);

  io.on('connect', (socket) => {
    console.log('a user connected');

    // TODO: on message should do the following:
    //       1. save the message to database
    //       2. forward the message to all connected users
    socket.on('message', async ({ message, username }) => {
      const { user_id, userURL } = await getIDAndPictureByUsername(username);
      const timestamp = moment();
      const newMessage = { message: message, username, userURL, timestamp };
      console.log("X".repeat(20), newMessage); /*NOT TO MERGE --DAN*/
      const dbMessage = { user_id, message };
      try {
        await saveMessageToDB(dbMessage);
        io.emit('newMessage', newMessage);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('signin', ({ username }) => {
      redis.set(socket.id.toString(), username);
      redis.set(username, 'true');
    });

    // TODO: on disconnect, should free the user id from the redis database
    socket.on('disconnect', () => {
      console.log('a user disconnected');
      redis.get(socket.id.toString(), (err, username) => {
        if (err) return console.error(err);
        console.log(username, 'disconnected');
        if (!username) return;
        redis.del(socket.id.toString());
        redis.del(username);
      });
    });
  });
  return io;
};

/* messageObject = {
message: String,
username:  String,
userURL:  String,
timestamp: String (format will be h:mm a)
}
*/

/*
  sendMessage = {
  username: String,
  message: String,
  }
 */
