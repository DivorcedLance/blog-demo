import { getAllPosts, getFeaturedPosts, getPaginatedPosts, getAllCategories, getAllTags } from '@/lib/blog'
import { PageProps } from '@/types/blog'
import Layout from '@/components/Layout'
import PostCard, { FeaturedPost } from '@/components/PostCard'
import Pagination from '@/components/Pagination'
import Link from 'next/link'

interface HomePageProps {
  featuredPosts: PageProps['posts']
  paginatedData: {
    posts: PageProps['posts']
    pagination: PageProps['pagination']
  }
  categories: PageProps['categories']
  tags: PageProps['tags']
}

function HomePage({ featuredPosts, paginatedData, categories, tags }: HomePageProps) {
  const { posts, pagination } = paginatedData

  return (
    <Layout>
      {/* Hero Section with Featured Post */}
      {featuredPosts.length > 0 && (
        <section className="bg-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FeaturedPost post={featuredPosts[0]} />
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Section Title */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Últimos Artículos
              </h2>
              <p className="text-gray-600">
                Descubre las últimas tendencias y mejores prácticas en desarrollo web
              </p>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <Pagination pagination={pagination} />
            )}
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
                <Link
                  href="/categorias"
                  className="inline-block text-blue-600 hover:text-blue-800 font-medium text-sm mt-4"
                >
                  Ver todas las categorías →
                </Link>
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
                <Link
                  href="/tags"
                  className="inline-block text-blue-600 hover:text-blue-800 font-medium text-sm mt-4"
                >
                  Ver todos los tags →
                </Link>
              </div>

              {/* About Section */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white p-6">
                <h3 className="text-lg font-semibold mb-3">
                  Acerca de este blog
                </h3>
                <p className="text-sm opacity-90 mb-4">
                  Un blog de demostración que muestra las capacidades de Next.js 15 
                  con Server-Side Rendering, generación estática y paginación.
                </p>
                <Link
                  href="/acerca"
                  className="inline-flex items-center text-white hover:underline font-medium text-sm"
                >
                  Leer más
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

// Función para obtener datos del servidor (simula SSR)
async function getPageData() {
  const allPosts = getAllPosts()
  const featuredPosts = getFeaturedPosts()
  const paginatedData = getPaginatedPosts(allPosts, 1) // Primera página
  const categories = getAllCategories()
  const tags = getAllTags()

  return {
    featuredPosts,
    paginatedData,
    categories,
    tags
  }
}

// Esta función genera metadata para SEO
export async function generateMetadata() {
  return {
    title: 'BlogDemo - Desarrollo Web con Next.js',
    description: 'Blog de demostración construido con Next.js 15, TypeScript y Tailwind CSS. Explora artículos sobre desarrollo web, performance y mejores prácticas.',
    keywords: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Web Development', 'SSR', 'SSG'],
    openGraph: {
      title: 'BlogDemo - Desarrollo Web con Next.js',
      description: 'Blog de demostración construido con Next.js 15, TypeScript y Tailwind CSS.',
      type: 'website',
    }
  }
}

// En App Router, usamos un componente Server Component por defecto
export default async function Page() {
  const data = await getPageData()
  return <HomePage {...data} />
}
