import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const ContactInfo = () => {
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
            fileAbsolutePath: { regex: "/(/contact-info/)/" }
          }
        ) {
          edges {
            node {
              frontmatter {
                col1 {
                  title
                  text
                  link
                }
                col2 {
                  title
                  text
                  link
                }
                col3 {
                  title
                  text
                  link
                }
              }
            }
          }
        }
      }
    `
  )

  const contactInfoData = data.pageData.edges[0].node.frontmatter
  const columns = [contactInfoData.col1, contactInfoData.col2, contactInfoData.col3]

  const columnElements = columns.length ? (
    columns.map(({ title, text, link }, i) => {
      return (
        <div key={i} className="contactinfo-col">
          <a href={link} target="_BLANK" rel="noopener noreferrer">
            <p>{title}</p>
            <strong>{text}</strong>
          </a>
        </div>
      )
    })
  ) : (
    null
  )

  return (
    <div className="contact-info">
      <div className="contact-info-row">{columnElements}</div>
    </div>
  )
}

export default ContactInfo