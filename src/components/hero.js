import React, { Component }  from "react"
import Img from "gatsby-image"
import { Link } from "gatsby"

import PrimaryButton from "./buttons/primary.js"

import Styles from "./hero.module.css"

class Hero extends Component {
  render() {
    const { heading, text, img, alt, button, buttonlink, shorttitle, parentPageLink, parentPageTitle, lowerImg, startpage, fade } = this.props

    let heroImage
    if (img && img.extension === "svg") {
      heroImage = 
      <div className={Styles.hero_section_image + " " + (lowerImg ? Styles.lower_img : "" )}>
        <object type="image/svg+xml" data={img.publicURL} aria-labelledby={alt}></object>
      </div>
    } else if (img) {
      heroImage = 
      <div className={Styles.hero_section_image + " " + (lowerImg ? Styles.lower_img : "" )}>
        <Img 
          fluid={img.childImageSharp.fluid}
          alt={alt}
        />
      </div>
    }

    return (
      <div className={Styles.hero_section + " " + (fade ? Styles.fade : "")}>
        <div className={Styles.hero_row + " " + (startpage ? Styles.startpage : "")}>
          <div className={Styles.hero_section_text}>
            {((parentPageLink || shorttitle) || (parentPageLink && shorttitle)) &&
              <div className="breadcrumbs">
                {parentPageLink &&
                  <span><Link to={"/" + parentPageLink}>{parentPageTitle}</Link> / </span>
                }
                
                {shorttitle &&
                  <span>{shorttitle}</span>
                }
              </div>
            }
            <h1 className={Styles.h1_animation}>{heading}</h1>
            <p className={Styles.p_animation}>{text}</p>

            <div className={Styles.btn_animation}>
              {button &&
                <PrimaryButton text={button} link={buttonlink} />
              }
            </div>
          </div>
            {heroImage}
        </div>
      </div>
    )
  }
}

export default Hero