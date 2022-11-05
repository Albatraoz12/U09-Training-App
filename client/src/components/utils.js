import axios from 'axios'

// Sing in a user
export async function login(userData) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}user/signin`, userData, {
            withCredentials: true,
        })

        return response.data
    } catch (error) {
        return error.response.data.message
    }
}

// Fetch user information
export async function checkUser(token) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}user/protected`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        return error
    }
}

// User lists functions

// Get all users lists
export async function getLists(id, token) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}userList/${id}`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data.message
    } catch (error) {
        return error
    }
}

// Read the exercises linkted to a list id
export async function getListInfo(id, token) {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}userListInfo/listInfo/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        return response.data
    } catch (error) {
        return error
    }
}

// Create a list
export async function createList(id, token, userData) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}userList/createList/${id}`,
            userData,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        return response.data
    } catch (error) {
        return error.response.data.ErrorMessage
    }
}

// Updates title of a user list
export async function updateList(id, userData, token) {
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_API_URL}userList/editList/${id}`,
            userData,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        return response.data
    } catch (error) {
        return error
    }
}

// Deletes a user list
export async function deleteList(id, token) {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}userList/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        return error
    }
}

// User saved exercises functions here

// Fetch all users saved exercises
export async function getSaves(id, token) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}userSaves/saves/${id}`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data.sInfo
    } catch (error) {
        return error
    }
}

// Delete a user Saved exercise
export async function deleteSave(id, token) {
    try {
        const response = await axios.delete(
            `${process.env.REACT_APP_API_URL}userSaves/deletesaved/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        return response.data
    } catch (error) {
        return error
    }
}

/* Exercise functions here */

// fetch exercises by input
export async function getExerciseByName(name) {
    const response = await axios.get(
        `https://exercisedb.p.rapidapi.com/exercises/name/${name.toLowerCase()}`,
        {
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_Key,
                'X-RapidAPI-Host': process.env.REACT_APP_X_RapidAPI_Host,
            },
        }
    )
    return response.data
}

// fetch exercises by options
export async function getBodypartEx(bodypart) {
    try {
        const response = await axios.get(
            `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodypart.toLowerCase()}`,
            {
                headers: {
                    'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_Key,
                    'X-RapidAPI-Host': process.env.REACT_APP_X_RapidAPI_Host,
                },
            }
        )
        return response.data
    } catch (error) {
        return error.response
    }
}

// Fecth one exercise
export async function getExercise(id) {
    try {
        const response = await axios.get(
            `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
            {
                headers: {
                    'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_Key,
                    'X-RapidAPI-Host': process.env.REACT_APP_X_RapidAPI_Host,
                },
            }
        )
        return response.data
    } catch (error) {
        return error.response
    }
}

// Deleting Saved exercise from ExercisePage
export async function deleteSaved(userId, exId) {
    const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}userSaves/deletesaved/${userId}/${exId}`
    )
    return response.data
}

// function to let user save the exercise
export async function saveExercise(id, token, exData) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}userSaves/saveEx/${id}`,
            exData,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        return response.data
    } catch (error) {
        return error.response.data
    }
}
// Save exercise to a list
export async function exerciseToList(id, token, exData) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}userListInfo/createInfo/${id}`,
            exData,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        return response.data
    } catch (error) {
        return error.response.data
    }
}

// Admin functions

// Get all users
export async function getAllUsers(token) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}admin/getAllUsers`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data.users
    } catch (error) {
        return error.response.data
    }
}

// Get singel users information
export async function fetchUserData(id, token) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}admin/getUser/${id}`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}
