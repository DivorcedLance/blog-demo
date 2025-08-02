import Link from 'next/link'
import { PaginationInfo } from '@/types/blog'

interface PaginationProps {
  pagination: PaginationInfo
  basePath?: string
}

export default function Pagination({ pagination, basePath = '' }: PaginationProps) {
  const { currentPage, totalPages, hasNextPage, hasPreviousPage } = pagination

  if (totalPages <= 1) {
    return null
  }

  const getPageUrl = (page: number) => {
    if (page === 1) {
      return basePath || '/'
    }
    return basePath ? `${basePath}?page=${page}` : `/page/${page}`
  }

  const renderPageNumbers = () => {
    const pages = []
    const showPages = 5 // Número de páginas a mostrar
    
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2))
    const endPage = Math.min(totalPages, startPage + showPages - 1)
    
    // Ajustar si no hay suficientes páginas al final
    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1)
    }

    // Primera página
    if (startPage > 1) {
      pages.push(
        <Link
          key={1}
          href={getPageUrl(1)}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-blue-600 transition-colors"
        >
          1
        </Link>
      )
      
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300">
            ...
          </span>
        )
      }
    }

    // Páginas del rango
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Link
          key={i}
          href={getPageUrl(i)}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border transition-colors ${
            i === currentPage
              ? 'z-10 bg-blue-600 text-white border-blue-600'
              : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50 hover:text-blue-600'
          }`}
        >
          {i}
        </Link>
      )
    }

    // Última página
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300">
            ...
          </span>
        )
      }
      
      pages.push(
        <Link
          key={totalPages}
          href={getPageUrl(totalPages)}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-blue-600 transition-colors"
        >
          {totalPages}
        </Link>
      )
    }

    return pages
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
      <div className="flex justify-between flex-1 sm:hidden">
        {/* Mobile pagination */}
        {hasPreviousPage ? (
          <Link
            href={getPageUrl(currentPage - 1)}
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Anterior
          </Link>
        ) : (
          <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed">
            Anterior
          </span>
        )}
        
        {hasNextPage ? (
          <Link
            href={getPageUrl(currentPage + 1)}
            className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Siguiente
          </Link>
        ) : (
          <span className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed">
            Siguiente
          </span>
        )}
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Mostrando página{' '}
            <span className="font-medium">{currentPage}</span>
            {' '}de{' '}
            <span className="font-medium">{totalPages}</span>
            {' '}({pagination.totalPosts} artículos en total)
          </p>
        </div>
        
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            {/* Previous button */}
            {hasPreviousPage ? (
              <Link
                href={getPageUrl(currentPage - 1)}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-blue-600 transition-colors"
              >
                <span className="sr-only">Anterior</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            ) : (
              <span className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-gray-100 text-sm font-medium text-gray-400 cursor-not-allowed">
                <span className="sr-only">Anterior</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
            )}

            {/* Page numbers */}
            {renderPageNumbers()}

            {/* Next button */}
            {hasNextPage ? (
              <Link
                href={getPageUrl(currentPage + 1)}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-blue-600 transition-colors"
              >
                <span className="sr-only">Siguiente</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            ) : (
              <span className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-gray-100 text-sm font-medium text-gray-400 cursor-not-allowed">
                <span className="sr-only">Siguiente</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </span>
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}
