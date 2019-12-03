import React from "react";
import * as answerOptionsServices from "../../services/answerOptionsServices";
import answerOption from "./answerOptionSchema";
import logger from "sabio-debug";
import { Form, FormGroup, Label, Button } from "reactstrap";
import { FieldArray, Formik, Field } from "formik";
import { Typeahead } from "react-bootstrap-typeahead";
import swal from "sweetalert";
import PropTypes from "prop-types";
import "./AnswerOption.css";

const _logger = logger.extend("AnswerOptionsCreate");

class AnswerOptionsCreate extends React.Component {
  state = {
    optionsMapped: [],
    questions: [],
    selectedQuestion: {},
    formData: {
      options: []
    }
  };

  componentDidMount() {
    answerOptionsServices
      .getAllOptionTypes()
      .then(this.getOptionTypesSuccess)
      .catch(this.getQuestionTypesError);
    answerOptionsServices
      .getAll(0, 10)
      .then(this.getQuestionsSuccess)
      .catch(this.getQuestionsError);
  }
  getOptionTypesSuccess = response => {
    _logger(response.items, "Get Question Types Success");

    this.setState({
      optionsMapped: response.items.map((o, idx) => (
        <option key={idx} value={o.code + "_" + o.name}>
          {o.code + "-" + o.name}
        </option>
      ))
    });
  };
  getQuestionTypesError = response => {
    _logger(response);
  };
  getQuestionsSuccess = response => {
    _logger(response.item.pagedItems, "Get Questions Success");
    this.setState({ questions: response.item.pagedItems });
  };
  getQuestionsError = response => {
    _logger(response, "Get Questions Error");
  };
  handleChangeQuestion = question => {
    _logger(question, "Handle change question");
    this.setState({ selectedQuestion: question[0] });
  };
  handleSubmit = values => {
    _logger(values, "Handle submit");

    var id = this.state.selectedQuestion.id;
    var formData = values.options.map(function(x) {
      var array = x.split("_");
      _logger(array);
      return {
        QuestionId: id,
        Text: array[1],
        Value: array[0]
      };
    });
    answerOptionsServices
      .addAnswerOption(formData)
      .then(this.createSuccess)
      .catch(this.createError);
    _logger(formData);
  };
  createError = response => {
    _logger(response, "CREATE ERROR");
  };
  createSuccess = () => {
    swal("Answer Option Created Successfully");
    this.props.history.push("/surveys/questions/answeroptions/");
  };

  render() {
    return (
      <React.Fragment>
        {this.state.questions && this.state.questions.length > 0 ? (
          <Formik
            enableReinitialize={true}
            validationSchema={answerOption}
            initialValues={this.state.formData}
            isInitialValid={false}
            onSubmit={this.handleSubmit}
          >
            {props => {
              const {
                values,
                // touched,
                // errors
                handleSubmit,
                isValid,
                isSubmitting
              } = props;
              return (
                <div className="row" style={{ paddingTop: "25px" }}>
                  <div
                    className="card height-equal col-md-10 mt-12 ml-4"
                    style={{
                      minHeight: "400px"
                    }}
                  >
                    <Form onSubmit={handleSubmit} className={"form-horizontal"}>
                      <fieldset>
                        <h6 className="m-t-10">Question Answer</h6>
                        <hr />
                        <FormGroup>
                          <Label>Choose a Question</Label>

                          <Typeahead
                            labelKey={option => `${option.question}`}
                            clearButton
                            name="questionsList"
                            id="questionsList"
                            options={this.state.questions}
                            onChange={this.handleChangeQuestion}
                            placeholder="Type or select question"
                          />
                        </FormGroup>
                        {this.state.selectedQuestion &&
                        this.state.selectedQuestion.id ? (
                          <FormGroup>
                            <FieldArray
                              name="options"
                              render={arrayHelpers => {
                                const localRemove = () => {
                                  for (
                                    var i = values.options.length - 1;
                                    i > -1;
                                    i--
                                  ) {
                                    arrayHelpers.remove(i);
                                  }
                                };

                                return (
                                  <div>
                                    <button
                                      type="button"
                                      className="btn btn-info mb-4 answerOptionBtn"
                                      onClick={() => arrayHelpers.push("")}
                                    >
                                      <i className="fas fa-plus-square fa"></i>{" "}
                                      Add Option
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-success mb-4 ml-4 answerOptionBtn"
                                      onClick={localRemove}
                                    >
                                      <i className="fas fa-plus-square fa"></i>{" "}
                                      Clear
                                    </button>
                                    <div className="row">
                                      {values.options.map((option, index) => (
                                        <div
                                          className=" col-md-3 input-group mb-3"
                                          key={index}
                                        >
                                          <Field
                                            component="select"
                                            key={index}
                                            name={`options[${index}]`}
                                            selected={"default"}
                                            className="form-control"
                                          >
                                            <option value=" ">
                                              Please select an option
                                            </option>
                                            {this.state.optionsMapped}
                                          </Field>{" "}
                                          <span className="input-group-btn">
                                            <i
                                              type="button"
                                              className=" btn-lg  btn-danger fa  fa-minus itemRemove"
                                              // className="btn btn-danger btn-sm ml-1"
                                              onClick={() =>
                                                arrayHelpers.remove(index)
                                              }
                                            ></i>
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                );
                              }}
                            />
                          </FormGroup>
                        ) : (
                          <p></p>
                        )}
                        <FormGroup className="form-group row">
                          <label
                            className="col-lg-12 control-label text-lg-left"
                            htmlFor="submit"
                          >
                            Click to finalize
                          </label>

                          <div className="col-lg-12">
                            <Button
                              id="submit"
                              type="submit"
                              name="submit"
                              className="btn btn-primary"
                              disabled={!isValid || isSubmitting}
                            >
                              {this.state.editingIs ? "Update" : "Submit"}
                            </Button>
                            <Button
                              id="buttonBack"
                              type="button"
                              name="buttonBack"
                              className="btn btn-primary"
                              onClick={this.goBack}
                              style={{ float: "right" }}
                            >
                              Go Back
                            </Button>
                          </div>
                          <div className="col-lg-12"></div>
                        </FormGroup>
                      </fieldset>
                    </Form>
                  </div>
                </div>
              );
            }}
          </Formik>
        ) : (
          <p>Loading...</p>
        )}
      </React.Fragment>
    );
  }
}

AnswerOptionsCreate.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func })
};
export default AnswerOptionsCreate;
