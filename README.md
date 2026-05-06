### Tiny Shortener 

🔧 Stack
- Backend: Nodejs
- DB: SQLite / JSON file
- Frontend: HTML + Tailwind (no heavy framework)

✨ Feature
- Generate short URL
- Redirect
- Statistik klik

🧠 Why is it safe?
- No SSR
- Light Query
- No need frontend framework
- Low RAM - Safe for VPS with limited memory

* Requirements:
  - Nodejs (latest)
  - git (git bash at windows)
  - visual studio code (for editing)

* Folder Structure
tiny-shortener/
├── data/               # Folder for SQLite database
│   └── database.sqlite # Database File (will be build by system)
├── public/             # Folder for static html
│   └── index.html      # Interface Dashboard (Frontend)
├── server.js           # Main Logic for Backend & API Express
└── package.json        # Nodejs Dependency configuration

* How to run this code: 

Follow this steps at terminal or your command prompt:
1. Folder Preparation: 
Open your terminal and create a new project directory: 
- mkdir tiny-shortener && cd tiny-shortener 

2. Initialization: 
Create the basic configuration file: 
- npm init -y

3. Dependency Installation: 
Install all the required libraries (Express, SQLite, and Nanoid): 
- npm install express sqlite3 sqlite nanoid

4. Prepare Sub-Folders: 
Create folders to store data and frontend files: 
- mkdir data public  

5. Running the Server: 
After you have copied the server.js and index.html code into their respective folders, run the application with the following command: 
- node server.js  

6. Browser Access: 
Open your browser and visit the following address: http://localhost:3000 

* API Documentation: Brief Description about endpoint `/shorten`, `/stats`, and URL redirection.