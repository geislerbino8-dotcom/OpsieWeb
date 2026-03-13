# OPSIE SOFTWARE SOLUTIONS INC.
![Opsie Logo.](/frontend/src/assets/opsie/opsie_full.jpg)
Landing page for Opsie Software Solutions Inc., where ideas are turned into scalable and maintainable software systems.

## MERN Stack Technology
This project is built using the MERN stack, a popular full-stack JavaScript framework that enables seamless development of modern web applications.

| Layer          | Technology          |
|----------------|---------------------|
| Frontend       | ReactJS + Vite      |
| Backend        | NodeJS w/ ExpressJS |
| Database       | MongoDB / JSON      |
| Versioning     | Git + Github        |
| Dev Tools      | VS Code, Postman    |

```mermaid
flowchart TB
    %% ===== Client Layer =====
    subgraph Client Layer
        U[End User<br/>Browser / Mobile]
        FE[React.js Frontend<br/>Components, Routing, State]
    end

    %% ===== Application Layer =====
    subgraph Application Layer
        API[Node.js + Express.js<br/>REST API Server]
        BL[Business Logic Layer]
    end

    %% ===== Data Layer =====
    subgraph Data Layer
        DB[(MongoDB Database)]
    end

    %% ===== Flow =====
    U -->|HTTPS Requests| FE
    FE -->|REST API JSON| API
    API --> BL
    BL -->|Mongoose ODM| DB
    DB -->|Query Results| BL
    BL -->|JSON Response| FE
```

## Features
* Landing Page
    * Modern and responsive user interface
    * Clear presentation of services being offered
    * Professional, clean, and unique design

* Inquiry Handling
    * Users can submit inquiries through a contact form
    * Inquiry data stored in the database

* Bug/issue reporting
    * Users can report bugs with detailed descriptions
    * Issue data stored in the database

* CRM (server-side)
    * Management of inquiries, issues, and content
    * Backend API built with Node.js & Express

## Repository Structure
```
/OpsieWebsite
│
├── /backend                   # Node.js + Express backend
│   ├── /src                 # Node.js source code
│   │   ├── /controllers     # Business logic for routes
│   │   ├── /middleware      # Authentication, error handling, etc.
│   │   ├── /models          # Mongoose models / database schemas
│   │   ├── /routes          # API route definitions
│   │   ├── /utils           # Common utility functions
│   │   ├── index.ts         # Entry point
│   │   └── server.ts        # Server entry point
│   ├── .env                 # File that stores environment variables
│   ├── .gitignore           # Files/folders to ignore in Git
│   ├── eslint.config.mjs    # ESLint configuration file
│   ├── package.json         # Backend dependencies
│   └── tsconfig.json        # TS configuration file
│
├── /frontend                  # React frontend
│   ├── /public              # Static files
│   ├── /src                 # React source code
│   │   ├── /api             # Reusable API layers
│   │   ├── /assets          # Asset files
│   │   ├── /components      # Reusable UI components
│   │   ├── /hooks           # Custom hooks
│   │   ├── /pages           # Page-level components
│   │   ├── /utils           # Helper functions and components
│   │   ├── App.css          # Main React component style
│   │   ├── App.tsx          # Main React component
│   │   ├── index.css        # React entry point style
│   │   └── main.tsx         # React entry point
│   ├── .gitignore           # Files/folders to ignore in Git
│   ├── eslint.config.js     # ESLint configuration file
│   ├── index.html           # Main HTML template
│   ├── package.json         # Frontend dependencies
│   └── vite.config.ts       # Vite configuration file
│
├── README.md                # Project documentation
└── package.json             # Root-level scripts and dependencies
```

## Installation
### 1. Clone the repository
```
git clone https://github.com/OpsieDev/OpsieWebsite.git
```

### 2. Install Dependencies
```
cd backend
npm install
cd ../frontend
npm install
```

### 3. Add Environment Variables.
Create an .env file in the backend root directory
```
cd backend
echo PORT=5000 JWT_SECRET=opsiesecretkey EMAIL_USER= EMAIL_PASS= MONGODB_USER=opsiessi MONGODB_PASSWORD=ZE9crHBxOuTvOwWH MONGODB_NAME=opsie-test > .env
```

or manually create an .env and copy these environment variables.
```
PORT=5000
JWT_SECRET=opsiesecretkey
EMAIL_USER=
EMAIL_PASS=
MONGODB_USER=opsiessi
MONGODB_PASSWORD=ZE9crHBxOuTvOwWH
MONGODB_NAME=opsie-test
```


Create an .env file in the frontend root directory
```
cd frontend
echo VITE_BACKEND_BASE_URL=http://localhost:5000 > .env
```

or manually create an .env and copy these environment variables.
```
VITE_BACKEND_BASE_URL=http://localhost:5000
```

### 4. Development
Run backend
```
cd backend
npm run dev
```

Run frontend
```
cd frontend
npm run dev
```

Visit: http://localhost:5173

### 5. Production
During production use these MONGODB environment variables.
```
MONGODB_USER=opsiessi
MONGODB_PASSWORD=ZE9crHBxOuTvOwWH
MONGODB_NAME=opsie
```

**It's really important to change the MONGODB_NAME variable:**
```
MONGODB_NAME=opsie
```

## Contribution Guidelines
Follow these steps to contribute effectively:
* Fork the Repository
    * Click the Fork button on GitHub to create your own copy of the project.
    
* Clone Your Fork
    * Run:
```
git clone https://github.com/OpsieDev/OpsieWebsite.git
```

* Create a Develop or Feature Branch
    * Keep your changes organized:
```
git checkout -b your-name/dev
# Example: git checkout -b ansari/dev
```

* Set Up the Environment
    * Follow the setup instructions in the README to install dependencies.

* Use Clear Commit Messages
    * Indicate if you are adding a feature, fixing a bug, or restructuring a code.

* Submit a Pull Request (PR)
    * Push your branch and open a PR with a short, clear description of your changes.