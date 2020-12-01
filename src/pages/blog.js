import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout.js"
import Hero from "../components/hero.js"
import BlogList from "../components/blog/blog-list.js"
import IconBtn from "../components/buttons/icon-btn.js"

import Styles from "./blog.module.css"

const Blog = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        pageData: allMdx(
          filter: {
            fileAbsolutePath: { regex: "/(/blog-page/)/" }
          }
        ) {
          edges {
            node {
              frontmatter {
                shorttitle
                title
                description
                canonical
                og_image {
                  src {
                    childImageSharp {
                      fluid(maxWidth: 560) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                    extension
                    publicURL
                  }
                  alt
                }
                hero {
                  heading
                  text
                  featured_image {
                    src {
                      childImageSharp {
                        fluid(maxWidth: 560) {
                          ...GatsbyImageSharpFluid
                        }
                      }
                      extension
                      publicURL
                    }
                    alt
                  }
                  button
                  buttonlink
                }
                to_article_text
              }
            }
          }
        }

        posts: allMdx(
          filter: { fileAbsolutePath: { regex: "/(/blog/|/video/)/" } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              frontmatter {
                path
                title
                date(formatString: "DD/MM/YY")
                category
                author
                author_page
                video_url
                type
                featured_image {
                  src {
                    childImageSharp {
                      fluid(maxWidth: 560) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                  alt
                }
              }
            }
          }
        }
      }
    `
  )

  const pageData = data.pageData.edges[0].node.frontmatter
  const posts = data.posts.edges

  const filterPosts = (e) => {
    const type = "type-" + e.target.innerText.toLowerCase()
    const elements = document.getElementsByClassName("blog-post-wrapper")

    for ( let i = 0;  i < elements.length; i++ ) {
      if ( elements[i].classList.contains(type) ) {
        elements[i].style.display = "block"
      } else {
        elements[i].style.display = "none"
      }
    }
  }
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageData.title,
    "description": pageData.description,
    "url": pageData.canonical
  }
  
  return (
    <Layout location="/blog">
      <SEO
        title={pageData.title}
        description={pageData.description}
        canonical={pageData.canonical}
        schemaMarkup={schema}
        image={pageData.og_image.src}
      />
      <Hero 
        heading={pageData.hero.heading} 
        text={pageData.hero.text}
        img={pageData.hero.featured_image.src}
        alt={pageData.hero.featured_image.alt}
        button={pageData.hero.button}
        buttonlink={pageData.hero.buttonlink}
        videoURL={pageData.hero.video_url}
        shorttitle={pageData.shorttitle}
        fade
      />
      <section className={Styles.blog_section}>
        <div className="container">
          <div className={Styles.blog_filter}>
            <p className={Styles.sort_by_text}>Sort by</p>
            <IconBtn text="Video" filterPosts={filterPosts} icon="video.svg" />
            <IconBtn text="Blog" filterPosts={filterPosts} icon="text.svg" />
          </div>

          <BlogList posts={posts} large />
        </div>
      </section>
    </Layout>
  )
}

export default Blog