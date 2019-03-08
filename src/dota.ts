import axios from 'axios'

let dota = axios.create({
  baseURL: 'https://api.opendota.com/api/'
})

export default dota
