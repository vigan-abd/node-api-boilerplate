const express = require("express");
const router = express.Router();
const RouteBuilder = require("simple-express-route-builder");

const register = container => {
  // MIDDLEWARES
  const authMiddleware = container.resolve("AuthMiddleware");

  // CONTROLLERS
  const authenticationAPIController = container.resolve("authenticationAPIController");
  const mainAPIController = container.resolve("mainAPIController");

  const builder = new RouteBuilder('/api', router);

  builder.use((group, action) => action('GET', mainAPIController.index));

  builder.use((group, action) =>
    group("/v1/auth", [
      action("GET", [authMiddleware.authHandler], authenticationAPIController.currentUser),
      group("/signup", [
        action("POST", authenticationAPIController.signup)
      ]),
      group("/login", [
        action("POST", authenticationAPIController.signin)
      ]),
      group("/update-password", [authMiddleware.authHandler], [
        action("PATCH", authenticationAPIController.updatePassword)
      ])
    ])
  );

  return router;
};

module.exports = register;
