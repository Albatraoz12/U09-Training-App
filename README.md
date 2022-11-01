# U09-Training-App

# **Introduction**

Welcome to my fullstack application. This is a Traning/exercise app where you can search for exercises and If you are an Registerd User you will be able to:  
 Create a List  
 Update the name of that list  
 Read the List with exercises in them  
 Delete the list or exercises inside that list.

You will also be able to save exercises for late use.

# **How to install**

Here is the guide on how to install the application on your local machin and use your localhost to serve the app.

Before we start you need to have MongoDb and node installed on your computer and I recomend that you use Compass to handle the database. Follow these links bellow to get started on downloading [Nodejs](https://nodejs.org/en/download/) and [MongoDB:](https://www.mongodb.com/try/download/community).

You also need an Rapid API Key which you can get by signing up [here](https://rapidapi.com/)

## **Stepts**

Git clone this reposetory to your desire destination and after you have clone it, open it on VS code or any other code edditor.
Create an .env file for both client and backend folders and add this information:

**Backend**  
 PORT = 8080 : 8081
SECRET = 'Your_Secret'
DATABASE_URL = mongodb://localhost/{your db name}
REQUEST_URL = http://localhost:3000
**Client**

REACT_APP_API_URL = http://localhost:8081/
REACT_APP_X_RapidAPI_Key = "Your API Key from Rapid API"
REACT_APP_X_RapidAPI_Host = exercisedb.p.rapidapi.com

Cd into client or backend and run npm install. !note you have to do this on both the files.
After your have installed all your dependencys you can cd into backend and client and run npm start to start your Mongodb server and webbaplication.

# **Roles**

These are the roles and what they represent. Each role has their limits and authorization. To be an administrator you need to speak with me and I will make you one :). Anyways the role are as follow:

## **Guests**

May only be able to search gym exercises but will not be able to save them nor create a list.

## **Registered User**

Registered Users can make a list, delete a list, read a lits infor and save exercises into them as well as uppdating its name.

## **Admin**

The admin roles are like developers, they will check that every new implementaion works on the site that means that they can do what a Registered user can and also Create a new user, Update a User, Read a user and Delete a user.

# Backend

## User Api Routes

I will demostrate how to use the backend api, in this demonstartion i will use Insomia but you can use Postman if you want.
After creating a api request in insomia via the + sign, we then need to change the body type to JSON to send our data.

### Sign Up route

Create a user with POST
Post to: http://localhost:8081/user/signup  
JSON:  
{  
"firstName": "John",  
"lastName":"Doe",  
"role": "Optional but will be user as default !even if you send in as admin!"  
"email": "John.Doe@gmail.com",  
"password": "JohnDoe123"  
}

### Sign In route

Sign in a user with POST
Post to: http://localhost:8081/user/signin  
JSON:  
{  
"email": "John.Doe@gmail.com",  
"password": "JohnDoe123"  
}  
Notis that we get an token and a success message as an respond. The token will be stored in the Cookies tab, left side of the route. Copy the token because we are going to be needing that to send it in the header.

### Protected route

This route is to identify the user with its Token with GET.
Get to: http://localhost:8081/user/protected  
Only in Headers:  
Content-Type: application/json  
Authorization: Bearer {Paste your token here, starts with ey}
If successfull, you will get the response of your user.

### Sign Out route

The logout route is not working as intended in the insomia/postman due to how the backend is programmed. In the whole application the frontend will be responsible to remove the token and sign out the user. This is how it will look like with insomia:  
Get to: http://localhost:8081/user/signout  
Headers:
Authorization: Bearer {Token}

## User lists Route

### Create a list

Create a list with POST-Method
POST to: http://localhost:8081/userList/createList/{user Id}  
Headers:
Authorization: Bearer {Token}
You need to send the users token to make sure to identify the user and not an other.  
JSON {  
 "title": "ListName"  
}

### Read users list

GET to: http://localhost:8081/userList/{User Id}  
Headers:  
Authorization: Bearer {Token}  
Let the user read its own lists.

### Update a list by name

PUT to: http://localhost:8081/userList/editList/{List Id}  
JSON:  
{  
"title": "New list name  
 }  
Headers:  
Authorization: Bearer {Token}  
PUT to the lists id and change the title off the list to any disire title name.

### Delete a list

DELETE to: http://localhost:8081/userList/{List Id}  
Headers:  
Authorization: Bearer {Token}

## Save info into a list api

### Save info

POST to: http://localhost:8081/userListInfo/createInfo/{list Id}  
JSON:  
{  
"name": "Title1",
"exId": "1"  
}  
This will save an exercise into the list with id {list id}

### Read all list information

GET to: http://localhost:8081/userListInfo/listInfo/{list Id}  
This route will let the user read its list information with exercises.

### Delete a list info

http://localhost:8081/userListInfo/listInfoDelete/{List info id}  
Will remove the exercise form the list with id {list info id}

## User Saved Api

users can also save an exercise outside off a list to easier have access to one

### Let user save an exercise

POST to: http://localhost:8081/userSaves/saveEx/{User id}  
Headers:  
Authorization: Bearer {Token}  
JSON:  
{  
"name": "Exercise1",
"exId": "1"  
}

### Read User saved exercise

GET to: http://localhost:8081/userSaves/saves/{user id}  
Headers:  
Authorization: Bearer {Token}

### Delete Saved exercise

DELETE to: http://localhost:8081/userSaves/deletesaved/{exercise id (Let user save an exercise)}  
Headers:  
Authorization: Bearer {Token}

## Admin routes API

Admin is the onlyone to create, read, update and delete a user from dashboard. When the admin routes are being used it will then check the token (in the header) if the user is an admin or not. If the user is not an Admin then he not going to be able to use those routes.

### Get all Users

GET to: http://localhost:8081/admin/getAllUsers  
Headers:  
Authorization: Bearer {Token}

### Get an user

GET to: http://localhost:8081/admin/getUser/{user id}  
Headers:  
Authorization: Bearer {Token}

### Delete an user

DELETE to: http://localhost:8081/admin/deleteUser/{user id}  
Headers:  
Authorization: Bearer {Token}

### Create a new user

POST to: http://localhost:8081/admin/signup  
Headers:  
Authorization: Bearer {Token}  
JSON:  
{  
"firstName": "",  
"lastName":"",  
"role": "", !Note, an admin can choose if the new user should have a role off User or Admin  
"email": "",  
"password": ""  
}

### update a user

PUT to: http://localhost:8081/admin/editUser/{User Id}  
Headers:  
Authorization: Bearer {Token}  
JSON:  
{  
"firstName": "",  
"lastName":"",  
"role": "",  
"email": "",  
"password": ""  
}

# Frontend

## Components/Pages

### **Dashboard**

Dashboard component is the users page where they can create lists and use that list wo save exercises to.
The user can open its lists and see what exercises are stored inside that lists. The user can delete exercises from that list or delte the whole list.

In the dasboard the user will also be able to see its saved exercises and if the user wants to see more details the user can then navigate through clicking on the saved item and see more dtails.

### **Errorpage**

When ever the user types in the wrong url e.g https://relaxed-raindrop-21bc84.netlify.app/* a message will apear saying error message and a link to the home page.

### **ExcercisePage**

This component will make an api call to the ExerciseDB with the ID of an exercise and later display it for the user. NOTE! The api dosent have any description so the About section is just some dummy text with api variables.

### **Footer**

Footer component to display what a footer does, Authors (me) socials and copyright.

### **Home**

The Home component is the websites landing page to let the user getting started.

### **Navbar**

The Navbar component is where the navbar is and is responseble to navigate the user where he/she wants to go.

### **Search**

This component is where the user will search for either an exercise by name or exercises by an targeted muscle e.g Chest

### **Signin**

This component is responseble to send the users credentials to the my DB api to login the users if the credentionals is true.

### **Signup**

This component is responseble to create an user with the information given by the user.

### **userListPage**

This component will fetch the users list and the information it has with other words the exercises saved to that list.

### **Modal**

There are two components, one called Modal and one ErrorModal. Depending on what response the users get, the correct modal will appear.

## **Admin**

All the admin components/pages is only avalible for users that have the role of admin. This is to let an admin CRUD a user

**AdminCreatePage**  
This component is for admins to create a user

**FindUsers**  
Lets admin fins all the user in the database

**UserPage**  
Finds a user by id and let an admin update or delete the user.

# **Utils**

This file is responsible to store all my api functions instead of writing them inside each component. This helped with Dont Repeat Your Self (DRYS)

# Futher Work

implement new role:

## **Trainers**

Trainers can do what an registered user can but also puplish their workout lists to help users complete their goal.

## **Better code structure**

How I have implemented the code structure could have been better but for me I find this pleasent and easy to get started.  
I managed to create an Utiles file to store all my functions in. I reacently found out something called useContaxt which would have helped me alot in this project but due to have learend about this hook this late, I skipped it for now and for futher work this should be considered to be implemented.
