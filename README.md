## MERN E-Shop: A Seamless Shopping Experience Powered by the MERN Stack, Redux Toolkit

**MERN E-Shop** is a full-stack application designed to transform your online shopping experience. Built with the MERN stack (MongoDB, Express.js, React, Node.js), it leverages Redux Toolkit for efficient state management . This project offers a seamless experience to browse through products and create orders

# **Features**

- **User:**
  - Login with a registered user.

- **Product Management:**  
  - List products in dashboard, product details page
  
- **Address Management:**
  - Manage email, mobile, and addresses of user, add/update/delete multiple addresses.
  
- **Shopping Cart:**
  - Add products, adjust quantities, and view subtotals.

- **Order Management:**
  - Create new orders and view order history.

- **Security Management:**
  - Login, Token Authentication and Signout.

- **Product images:**
  - The images for each product were uploaded in cloudinary and the URLs will be stored in DB


# **Project Setup**

### Prerequisites
- Node.js ( version v20.19.0 or later )
- MongoDB installed and running locally or should have atlas cloud account to setup mongodb online.
  Please follow steps available in the internet to setup monodb either locally or in atlas cloud..

### Clone the project

```bash
  git clone https://github.com/bharathyelligari/assessment-final.git
```

### Navigate to the project directory

```bash
  cd assessment-final
```

### Install dependencies for frontend and backend separately
**Tip:** To efficiently install dependencies for both frontend and backend simultaneously, use split terminals.

Install frontend dependencies:
```bash
cd frontend
npm install or npm install --legacy-peer-deps 
```

Install backend dependencies:
```bash
cd backend
npm install or npm install --legacy-peer-deps
```

### Environment Variables

**Backend**
- Create a `.env` file in the `backend` directory.
- Add the following variables with appropriate values
```bash

##Database connection details ::

#If you are using local mongo setup you can update DATABASE_LOCAL with your connection string
DATABASE_LOCAL=mongodb://localhost:27017/your-database-name

#If you are using Atlas cloud account you can update DATABASE with your connection string and update the details of Database name, username and password
DATABASE=mongodb+srv://your-database-username:<PASSWORD>@cluster0.wku0a.mongodb.net/your-database-name
DATABASE_PASSWORD=your-database-password

# Frontend URL (adjust if needed)
PORT=8000

# Secret key for jwt security
SECRET_KEY="your-secret-key"

**Frontend**
- Create a `.env` file in the `frontend` directory
- Add the following variable:
```bash
# Backend URL (adjust if needed)
REACT_APP_BASE_URL="http://localhost:8000/api" 
```

**Important**
- Replace all placeholders (e.g., your_database_name, your_email) with your actual values.
- Exclude the `.env` file from version control to protect sensitive information.

### Data seeding
- **Get started quickly with pre-populated data**: Populate your database with a sample user and products enabling you to test functionalities without manual data entry.
This will insert an user to login and products to work with 

**Steps**:
- Open a new terminal window.
- Navigate to the `backend` directory: `cd backend`
- Run the seeding script: `npm run seed` ( This script executes the `seed.js` file within the `dev-data` subdirectory equivalent to running `node dev-data/seed.js` )
### Running Development Servers

**Important:**

- **Separate terminals**: Run the commands in separate terminal windows or use `split terminal` to avoid conflicts.
- **Nodemon required**: Ensure you have `nodemon` installed globally to run the backend development servers using `npm run dev`. You can install it globally using `npm install -g nodemon`.

#### Start the backend server
- Navigate to the `backend` directory: `cd backend`
- Start the server: `npm run dev` (or npm start)
- You should see a message indicating the server is running, usually on port 8000.
     
#### Start the frontend server:
- Navigate to the `frontend` directory: `cd frontend`
- Start the server: `npm start`
- You should see a message indicating the server is running, usually on port 3000.

### Login with demo account 
- After successfully seeding the database, you can now explore the application's functionalities using pre-populated Products.
- here are the `login credentials`
```bash
  email: test@gmail.com
  pass: test@123
```

- **Please Note**: While the demo account provides a convenient way to explore many features, it has some limitations:
    - **Register User**: There is no facility to register an user from the screen and the cart and orders were not user specific.

    **Payment service**: Currently there is no payment serive integrated to test
    
### Accessing the Application
Once both servers are running, you can access them at the following URL's:
- Backend: http://localhost:8000
- Frontend: http://localhost:3000


