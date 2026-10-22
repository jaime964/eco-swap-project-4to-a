/**
 * EcoSwap 🌱 Service Worker
 * Version: 1.0.0
 * Provides robust offline functionality, caching strategies, and fast loading.
 */

const CACHE_NAME = 'ecoswap-core-v1';
const IMAGE_CACHE_NAME = 'ecoswap-images-v1';

const STATIC_ASSETS = [
  './',
  './index.html',
  './index.css',
  './App.js',
  './manifest.webmanifest',
  './manifest.json',
  './offline.html',
  './icons/favicon.svg',
  './icons/icon-maskable.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

// Instalar Service Worker y pre-cachear el App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log('[Service Worker] Pre-caching App Shell...');
      // Usar individualmente para evitar que un fallo en un asset externo bloquee el install
      for (const asset of STATIC_ASSETS) {
        try {
          await cache.add(asset);
        } catch (err) {
          console.warn('[Service Worker] Falló cachear asset:', asset, err);
        }
      }
    })
  );
  self.skipWaiting();
});

// Activar Service Worker y limpiar cachés antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== IMAGE_CACHE_NAME) {
            console.log('[Service Worker] Eliminando caché obsoleta:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Estrategias de interceptación de red
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // No interceptar peticiones no GET o de extensiones de navegador
  if (req.method !== 'GET' || url.protocol.startsWith('chrome-extension')) {
    return;
  }

  // 1. Navegación principal (HTML) -> Network First con fallback a caché y página offline
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', responseClone));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(req);
          if (cachedResponse) return cachedResponse;
          const indexFallback = await caches.match('./index.html');
          if (indexFallback) return indexFallback;
          const offlinePage = await caches.match('./offline.html');
          return offlinePage || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
        })
    );
    return;
  }

  // 2. Fuentes de Google y CDNs -> Cache First con actualización en red
  if (url.origin.includes('fonts.googleapis.com') || url.origin.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(req).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(req).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return networkResponse;
        }).catch(() => cachedResponse);
      })
    );
    return;
  }

  // 3. Imágenes externas (ej: Unsplash) -> Cache First con fallback dinámico
  if (req.destination === 'image' || url.hostname.includes('unsplash.com')) {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(req);
        if (cachedResponse) return cachedResponse;

        try {
          const networkResponse = await fetch(req);
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            cache.put(req, networkResponse.clone());
          }
          return networkResponse;
        } catch (error) {
          // Si no hay red y no está en caché, devolver el icono local como fallback
          const fallbackIcon = await caches.match('./icons/icon-192.png');
          return fallbackIcon || new Response('', { status: 404 });
        }
      })
    );
    return;
  }

  // 4. Recursos estáticos locales (CSS, JS, iconos locales) -> Stale-While-Revalidate
  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      const fetchPromise = fetch(req).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
        }
        return networkResponse;
      }).catch(() => {
        // En caso de error de red sin caché
        return cachedResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});

// Escuchar mensajes para forzar actualización de caché
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
