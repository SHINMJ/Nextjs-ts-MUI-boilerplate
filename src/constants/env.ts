export const DEV = process.env.NODE_ENV !== 'production'
export const PORT = process.env.PORT || '3000'
export const SERVER_API_URL =
  process.env.SERVER_API_URL || `http://localhost:${PORT}/api/`

export const AUTH_TOKEN = process.env.AUTH_TOKEN || 'auth_token'

export const REFRESH_TOKEN = process.env.REFRESH_TOKEN || 'refresh_token'
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN || 'access_token'
export const ID_TOKEN = process.env.ID_TOKEN || 'id_token'
