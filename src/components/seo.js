import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ canonical, description, lang, meta, keywords, title, noindex, video, schemaMarkup, image }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const ogImg = image && image.publicURL ? site.siteMetadata.siteUrl + image.publicURL : ''

  let canonicalUrl = canonical || site.siteMetadata.siteUrl

  if(typeof window !== `undefined`) {
    canonicalUrl = canonical || window.location.href
  }

  return (
    <Helmet
    htmlAttributes={{
      lang,
    }}
    title={title}
    titleTemplate={`%s | ${site.siteMetadata.title}`}
    meta={[
      {
        name: `description`,
        content: metaDescription,
      },
      {
        property: `og:title`,
        content: title,
      },
      {
        property: `og:description`,
        content: metaDescription,
      },
      {
        property: `og:type`,
        content: video ? `video.movie` : `website`,
      },
      {
        property: `og:image`,
        content: ogImg,
      },
      {
        property: `og:url`,
        content: canonicalUrl,
      },
      {
        property: `twitter:card`,
        content: `summary`,
      },
      {
        property: `twitter:title`,
        content: title,
      },
      {
        property: `twitter:description`,
        content: metaDescription,
      },
      {
        property: `twitter:image`,
        content: ogImg,
      }
    ]
      .concat(
        keywords.length > 0
          ? {
              name: `keywords`,
              content: keywords.join(`, `),
            }
          : []
      )
      .concat(meta)}>

      {canonicalUrl && !noindex &&
        <link rel="canonical" key={canonicalUrl} href={canonicalUrl} />
      }

      {noindex && 
        <meta name="robots" content="noindex" />
      }

      {schemaMarkup &&
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
      }

    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  description: ``,
}

SEO.propTypes = {
  canonical: PropTypes.string,
  noindex: PropTypes.bool,
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default SEO