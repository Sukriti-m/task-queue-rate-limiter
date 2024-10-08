
# User Task Queuing with Rate Limiting

## Overview

This project implements a Node.js API that handles task processing using a queue system managed by Bull and Redis. It also includes rate limiting for task requests based on user IDs. The application is clustered to enhance performance and reliability.

## Features

- **Task Queuing**: Manages tasks asynchronously using Bull.
- **Rate Limiting**: Enforces limits on task requests per second and per minute per user ID.
- **Clustering**: Uses Node.js clustering to improve performance by utilizing multiple CPU cores.
- **Logging**: Logs task completions with user IDs and timestamps.

## Prerequisites

- Node.js
- Redis
- npm

## Installation

1. **Start Redis Server on one terminal**
`
     redis-server --port 6380
`

 2. **Install Dependencies on other terminal**
`
    npm install
`
 3. **Start the API**
`
    npm start
`
 4. **Test the API**
`
curl -X POST -H "Content-Type: application/json" -d '{"user_id":"123"}' http://localhost:3000/api/v1/task
`

> To test the API, you can use Postman or `curl` to send POST requests to `http://localhost:3000/api/v1/task`


## Folder Structure

-   **`src/`**: Contains the source code for the application.
    -   **`controller/`**: Contains controller files.
        -   **`taskController.js`**: Handles task processing requests.
    -   **`middleware/`**: Contains middleware functions.
        -   **`rateLimit.js`**: Implements rate limiting logic.
    -   **`service/`**: Contains service-related code.
        -   **`taskQueue.js`**: Manages the Bull queue and task processing.
    -   **`log/`**: Contains log files.
        -   **`task.log`**: Logs task completion details.
    -   **`index.js`**: Main entry point for the application.
    -   **`task.js`**: Contains the task function that processes tasks.
-   **`package.json`**: Project metadata and dependencies.
-   **`package-lock.json`**: Dependency tree and versions.
-   **`README.md`**: Documentation for the project.
