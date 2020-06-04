import React, { Component }  from "react"
import { ArrowRightIcon, InformationOutlineIcon } from '@icons/material'
import remark from "remark"
import recommended from "remark-preset-lint-recommended"
import remarkHtml from "remark-html"

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

  validateInput = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    event.target.parentElement.classList.remove("active")

    const validEmailRegex = RegExp(
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
    )

    switch (name) {
      case "name": 
        errors.name = 
          value.length < 5
            ? "Name must be at least 5 characters long!"
            : "";
        break;
      case "email": 
        errors.email = 
          validEmailRegex.test(value)
            ? ""
            : "Please enter a valid email";
        break;
      case "message": 
        errors.message = 
          value.length < 1
            ? "Please write a message"
            : "";
        break;
      default:
        break;
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

    let requiredFields = ["name", "email", "message"]

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
    }, 200);
  }
  
  validateForm(errors) {
    let valid = true

    Object.values(errors).forEach(
      val => val.length > 0 && (valid = false)
    )
    if (valid) {
      document.getElementById('contact-form').submit();
    } else {
      this.setState({
        unValidForm: true
      })
    }
  }

  render() {
    const { name, email, message, subjects, submit_text, form_title, form_info_text } = this.props.data
    const choices = subjects.choices
    const { errors } = this.state;

    const choicesElements = choices.length ? (
      choices.map((choice, i) => {
        return (
          <div className="choice_wrapper" key={i}>
            <input type="checkbox" id={choice} name={choice} value={choice} />
            <label htmlFor={choice}>{choice}</label> 
          </div>
        )
      })
    ) : (
      <p>There are no choices</p>
    )

    const htlmFormInfoText = remark()
      .use(recommended)
      .use(remarkHtml)
      .processSync(form_info_text)
      .toString()

    return (
      <form id="contact-form" name="contact" method="POST" data-netlify="true" action="/thanks" onSubmit={this.handleSubmit}>
        <p>{form_title}</p>

        <div className="input-container">
          <div className={"field" + (errors.name.length > 0 ? " error " : "") + (this.state.name ? " filled" : "")}>
            <input type="text" name="name" placeholder={name.placeholder} onBlur={this.validateInput} onFocus={this.activateClass} noValidate />
            <label htmlFor="name">{name.label} *</label> 
          </div>
          {errors.name.length > 0 && 
              <span className="error-message">{errors.name}</span>}
        </div>

        <div className="input-container">
          <div className={"field" + (errors.email.length > 0 ? " error " : "") + (this.state.email ? " filled" : "")}>
            <input type="text" name="email" placeholder={email.placeholder} onBlur={this.validateInput} onFocus={this.activateClass} noValidate />
            <label htmlFor="email">{email.label} *</label>
          </div>
          {errors.email.length > 0 && 
              <span className="error-message">{errors.email}</span>}
        </div>

        <div className="textarea-container">
          <div className={"field" + (errors.message.length > 0 ? " error " : "") + (this.state.message ? " filled" : "")}>
            <textarea name="message" placeholder={message.placeholder} onBlur={this.validateInput} onFocus={this.activateClass} noValidate />
            <label htmlFor="message">{message.label} *</label>
          </div>
          {errors.message.length > 0 && 
              <span className="error-message">{errors.message}</span>}
        </div>

        <div className="choices-container">
          <label htmlFor="message">{subjects.label}</label>
          {choicesElements}
        </div>
        
        {this.state.unValidForm &&
          <span className="form-error"><InformationOutlineIcon /> The form could not be submitted, please go back and fix the errors shown in the form</span>
        }
        
        <div className="form-info-text" dangerouslySetInnerHTML={{ __html: htlmFormInfoText }} />

        <div className="submit-btn">
          <button type="submit">{submit_text}</button>
          <ArrowRightIcon />
        </div>
      </form>
    )
  }
}

export default Form