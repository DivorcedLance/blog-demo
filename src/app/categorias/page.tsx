import { getAllCategories, getPostsByCategory } from '@/lib/blog'
import Layout from '@/components/Layout'
import Link from 'next/link'

function CategoriesPage() {
  const categories = getAllCategories()

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Todas las Categorías
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explora nuestros artículos organizados por categorías temáticas
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const postsInCategory = getPostsByCategory(category.slug)
            
            return (
              <Link
                key={category.id}
                href={`/categoria/${category.slug}`}
                className="group block bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300"
              >
                <div className="p-6">
                  {/* Category Icon/Color */}
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>

                  {/* Category Name */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>

                  {/* Category Description */}
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Post Count */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {postsInCategory.length} artículo{postsInCategory.length !== 1 ? 's' : ''}
                    </span>
                    
                    <div className="flex items-center text-blue-600 group-hover:text-blue-800 transition-colors">
                      <span className="text-sm font-medium mr-1">Ver artículos</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </Link>
        </div>
      </div>
    </Layout>
  )
}

// Generar metadata para SEO
export async function generateMetadata() {
  return {
    title: 'Todas las Categorías - BlogDemo',
    description: 'Explora todos nuestros artículos organizados por categorías temáticas. Encuentra contenido sobre desarrollo web, performance, testing y más.',
    openGraph: {
      title: 'Categorías - BlogDemo',
      description: 'Explora nuestros artículos organizados por categorías temáticas.',
      type: 'website',
    }
  }
}

export default function Page() {
  return <CategoriesPage />
}
