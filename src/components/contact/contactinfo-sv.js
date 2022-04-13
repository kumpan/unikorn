import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Styles from "./contactinfo.module.css"

const ContactInfo = (props) => {
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
            frontmatter: { language: { eq: "sv" } }
          }) {
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
        <div key={i} className={Styles.contactinfo_col + " " + (props.transparent ? Styles.transparent : "")}>
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
    <div className={Styles.contact_info}>
      <div className={Styles.contact_info_row}>
        {columnElements}
      </div>
    </div>
  )
}

export default ContactInfo