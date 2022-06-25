# U09-Training-App

# **Introduction**

Welcome to my fullstack application. This is a Traning/exercise app where you can search for exercises be able to crud a list and save exercises. There are restrictions depending on which role a user have.

The **roles** are as followed:

# None-Admin Roles

## **Guests**

May only be able to search gym exercises but will not be able to save them nor create a list.

## **Registered User**

Registered Users can login and create, update, read and delete a list aswell as save exercises.

## **Admin**

The admin roles are like developers, they will check that every new implementaion works on the site that means that they can do what a Registered user can and also Create a new user, Update a User, Read a user and Delete a user.

#Backend

## **Api Routes**

#frontend

## Components

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

### **Signup**

### **userListPage**

#Futher Work

implement new role:

## **Trainers**

Trainers can do what an registered user can but also puplish their workout lists to help users complete their goal.
