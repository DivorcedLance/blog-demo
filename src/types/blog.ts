export interface Post {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  updatedAt: string
  tags: string[]
  category: string
  readTime: number
  featured: boolean
  status: 'published' | 'draft' | 'archived'
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string
}

export interface Tag {
  id: number
  name: string
  slug: string
}

export interface BlogData {
  posts: Post[]
  categories: Category[]
  tags: Tag[]
}

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  postsPerPage: number
  totalPosts: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface PageProps {
  posts: Post[]
  pagination: PaginationInfo
  categories: Category[]
  tags: Tag[]
}

export interface PostPageProps {
  post: Post
  relatedPosts: Post[]
}

export interface SearchParams {
  page?: string
  category?: string
  tag?: string
  search?: string
}
