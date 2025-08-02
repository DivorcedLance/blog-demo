import { notFound } from 'next/navigation'
import { getPostsByCategory, getCategoryBySlug, getAllCategorySlugs, getPaginatedPosts } from '@/lib/blog'
import { PageProps } from '@/types/blog'
import Layout from '@/components/Layout'
import PostCard from '@/components/PostCard'
import Pagination from '@/components/Pagination'
import Link from 'next/link'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    page?: string
  }>
}

function CategoryPage({ 
  category, 
  paginatedData 
}: {
  category: NonNullable<ReturnType<typeof getCategoryBySlug>>
  paginatedData: { posts: PageProps['posts'], pagination: PageProps['pagination'] }
}) {
  const { posts, pagination } = paginatedData

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li>
              <Link href="/categorias" className="hover:text-blue-600 transition-colors">
                Categorías
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li className="text-gray-900 font-medium">
              {category.name}
            </li>
          </ol>
        </nav>

        {/* Category Header */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white p-8">
            <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
            <p className="text-lg opacity-90 mb-4">{category.description}</p>
            <div className="text-sm opacity-80">
              {pagination.totalPosts} artículo{pagination.totalPosts !== 1 ? 's' : ''} en esta categoría
            </div>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No hay artículos en esta categoría
              </h3>
              <p className="text-gray-500 mb-6">
                Aún no hemos publicado artículos en la categoría &ldquo;{category.name}&rdquo;.
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ver todos los artículos
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <Pagination 
                pagination={pagination} 
                basePath={`/categoria/${category.slug}`}
              />
            )}
          </>
        )}

        {/* Back to Categories */}
        <div className="mt-12 text-center">
          <Link
            href="/categorias"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Ver todas las categorías
          </Link>
        </div>
      </div>
    </Layout>
  )
}

// Función para obtener datos de la categoría
async function getCategoryData(slug: string, page: number = 1) {
  const category = getCategoryBySlug(slug)
  
  if (!category) {
    return null
  }
  
  const posts = getPostsByCategory(slug)
  const paginatedData = getPaginatedPosts(posts, page)
  
  return {
    category,
    paginatedData
  }
}

// Generar metadata para SEO
export async function generateMetadata({ params }: CategoryPageProps) {
  const resolvedParams = await params
  const data = await getCategoryData(resolvedParams.slug)
  
  if (!data) {
    return {
      title: 'Categoría no encontrada - BlogDemo'
    }
  }
  
  const { category, paginatedData } = data
  
  return {
    title: `${category.name} - BlogDemo`,
    description: `${category.description} - ${paginatedData.pagination.totalPosts} artículos en la categoría ${category.name}.`,
    openGraph: {
      title: `${category.name} - BlogDemo`,
      description: category.description,
      type: 'website',
    }
  }
}

// Generar rutas estáticas para todas las categorías
export async function generateStaticParams() {
  const slugs = getAllCategorySlugs()
  
  return slugs.map((slug) => ({
    slug
  }))
}

// Componente de página principal
export default async function Page({ params, searchParams }: CategoryPageProps) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const page = parseInt(resolvedSearchParams.page || '1')
  const data = await getCategoryData(resolvedParams.slug, page)
  
  if (!data) {
    notFound()
  }
  
  return <CategoryPage {...data} />
}
