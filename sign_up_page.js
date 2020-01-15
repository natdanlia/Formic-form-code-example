import React from 'react'
import {Link} from 'react-router-dom'

class SignUpForm extends React.Component {
  constructor(){
    super()
    this.state = {
      name: '',
      email: '',
      password: '', 
      confirm_password: '',
      name_error: '',
      email_error: '',
      password_error: '', 
      confirm_password_error: ''
    }
  }

  handleChange = (event) => {
    let inputId = event.target.id
    let inputValue = event.target.value
    this.setState({
      [inputId]: inputValue
    });
  };

  validate= (e) => {
    let isError = false
    const errors = {}
    const strRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    if(!strRegex.test(this.state.name)){
      isError = true
      errors.name_error = "full name is required and must be string"
    } else {
        errors.name_error = ""
        this.setState({
          ...this.state, ...errors
        })
      }
    
    if(!emailRegex.test(this.state.email)){
      isError = true
      errors.email_error = "Enter a correct email address"
    } else {
        errors.email_error= ""
        this.setState({
          ...this.state, ...errors
        })
      }

    if(!pwRegex.test(this.state.password)){
      isError = true
      errors.password_error = "Password requirment is not fulfilled"
    } else {
        errors.password_error= ""
        this.setState({
          ...this.state, ...errors
        })
      }
    
    if(this.state.password !== this.state.confirm_password){
      isError = true
      errors.confirm_password_error = "Password does't match"
    } else {
        errors.confirm_password_error= ""
        this.setState({
          ...this.state, ...errors
        })
      }
  
    this.setState({
      ...this.state, ...errors
    })
  
    return isError
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const err = this.validate()

    if (!err) {
      console.log("correct submission")
      const URL = ""
      fetch(`${URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          user: {
              name: this.state.name,
              last_name: this.state.last_name,
              email: this.state.email,
              password: this.state.password,
              confirm_password: this.state.confirm_password
            }
          }
        )
      }).then(this.setState({
        name: '',
        last_name: '',
        email: '',
        password: '', 
        confirm_password: '',
        name_error: '',
        last_name_error: '',
        email_error: '',
        password_error: '', 
        confirm_password_error: ''
      }))
    }
  };

  render () {
    return (
      <div className='row'>
        <div className='large-12 columns'>
          <h2>Create an account</h2>
          <div className='row'>
            <div className='medium-4 column'>
              <form onSubmit={this.handleSubmit} noValidate>
                <div class="name-field">
                  <label>Full name <small>required</small></label>
                  <input onChange={this.handleChange} id="name" type="text" value={this.state.name} />
                  {this.state.name_error ? <small class="error">{this.state.name_error}</small> : null }
                </div>
                <div class="email-field">
                  <label>Email <small>required</small></label>
                  <input onChange={this.handleChange} type="email" id='email' value={this.state.email} />
                  {this.state.email_error ? <small class="error">{this.state.email_error}</small> : null }
                </div>
                <div class="password-field">
                  <label>Password <small>required</small></label>
                  <input name='password' onChange={this.handleChange} type="password" id="password" value={this.state.password}/>
                  {this.state.password_error ? <small class="error">{this.state.password_error}</small> : null }
                </div>
                <div class="password-confirmation-field">
                  <label>Confirm Password <small>required</small></label>
                  <input id='confirm_password' onChange={this.handleChange}  type="password" required  value={this.state.confirm_password} />
                  {this.state.confirm_password_error ? <small class="error">{this.state.confirm_password_error}</small> : null }
                </div>
                <button type='submit' className="button expanded">Register</button>
              </form> 
            </div>
            <div className='medium-6 column'>
              <p>Passwords must be at least eight (8) alphanumeric characters in length.</p>
              <p>Passwords must contain all of the following four (4) character types:</p>
              <ul>
                <li>English upper case letter (A, B, C, etc.)</li>
                <li>English lower case letter (a, b, c, etc.)</li>
                <li>Special character ({`{,}`}, [,], (,), {`<`}, {`>`},:, ', ", ?, /, |, `, ~, !, @, #, $, %, ^, &, *, _, -, +, =, etc.)</li>
                <li>Arabic number (0, 1, 2, 3, etc.)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SignUpForm;