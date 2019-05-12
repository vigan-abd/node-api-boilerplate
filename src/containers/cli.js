// LIBS
const awilix = require("awilix");
const asClass = awilix.asClass;
const InjectionMode = awilix.InjectionMode;
const Lifetime = awilix.Lifetime;

const container = awilix.createContainer({
  injectionMode: InjectionMode.CLASSIC
});

// Services
container.register({
  loggerService: asClass(require('@services/LoggerService'), {
    lifetime: Lifetime.SINGLETON,
    injectionMode: InjectionMode.CLASSIC
  })
});


// Commands
container.register({
  printArgs: asClass(require('@console/commands/PrintArgs'), {
    lifetime: Lifetime.SINGLETON,
    injectionMode: InjectionMode.CLASSIC
  })
});


module.exports = container;