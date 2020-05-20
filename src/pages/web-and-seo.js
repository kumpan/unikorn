import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Hero from "../components/hero.js"
import Layout from "../components/layout.js"
import Container from "../components/container.js"
import BlogList from "../components/blog/blog-list.js"
import ContactInfo from "../components/contact/contactinfo.js"

const WebSEO = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allMdx(filter: { fileAbsolutePath: { regex: "/(/webseo)/" } }) {
          edges {
            node {
              body
              frontmatter {
                shorttitle
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
              }
            }
          }
        }
        posts: allMdx(
          filter: { 
            fileAbsolutePath: { regex: "/(/blog/|/video/)/" }
            frontmatter: { category: { regex: "/SEO/" }
          }
        }
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
  const pageData = data.allMdx.edges[0].node.frontmatter
  const posts = data.posts.edges
  
  return (
    <Layout location="/web-and-seo">
      <Hero 
        shorttitle={pageData.shorttitle}
        heading={pageData.hero.heading} 
        text={pageData.hero.text}
        img={pageData.hero.featured_image.src}
        button={pageData.hero.button}
        buttonlink={pageData.hero.buttonlink}
        alt={pageData.hero.featured_image.alt}
      />
      <Container>
        <div className="content-container-text">
          <MDXRenderer>{data.allMdx.edges[0].node.body}</MDXRenderer>
        </div>
        { posts.length > 0 &&
          <div className="content-container-posts">
            <h2>Read the latest posts about SEO</h2>
            <BlogList posts={posts} />
          </div>
        }
      </Container>
      <ContactInfo />
    </Layout>
  )
}

export default WebSEO