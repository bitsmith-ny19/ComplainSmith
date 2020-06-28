/* to test: you can, if desired, create a new npm project
 *   install socket.io-client npm package, and run this client
 *   and run this test from that npm project

 *  purpose of the test:
 *   - that socket will reject connection from a non oauth verified request
 *   - that a signed in connection (following sucessful "signin" event)
 *      cannot send a message from a different pokemon

 *   - configuration for the test: set in the 'users' table -
 *      the test users 'efg', 'abc2' (I bypass oauth so that this
 *      I could implmement the test in less time...) as in line 8, 9,
 *      or change these to some different pokemon
 *   -  if with bypass of oath, note that hardcoded cookies "abc123"
 *      and "efg123" for the purpose of this test

 *    - at the moment, the messages from this client that has no
 *      cookie were posted to the db... it seems that this could be
 *      a security flaw...
 */
var socket = require( "socket.io-client")("http://localhost:8080");
socket.on("connect", () => console.log("*".repeat(20), "...socket connected..") );
socket.emit("signin", {username: "efg"} );
  socket.emit( "message", {username:"efg", message:"test post from socket.io-client without cookie"} );
  socket.emit( "message", {username:"abc2", message:"test post from user different from the user that was signed in"} );
