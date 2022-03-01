const fields = new Map();

export const getFieldsForModel = (target: any) => {
  return fields.get(target.constructor.name);
};
