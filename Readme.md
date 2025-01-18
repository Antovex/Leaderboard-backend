# Server
================

## Overview

This is a Node.js server application built using Express.js, Mongoose, and Cors. It provides a RESTful API for managing users and their claim history.

## Technology Stack

* Programming languages: JavaScript
* Frameworks: Express.js
* Databases: MongoDB
* Other dependencies: Mongoose, Cors, Dotenv

## Features

* User management: create, read and update operations for users
* Logs of Claimed points
* API endpoints for retrieving user data and claim history

## Getting Started

### Prerequisites

* Node.js (version 14 or higher)
* MongoDB (version 4 or higher)
* npm (version 6 or higher)

### Installation

1. Clone the repository: `git clone https://github.com/your-username/your-repo-name.git`
2. Install dependencies: `npm install`
3. Create a `.env` file with the following variables:
	* `PORT`: the port number to run the server on
	* `MONGO_URI`: the MongoDB connection string
4. Run the server: `npm start`

### Configuration

* The server listens on the port specified in the `PORT` environment variable.
* The MongoDB connection string is specified in the `MONGO_URI` environment variable.

### API Endpoints

* `GET /api/users`: retrieve a list of all users
* `POST /api/users`: create a new user
* `GET /api/history`: retrieve a list of all claim history
* `POST /api/claim-points/:userId`: create a new claim and adds history entry for a user

## Contributing

Contributions are welcome! Please submit a pull request with a clear description of the changes.

## License

This project is licensed under the ISC License.