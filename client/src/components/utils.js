import axios from 'axios'

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

export default { deleteSave }
