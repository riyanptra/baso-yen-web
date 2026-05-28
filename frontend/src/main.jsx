import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import { ErrorBoundary } from './ErrorBoundary.jsx'

/**
 * Inisialisasi Otak React Query
 * Mengatur konfigurasi bawaan (default) untuk seluruh aplikasi
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Jangan refetch otomatis saat user ganti tab Chrome
      staleTime: 5 * 60 * 1000, // Anggap data masih "segar" selama 5 menit tanpa perlu memanggil API lagi
      retry: 1, // Jika API gagal (server mati/koneksi jelek), coba ulang 1 kali secara otomatis
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          {/* Tombol inspeksi ini hanya muncul saat masa development, sangat berguna untuk nge-debug cache */}
          <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>,
)
