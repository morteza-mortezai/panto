# PANTOhealth Test

This project is a NestJS microservice monorepo that processes x-ray data from IoT devices. It consists of two main applications:

- **Producer**: Simulates IoT devices by generating x-ray data and sending it to RabbitMQ.
- **Panto**: Consumes x-ray data from RabbitMQ, processes and stores the data in MongoDB, and provides a REST API for data retrieval and analysis.

## Table of Contents
- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Components](#components)
- [Data Flow](#data-flow)
- [Prerequisites](#prerequisites)
- [Setup and Run](#setup-and-run)
  - [Using Docker Compose](#using-docker-compose)
  - [Local Development](#local-development)
- [API Documentation](#api-documentation)
- [Swagger Integration](#swagger-integration)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Assignment Requirements](#assignment-requirements)
- [License](#license)

## Project Overview
This NestJS-based IoT Data Management System receives x-ray data messages sent by IoT devices, processes the information, and stores the results in a MongoDB collection. The processed data can then be accessed and analyzed via a RESTful API. RabbitMQ is used as the messaging backbone to decouple the data producer from the data processing application.

### Sample x-ray data format:
```json
{
  "66bb584d4ae73e488c30a072": {
    "data": [
      [
        762,
        [
          51.339764,
          12.339223833333334,
          1.2038000000000002
        ]
      ],
      [
        1766,
        [
          51.33977733333333,
          12.339211833333334,
          1.531604
        ]
      ],
      [
        2763,
        [
          51.339782,
          12.339196166666667,
          2.13906
        ]
      ]
    ],
    "time": 1735683480000
  }
}
```

## Architecture
The project is structured as a monorepo with two primary NestJS applications:

### **Producer App**
- Generates sample x-ray data.
- Publishes x-ray messages to a RabbitMQ queue (named "xray").

### **Panto App**
- Listens to the RabbitMQ "xray" queue.
- Processes the incoming data (e.g., extracting deviceId, timestamp, data length, and data volume).
- Stores processed records in MongoDB.
- Provides REST API endpoints to perform CRUD operations and data analysis.

These applications interact with two additional services:

- **RabbitMQ**: Acts as the messaging broker.
- **MongoDB**: Stores the processed x-ray data (signals).

## Components
### **Producer**
- Built with NestJS.
- Simulates IoT device data.
- Publishes messages to RabbitMQ.

### **Panto**
- Built with NestJS.
- Processes incoming x-ray data.
- Stores data in MongoDB.
- Exposes REST API endpoints for data retrieval and filtering.

### **RabbitMQ**
- Provides messaging between Producer and Panto.
- Uses the "xray" queue to transmit messages.

### **MongoDB**
- Hosts the database where processed signals (x-ray data) are stored.

## Data Flow
1. **Data Generation**:
   - The Producer app generates sample x-ray data and sends it to RabbitMQ using a designated queue.

2. **Message Consumption**:
   - The Panto app consumes the messages from the RabbitMQ "xray" queue.

3. **Data Processing**:
   - The Panto app processes the x-ray data by extracting essential information (e.g., deviceId, timestamp, data length, and volume) and then stores it in the signals collection in MongoDB.

4. **Data Exposure**:
   - The Panto app exposes REST API endpoints to perform CRUD operations and data analysis on the stored signals.

## Prerequisites
- Docker
- Docker Compose
- (Optional) Node.js for local development without Docker

## Setup and Run
### Using Docker Compose
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```
2. Set up environment variables:
   - **RABBITMQ_URI** (e.g., `amqp://rabbitmq:5672`)
   - **RABBITMQ_QUEUE** (e.g., `xray`)
   - **MONGODB_URI** (e.g., `mongodb://mongodb:27017/panto`)
   
   These variables are set in the Docker Compose file.

3. Run the application:
   ```sh
   docker-compose up --build
   ```
4. Service Ports:
   - RabbitMQ: AMQP on port `5672`, Management UI on port `15672`
   - MongoDB: Port `27017`
   - Panto App: Port `3001`
   - Producer App: Port `3002`

### Local Development
1. Install dependencies:
   ```sh
   npm install
   ```
2. Run the individual applications:
   - **For Panto**:
     ```sh
     npm run start:panto
     ```
   - **For Producer**:
     ```sh
     npm run start:producer
     ```
   Make sure to configure your local environment variables appropriately (you can use a `.env` file).

## API Documentation
The Panto application exposes a RESTful API for accessing processed x-ray data. Swagger documentation is integrated and available at:

### **Swagger Integration**
- Access the API documentation via Swagger UI:
  ```
  http://localhost:3001/api-doc
  ```
- You can use Swagger to test CRUD operations and filtering endpoints for signals.

## Testing
This project includes unit tests for key components of the Panto application.

From the root of the repository, you can run all tests using:
```sh
npm run test
```

## Project Structure
```
.
├── apps
│   ├── panto
│   │   ├── src
│   │   │   ├── main.ts
│   │   │   └── modules/...
│   │   └── Dockerfile.panto
│   └── producer
│       ├── src
│       │   ├── main.ts
│       │   └── modules/...
│       └── Dockerfile.producer
├── docker-compose.yml
├── package.json
└── README.md
```

## Assignment Requirements
This project fulfills the following requirements:
- **RabbitMQ Module Integration**
  - Establishes a connection to RabbitMQ.
  - Asserts the required queues (e.g., "xray").
  - Implements a consumer for processing x-ray data.
- **Data Processing and Storage**
  - Implements a Mongoose schema/model for x-ray data.
  - Extracts key information and stores it in MongoDB.
- **API Development**
  - Provides RESTful API endpoints with CRUD and filtering capabilities.
- **Producer Application**
  - Simulates IoT devices and sends sample x-ray data.
- **Dockerization**
  - Fully containerized with Docker Compose for easy deployment.


