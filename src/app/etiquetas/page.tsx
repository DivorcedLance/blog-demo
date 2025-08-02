import Layout from '@/components/Layout'
import Link from 'next/link'
import { getAllTags, getAllPosts } from '@/lib/blog'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Todas las Etiquetas - BlogDemo',
    description: 'Explora todas las etiquetas disponibles en nuestro blog. Encuentra artículos organizados por temas específicos.',
    openGraph: {
      title: 'Todas las Etiquetas - BlogDemo',
      description: 'Explora todas las etiquetas disponibles en nuestro blog.',
      type: 'website',
    }
  }
}

async function TagsPage() {
  const tags = await getAllTags()
  const posts = await getAllPosts()

  // Contar posts por etiqueta
  const tagCounts = tags.map(tag => {
    const postCount = posts.filter(post => 
      post.tags.includes(tag.slug)
    ).length
    return {
      ...tag,
      postCount
    }
  }).sort((a, b) => b.postCount - a.postCount) // Ordenar por cantidad de posts

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">Inicio</Link>
          <span>/</span>
          <span className="text-gray-900">Etiquetas</span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Explorar Etiquetas
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Todas las Etiquetas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Encuentra artículos organizados por temas específicos. Cada etiqueta 
            agrupa contenido relacionado para ayudarte a descubrir información relevante.
          </p>
          <p className="text-gray-500 mt-4">
            {tags.length} {tags.length === 1 ? 'etiqueta disponible' : 'etiquetas disponibles'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <main className="lg:col-span-3">
            {tags.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tagCounts.map((tag) => (
                  <Link
                    key={tag.slug}
                    href={`/etiqueta/${tag.slug}`}
                    className="group bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {tag.postCount} {tag.postCount === 1 ? 'artículo' : 'artículos'}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {tag.name}
                    </h3>
                    
                    <div className="flex items-center text-sm text-gray-500 group-hover:text-blue-500 transition-colors">
                      <span>Ver artículos</span>
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No hay etiquetas disponibles
                </h3>
                <p className="text-gray-600 mb-6">
                  Aún no hemos creado etiquetas para organizar nuestro contenido.
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
                <div className="flex items-center text-blue-600 font-medium">
                  <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  Todas las etiquetas
                </div>
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

              {/* Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Estadísticas</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total etiquetas:</span>
                    <span className="text-sm font-medium text-gray-900">{tags.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total artículos:</span>
                    <span className="text-sm font-medium text-gray-900">{posts.length}</span>
                  </div>
                  {tagCounts.length > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Más popular:</span>
                      <Link 
                        href={`/etiqueta/${tagCounts[0].slug}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        {tagCounts[0].name}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  )
}

export default function Page() {
  return <TagsPage />
}
