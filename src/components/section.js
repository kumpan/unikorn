import React, { Component }  from "react"

class Section extends Component {
  render() {
    const { children } = this.props

    return (
      <section className="section">
        <div className="section-row">{children}</div>
      </section>
    )
  }
}

export default Section