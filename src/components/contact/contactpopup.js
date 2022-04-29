import React, { Component }  from "react"
import Img from "gatsby-image"

import Form from "./form.js"

import Styles from "./contactpopup.module.css"


const ContactContent = (props) => {

  const contactData = props.data.data
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
            <Form data={contactData.form} language={contactData.language}/>
            <div className={Styles.contact_popup_contactinfo}>
              <a href={"mailto:" + contactData.contact_email}>{contactData.contact_email}</a>
              <a href={"tel:" + contactData.contact_tel}>{contactData.contact_tel}</a>
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.contact_popup_block}></div>
    </div>
  )
}

class ContactPopup extends Component {  
  render() {
    return <ContactContent data={this.props} />
  }
}
export default ContactPopup