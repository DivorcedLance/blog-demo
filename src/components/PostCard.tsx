import Link from 'next/link'
import { Post } from '@/types/blog'
import { formatDate, truncateText } from '@/lib/utils'

interface PostCardProps {
  post: Post
  showExcerpt?: boolean
  className?: string
}

export default function PostCard({ post, showExcerpt = true, className = '' }: PostCardProps) {
  return (
    <article className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${className}`}>
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <Link
            href={`/categoria/${post.category.toLowerCase()}`}
            className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full hover:bg-blue-200 transition-colors"
          >
            {post.category}
          </Link>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
          <Link href={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        {showExcerpt && (
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {truncateText(post.excerpt, 150)}
          </p>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag}
                href={`/tag/${tag.toLowerCase()}`}
                className="text-xs text-gray-500 hover:text-blue-600 transition-colors"
              >
                #{tag}
              </Link>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs text-gray-400">
                +{post.tags.length - 3} más
              </span>
            )}
          </div>
        )}

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {post.author}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readTime} min lectura
            </span>
          </div>

          {post.featured && (
            <div className="flex items-center text-yellow-600">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-xs font-medium">Destacado</span>
            </div>
          )}
        </div>

        {/* Read More Link */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link
            href={`/posts/${post.slug}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
          >
            Leer más
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}

// Componente para posts destacados en el hero
interface FeaturedPostProps {
  post: Post
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden text-white">
      <div className="relative z-10 p-8 md:p-12">
        <div className="mb-4">
          <span className="inline-block bg-white/20 text-white text-sm font-semibold px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          <Link href={`/posts/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h1>
        
        <p className="text-lg mb-6 opacity-90 leading-relaxed">
          {truncateText(post.excerpt, 200)}
        </p>
        
        <div className="flex items-center space-x-6 text-sm opacity-80 mb-6">
          <span>{post.author}</span>
          <span>{formatDate(post.publishedAt)}</span>
          <span>{post.readTime} min lectura</span>
        </div>
        
        <Link
          href={`/posts/${post.slug}`}
          className="inline-flex items-center bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Leer artículo completo
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/10 to-transparent"></div>
    </div>
  )
}
