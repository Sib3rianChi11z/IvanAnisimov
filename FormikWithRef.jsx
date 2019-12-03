import React from "react";
import logger from "sabio-debug";
import { Form, Label, Button, FormGroup } from "reactstrap"; //
import { Formik, Field } from "formik"; //
import PropTypes from "prop-types";
import loginValidationSchema from "./loginValidation";
import * as userServices from "../../services/userServices";
import swal from "sweetalert";
import "./Login.css";
import Auth from "./../../assets/images/auth-layer.png";

const _logger = logger.extend("Login");

class LoginForm extends React.Component {
  formikRef = React.createRef();
  state = {
    formData: {
      email: "",
      password: ""
    }
  };

  handleSubmit = values => {
    _logger(values);
    _logger("Data is submitting.");

    userServices
      .login(values)
      .then(userServices.getCurrent)
      .then(this.onCurrentUserSuccess)
      .catch(this.onError);
  };

  onCurrentUserSuccess = response => {
    console.log(response, "HERE");
    this.props.history.push("/admin", {
      type: "login",
      user: response.item
    });
  };

  onError = () => {
    swal(
      "That's unfortunate...",
      "Either your name or password were entered incorrectly.",
      "error"
    );
    _logger("You must try again.");
    this.formikRef.current.setSubmitting(false);
  };

  render() {
    _logger("Rendering");
    return (
      <React.Fragment>
        <Formik
          ref={this.formikRef}
          enableReinitialize={true}
          validationSchema={loginValidationSchema}
          onSubmit={this.handleSubmit}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              handleSubmit,
              isValid,
              isSubmitting
            } = props;
            return (
              <div id="root">
                <div>
                  <div className="loader-wrapper" style={{ display: "none" }}>
                    <div className="loader bg-white">
                      <div className="line" />
                      <div className="line" />
                      <div className="line" />
                      <div className="line" />
                      <h4>
                        Have a great day at work today <span>☺</span>
                      </h4>
                    </div>
                  </div>
                  <div className="page-wrapper">
                    <div className="container-fluid">
                      <div className="authentication-main">
                        <div className="row">
                          <div className="col-md-5 p-0">
                            <div
                              className="auth-innerleft"
                              style={{
                                backgroundImage: "url(" + Auth + ")"
                              }}
                            >
                              <div className="text-center">
                                <h1>LA PATHWAYS</h1>

                                <hr />
                                <div className="social-media">
                                  <ul className="list-inline">
                                    <li className="list-inline-item">
                                      <i
                                        className="fa fa-facebook txt-fb"
                                        aria-hidden="true"
                                      />
                                    </li>
                                    <li className="list-inline-item">
                                      <i
                                        className="fa fa-google-plus txt-google-plus"
                                        aria-hidden="true"
                                      />
                                    </li>
                                    <li className="list-inline-item">
                                      <i
                                        className="fa fa-twitter txt-twitter"
                                        aria-hidden="true"
                                      />
                                    </li>
                                    <li className="list-inline-item">
                                      <i
                                        className="fa fa-linkedin txt-linkedin"
                                        aria-hidden="true"
                                      />
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-7 p-0">
                            <div className="auth-innerright">
                              <div className="authentication-box">
                                <h4>LOGIN</h4>
                                <h6>
                                  Enter your Username and Password to Login
                                </h6>
                                <div className="card mt-4 p-4 mb-0">
                                  <Form onSubmit={handleSubmit}>
                                    <FormGroup className="form-group">
                                      <Label className="col-form-Label">
                                        Email
                                      </Label>
                                      <div className="form-group">
                                        <Field
                                          required
                                          type="email"
                                          name="email"
                                          values={values.email}
                                          placeholder="Enter Email"
                                          className={
                                            errors.email && touched.email
                                              ? "form-control errorMessage"
                                              : "form-control"
                                          }
                                        />

                                        {errors.email && touched.email && (
                                          <span className="input-feedback">
                                            {errors.email}
                                          </span>
                                        )}
                                        <p className="help-block"></p>
                                      </div>
                                    </FormGroup>
                                    <FormGroup>
                                      <Label className="col-form-label">
                                        Password
                                      </Label>
                                      <div className="form-group">
                                        <Field
                                          type="password"
                                          name="password"
                                          values={values.password}
                                          required
                                          placeholder="**********"
                                          className={
                                            errors.password && touched.password
                                              ? "form-control errorMessage"
                                              : "form-control"
                                          }
                                        />
                                        {errors.password &&
                                          touched.password && (
                                            <span className="input-feedback">
                                              {errors.password}
                                            </span>
                                          )}
                                      </div>
                                    </FormGroup>
                                    <div className="col-md-3 mt-4">
                                      <Button
                                        type="submit"
                                        disabled={!isValid || isSubmitting}
                                        className="btn btn-secondary"
                                      >
                                        LOGIN
                                      </Button>
                                    </div>
                                  </Form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        </Formik>
      </React.Fragment>
    );
  }
}

LoginForm.propTypes = {
  getUser: PropTypes.func,
  state: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string
  }),
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

export default LoginForm;
