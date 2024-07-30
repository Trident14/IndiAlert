# IndiAlert

IndiAlert is a real-time flight status update and notifications system designed to keep users informed about flight information and changes. The application uses a modern tech stack to ensure accurate, timely updates and alerts.

Springboot backend - IndiAlert folder
Node Js Backend - IndiAlertNode Folder
React Js Frontend - flight-status

## Tech Stack

- **Frontend:** React, CSS
- **Backend:** Java (Spring Boot), Node.js (Express)
- **Real-time Messaging:** Kafka
- **Database:** MongoDB
- **Real-time Updates:** Socket.IO
- **Email Notifications:** JavaMailSender

## Architecture

### Overview

IndiAlert is built with a microservice architecture to provide real-time flight status updates and notifications. Each component of the system plays a crucial role in ensuring seamless operation and accurate information delivery.

### Components

#### Main Server (Java Spring Boot)

- **Responsibilities:**
  - Fetches flight data from MongoDB at regular intervals.
  - Publishes updates to Kafka when changes are detected.
  - Handles email notifications using JavaMailSender and gmail SMTP.

- **Functionality:**
  - Uses scheduling to determine when to fetch new data.

#### Messaging (Kafka)

- **Responsibilities:**
  - Facilitates communication between the main server and notification service.
  - Publishes flight update messages to the Kafka topic `flightUpdate`.

#### Notification Service (Node.js)

- **Responsibilities:**
  - Listens to the Kafka topic `flightUpdates` for real-time updates.
  - Uses Socket.IO for real-time communication to push updates to the React frontend.

#### Frontend (React)

- **Responsibilities:**
  - Displays flight information in a table format.
  - Provides a search bar to filter flight data.
  - Updates flight information in real-time using Socket.IO.

#### Database (MongoDB)

- **Responsibilities:**
  - Stores flight data and related information.
  - Used by the Java server for fetching and updating flight details.

## Features

- **Real-Time Updates:** Receives and displays flight status updates instantly via Socket.IO.
- **Search Functionality:** Allows users to search for specific flight numbers.
- **Responsive Design:** Ensures usability across various devices with a responsive table design.
- **Email Notifications:** Alerts users about significant changes in flight status.

## Future Enhancements

- **Hosting:** Planning to use AWS, Google Cloud, or Azure for future hosting.
- **SMS Integration:** use Twilio or whatsapp to send notification to mobile.
- **Authentication:** Use JWT-based authentication and authorization.
- **Containerization:** Docker will be used for containerizing the application.
