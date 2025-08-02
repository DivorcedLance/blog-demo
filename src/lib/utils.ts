export function formatDate(dateString: string, locale: string = 'es-ES'): string {
  const date = new Date(dateString)
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  
  return date.toLocaleDateString(locale, options)
}

export function formatDateShort(dateString: string, locale: string = 'es-ES'): string {
  const date = new Date(dateString)
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  
  return date.toLocaleDateString(locale, options)
}

export function getRelativeTime(dateString: string, locale: string = 'es-ES'): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  
  if (diffInDays === 0) {
    return 'Hoy'
  } else if (diffInDays === 1) {
    return 'Ayer'
  } else if (diffInDays < 7) {
    return `Hace ${diffInDays} días`
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7)
    return `Hace ${weeks} semana${weeks > 1 ? 's' : ''}`
  } else {
    return formatDate(dateString, locale)
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remover caracteres especiales
    .replace(/[\s_-]+/g, '-') // Reemplazar espacios y guiones por un solo guión
    .replace(/^-+|-+$/g, '') // Remover guiones del inicio y final
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  
  const truncated = text.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  
  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace) + '...'
  }
  
  return truncated + '...'
}

export function readingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function generateExcerpt(content: string, maxLength: number = 150): string {
  // Remover markdown y HTML
  const plainText = content
    .replace(/#{1,6}\s/g, '') // Headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
    .replace(/\*(.*?)\*/g, '$1') // Italic
    .replace(/`(.*?)`/g, '$1') // Code
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
    .replace(/<[^>]*>/g, '') // HTML tags
    .replace(/\n/g, ' ') // New lines
    .trim()
  
  return truncateText(plainText, maxLength)
}
