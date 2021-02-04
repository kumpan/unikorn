import React, { Component }  from "react"
import remark from "remark"
import recommended from "remark-preset-lint-recommended"
import remarkHtml from "remark-html"
import { navigate } from 'gatsby'
import ArrowRightIcon from "../../../content/assets/icons/arrow-forward.svg"
import InformationOutlineIcon from "../../../content/assets/icons/info.svg"

class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: null,
      email: null,
      message: null,
      errors: {
        name: "",
        email: "",
        message: "",
      },
      unValidForm: null
    }
  }

  handleChange = (event) => {
    this.setState({ 
      [event.target.name]: event.target.value 
    })
  }

  validateInput = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    let errors = this.state.errors

    event.target.parentElement.classList.remove("active")

    const validEmailRegex = RegExp(
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
    )

    switch (name) {
      case "email": 
        errors.email = 
          validEmailRegex.test(value)
            ? ""
            : "Please enter a valid email"
        break
      default:
        break
    }

    this.setState({
        errors, [name]: value
      }
    )
  }

  activateClass = (e) => {
    e.target.parentElement.classList.add("active")
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let requiredFields = ["email"]

    for (let i = 0; i < requiredFields.length; i++) {
      if ( this.state[requiredFields[i]] == null ) {
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            [requiredFields[i]]: "This field is required"
          }
        }))
      }
    }
    setTimeout(() => {
      this.validateForm(this.state.errors)
    }, 200)
  }
  
  validateForm(errors) {
    let valid = true

    const encode = (data) => {
      return Object.keys(data)
          .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
          .join("&")
    }

    Object.values(errors).forEach(
      val => val.length > 0 && (valid = false)
    )

    if (valid) {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ 
          "form-name": "contact",
         ...this.state
        })
      })
        .then(() => {
          return navigate('/thanks')
        })
        .catch(error => {
          this.setState({
            unValidForm: true
          })
        })

    } else {
      this.setState({
        unValidForm: true
      })
    }
  }

  componentDidMount() {
    this.setState({
      message: this.props.message
    })
  }

  render() {
    const formdata = {
      email: {
        label: "Email",
        placeholder: "Email",
      },
    }

    const form_info_text = "";

    const { email } = formdata
    const { errors } = this.state

    const htlmFormInfoText = remark()
      .use(recommended)
      .use(remarkHtml)
      .processSync(form_info_text)
      .toString()

    return (
      <div className="contact-div">
        <form id="contact-form" name="contact" method="POST" data-netlify="true" action="/thanks" onSubmit={this.handleSubmit} className="form-flex">
          <input type="hidden" name="form-name" value="contact" />
          <div className="input-container smaller">
            <div
              className={
                "field" +
                (errors.email.length > 0 ? " error " : "") +
                (this.state.email ? " filled" : "")
              }
            >
              <input
                type="email"
                name="email"
                placeholder={email.placeholder}
                onBlur={this.validateInput}
                onFocus={this.activateClass}
                onChange={this.handleChange}
                noValidate
              />
              <label htmlFor="email">{email.label} *</label>
            </div>
            {errors.email.length > 0 && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-info-text" dangerouslySetInnerHTML={{ __html: htlmFormInfoText }} />

          <div className="submit-btn smaller">
            <button type="submit">{this.props.buttonText}</button>
            <ArrowRightIcon />
          </div>
        </form>

        {this.state.unValidForm && (
          <span className="form-error">
            <InformationOutlineIcon /> The form could not be submitted, please
            go back and fix the errors shown in the form
          </span>
        )}
      </div>
    )
  }
}

export default Form