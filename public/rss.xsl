<?xml version="1.0" encoding="UTF-8"?>
<!--
  Browsers render a raw feed as an XML dump, or refuse it outright. An XSLT
  stylesheet makes /writing/rss.xml a readable page for people, while feed
  readers ignore it entirely and parse the XML underneath.
-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title><xsl:value-of select="rss/channel/title"/></title>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="crossorigin"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&amp;family=IBM+Plex+Mono:wght@400;500&amp;display=swap"/>
        <style>
          :root {
            --paper: #faf7f2; --ink: #15120e; --ink-2: #4c463c; --ink-3: #8a8274;
            --rule: #ddd5c6; --rule-2: #c5bba7; --accent: #c2371d;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --paper: #191713; --ink: #f2eee6; --ink-2: #ada597; --ink-3: #7a7264;
              --rule: #302c25; --rule-2: #453f36; --accent: #ef6a4c;
            }
          }
          * { box-sizing: border-box; }
          body {
            margin: 0; background: var(--paper); color: var(--ink);
            font-family: Archivo, ui-sans-serif, system-ui, sans-serif;
            font-size: 16px; line-height: 1.6; -webkit-font-smoothing: antialiased;
          }
          .sheet { width: min(46rem, calc(100% - 2.5rem)); margin-inline: auto; padding-block: 4rem 5rem; }
          .label {
            color: var(--ink-3); font-family: "IBM Plex Mono", ui-monospace, monospace;
            font-size: 0.6875rem; font-weight: 500; letter-spacing: 0.11em; text-transform: uppercase;
          }
          h1 { margin: 0.75rem 0 0; font-size: clamp(1.85rem, 4.4vw, 2.75rem); font-weight: 500; letter-spacing: -0.035em; line-height: 1.1; }
          .lede { max-width: 34rem; margin: 1.25rem 0 0; color: var(--ink-2); }
          .note {
            max-width: 34rem; margin-top: 2rem; border-left: 2px solid var(--accent);
            padding: 0.15rem 0 0.15rem 1rem; color: var(--ink-2); font-size: 0.95rem;
          }
          .note code {
            font-family: "IBM Plex Mono", ui-monospace, monospace; font-size: 0.85em;
            background: var(--paper); border: 1px solid var(--rule); border-radius: 2px; padding: 0.05em 0.3em;
          }
          ul { margin: 3rem 0 0; padding: 0; list-style: none; border-bottom: 1px solid var(--rule); }
          li { border-top: 1px solid var(--rule); }
          li:first-child { border-top: 1px solid var(--rule-2); }
          a.item { display: block; padding: 1.5rem 0; color: inherit; text-decoration: none; }
          a.item:hover h2 { color: var(--accent); }
          h2 { margin: 0.5rem 0 0; font-size: 1.3rem; font-weight: 500; letter-spacing: -0.025em; line-height: 1.25; }
          .desc { max-width: 34rem; margin: 0.5rem 0 0; color: var(--ink-2); font-size: 0.95rem; }
          footer { margin-top: 3rem; border-top: 1px solid var(--rule-2); padding-top: 1.5rem; }
          footer a { color: var(--ink); text-decoration: underline; text-decoration-color: var(--accent); text-underline-offset: 0.2em; }
        </style>
      </head>
      <body>
        <div class="sheet">
          <p class="label">RSS feed</p>
          <h1><xsl:value-of select="rss/channel/title"/></h1>
          <p class="lede"><xsl:value-of select="rss/channel/description"/></p>

          <p class="note">
            This is a feed, not a broken page. Paste this address into a reader
            like NetNewsWire, Feedly or Reeder and new posts arrive there
            automatically — no account, no email, no algorithm.
            <br/><br/>
            <code><xsl:value-of select="rss/channel/atom:link/@href"/></code>
          </p>

          <ul>
            <xsl:for-each select="rss/channel/item">
              <li>
                <a class="item">
                  <xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute>
                  <span class="label"><xsl:value-of select="substring(pubDate, 1, 16)"/></span>
                  <h2><xsl:value-of select="title"/></h2>
                  <p class="desc"><xsl:value-of select="description"/></p>
                </a>
              </li>
            </xsl:for-each>
          </ul>

          <footer>
            <a>
              <xsl:attribute name="href"><xsl:value-of select="rss/channel/link"/></xsl:attribute>
              Back to the site
            </a>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
