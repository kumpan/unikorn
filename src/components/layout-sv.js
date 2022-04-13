import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import CookieConsent from "react-cookie-consent"
import CloseIcon from "../../content/assets/icons/close.svg"

import Nav from "./nav"
import Footer from "./footer-sv"

const Layout = (props) => {
  const { children } = props

  const data = useStaticQuery(
    graphql`
      query {
        about: allMdx(
          filter: {
            fileAbsolutePath: { regex: "/(/about/)/" }
            frontmatter: { language: { eq: "sv" } }
          }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              frontmatter {
                shorttitle
                path
              }
            }
          }
        }
        web: allMdx(
          filter: {
            fileAbsolutePath: { regex: "/(/web/)/" }
            frontmatter: { language: { eq: "sv" } }
          }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              frontmatter {
                path
                shorttitle
                menu_position
              }
            }
          }
        }
        marketing: allMdx(
          filter: {
            fileAbsolutePath: { regex: "/(/marketing/)/" }
            frontmatter: { language: { eq: "sv" } }
          }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              frontmatter {
                path
                shorttitle
                menu_position
              }
            }
          }
        }
        unikorns: allMdx(
          filter: {
            fileAbsolutePath: { regex: "/(/unikorns/)/" }
            frontmatter: { language: { eq: "sv" } }
          }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              frontmatter {
                path
                shorttitle
              }
            }
          }
        }
        digital: allMdx(
          filter: {
            fileAbsolutePath: { regex: "/(/digital/)/" }
            frontmatter: { language: { eq: "sv" } }
          }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              frontmatter {
                path
                shorttitle
                menu_position
              }
            }
          }
        }
      }
    `
  )

  const aboutPages = data.about.edges
  const webPages = data.web.edges
  const marketingPages = data.marketing.edges
  const digitalPages = data.digital.edges
  const unikornsPages = data.unikorns.edges

  return (
    <div className="main-container">
      <Nav language="/sv/" location={props.location} aboutPages={aboutPages} webPages={webPages} marketingPages={marketingPages} unikornsPages={unikornsPages} digitalPages={digitalPages}/>
      <main>{children}</main>
      <Footer show_contact_info={props.show_contact_info} />
      <CookieConsent buttonText="OK" cookieName="cookieConcent" contentClasses="cookie-text" buttonWrapperClasses="cookie-btn">
        This website uses cookies to ensure you get the best experience. <Link to="/sv/cookie-policy/">Read the policy here</Link>.
        <CloseIcon />
      </CookieConsent>
      <div id="modal-root"></div>
    </div>
  )
}

export default Layout