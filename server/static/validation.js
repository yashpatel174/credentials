export const error = (res, error, message) => {
  return res.status(500).json({ error: error.message, message: message });
};
export const custom = (res, message) => {
  return res.status(404).json(message);
};
export const success = (res, message, result) => {
  return res.status(201).json({ success: true, message, result: result });
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
