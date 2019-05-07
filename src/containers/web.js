// LIBS
const awilix = require("awilix");
const asClass = awilix.asClass;
const asFunction = awilix.asFunction;
const InjectionMode = awilix.InjectionMode;
const Lifetime = awilix.Lifetime;

const container = awilix.createContainer({
  injectionMode: InjectionMode.CLASSIC
});


// LISTENERS
container.register({
  UserLoggedInEventListener: asClass(require('../listeners/UserLoggedInEventListener'), {
    lifetime: Lifetime.SINGLETON,
    injectionMode: InjectionMode.CLASSIC
  })
});

container.register({
  UserUpdatedEventListener: asClass(require('../listeners/UserUpdatedEventListener'), {
    lifetime: Lifetime.SINGLETON,
    injectionMode: InjectionMode.CLASSIC
  })
});

// REPOSITORIES
container.register({
  iuserRepository: asClass(
    require("../repositories/Vendor/MongoDb/UserRepository"),
    {
      lifetime: Lifetime.SINGLETON,
      injectionMode: InjectionMode.CLASSIC
    }
  )
});


// SERVICES
container.register({
  userService: asClass(require("../services/UserService"), {
    lifetime: Lifetime.SINGLETON,
    injectionMode: InjectionMode.CLASSIC
  })
});

container.register({
  loggerService: asClass(require("../services/LoggerService"), {
    lifetime: Lifetime.SINGLETON,
    injectionMode: InjectionMode.CLASSIC
  })
});


// MIDDLEWARE
container.register({
  ContentTypeHandler: asClass(require("../middlewares/ContentTypeHandler"), {
    lifetime: Lifetime.SINGLETON,
    injectionMode: InjectionMode.CLASSIC
  })
});

container.register({
  ErrorResponseMiddleware: asClass(
    require("../middlewares/ErrorResponseMiddleware"),
    {
      lifetime: Lifetime.SINGLETON,
      injectionMode: InjectionMode.CLASSIC
    }
  )
});

container.register({
  AuthMiddleware: asClass(require("../middlewares/AuthMiddleware"), {
    lifetime: Lifetime.SINGLETON,
    injectionMode: InjectionMode.CLASSIC
  })
});


// CONTROLLERS
container.register({
  mainAPIController: asClass(
    require("../controllers/api/MainAPIController"),
    {
      lifetime: Lifetime.SINGLETON,
      injectionMode: InjectionMode.CLASSIC
    }
  )
});

container.register({
  authenticationAPIController: asClass(
    require("../controllers/api/AuthenticationAPIController"),
    {
      lifetime: Lifetime.SINGLETON,
      injectionMode: InjectionMode.CLASSIC
    }
  )
});


module.exports = container;