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

# Backend

## User Api Routes

#### Sign up

```http
  POST /user/signup
```

| Parameter   | Type     | Description                             |
| :---------- | :------- | :-------------------------------------- |
| `firstName` | `string` | **Required**. User input                |
| `lastName`  | `string` | **Required**. User input                |
| `role`      | `string` | **Required**. will be user as default   |
| `email`     | `string` | **Required**. User input                |
| `password`  | `string` | **Required**. User input, will be hased |

#### Sign in

```http
  POST /user/signin
```

| Parameter  | Type     | Description              |
| :--------- | :------- | :----------------------- |
| `email`    | `string` | **Required**. user input |
| `password` | `string` | **Required**. user input |

#### Sign Out

```http
  GET /user/signout
```

| Parameter      | Type     | Description                                                                                                             |
| :------------- | :------- | :---------------------------------------------------------------------------------------------------------------------- |
| `access_token` | `string` | **Required**. takes token from cookies and deletes it. Needs to be send via the headers as Authorization 'Bearer token' |

### Protected

To be able to access the procted route which is frontends dashboard, the user must send its token in the header as Authorization: Bearer $token so that the backend can decode it.

```http
  GET /user/protected
```

| Parameter      | Type     | Description                                                                                       |
| :------------- | :------- | :------------------------------------------------------------------------------------------------ |
| `access_token` | `string` | **Required**. the middleware will decode the token and read the user with help of the decoded id. |

#### Middleware

```http
  Middleware
```

| Parameter | Type     | Description                                                    |
| :-------- | :------- | :------------------------------------------------------------- |
| `id`      | `string` | **Required**. Users id, so the list can be linked to that user |
| `title`   | `string` | **Required**. A title of the list                              |

#### UserList

```http
  Get UserLis
```

| Parameter      | Type     | Description                                                                                                                                 |
| :------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `access_token` | `string` | **Required**. will split the header req by the user. the middlewate will save the id decoded by the token to later be used for other routes |

app.use('/userList', listRouter);
app.use('/userListInfo', listInfoRouter);

## **Api Routes**

# Frontend

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

This component is responseble to send the users credentials to the my DB api to login the users if the credentionals is true.

### **Signup**

This component is responseble to create an user with the information given by the user.

### **userListPage**

This component will fetch the users list and the information it has with other words the exercises saved to that list.

# Futher Work

implement new role:

## **Trainers**

Trainers can do what an registered user can but also puplish their workout lists to help users complete their goal.
