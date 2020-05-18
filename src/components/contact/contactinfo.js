import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import remark from "remark"
import recommended from "remark-preset-lint-recommended"
import remarkHtml from "remark-html"

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
            fileAbsolutePath: { regex: "/(/contactinfo/)/" }
          }
        ) {
          edges {
            node {
              frontmatter {
                col1 {
                  title
                  text
                }
                col2 {
                  title
                  text
                }
                col3 {
                  title
                  text
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
    columns.map(({ title, text }, i) => {

      // Remark MD-content outside of body
      const htmlText = remark()
        .use(recommended)
        .use(remarkHtml)
        .processSync(text)
        .toString()

      return (
        <div key={i} className="contactinfo-col">
          <p>{title}</p>
          <div dangerouslySetInnerHTML={{ __html: htmlText }} />
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