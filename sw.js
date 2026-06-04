const CACHE='logos-v3';
const ASSETS=['./index.html','./manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  if(e.request.url.includes('api.anthropic.com')||e.request.url.includes('fonts.googleapis')||e.request.url.includes('youtube')||e.request.url.includes('ytimg'))return;
  e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).catch(()=>c)));
});
