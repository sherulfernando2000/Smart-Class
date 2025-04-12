# SmartClass

SmartClass is a full-stack web application designed to streamline the management of tuition classes for teachers and students. It provides a digital alternative to traditional classroom management, inspired by platforms like Google Classroom.


## Features

- **For Teachers:**
  - Create and manage classes
  - Add and manage students
  - Assign and grade work
  - Track student attendance
  - Handle payments and fees

- **For Students:**
  - Join classes with invitation codes
  - View and submit assignments
  - Check attendance records
  - View payment history

## 🧩 Tech Stack

## Frontend
- React.js
- Axios
- Tailwind CSS / MUI

### Backend
- Spring Boot
- Spring Security
- JPA
- JWT Authentication

### Database
- MySQL



## 🚀 Getting Started

Follow these instructions to set up the project locally for development and testing purposes.

### Prerequisites

- JDK 20
- Node.js (latest stable version)
- MySQL Server
- Maven

### Front end Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sherulfernando2000/Smart-Class

    ```
2. change the directory
  ```bash    
    cd classroom-frontend
   ```

3. Configure your MySQL database in application.properties:
 - spring.datasource.url=jdbc:mysql://localhost:3306/smartclass
 - spring.datasource.username=your_username
 - spring.datasource.password=your_password
 - spring.jpa.hibernate.ddl-auto=update

4.**run the backend**
```bash
mvn clean install
mvn spring-boot:run
```
## Back end Installation
```bash

# Change into the project directory
  cd classroom-backend

# Install frontend dependencies
  npm install

# Start the frontend development server
  npm run dev
```
## Youtube Video
https://youtu.be/Q7DcbatNwmw

## Screenshots

![Screenshot (193)](https://github.com/user-attachments/assets/9c8f2baf-d584-4492-98f1-22152161664c)
![Screenshot (194)](https://github.com/user-attachments/assets/f72bcf26-5bf6-4167-96f6-26d9528d9f69)
![Screenshot (195)](https://github.com/user-attachments/assets/be21c2a3-207d-487b-a3ad-c116554f71cc)
![Screenshot (197)](https://github.com/user-attachments/assets/a2893cb6-91de-4bfc-b25e-19970ee1e05b)
![Screenshot (199)](https://github.com/user-attachments/assets/1f40e62d-3fc7-442f-9593-df4b1a6ebadd)
![Screenshot (201)](https://github.com/user-attachments/assets/30cef928-b915-4274-9ee4-2211fc8ea849)
![Screenshot (192)](https://github.com/user-attachments/assets/9fbb20d0-b14c-4a2e-ad73-05049781e42b)
