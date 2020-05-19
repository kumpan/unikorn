import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Footer = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allMdx(
          filter: { fileAbsolutePath: { regex: "/(/footer)/" } }
        )
         {
          edges {
            node {
              frontmatter {
                smallheading
                heading
                col1 {
                  heading
                  text
                }
                col2 {
                  heading
                  text
                }
                col3 {
                  heading
                  text
                }
                col4 {
                  heading
                  text
                }
              }
            }
          }
        }
      }
    `
  )
  const footerData = data.allMdx.edges[0].node.frontmatter
  const columns = [footerData.col1, footerData.col2, footerData.col3, footerData.col4]

  const columnElements = columns.length ? (
    columns.map(({ heading, text }, i) => {
      return (
        <div key={i} className="footer-col">
          <h3>{heading}</h3>
          {text}
        </div>
      )
    })
  ) : (
    null
  )

  return (
  <div className="footer">
    <span>{footerData.smallheading}</span>
    <h2>{footerData.heading}</h2>
    <div className="footer-row">{columnElements}</div>
    <div className="copyright"><p>Unikorn {new Date().getFullYear()} ©</p></div>
  </div>
  )
}

export default Footer