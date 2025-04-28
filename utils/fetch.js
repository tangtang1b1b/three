const fetchGraph = async ({ apiPath = null, token = null, query = null, method = 'GET', client = true, body = null }) => {
  const config = useRuntimeConfig()

  let APP_API = client ? config.public.APP_API : config.APP_API

  let apiUrl = body ? APP_API : `${APP_API}?query=${encodeURIComponent(query)}`

  let headers = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  let fetchOptions = {
    method: method,
    headers: headers,
    body: method !== 'GET' ? JSON.stringify({ query: body }) : null,
  }

  try {
    const { data, error } = await useFetch(apiUrl, fetchOptions)

    if (error.value) {
      throw new Error(error)
    }

    return {
      success: true,
      data: data.value,
    }
  } catch (error) {
    return {
      success: false,
      error,
    }
  }
}

const fetchImg = (url) => {
  const config = useRuntimeConfig()

  if (import.meta.client) {
    return `${config.public.APP_URL}${url}`
  }
  return `${config.APP_URL}${url}`
}

const fetchRestful = async ({ apiPath = null, token = null, method = 'GET', client = true, body = null }) => {
  const config = useRuntimeConfig()

  let APP_API = client ? config.public.APP_API : config.APP_API

  const apiUrl = apiPath ? `${APP_API}${apiPath}` : APP_API

  let headers = {
    'Content-Type': 'application/json',
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  let fetchOptions = {
    method: method,
    headers: headers,
    body: method !== 'GET' ? JSON.stringify(body) : null,
  }

  try {
    const { data, error } = await useFetch(apiUrl, fetchOptions)

    if (error.value) {
      throw new Error(error)
    }

    return {
      success: true,
      data: data.value,
    }
  } catch (error) {
    return {
      success: false,
      error,
    }
  }
}
export { fetchImg, fetchGraph, fetchRestful }
