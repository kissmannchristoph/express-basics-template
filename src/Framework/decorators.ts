const ControllerDecorator = (name: string) => {
  return (target: Function) => {
    console.log(name, target);
  };
};

export { ControllerDecorator };
