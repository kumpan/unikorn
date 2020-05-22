import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import remark from "remark"
import recommended from "remark-preset-lint-recommended"
import remarkHtml from "remark-html"

import ToggleItem from "../components/toggle.js"

import Styles from "./footer.module.css"

const toggleClass = function(e) {
  const el = document.getElementById('footer-toggle-'+e.target.dataset.id)

  if (el.classList.contains(Styles.active)) {
    el.classList.remove(Styles.active)

  } else {
    el.classList.add(Styles.active);
  }
}

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
      const htlmText = remark()
        .use(recommended)
        .use(remarkHtml)
        .processSync(text)
        .toString()

      return (
          <div id={"footer-toggle-"+i} className={Styles.footer_col} key={i}>
            <ToggleItem>
              <h5 data-id={i} onClick={toggleClass} onKeyDown={toggleClass} role="presentation">{heading}</h5>
              <div className={Styles.footer_col_text} dangerouslySetInnerHTML={{ __html: htlmText }} />
            </ToggleItem>
          </div>
      )
    })
  ) : (
    null
  )

  return (
    <div className={"footer " + Styles.footer}>
      <div className="container">
        <span className="pre-heading">{footerData.smallheading}</span>
        <h3>{footerData.heading}</h3>
        <div className={Styles.footer_row}>{columnElements}</div>
        <div className={Styles.copyright}><p>Unikorn {new Date().getFullYear()} ©</p></div>
      </div>
    </div>
  )
}

export default Footer