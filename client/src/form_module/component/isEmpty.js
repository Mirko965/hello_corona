const isEmpty = value => {
  return value === undefined
    || value === null
    || (typeof value === 'object' && Object.keys(value).length === 0)
    || (typeof value === 'object' && Object.values(value).filter(item => item !== '').length === 0)
    || (typeof value === 'string' && value.trim().length === 0);
};

export default isEmpty
