// template.js
export default () => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- Primary Meta Tags -->
    <title>Axona - eCommerce Marketplace</title>
    <meta name="title" content="Axona - eCommerce Marketplace" />
    <meta name="description" content="Axona is a modern eCommerce marketplace where buyers and sellers connect seamlessly." />
    <meta name="keywords" content="Axona, eCommerce, marketplace, online shopping, buy, sell, MERN" />
    <meta name="author" content="Axona Team" />
    <meta name="theme-color" content="#000000" />

    <!-- Logo & Icons -->
    <link rel="icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
    <link rel="manifest" href="/manifest.json" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://axona.com/" />
    <meta property="og:title" content="Axona - eCommerce Marketplace" />
    <meta property="og:description" content="Axona is a modern eCommerce marketplace where buyers and sellers connect seamlessly." />
    <meta property="og:image" content="https://axona.com/logo.png" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://axona.com/" />
    <meta property="twitter:title" content="Axona - eCommerce Marketplace" />
    <meta property="twitter:description" content="Axona is a modern eCommerce marketplace where buyers and sellers connect seamlessly." />
    <meta property="twitter:image" content="https://axona.com/logo.png" />

    <!-- Structured Data (JSON-LD for SEO) -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Axona",
        "url": "https://axona.com",
        "publisher": {
          "@type": "Organization",
          "name": "Axona",
          "logo": {
            "@type": "ImageObject",
            "url": "https://axona.com/logo.png"
          }
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://axona.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    </script>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>

    <!-- Header with Logo for SEO & Branding -->
    <header style="text-align:center; padding:20px;">
      <img src="/logo.png" alt="Axona Logo" width="120" height="120" />
      <h1>Axona - eCommerce Marketplace</h1>
      <p>Shop, sell, and connect — all in one modern marketplace.</p>
    </header>

    <main>
      <div id="root"></div>
    </main>

    <footer style="text-align:center; padding:10px;">
      <p>&copy; ${new Date().getFullYear()} Axona. All rights reserved.</p>
    </footer>

    <script src="/dist/bundle.js" defer></script>
  </body>
</html>`;
};
