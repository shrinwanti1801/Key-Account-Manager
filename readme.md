 ## Project Overview  
 This project is designed to manage the scheduling and performance tracking for restaurants, including call follow-ups, orders, interactions, and more. It integrates with MySQL for database management and uses UTC for handling time zone differences.  ## System Requirements  
 - **Node.js** (version 14 or above)  
 - **MySQL** (version 5.7 or above)  
 - **NPM** (Node Package Manager)  
 - **Moment.js** (for handling date and time conversions)  
 
 ## Installation Instructions  
 1. **Clone the repository:**     
    `git clone` 
2.  `npm install`
`
3. 
`ServerPro=<your_production_host>
UsernamePro=<your_production_username>
PasswordPro=<your_production_password>
DB_NAMEPRO=<your_production_database_name>
TEST_DB_HOST=<your_test_db_host>
TEST_DB_USER=<your_test_db_user>
TEST_DB_PASSWORD=<your_test_db_password>
TEST_DB_NAME=<your_test_db_name>
`
    

Running Instructions
--------------------

1. npm run dev
    
2.  The application should now be running, and you can access it on the designated port (usually localhost:3000).
    

Test Execution Guide
--------------------

1.  npm test
    
2.  The tests will run, and you will get the results in your terminal.
  
# API Documentation

## **Restaurants API**

### 1. **POST** `/restaurants`
- **Authorization**: Admin, Manager
- **Description**: Create a new restaurant.
- **Body**: Restaurant details (e.g., name, address, status).
- **Controller**: `createRestaurantController`

### 2. **PUT** `/restaurants/:id`
- **Authorization**: Admin, Manager
- **Description**: Update an existing restaurant by ID.
- **Body**: Updated restaurant details (e.g., name, address, status).
- **Controller**: `updateRestaurantController`

### 3. **DELETE** `/restaurants/:id`
- **Authorization**: Admin
- **Description**: Delete a restaurant by ID.
- **Controller**: `deleteRestaurantController`

### 4. **GET** `/restaurants/:id`
- **Authorization**: Admin, Manager, KAM
- **Description**: Get a restaurant's details by ID.
- **Controller**: `getRestaurantByIdController`

### 5. **GET** `/restaurants`
- **Authorization**: Admin, Manager, KAM
- **Description**: Get a list of all restaurants.
- **Controller**: `getAllRestaurantsController`

#### SQL Schema for `restaurants` Table
| Field       | Type            | Null | Key | Default | Extra |
|-------------|-----------------|------|-----|---------|-------|
| id          | int             | NO   | PRI | NULL    | auto_increment |
| name        | varchar(255)    | NO   |     | NULL    |       |
| address     | text            | YES  |     | NULL    |       |
| status      | enum('New', 'Active', 'Inactive') | NO | | 'New'  |       |
| created_at  | timestamp       | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| updated_at  | timestamp       | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |

---

## **POCs API**

### 1. **POST** `/pocs`
- **Authorization**: Admin, Manager
- **Description**: Create a new POC (Point of Contact).
- **Body**: POC details (e.g., name, role, phone, email).
- **Controller**: `createPocController`

### 2. **PUT** `/pocs/:id`
- **Authorization**: Admin, Manager
- **Description**: Update an existing POC by ID.
- **Body**: Updated POC details.
- **Controller**: `updatePocController`

### 3. **DELETE** `/pocs/:id`
- **Authorization**: Admin
- **Description**: Delete a POC by ID.
- **Controller**: `deletePocController`

### 4. **GET** `/pocs/:id`
- **Authorization**: Admin, Manager, KAM
- **Description**: Get a POC's details by ID.
- **Controller**: `getPocByIdController`

### 5. **GET** `/pocs`
- **Authorization**: Admin, Manager, KAM
- **Description**: Get a list of all POCs.
- **Controller**: `getAllPocsController`

### 6. **GET** `/pocs/RestPocs/:restaurant_id`
- **Authorization**: Admin, Manager, KAM
- **Description**: Get all POCs by restaurant ID.
- **Controller**: `getAllPOCsByRestaurantId`

#### SQL Schema for `pocs` Table
| Field         | Type         | Null | Key | Default           | Extra                                         |
|---------------|--------------|------|-----|-------------------|-----------------------------------------------|
| id            | int          | NO   | PRI | NULL              | auto_increment                                |
| restaurant_id | int          | NO   | MUL | NULL              |                                               |
| name          | varchar(255) | NO   |     | NULL              |                                               |
| role          | varchar(100) | YES  |     | NULL              |                                               |
| phone         | varchar(15)  | YES  |     | NULL              |                                               |
| email         | varchar(255) | YES  |     | NULL              |                                               |
| created_at    | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at    | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |

---

## **Orders API**

### 1. **POST** `/orders`
- **Authorization**: Admin, Manager
- **Description**: Create a new order.
- **Body**: Order details (e.g., restaurant_id, order_date, order_amount, status).
- **Controller**: `createOrderController`

### 2. **PUT** `/orders/:id`
- **Authorization**: Admin, Manager
- **Description**: Update an existing order by ID.
- **Body**: Updated order details.
- **Controller**: `updateOrderController`

### 3. **DELETE** `/orders/:id`
- **Authorization**: Admin
- **Description**: Delete an order by ID.
- **Controller**: `deleteOrderController`

### 4. **GET** `/orders/:id`
- **Authorization**: Admin, Manager, KAM
- **Description**: Get an order's details by ID.
- **Controller**: `getOrderByIdController`

### 5. **GET** `/orders`
- **Authorization**: Admin, Manager, KAM
- **Description**: Get a list of all orders.
- **Controller**: `getAllOrdersController`

### 6. **GET** `/orders/Restorder/:restaurant_id`
- **Authorization**: Admin, Manager, KAM
- **Description**: Get all orders by restaurant ID.
- **Controller**: `getAllOrdersByRestaurantId`

#### SQL Schema for `orders` Table
| Field         | Type                                    | Null | Key | Default           | Extra                                         |
|---------------|-----------------------------------------|------|-----|-------------------|-----------------------------------------------|
| id            | int                                     | NO   | PRI | NULL              | auto_increment                                |
| restaurant_id | int                                     | NO   | MUL | NULL              |                                               |
| order_date    | date                                    | NO   |     | NULL              |                                               |
| order_amount  | decimal(10,2)                           | NO   |     | NULL              |                                               |
| status        | enum('Completed','Pending','Cancelled') | NO   |     | Pending           |                                               |
| created_at    | timestamp                               | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at    | timestamp                               | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |

---

## **Interactions API**

### 1. **POST** `/interactions`
- **Authorization**: Admin, Manager
- **Description**: Create a new interaction.
- **Body**: Interaction details (e.g., restaurant_id, interaction_date, details).
- **Controller**: `createInteractionController`

### 2. **PUT** `/interactions/:id`
- **Authorization**: Admin, Manager
- **Description**: Update an existing interaction by ID.
- **Body**: Updated interaction details.
- **Controller**: `updateInteractionController`

### 3. **DELETE** `/interactions/:id`
- **Authorization**: Admin
- **Description**: Delete an interaction by ID.
- **Controller**: `deleteInteractionController`

### 4. **GET** `/interactions/:id`
- **Authorization**: Admin, Manager, KAM
- **Description**: Get an interaction's details by ID.
- **Controller**: `getInteractionByIdController`

### 5. **GET** `/interactions`
- **Authorization**: Admin, Manager, KAM
- **Description**: Get a list of all interactions.
- **Controller**: `getAllInteractionsController`

### 6. **GET** `/interactions/restinter/:restaurant_id`
- **Authorization**: Admin, Manager, KAM
- **Description**: Get all interactions by restaurant ID.
- **Controller**: `getAllInteractionsByRestaurantId`

#### SQL Schema for `interactions` Table
| Field            | Type       | Null | Key | Default           | Extra                                         |
|------------------|------------|------|-----|-------------------|-----------------------------------------------|
| id               | int        | NO   | PRI | NULL              | auto_increment                                |
| restaurant_id    | int        | NO   | MUL | NULL              |                                               |
| interaction_date | date       | NO   |     | NULL              |                                               |
| details          | text       | YES  |     | NULL              |                                               |
| order_placed     | tinyint(1) | YES  |     | 0                 |                                               |
| created_at       | timestamp  | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at       | timestamp  | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |

---

## **Follow-up Calls API**

### 1. **POST** `/followupcalls`
- **Authorization**: Admin, Manager
- **Description**: Create a new follow-up call.
- **Body**: Follow-up call details (e.g., restaurant_id, poc_id, scheduled_date, status).
- **Controller**: `createFollowUpCallsController`

### 2. **PUT** `/followupcalls/:id`
- **Authorization**: Admin, Manager
- **Description**: Update an existing follow-up call by ID.
- **Body**: Updated follow-up call details.
- **Controller**: `updateFollowUpCallsController`

### 3. **DELETE** `/followupcalls/:id`
- **Authorization**: Admin
- **Description**: Delete a follow-up call by ID.
- **Controller**: `deleteFollowUpCallsController`

### 4. **GET** `/followupcalls/:id`
- **Authorization**: Admin, Manager, KAM
- **Description**: Get a follow-up call's details by ID.
- **Controller**: `getFollowUpCallByIdController`

### 5. **GET** `/followupcalls`
- **Authorization**: Admin, Manager, KAM
- **Description**: Get a list of all follow-up calls.
- **Controller**: `getAllFollowUpCallsController`

### 6. **GET** `/followupcalls/RestFollowUpCalls/:restaurant_id`
- **Authorization**: Admin, Manager, KAM
- **Description**: Get all follow-up calls by restaurant ID.
- **Controller**: `getAllFollowUpCallsByRestaurantId`

#### SQL Schema for `followupcalls` Table
| Field               | Type       | Null | Key | Default           | Extra                                         |
|---------------------|------------|------|-----|-------------------|-----------------------------------------------|
| id                  | int        | NO   | PRI | NULL              | auto_increment                                |
| restaurant_id       | int        | NO   | MUL | NULL              |                                               |
| poc_id              | int        | NO   | MUL | NULL              |                                               |
| scheduled_date      | date       | NO   |     | NULL              |                                               |
| status              | enum('Completed','Pending') | NO   | | Pending   |                                               |
| created_at          | timestamp  | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at          | timestamp  | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |



### 1. **POST** `/login`
- **Description**: Log in a user.
- **Authorization**: None (for login only)
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "userpassword"
  }
  ```
