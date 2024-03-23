import styles from "./LoginForm.module.css";
import InputGroup from "../../../components/InputGroup";
import { Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";

const LoginForm = ({ isLoading, formik, isSubmitting }) => {
  const { handleSubmit, handleChange, values } = formik || {};

  return (
    <Form
      className={styles.form}
      onSubmit={handleSubmit}
      data-testid="login-form"
    >
      <fieldset disabled={isLoading}>
        <Form.Group data-testid="form-header">
          <Form.Label className={styles.header}>Welcome</Form.Label>

          <Form.Text className={styles.desc}>Log in to your account</Form.Text>
        </Form.Group>

        <InputGroup
          type="Text"
          formik={formik}
          label="Email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={values?.email}
          className={styles.input}
          testId="email"
          required
        />

        <InputGroup
          type="Password"
          formik={formik}
          label="Password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          className={styles.input}
          testId="password"
          required
        />

        <Form.Group as={Col} className="mt-4">
          {" "}
          <Button
            variant="primary"
            type="submit"
            data-testid="submit"
            isLoading={isSubmitting}
          >
            Log in
          </Button>
        </Form.Group>

        <Form.Group className={styles.signUpGroup} data-testid="signup">
          <Form.Label>Don't have an account?</Form.Label>
          <Link to="/signup">Sign up</Link>
        </Form.Group>
      </fieldset>
    </Form>
  );
};

export default LoginForm;
