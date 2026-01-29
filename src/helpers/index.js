export const parseNumber = value => {
  if (value === null || value === undefined) return null

  if (typeof value === 'number') return value

  if (typeof value === 'string') {
    const cleaned = value
      .trim()
      .replace(/\$/g, '')
      .replace(/\s/g, '')
      .replace(/\./g, '')
      .replace(',', '.')

    const parsed = Number(cleaned)
    return isNaN(parsed) ? null : parsed
  }

  return null
}