- **Response**: Authentication token and user details.
- **Controller**: `LoginController`
- **Validation**: `LoginValidation`

### 2. **POST** `/signup`
- **Description**: Create a new user account.
- **Authorization**: None (for signup only)
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "user@example.com",
    "password": "userpassword",
    "role": "Manager"
  }
  ```
- **Response**: Success message or error.
- **Controller**: `SignUpController`
- **Validation**: `SignUpValidation`

---

## **Users Table Schema**

| Field       | Type                              | Null | Key | Default           | Extra                                          |
|-------------|-----------------------------------|------|-----|-------------------|-----------------------------------------------|
| id          | int                               | NO   | PRI | NULL              | auto_increment                                |
| name        | varchar(255)                      | NO   |     | NULL              |                                               |
| email       | varchar(255)                      | NO   | UNI | NULL              |                                               |
| password    | varchar(255)                      | NO   |     | NULL              |                                               |
| role        | enum('Admin','Manager','KAM')     | NO   |     | NULL              |                                               |
| created_at  | timestamp                         | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at  | timestamp                         | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |

---

## **Example SQL Queries**

### **Login Query**
```sql
SELECT * FROM users WHERE email = 'user@example.com' AND password = 'userpassword';
```

### **Sign-Up Query**
```sql
INSERT INTO users (name, email, password, role)
VALUES ('John Doe', 'user@example.com', 'userpassword', 'Manager');
```

