# Backend Assignment 2 API

## Project Overview

This is a RESTful API built with Express.js and TypeScript for managing branches and employees in an organization. The API provides comprehensive CRUD (Create, Read, Update, Delete) operations for both branches and employees, along with additional query endpoints for retrieving employees by branch or department. It uses Google Firestore as the database for scalable, real-time data storage.

The API is designed to be secure, well-documented, and easy to integrate into frontend applications or other services. It includes features like input validation, error handling, and automatic API documentation generation using OpenAPI/Swagger.

## Installation Instructions

### Prerequisites
- Node.js (version 20 or higher)
- npm or yarn
- A Google Firebase project with Firestore enabled

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/rsingh734/backend-assignment-2.git
   cd backend-assignment-2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=3001
   FIREBASE_PROJECT_ID=your-firebase-project-id
   FIREBASE_CLIENT_EMAIL=your-service-account-email
   FIREBASE_PRIVATE_KEY=your-private-key-with-newlines
   ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
   ```
   - `NODE_ENV`: Set to `development` for local development or `production` for deployment.
   - `PORT`: The port on which the server will run (default: 3001).
   - `FIREBASE_PROJECT_ID`: Your Firebase project ID.
   - `FIREBASE_CLIENT_EMAIL`: The client email from your Firebase service account.
   - `FIREBASE_PRIVATE_KEY`: The private key from your Firebase service account (replace `\n` with actual newlines).
   - `ALLOWED_ORIGINS`: Comma-separated list of allowed origins for CORS in production.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. For production build:
   ```bash
   npm run build
   npm start
   ```

## API Request Examples

Here are examples of how to make requests to the API using cURL. These examples assume the server is running on `http://localhost:3001`.

### 1. Get All Branches
```bash
curl -X GET "http://localhost:3001/api/v1/branches" \
-H "accept: application/json"
```

### 2. Create a New Employee
```bash
curl -X POST "http://localhost:3001/api/v1/employees" \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "position": "Software Engineer",
  "department": "Engineering",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "branchId": "branch-123"
}'
```

### 3. Get Employees by Branch
```bash
curl -X GET "http://localhost:3001/api/v1/branches/branch-123/employees" \
-H "accept: application/json"
```

## Link to Public Documentation

The public API documentation is deployed to GitHub Pages and can be accessed at: [https://rsingh734.github.io/backend-assignment-2/](https://rsingh734.github.io/backend-assignment-2/)

## Local Documentation Access

When running the application locally, you can access the interactive OpenAPI documentation at:
`http://localhost:3001/api-docs`

This provides a Swagger UI interface where you can explore all available endpoints, view request/response schemas, and test the API directly from your browser.

## Security Configuration Documentation

### CORS Configuration
The API uses a custom CORS configuration that adapts based on the environment:

- **Development**: Allows all origins (`origin: true`) to facilitate local testing and development. Credentials are enabled for authentication if needed.
- **Production**: Restricts origins to a predefined list specified in the `ALLOWED_ORIGINS` environment variable. Only allows specific HTTP methods (GET, POST, PUT, DELETE) and headers (Content-Type, Authorization). Credentials are enabled for secure cookie-based authentication.

This configuration ensures flexibility during development while maintaining strict security in production by preventing unauthorized cross-origin requests.

### Helmet Configuration
Helmet is used to set various HTTP security headers:

- **Base Configuration (All Environments)**:
  - `contentSecurityPolicy: false`: Disabled for JSON APIs as CSP is more relevant for web pages.
  - `hidePoweredBy: true`: Hides the Express server information to avoid revealing technology stack.
  - `noSniff: true`: Prevents MIME type sniffing attacks.

- **Development**: Disables HSTS (HTTP Strict Transport Security) since HTTPS may not be enforced locally.
- **Production**: Enables HSTS with a max age of 1 year, including subdomains and preload. Also sets `frameguard` to deny framing and `referrerPolicy` to "no-referrer" for privacy.

These settings provide essential security protections while being appropriate for an API-first application.

### Secure Environment Variable Management
Environment variables are used to store sensitive information like Firebase credentials and configuration settings. Key practices:

1. **Never commit `.env` files**: The `.gitignore` file excludes `.env` to prevent accidental commits.
2. **Use strong, unique values**: Generate secure private keys and avoid hardcoding secrets.
3. **Validate in production**: Ensure all required environment variables are set before starting the application.
4. **Rotate credentials regularly**: Update Firebase service account keys periodically for security.

For production deployments, use secure secret management services provided by your hosting platform (e.g., environment variables in cloud platforms like Heroku, Vercel, or AWS).
