# Got It! App

# Overview
**Got It!** is a shopping list app for anyone who loves to cook, prep, and plan on the regular. 

**Got It** has a recurring list feature where you can stay on top of your recurring shopping lists on a regular basis. Save in time and energy as **Got It** makes regular shopping simple and more efficient for both individuals and groups by use of its shareable lists feature.

[https://got-it-app.herokuapp.com/](https://got-it-app.herokuapp.com/)

**Note: To sign into Got It, you need to use a valid Gmail account.** While this application is currently awaiting authentication verification from Google, only authorized test users may sign in. For demonstration purposes, please sign in using gmail account **TesterGotIt@gmail.com** with the password being the name of the program this final project is for in lowecase letters. 

# Technologies
1. HTML
2. CSS
3. JavaScript
4. PostgreSQL
5. Express.js
6. React.js
7. Node.js

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
Optional: To open the console to the database, open a terminal window and run `npm run psql` 

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
Optional: To open the console to the database, open a terminal window and run `npm run psql` 

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
1. Run `ctrl + C` in "GotIt" directory.

## Database Schema
<img src="https://github.com/m3ia/GotIt/blob/main/images/schema.png" alt="A screenshot of the DB schema" width="600" border="1" />

## User Flow
<img src="https://github.com/m3ia/GotIt/blob/main/images/user-flow.png" alt="A screenshot of the user flow" width="600" border="1" />

## Homepage Wireframe 
<img src="https://github.com/m3ia/GotIt/blob/main/images/homepage-wireframe.png" alt="An image showing the wireframe connections between the backend and the frontend" width="600" border="1" />

# Mock Ups
<img src="https://github.com/m3ia/GotIt/blob/main/images/view-all-lists.png" alt="A screenshot to view all lists" width="300" border="1" /> <img src="https://github.com/m3ia/GotIt/blob/main/images/view-one-list.png" alt="A screenshot to view one list" width="300" border="1" />
<img src="https://github.com/m3ia/GotIt/blob/main/images/add-details.png" alt="A screenshot to view details of an item" width="300" border="1" /> <img src="https://github.com/m3ia/GotIt/blob/main/images/add-freq.png" alt="A screenshot to show how to adjust frequency of a list" width="300" border="1" />
<img src="https://github.com/m3ia/GotIt/blob/main/images/cross-item.png" alt="A screenshot to show updated recurring list" width="300" border="1" /> <img src="https://github.com/m3ia/GotIt/blob/main/images/show-recurred-list.png" alt="A screenshot to show recurred item on list" width="300" border="1" />

# Risks
- Getting sign-in with OAuth2 in time with Google API
- Getting verified by Google to allow non-test users for sign in in time for demonstration

# Future Development
- Capability to share lists with other users and/or non-users (with passwords)
- Inventory feature where users can track items they have and re-add needed items to lists
