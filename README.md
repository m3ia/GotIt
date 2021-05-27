# Got It! App

# Overview
**Got It!** is a shopping list app for anyone who loves to cook, prep, and plan on the regular. 

**Got It** has a recurring list feature where you can stay on top of your recurring shopping lists on a regular basis. Save in time and energy as **Got It** makes regular shopping simple and more efficient for both individuals and groups by use of its shareable lists feature.

[https://got-it-app.herokuapp.com/](https://got-it-app.herokuapp.com/)

**Note: To sign into Got It, you need to use a valid Gmail account.** While this application is currently awaiting authentication verification from Google, only authorized test users may sign in. For demonstration purposes, please sign in using gmail account **TesterGotIt@gmail.com** with the password being the name of the program this final project is for in lowercase letters. Please allow pop-ups for this app.

# Technologies
1. HTML
2. CSS
3. JavaScript
4. PostgreSQL
5. Express.js
6. React.js
7. Node.js
8. Google Cal API
9. Google OAuth2
10. Bootstrap

# How To Install & Run
Got It! is currently hosted on [Heroku](https://got-it-app.herokuapp.com/).

If you'd like to quickly install and run this app locally, please install the project dependencies and run it following these instructions:
1. Have Docker and Node.js installed
2. Have Docker running
3. Clone the repo
4. Run a terminal and cd into directory "GotIt". Run the following commands:
5. `npm install`
6. `cd app`
7. `npm install`
8. `cd ..`(back into root folder for 'GotIt')
12. `npm db:init` 
13. `npm start`
14. Open http://localhost/3000 to view

Optional: To view the database in your console, open a terminal window and run `npm run psql` 

For optimal debugging/reviewing code, follow these instructions:  
1. Have Docker and Node.js installed
2. Have Docker running
3. Clone the repo
4. Run a terminal and cd into directory "GotIt". Run the following commands:
5. `npm install`
6. `npm db:init`
7. `npm db:start` 
8. `cd server`
9. `nodemon server.mjs`
10. `cd ..` (back into root folder for 'GotIt')
11. `cd app`
12. `npm start`
13. Open http://localhost/3000 to view

For ongoing development (without reinstalling), follow these instructions:
1. Have Docker and Node.js installed
2. Have Docker running
3. Run a terminal and cd into directory "GotIt". Run the following commands:
4. `npm db:start`
5. In a new terminal tab: `cd server && nodemon server.mjs`
9. In another new terminal tab: `cd app && npm start`
12. Open http://localhost/3000 to view

Optional: To open the console to the database, open a terminal window and run `npm run psql` 

To check the Heroku database, open a terminal window and run `heroku psql --app got-it-app`

# How To Close App
1. Run `ctrl + C` in "GotIt" directory. (If you opened the app following the instructions for debugging/reviewing code, you'll have to run `ctrl + C` in the app and  server directories instead of the project root directory).

## Database Schema
<img src="https://github.com/m3ia/GotIt/blob/main/images/schema.png" alt="A screenshot of the DB schema" width="600" border="1" />

## User Flow
<img src="https://github.com/m3ia/GotIt/blob/main/images/user-flow.png" alt="A screenshot of the user flow" width="600" border="1" />

## Homepage Wireframe 
<img src="https://github.com/m3ia/GotIt/blob/main/images/homepage-wireframe.png" alt="An image showing the wireframe connections between the backend and the frontend" width="600" border="1" />

# Demo and Screenshots
[Demo Video](https://www.youtube.com/watch?v=dnagrd67--o)

Below: homepage to view all lists

<img src="https://github.com/m3ia/GotIt/blob/main/images/screenshots/view-all-lists-screenshot.png?raw=true" alt="A screenshot to view all lists" width="300" border="1" />

Below: a view to show how to edit an item 

<img src="https://github.com/m3ia/GotIt/blob/main/images/screenshots/edit-mode-ex.png" alt="A screenshot to view how to edit an item" width="300" border="1" /> 

Below: A screenshot to show how to adjust frequency of a list

<img src="https://github.com/m3ia/GotIt/blob/main/images/screenshots/freq-set.png?raw=true" alt="A screenshot to show how to adjust frequency of a list" width="300" border="1" />

Below: A screenshot of Daily, Weekly, Monthly recurring tasks being checked with return dates

<img src="https://github.com/m3ia/GotIt/blob/main/images/screenshots/test-before.png" alt="A screenshot of Daily, Weekly, Monthly recurring tasks being checked with return dates" width="300" border="1" />

Below: A screenshot of Daily, Weekly, Monthly recurring tasks that have returned back to the list as unchecked items on 05/25

<img src="https://github.com/m3ia/GotIt/blob/main/images/screenshots/test-after.png" alt="A screenshot of Daily, Weekly, Monthly recurring tasks that have returned back to the list as unchecked items on 05/25" width="300" border="1" />

Below: A screenshot of the user's upcoming events from their Google Calendar listed as a table at the bottom of the page

<img src="https://github.com/m3ia/GotIt/blob/main/images/screenshots/google-cal-ex.png" alt="A screenshot of the user's upcoming events from their Google Calendar listed as a table at the bottom of the page" width="300" border="1" />

Below: A screenshot to view one list, with both completed and non-completed items in view

<img src="https://github.com/m3ia/GotIt/blob/main/images/screenshots/completed-and-noncompleted.png?raw=true" alt="A screenshot to view one list, with both completed and non-completed items in view" width="300" border="1" />


# Known Risks
- Getting sign-in with OAuth2 in time with Google API
- Getting verified by Google to allow non-test users for sign in in time for demonstration

# Future Development
- Capability to share lists with non-users (with passwords)
- Inventory feature where users can track items they have and re-add needed items to lists
