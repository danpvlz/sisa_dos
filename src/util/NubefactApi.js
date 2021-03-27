import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_NUBEFACT_ROUTE,
  headers: {
    'Authorization ': process.env.REACT_NUBEFACT_TOKEN,
    'Content-Type': 'application/json',
  }
});
