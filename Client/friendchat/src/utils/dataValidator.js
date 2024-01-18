import Joi from "joi";

export const validate = (payload) => {
  const { userData, schema } = payload;

  const joiSchema = Joi.object(schema);
  const data = { ...userData };
  const errors = {};
  const options = { abortEarly: false };

  const { error } = joiSchema.validate(data, options);
  if (!error) return null;

  error.details.map((err) => (errors[err.path[0]] = err.message));

  return errors;
};

export const validateProperty = (payload) => {
    const { input, schema } = payload;
    const { name, value } = input;

    const propertySchema = Joi.object({ [name]: schema[name] });
    const propertyData = { [name]: value };

    const { error } = propertySchema.validate(propertyData);

    return error ? error.details[0].message : null;
  }
