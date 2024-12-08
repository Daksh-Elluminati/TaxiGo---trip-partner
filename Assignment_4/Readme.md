# **TaxiGo Project**

## **Overview**

TaxiGo is a comprehensive platform for managing taxi rides, designed for admins, drivers, and users. The system integrates robust backend services with an interactive frontend, ensuring an efficient and user-friendly experience.

---

## **Tech Stack**

### **Frontend**
- **Ionic Framework**: Mobile-optimized, cross-platform UI.
- **React with TypeScript**: For building interactive, type-safe frontend components.
- **Fetch API**: Simplifies API integration and data fetching.
- **HTML/CSS**: Core technologies for structuring and styling the application.

### **Backend**
- **NestJS**: Scalable backend framework for REST API development.
- **MongoDB**: Stores ride, user, and driver data securely.
- **JWT**: Implements secure authentication and role-based access control.
- **BCrypt**: Ensures secure password hashing.

---

## **Features**

### **Frontend**
1. **Navigation Structure**:
   - Includes pages for Home, Rides, Ride History, and Profile.

2. **Current Ride Management**:
   - **Admin**: View all rides.
   - **Driver**: Accept and complete assigned rides.
   - **User**: View rides tied to their account.

3. **Ride History**:
   - Displays completed rides, filtered by roles.

4. **Authentication**:
   - Login and registration functionalities using JWT.

5. **Dynamic Role-Based Access**:
   - **Admins**: Manage all rides and users.
   - **Drivers**: See assigned rides or accept new ones.
   - **Users**: View bookings and manage profiles.

---

### **Backend**
1. **Authentication and Authorization**:
   - Secure login and registration.
   - Role-based access for admins, drivers, and users.

2. **RESTful APIs**:
   - Handles ride operations (create, update, fetch current rides, fetch history).
   - Manages user and driver data.

3. **Database Integration**:
   - MongoDB securely stores user credentials, rides, and driver details.

4. **Key Endpoints**:
   - **Rides**:
     - `POST /ride/addRide`: Adds a new ride.
     - `PATCH /ride/editRide/:id`: Updates ride status dynamically.
     - `GET /ride/getCurrentRideList`: Retrieves ongoing rides.
     - `GET /ride/getRideHistoryList`: Retrieves completed rides.
   - **Users**:
     - `GET /user/details`: Fetch user profile information.
     - `POST /user/register`: Register new users.
     - `POST /user/login`: Authenticate users.
   - **Drivers**:
     - `GET /driver/getDriverDetails`: Fetch driver details.
     - `PATCH /driver/editDriver/:id`: Updates driver information.

---

## **Installation**

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>


## **Installation Instructions**

### **Install Dependencies**

#### **Frontend**
```bash
cd frontend
npm install --legacy-peer-deeps

## Backend ##
cd Backend/TaxiGo
npm install
npm run start:dev

## Frontend ##
npm start

