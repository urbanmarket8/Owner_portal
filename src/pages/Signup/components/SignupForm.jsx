import { Form, Row } from "react-bootstrap";

import styles from "./SignupForm.module.css";
import InputGroup from "../../../components/InputGroup";
import Button from "../../../components/Button";

const SignupForm = ({ formik, isSubmitting }) => {
  const { handleSubmit } = formik || {};

  return (
    <Form
      className={styles.form}
      onSubmit={handleSubmit}
      data-testid="singup-form"
    >
      <Form.Group data-testid="singup-desc">
        <Form.Label className={styles.header}>Sign up</Form.Label>

        <Form.Text className={styles.desc}>Create a new account</Form.Text>
      </Form.Group>

      <Row>
        <InputGroup
          xs={6}
          type="Text"
          label="First name"
          formik={formik}
          name="first_name"
          required
        />

        <InputGroup
          xs={6}
          type="Text"
          label="Last name"
          formik={formik}
          name="last_name"
          required
        />
      </Row>

      <Row>
        <InputGroup
          type="Text"
          xs={6}
          label="Email"
          formik={formik}
          name="email"
          autoComplete="username"
          required
        />
        <InputGroup
          type="Text"
          xs={6}
          label="User name"
          formik={formik}
          name="username"
          autoComplete="username"
          required
        />
        <InputGroup
          type="PhoneNumber"
          xs={6}
          label="Phone number"
          name="phone_number"
          formik={formik}
          required
        />
      </Row>
      <Row>
        <InputGroup
          type="Password"
          xs={6}
          label="Password"
          formik={formik}
          name="password"
          autoComplete="username"
          required
        />
        <InputGroup
          type="Password"
          xs={6}
          label="Repeat Password"
          formik={formik}
          name="confirm_password"
          autoComplete="new-password"
          required
        />
      </Row>

      <Row className="justify-content-md-center">
        <Button
          variant="primary"
          type="submit"
          data-testid="signup"
          isLoading={isSubmitting}
        >
          Sign up
        </Button>
      </Row>
    </Form>
  );
};

export default SignupForm;
