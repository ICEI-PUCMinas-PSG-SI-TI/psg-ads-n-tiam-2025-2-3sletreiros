import axios from "axios";

const api = axios.create({
    baseURL: '',
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
})

async function GET(url, headers = {}) {
  try {
    const response = await api.get(url, { headers });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}

async function POST(url, body = {}, headers = {}) {
  try {
    const response = await api.post(url, body, { headers });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}

async function PUT(url, body = {}, headers = {}) {
  try {
    const response = await api.put(url, body, { headers });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}

async function REMOVE(url, body = {}, headers = {}) {
  try {
    const response = await api.delete(url, { data: body, headers });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}

export const server = { GET, POST, PUT, delete: REMOVE };