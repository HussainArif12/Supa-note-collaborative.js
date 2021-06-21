import { add } from "../utils/note";
import { Formik, Form, Field } from "formik";
export default function AddForm(props) {
  return (
    <div>
      <Formik
        initialValues={{
          body: "",
          heading: "",
        }}
        onSubmit={async (values) => {
          await add(values.heading, values.body, props.user);
        }}
      >
        <Form>
          <Field id="heading" name="heading" placeholder="" />
          <Field id="body" as="textarea" name="body" placeholder="" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}
