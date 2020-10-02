import React, { Component }  from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import Form from "./form.js"

import Styles from "./contactpopup.module.css"


const ContactContent = (props) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allMdx(filter: { fileAbsolutePath: { regex: "/(/contact-modal)/" } }) {
          edges {
            node {
              frontmatter {
                title
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
                form {
                  form_title
                  name {
                    label
                    placeholder
                  }
                  email {
                    label
                    placeholder
                  }
                  message {
                    label
                    placeholder
                  }
                  subjects {
                    label
                    choices
                  }
                  form_info_text
                  submit_text
                }
                contact_email
                contact_tel
              }
            }
          }
        }
      }
    `
  )

  const contactData = data.allMdx.edges[0].node.frontmatter
  const contactImg = contactData.featured_image

  let contactPopupImg
  if (contactImg && contactImg.src.extension === "svg") {
    contactPopupImg = 
    <div className={Styles.contact_popup_img}>
      <object type="image/svg+xml" data={contactImg.src.publicURL} aria-labelledby={contactImg.alt}></object>
    </div>
  } else if (contactImg) {
    contactPopupImg = 
    <div className={Styles.contact_popup_img}>
      <Img 
        fluid={contactImg.src.childImageSharp.fluid}
        alt={contactImg.alt}
      />
    </div>
  }

  return (
    <div className={Styles.contact_popup}>
      <div className={Styles.contact_popup_row}>
        <div className={Styles.contact_popup_row_inner}>
          <div className={Styles.contact_popup_col1}>
            <h2>{contactData.title}</h2>
            <p>{contactData.text}</p>
            {contactPopupImg}
          </div>
          <div className={Styles.contact_popup_col2}>
            <Form data={contactData.form}/>
            <div className={Styles.contact_popup_contactinfo}>
              <a href={"mailto:" + contactData.contact_email}>{contactData.contact_email}</a>
              <a href={"tel:" + contactData.contact_tel}>{contactData.contact_tel}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

class ContactPopup extends Component {  
  componentDidMount() {
    setTimeout(() => {
      document.getElementsByTagName( "html" )[0].classList.add("no-scroll")
    }, 100)
  }

  componentWillUnmount() {
    document.getElementsByTagName( "html" )[0].classList.remove("no-scroll")
  }

  render() {
      return (
        <ContactContent></ContactContent>
      )
  }
}
export default ContactPopup