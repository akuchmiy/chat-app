# chat-app
A simple chat application written in [`Vue`](https://vuejs.org), [`Node.js`](https://nodejs.org/en/) and uses [`MongoDB`](https://www.mongodb.com)

## Architecture
### Database schemas
#### Room
```javascript
const room = new Schema({
  name: { type: String, required: true },
  users: [{
    id: {type: Schema.Types.ObjectId, ref: 'User'},
    username: {type: String}
  }],
})
```
#### User
Password is stored as a hash
```javascript
const user = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rooms: [{
    id: {type: Schema.Types.ObjectId, ref: 'Room'},
    name: {type: String},
  }],
})
```
#### Message
```javascript
const message = new Schema({
  user: {
    id: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    username: {type: String, required: true}
  },
  room: { type: Schema.Types.ObjectId, required: true, ref: 'Room' },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
})
```
### Server
Server consists of [`Express`](https://expressjs.com) and [`Socket.io`](https://socket.io) instances
`Express` routes:
- Rooms
- Users
- Messages

`Socket.io` handles:
- Connection
- User messages
- Disconnection

### Client
#### Framework - `Vue`
#### State manager - `Vuex`
#### Router - `Vue Router`

#### Link - (in future) 

## Project setup
**Project is configured to use Vue CLI for development and production**
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Runs the server, which connects to the Cloud DB - MongoDB Atlas
Before running this command you have to create `.env.local` file in the root of the project, and create there 2 variables:
- `SECRET_KEY`, a key that server will use to sign the payload and create a JWT
- `MONGO_STRING`, a connection string to your database
```
npm run startDev
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
