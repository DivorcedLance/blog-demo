import fs from 'fs'
import path from 'path'
import { BlogData, Post, Category, Tag, PaginationInfo } from '@/types/blog'

const POSTS_PER_PAGE = 6

export function getBlogData(): BlogData {
  const dataPath = path.join(process.cwd(), 'data', 'blog.json')
  const fileContents = fs.readFileSync(dataPath, 'utf8')
  return JSON.parse(fileContents)
}

export function getAllPosts(): Post[] {
  const { posts } = getBlogData()
  return posts
    .filter(post => post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter(post => post.featured)
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts()
  return posts.find(post => post.slug === slug) || null
}

export function getPostsByCategory(categorySlug: string): Post[] {
  return getAllPosts().filter(post => 
    post.category.toLowerCase() === categorySlug.toLowerCase()
  )
}

export function getPostsByTag(tagSlug: string): Post[] {
  return getAllPosts().filter(post => 
    post.tags.some(tag => tag.toLowerCase() === tagSlug.toLowerCase())
  )
}

export function searchPosts(query: string): Post[] {
  const searchTerm = query.toLowerCase()
  return getAllPosts().filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.content.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  )
}

export function getPaginatedPosts(
  posts: Post[],
  page: number = 1,
  postsPerPage: number = POSTS_PER_PAGE
): { posts: Post[], pagination: PaginationInfo } {
  const totalPosts = posts.length
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  const currentPage = Math.max(1, Math.min(page, totalPages))
  
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const paginatedPosts = posts.slice(startIndex, endIndex)

  const pagination: PaginationInfo = {
    currentPage,
    totalPages,
    postsPerPage,
    totalPosts,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1
  }

  return {
    posts: paginatedPosts,
    pagination
  }
}

export function getRelatedPosts(post: Post, limit: number = 3): Post[] {
  const allPosts = getAllPosts().filter(p => p.id !== post.id)
  
  // Priorizar posts de la misma categoría
  const sameCategoryPosts = allPosts.filter(p => p.category === post.category)
  
  // Luego posts con tags similares
  const relatedByTags = allPosts.filter(p => 
    p.tags.some(tag => post.tags.includes(tag))
  )
  
  // Combinar y eliminar duplicados
  const related = [...sameCategoryPosts]
  relatedByTags.forEach(p => {
    if (!related.find(rp => rp.id === p.id)) {
      related.push(p)
    }
  })
  
  return related.slice(0, limit)
}

export function getAllCategories(): Category[] {
  const { categories } = getBlogData()
  return categories
}

export function getAllTags(): Tag[] {
  const { tags } = getBlogData()
  return tags
}

export function getCategoryBySlug(slug: string): Category | null {
  const categories = getAllCategories()
  return categories.find(category => category.slug === slug) || null
}

export function getTagBySlug(slug: string): Tag | null {
  const tags = getAllTags()
  return tags.find(tag => tag.slug === slug) || null
}

// Funciones para generar paths estáticos
export function getAllPostSlugs(): string[] {
  return getAllPosts().map(post => post.slug)
}

export function getAllCategorySlugs(): string[] {
  return getAllCategories().map(category => category.slug)
}

export function getAllTagSlugs(): string[] {
  return getAllTags().map(tag => tag.slug)
}

// Función para generar todas las páginas de paginación
export function getAllPageNumbers(): number[] {
  const totalPosts = getAllPosts().length
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  return Array.from({ length: totalPages }, (_, i) => i + 1)
}
