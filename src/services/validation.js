import * as yup from "yup";

export const taskValidationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string(),
  status: yup.string().required("Status is required"),
  dueDate: yup.string().required("Due date is required"),
  assignedTo: yup.string().nullable(),
});

export const validateField = async (
  schema,
  fieldName,
  fieldValue,
  formData
) => {
  try {
    await schema.validateAt(fieldName, {
      ...formData,
      [fieldName]: fieldValue,
    });
    return null;
  } catch (error) {
    return error.message;
  }
};

export const validateFormData = async (schema, formData) => {
  try {
    await schema.validate(formData, { abortEarly: false });
    return {};
  } catch (validationErrors) {
    return validationErrors.inner.reduce((acc, error) => {
      acc[error.path] = error.message;
      return acc;
    }, {});
  }
};
