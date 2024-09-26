const editText = text => {
  let newText = '';
  const arrayText = text.split('_');
  const firstWord = arrayText[0][0].toUpperCase() + arrayText[0].slice(1);

  for (let i = 0; i < arrayText.length; i += 1) {
    if (i > 0) {
      newText += ` ${arrayText[i]}`;
    } else {
      newText += firstWord;
    }
  }
  return newText;
};
export const getErrorText = array => {
  const keys = Object?.keys(array);
  let first_key = keys[0];
  if (typeof array[keys] === 'string') {
    return editText(array[keys]);
  }
  return editText(array[first_key][0]);
};
