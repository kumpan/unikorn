import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Hero from "../components/hero.js"
import Layout from "../components/layout.js"
import Section from "../components/section.js"
import TabsComponent from "../components/tabs.js"
import SecondaryButton from "../components/buttons/secondary.js"

const Startpage = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        pageData: allMdx(filter: { fileAbsolutePath: { regex: "/(/startpage)/" } }) {
          edges {
            node {
              frontmatter {
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
                tabs_section {
                  tabs_heading
                  tab_fields {
                    tab_title
                    heading
                    text
                    buttonlink
                  }
                }
                blog_section {
                  pre_heading
                  heading
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
  const pageData = data.pageData.edges[0].node.frontmatter

  return (
    <Layout location="/">
      <Hero 
        heading={pageData.hero.heading} 
        text={pageData.hero.text}
        img={pageData.hero.featured_image.src}
        button={pageData.hero.button}
        buttonlink={pageData.hero.buttonlink}
      />

      <Section>
        <span className="pre-heading">{pageData.tabs_section.tabs_heading}</span>
        <TabsComponent tabs={pageData.tabs_section.tab_fields} />
      </Section>

      <Section>
        <span className="pre-heading">{pageData.blog_section.pre_heading}</span>
        <h2>{pageData.blog_section.heading}</h2>
        <SecondaryButton text={pageData.blog_section.button} link={pageData.blog_section.buttonlink} />
      </Section>


    </Layout>
  )
}

export default Startpage