const requiredValue = "REQUIRED_VALUE";
const minValue = "MIN_VALUE";
const maxValue = "MAX_VALUE";
const emailValue = "EMAIL_VALUE";

export const requiredValidator = (): any => ({
  value: requiredValue,
});

export const minValidator = (min: number) => ({
  value: minValue,
  min,
});

export const maxValidator = (max: number) => ({
  value: maxValue,
  max,
});

export const emailValidator = (): any => ({
  value: emailValue,
});
export default { requiredValue, minValue, maxValue, emailValue };
