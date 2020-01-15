import React from 'react'
import { Link } from 'react-router-dom'

class SignInForm extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            email_error: '',
            password_error: '', 
        }
    }

    handleChange = (event) => {
        let inputId = event.target.id
        let inputValue = event.target.value
        this.setState({
            [inputId]: inputValue
        })
    }

    validate= (e) => {
        let isError = false
        const errors = {}
        const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        
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
        
        this.setState({
          ...this.state, ...errors
        })
      
        return isError
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const err = this.validate()
        if (!err) {
            const URL = ""
            fetch(`${URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        email: this.state.email,
                        password: this.state.password,
                    }
                })
            }).then(this.setState({
                email: '',
                password: '',
                email_error: '',
                password_error: '', 
            }))
        }
    }

    render() {
        return (
            <div className='row'>
                <div className='large-12 columns'>
                    <h1><b>DOL Public API</b></h1>
                    <h3><b>WARNING</b></h3>
                    <p>You are about to access a U.S. Government computer/information system. Access to this system is restricted to authorized users only. Unauthorized access, use, or modification of this computer system or of the data contained herein, or in transit to/from this system, may constitute a violation of Title 18, United States Code, Section 1030 and other federal or state criminal and civil laws. These systems and equipment are subject to monitoring to ensure proper performance of applicable security features or procedures. Such monitoring may result in the acquisition, recording and analysis of all data being communicated, transmitted, processed or stored in this system by a user.</p>
                    <p>If monitoring reveals possible misuse or criminal activity, notice of such may be provided to supervisory personnel and law enforcement officials as evidence.</p>
                    <p>Anyone who accesses a Federal computer system without authorization or exceeds their access authority, and by any means of such conduct obtains, alters, damages, destroys, or discloses information, or prevents authorized use of information on the computer, may be subject to fine or imprisonment, or both.</p>
                    <p >I understand that I am personally responsible for my use and any misuse of my access including my system account and password. I understand that by accessing a U.S. Government information system that I must comply with the prescribed policies and procedures. I acknowledge receipt of, understand my responsibilities, and will comply with the rules of behavior for this system.</p>
                    <h3><b>User Login</b></h3>
                    <p>Please provide a valid Email and Password. If you have problems logging in, <a id ='contact_1' href="mailto:webmaster@dol.gov">contact the administrator</a>.</p>
                    <div className='row'>
                        <div className='medium-4 columns'>
                            <form onSubmit={this.handleSubmit} noValidate>
                                <div class="email-field">
                                    <label>Email <small>required</small></label>
                                    <input onChange={this.handleChange} type="email" id='email' value={this.state.email} />
                                    {this.state.email_error ? <small class="error">{this.state.email_error}</small> : null }
                                </div>
                                <div class="password-field">
                                <label>Password <small>required</small></label>
                                    <input name='password' onChange={this.handleChange} type="password" id="password" value={this.state.password}/>
                                    {this.state.password_error ? <small class="error">{this.state.password_error}</small> : null}
                                </div>
                                <div className='row'>
                                    <div className='small-8 medium-12 small-centered column'>
                                        <button type='submit' className="button expanded">Login</button>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='small-8 medium-12 small-centered column'>
                                        <p><Link id='forget_password' to={'/'}>Forgot your password?</Link></p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='small-8 medium-12 small-centered column'>
                                        <p>Don't have an account? <Link id='register_link' to={'/sign_up'}>Register here</Link>.</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='small-12 small-centered column'>
                            <h3><b>Help Us Improve DOL API</b></h3>
                            <p>If you have questions or comments about our APIs, please, <a id='contact_2' href="mailto:webmaster@dol.gov">e-mail us</a> and let us know.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignInForm;