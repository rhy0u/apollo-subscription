export const required = value =>
  value === undefined || value === null || value === '' ? 'Requis' : undefined
