import { notFound } from 'next/navigation'
import Layout from '@/components/Layout'
import PostCard from '@/components/PostCard'
import Pagination from '@/components/Pagination'
import Link from 'next/link'
import { getPostsByTag, getAllTags, getTagBySlug } from '@/lib/blog'
import type { Metadata } from 'next'

interface TagPageProps {
  params: {
    slug: string
  }
  searchParams: {
    page?: string
  }
}

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map(tag => ({
    slug: tag.slug
  }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = await getTagBySlug(params.slug)
  
  if (!tag) {
    return {
      title: 'Etiqueta no encontrada - BlogDemo'
    }
  }

  return {
    title: `Etiqueta: ${tag.name} - BlogDemo`,
    description: `Artículos etiquetados con ${tag.name}. Descubre contenido relacionado y mantente actualizado.`,
    openGraph: {
      title: `Etiqueta: ${tag.name}`,
      description: `Artículos etiquetados con ${tag.name}`,
      type: 'website',
    }
  }
}

async function TagPage({ params, searchParams }: TagPageProps) {
  const currentPage = Number(searchParams.page) || 1
  const postsPerPage = 6
  
  const tag = await getTagBySlug(params.slug)
  
  if (!tag) {
    notFound()
  }

  const posts = await getPostsByTag(params.slug)
  const totalPosts = posts.length
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const paginatedPosts = posts.slice(startIndex, endIndex)

  const paginationInfo = {
    currentPage,
    totalPages,
    postsPerPage,
    totalPosts,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/etiquetas" className="hover:text-blue-600 transition-colors">Etiquetas</Link>
          <span>/</span>
          <span className="text-gray-900">{tag.name}</span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Etiqueta
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {tag.name}
          </h1>
          <p className="text-gray-500 mt-4">
            {totalPosts} {totalPosts === 1 ? 'artículo' : 'artículos'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <main className="lg:col-span-3">
            {paginatedPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {paginatedPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>

                {/* Pagination */}
                {paginationInfo.totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination
                      pagination={paginationInfo}
                      basePath={`/etiqueta/${params.slug}`}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.007-5.824-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No hay artículos con esta etiqueta
                </h3>
                <p className="text-gray-600 mb-6">
                  Aún no hemos publicado artículos con la etiqueta &quot;{tag.name}&quot;.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ver todos los artículos
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Navegación rápida
              </h3>
              <nav className="space-y-3">
                <Link
                  href="/"
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  </svg>
                  Todos los artículos
                </Link>
                <Link
                  href="/categorias"
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-4l-3 3.5M5 7l3 3.5M19 7l-3 3.5M5 11l3 3.5" />
                  </svg>
                  Categorías
                </Link>
                <Link
                  href="/etiquetas"
                  className="flex items-center text-blue-600 font-medium"
                >
                  <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  Todas las etiquetas
                </Link>
                <Link
                  href="/acerca"
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Acerca de
                </Link>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  )
}

export default function Page(props: TagPageProps) {
  return <TagPage {...props} />
}
