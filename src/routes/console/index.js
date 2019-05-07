const register = (container) => {
  const printArgs = container.resolve('printArgs');

  return {
    'console:print-args': printArgs.run
  };
}

module.exports = register;