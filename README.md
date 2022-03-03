# NMRR-API

API for noaya meeting room resevation

## Prerequisite

- Install MongoDB
- Install NodeJS

### Environment Setup

1. Copy .env.example and rename it to .env
2. Use default values or change it according to your machine setup

### Start Development Server

1. `npm install`
2. `npm run dev`
3. Server is at http://localhost:3000 by default.

### Routes

- Auth
  - Login
  ```
  POST ~/auth/login
  ```
  - Logout
  ```
  POST ~/auth/logout
  ```
- User
  - Create User
  ```
  POST ~/user
  ```
- Room
  - Get All Rooms
  ```
  GET ~/rooms/
  ```
  - Get Room by ID
  ```
  GET ~/rooms/:id
  ```
  - Create Room
  ```
  POST ~/rooms/
  ```
- Booking
  - Get All Room Bookings by Room ID
  ```
  GET ~/bookings/room/:roomId
  ```
  - Get Booking by ID
  ```
  GET ~/bookings/:id
  ```
  - Create Booking
  ```
  POST ~/bookings/
  ```

## Authors

Contributors names and contact info

Vanessa Tan (vct@noaya.no)

## Acknowledgments

Inspiration, code snippets, etc.

- [How to Create a Simple REST API using TypeScript and Node.js](https://www.section.io/engineering-education/how-to-create-a-simple-rest-api-using-typescript-and-nodejs/)
- [Build A REST API With Node.js, Express, & MongoDB](https://youtu.be/fgTGADljAeg)
- [Build Node.js User Authentication - Password Login](https://youtu.be/Ud5xKCYQTjM)
- [JWT Authentication Tutorial - Node.js](https://youtu.be/mbsmsi7l3r4)
