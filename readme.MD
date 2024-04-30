# Video Streaming Application

This is a simple video streaming application built with Node.js, Express.js, and MongoDB for the backend, and vanilla Javascript and HTML for the frontend.

## Features

- Stream video files from the backend server to the client.
- Support for range requests for efficient video streaming.
- Basic MongoDB integration for storing application data.

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js and npm (Node Package Manager)
- MongoDB (optional, if you want to use a database)

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/SunkePavanKumar/VideoStreamBackend.git
   ```

2. Navigate to the backend directory:

   ```bash
   cd backend
   ```

3. Install dependencies

   ```bash
       npm install
   ```

4. Create a .env file in the backend directory and define your MongoDB connection URI:

   ```bash
       MONGO_URI=<your-mongodb-uri>
   ```

5. Start the backend server:

   ```bash
       npm start
   ```

6. Application will serve on port 5000

7. Navigate to the frontend folder. Open the index.html. Now you can see the video is being served.(streamed)
