import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout.js"
import Hero from "../components/hero.js"
import BlogList from "../components/blog/blog-list.js"

const Blog = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allMdx(
          filter: {
            fileAbsolutePath: { regex: "/(/blogpage/)/" }
          }
        ) {
          edges {
            node {
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
          filter: { fileAbsolutePath: { regex: "/(/blog/|/video/)/" } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              frontmatter {
                title
                date
                category
                author
                type
              }
            }
          }
        }
      }
    `
  )

  const pageData = data.allMdx.edges[0].node.frontmatter
  const posts = data.posts.edges
  
  const filterPosts = (e) => {
    const type = "type-" + e.target.innerHTML.toLowerCase()
    const elements = document.getElementsByClassName('blog-post')

    for ( let i = 0;  i < elements.length; i++ ) {
      if ( elements[i].classList.contains(type) ) {
        elements[i].style.display = "block"
      } else {
        elements[i].style.display = "none"
      }
    }
  }

  return (
    <Layout location="/blog">
      <Hero 
        heading={pageData.hero.heading} 
        text={pageData.hero.text}
        img={pageData.hero.featured_image.src}
        alt={pageData.hero.featured_image.alt}
        button={pageData.hero.button}
        buttonlink={pageData.hero.buttonlink}
      />

      <div className="blog-filter">
        <p>Sort by</p>
        <div className="filter-video" onClick={filterPosts} onKeyDown={filterPosts} role="button" tabIndex={0}>Video</div>
        <div className="filter-blog" onClick={filterPosts} onKeyDown={filterPosts} role="button" tabIndex={0}>Blog</div>
      </div>
      <BlogList posts={posts} />
    </Layout>
  )
}

export default Blog