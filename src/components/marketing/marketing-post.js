import React, { Component }  from "react"
import Img from "gatsby-image"

import { slugify } from '../../global-functions.js'
import SecondaryButton from '../../components/buttons/secondary.js'


class MarketingPost extends Component {
  
  render() {
    const { shorttitle, shortdesc, icon, alt } = this.props.post
    const marketingLink = "/marketing/" + slugify(shorttitle)

    const marketingIcon = (icon.src.extension === 'svg') ? (
      <div className="marketing-icon">
        <object type="image/svg+xml" data={icon.src.publicURL} aria-labelledby={alt}></object>
      </div>
    ) : (
      <div className="marketing-icon">
        <Img 
          fluid={icon.src.childImageSharp.fluid}
          alt={alt}
        />
      </div>
    )

    return (
      <div className="marketing-post">
        {marketingIcon}
        <h3>{shorttitle}</h3>
        <p>{shortdesc}</p>
        <SecondaryButton link={marketingLink} text="Read more"/>
      </div>
    )
  }
}

export default MarketingPost