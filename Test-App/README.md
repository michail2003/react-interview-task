 * Instructions:

    1) getting the project from git to your desktop
        git clone <repo-url>
        cd my-react-app

    2) install all packages needed by running in terminal the command
        npm install

    3) run the project
        npm run dev


* Answers on following questions:

    1) How might you make this app more secure?

        To make the app more secure, I would mainly focus on backend security since frontend protection is mostly for user experience.
        On the backend, I would use JWT authentication with expiration time and role-based authorization using middleware to protect sensitive endpoints. Passwords should be hashed using bcrypt before being stored in the database.
        I would enable HTTPS in production to encrypt all communication and implement rate limiting to prevent brute-force attacks or bots from overwhelming the server.
        I would also validate and sanitize user input to prevent injection attacks and configure CORS properly to restrict which client domains can access the API.
        On the frontend, I would protect routes using token validation for better user experience, but the real security enforcement would remain on the backend.
    

    2) How would you make this solution scale to millions of records?

        To scale the application to millions of records, I would focus on database optimization.
        First, I would add proper database indexing on frequently queried fields to improve read performance.
        I would implement pagination or cursor-based pagination so we never fetch the entire dataset at once.
        I would also optimize queries and avoid unnecessary data fetching.
        If needed, I would introduce caching to reduce database load.
    