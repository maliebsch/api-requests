import axios from 'axios'

const url = 'https://jsonplaceholder.typicode.com'

export const fetchUsers = async () => {
  try {
    const { data } = await axios.get(`${url}/users`)
    return data.map((userData) => ({
      username: userData.username,
      name: userData.name,
      email: userData.email,
      id: userData.id,
      phone: userData.phone,
      company: userData.company,
      address: userData.address
    }))
  } catch (err) {
    console.log(err)
  }
}

export const fetchComments = async () => {
  try {
    const { data } = await axios.get(`${url}/comments`)
    return data
  } catch (err) {
    console.log(err)
  }
}

export const fetchPosts = async () => {
  try {
    const { data } = await axios.get(`${url}/posts`)
    return data
  } catch (err) {
    console.log(err)
  }
}
