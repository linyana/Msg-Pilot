export const getDomain = () => `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`
