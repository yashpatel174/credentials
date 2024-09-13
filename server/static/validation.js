export const error = (res, error, message) => {
  return res.status(500).send({ error: error.message, message: message });
};
export const exist = (res) => {
  return res.send({ message: `This email is already registered.` });
};
export const notExist = (res) => {
  return res.status(404).send({ message: `User is not registered by this email.` });
};
export const noToken = (res) => {
  return res.status(404).send({ message: `Inalid token or token not found.` });
};
export const noLogOut = (res) => {
  return res.status(404).send({ message: `Error while logging out!` });
};
export const inValid = (res) => {
  return res.send({ message: "Invalid Password." });
};
export const notMatch = (res) => {
  return res.status(404).send({ message: `Password is Invalid.` });
};
export const success = (res, message, result) => {
  return res.status(201).send({ success: true, message: message, result: result });
};

function requiredFields(res, ...fields) {
  const missingFields = fields
    .map((field) => ({ name: Object.keys(field)[0], value: Object.values(field)[0] }))
    .filter((field) => !field.value || field.value.trim() === "");

  if (missingFields.length > 0) {
    const missingFieldNames = missingFields.map((field) => field.name).join(", ");
    return res.status(400).json({
      error: `Missing required fields: ${missingFieldNames}`,
    });
  }
}

export default requiredFields;
