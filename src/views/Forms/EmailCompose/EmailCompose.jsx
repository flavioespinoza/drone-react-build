import "./Email.scss";
import * as React from "react";
import { withFormik } from "formik";
import { EditorState } from "draft-js";
import { EmailEditor } from "./EmailEditor";
import * as yup from "yup";

const formikEnhancer = withFormik({
  mapPropsToValues: props => ({
    editorState: new EditorState.createEmpty(),
    email: "",
    subject: ""
  }),
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email (you@example.com)")
      .required("Email required"),
    subject: yup
      .string()
      .label("Please enter a subject")
      .required("Subject required")
      .required("Subject required")
  }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert("EMAIL COMPOSE");
      setSubmitting(false);
    }, 1000);
  },
  displayName: "MyForm"
});

const MyForm = ({
  values,
  touched,
  dirty,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  handleReset,
  setFieldValue,
  isSubmitting
}) => (
  <form onSubmit={handleSubmit}>
    <input
      id="email"
      placeholder="To"
      type="email"
      value={values.email}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    {errors.email && touched.email && (
      <div style={{ color: "red", marginTop: ".5rem" }}>{errors.email}</div>
    )}
    <br />
    <input
      id="subject"
      placeholder="Subject"
      type="subject"
      value={values.subject}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    {errors.subject && touched.subject && (
      <div style={{ color: "red", marginTop: ".5rem" }}>{errors.subject}</div>
    )}
    <br />
    <EmailEditor
      editorState={values.editorState}
      onChange={setFieldValue}
      onBlur={handleBlur}
    />
  </form>
);

const MyEnhancedForm = formikEnhancer(MyForm);

const EmailCompose = () => (
  <section className="email-compose">
    <MyEnhancedForm user={{ email: "fred@fredsemail.com" }} />
  </section>
);

export default EmailCompose;
