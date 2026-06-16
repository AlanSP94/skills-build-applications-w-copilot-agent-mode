export const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export const isCodespaceConfigured = Boolean(CODESPACE_NAME)

export function getApiUrl(resource: string) {
  if (resource.startsWith('/api/')) {
    return `${API_BASE_URL}${resource.slice(4)}`
  }

  if (resource.startsWith('/')) {
    return `${API_BASE_URL}${resource}`
  }

  return `${API_BASE_URL}/${resource}`
}

export function normalizePayload(payload: unknown): unknown[] {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    const response = payload as Record<string, unknown>
    const data = response.data
    const results = response.results

    if (Array.isArray(data)) {
      return data
    }

    if (Array.isArray(results)) {
      return results
    }

    if (data !== undefined) {
      return [data]
    }

    if (results !== undefined) {
      return [results]
    }
  }

  return []
}

export async function fetchResource(resource: string) {
  const url = getApiUrl(resource)
  const response = await fetch(url)

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`${response.status} ${response.statusText}: ${errorText}`)
  }

  const payload = await response.json()
  return normalizePayload(payload)
}
