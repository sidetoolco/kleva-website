import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const response = await next();
  
  // Security Headers
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  // HSTS (HTTP Strict Transport Security)
  if (context.url.protocol === 'https:') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }
  
  // Content Security Policy
  response.headers.set('Content-Security-Policy', `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://zcal.co https://s3-us-west-2.amazonaws.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: https: blob:;
    connect-src 'self' https://www.googletagmanager.com https://zcal.co https://api.mixpanel.com;
    frame-src 'self' https://zcal.co;
  `.replace(/\s+/g, ' ').trim());
  
  // Cache Control for static assets
  const pathname = context.url.pathname;
  if (pathname.match(/\.(js|css|woff2?|ttf|otf|ico|png|jpg|jpeg|gif|svg|webp)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (pathname === '/') {
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  } else {
    response.headers.set('Cache-Control', 'public, max-age=86400, s-maxage=86400');
  }
  
  return response;
};