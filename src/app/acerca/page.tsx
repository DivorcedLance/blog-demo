import Layout from '@/components/Layout'
import Link from 'next/link'

function AboutPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Acerca de BlogDemo
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Un proyecto de demostración que muestra las capacidades avanzadas de Next.js 15
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          {/* Project Description */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Qué es BlogDemo?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              BlogDemo es una aplicación de blog construida con las últimas tecnologías web, 
              diseñada específicamente para demostrar las capacidades de <strong>Next.js 15</strong> 
              en cuanto a Server-Side Rendering (SSR), Static Site Generation (SSG), y técnicas 
              avanzadas de paginación.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Este proyecto simula un blog real con una base de datos JSON, implementando 
              tanto páginas estáticas pre-generadas como páginas dinámicas que se renderizan 
              en el servidor, ofreciendo una experiencia de usuario óptima y un excelente rendimiento.
            </p>
          </section>

          {/* Technical Stack */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Stack Tecnológico</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Frontend</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Next.js 15 with App Router
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    React 18
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    TypeScript
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Tailwind CSS
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Características</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Server-Side Rendering
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Static Site Generation
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Paginación dinámica
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    SEO optimizado
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Características Principales</h2>
            
            <div className="space-y-8">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Server-Side Rendering (SSR)
                </h3>
                <p className="text-gray-700">
                  Las páginas se renderizan en el servidor para cada solicitud, garantizando 
                  contenido siempre actualizado y mejor SEO. Ideal para contenido dinámico 
                  y páginas que cambian frecuentemente.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Static Site Generation (SSG)
                </h3>
                <p className="text-gray-700">
                  Páginas pre-generadas en tiempo de construcción para máximo rendimiento. 
                  Los posts del blog se generan estáticamente, ofreciendo tiempos de carga 
                  ultrarrápidos y menor carga del servidor.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Paginación Inteligente
                </h3>
                <p className="text-gray-700">
                  Sistema de paginación que combina rutas estáticas y dinámicas, 
                  optimizando la experiencia del usuario y el rendimiento de la aplicación.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Base de Datos Simulada
                </h3>
                <p className="text-gray-700">
                  Utiliza archivos JSON para simular una base de datos real, 
                  permitiendo testear el rendimiento sin la complejidad de una 
                  base de datos tradicional.
                </p>
              </div>
            </div>
          </section>

          {/* Performance */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Optimización de Rendimiento</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Este proyecto está específicamente diseñado para testear y demostrar técnicas 
              de optimización de rendimiento en aplicaciones Next.js:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Optimización automática de imágenes con el componente Image de Next.js</li>
              <li>Code splitting automático por rutas y componentes</li>
              <li>Pre-loading inteligente de recursos críticos</li>
              <li>Generación de sitemap automático para mejor SEO</li>
              <li>Metadata optimizado para redes sociales</li>
              <li>Lazy loading de componentes no críticos</li>
            </ul>
          </section>

          {/* Use Cases */}
          <section className="mb-12 bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Casos de Uso</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Este proyecto sirve como referencia para:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-gray-700">
                <li>✅ Blogs y sitios de contenido</li>
                <li>✅ Portafolios de desarrolladores</li>
                <li>✅ Sitios de documentación</li>
                <li>✅ Landing pages dinámicas</li>
              </ul>
              <ul className="space-y-2 text-gray-700">
                <li>✅ E-commerce con catálogos</li>
                <li>✅ Sitios de noticias</li>
                <li>✅ Plataformas educativas</li>
                <li>✅ Aplicaciones web corporativas</li>
              </ul>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Listo para explorar?
            </h2>
            <p className="text-gray-700 mb-6">
              Navega por nuestros artículos y experimenta la velocidad y fluidez de una 
              aplicación Next.js optimizada.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ver Artículos
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/categorias"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Explorar Categorías
              </Link>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}

// Generar metadata para SEO
export async function generateMetadata() {
  return {
    title: 'Acerca de - BlogDemo',
    description: 'Conoce más sobre BlogDemo, un proyecto de demostración construido con Next.js 15 que muestra las capacidades de SSR, SSG y optimización de rendimiento.',
    openGraph: {
      title: 'Acerca de BlogDemo',
      description: 'Un proyecto de demostración que muestra las capacidades avanzadas de Next.js 15.',
      type: 'website',
    }
  }
}

export default function Page() {
  return <AboutPage />
}
