export const zodStringToNumberPreprocessor = (value: any): number | null => {
  const type = typeof value;
  if (type === 'number') {
    return Number(value);
  } else if (type === 'string') {
    const isNumber = !isNaN(Number(value));
    return isNumber ? Number(value) : null;
  } else {
    return null;
  }
};

export const zodStringToStringArrayPreprocessor = (value: any): string[] | null => {
  // Turns query string array separated by commas into an array of strings
  if (typeof value === 'string') {
    return value.split(',');
  } else {
    return null;
  }
};

export const zodStringToNumberArrayPreprocessor = (value: any): number[] | null => {
  // Turns query string array separated by commas into an array of numbers
  if (typeof value === 'string') {
    const values = value.split(',');
    const numbers = values.map((val) => Number(val));
    const allNumbers = numbers.every((num) => !isNaN(num));
    return allNumbers ? numbers : null;
  } else {
    return null;
  }
};
