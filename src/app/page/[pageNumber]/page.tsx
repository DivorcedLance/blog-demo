import { notFound } from 'next/navigation'
import { getAllPosts, getPaginatedPosts, getAllCategories, getAllTags, getAllPageNumbers } from '@/lib/blog'
import { PageProps } from '@/types/blog'
import Layout from '@/components/Layout'
import PostCard from '@/components/PostCard'
import Pagination from '@/components/Pagination'
import Link from 'next/link'

interface PageNumberPageProps {
  params: Promise<{
    pageNumber: string
  }>
}

function BlogPage({ paginatedData, categories, tags }: {
  paginatedData: { posts: PageProps['posts'], pagination: PageProps['pagination'] }
  categories: PageProps['categories']
  tags: PageProps['tags']
}) {
  const { posts, pagination } = paginatedData

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Todos los Artículos
              </h1>
              <p className="text-gray-600">
                Página {pagination.currentPage} de {pagination.totalPages} 
                ({pagination.totalPosts} artículos en total)
              </p>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination pagination={pagination} basePath="/page" />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Categories */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Categorías
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/categoria/${category.slug}`}
                      className="block text-gray-600 hover:text-blue-600 transition-colors py-1"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Tags Populares
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 10).map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/tag/${tag.slug}`}
                      className="inline-block bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 text-sm px-3 py-1 rounded-full transition-colors"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Back to Home */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  ¿Buscas algo específico?
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Explora nuestros artículos por categorías o tags para encontrar exactamente lo que necesitas.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  ← Volver al inicio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

// Función para obtener datos de la página
async function getPageData(pageNumber: number) {
  const allPosts = getAllPosts()
  const paginatedData = getPaginatedPosts(allPosts, pageNumber)
  const categories = getAllCategories()
  const tags = getAllTags()

  // Verificar si la página existe
  if (pageNumber < 1 || pageNumber > paginatedData.pagination.totalPages) {
    return null
  }

  return {
    paginatedData,
    categories,
    tags
  }
}

// Generar metadata para SEO
export async function generateMetadata({ params }: PageNumberPageProps) {
  const resolvedParams = await params
  const pageNumber = parseInt(resolvedParams.pageNumber)
  
  if (isNaN(pageNumber)) {
    return {
      title: 'Página no encontrada - BlogDemo'
    }
  }

  return {
    title: `Artículos - Página ${pageNumber} - BlogDemo`,
    description: `Explora nuestra colección de artículos sobre desarrollo web. Página ${pageNumber} de nuestro blog con las últimas tendencias y mejores prácticas.`,
    openGraph: {
      title: `Artículos - Página ${pageNumber} - BlogDemo`,
      description: `Explora nuestra colección de artículos sobre desarrollo web. Página ${pageNumber}.`,
      type: 'website',
    }
  }
}

// Generar rutas estáticas para todas las páginas
export async function generateStaticParams() {
  const pageNumbers = getAllPageNumbers()
  
  return pageNumbers.map((pageNumber) => ({
    pageNumber: pageNumber.toString()
  }))
}

// Componente de página principal
export default async function Page({ params }: PageNumberPageProps) {
  const resolvedParams = await params
  const pageNumber = parseInt(resolvedParams.pageNumber)
  
  if (isNaN(pageNumber)) {
    notFound()
  }

  const data = await getPageData(pageNumber)
  
  if (!data) {
    notFound()
  }
  
  return <BlogPage {...data} />
}
