
const User = require('../../../../models/Domain/User');

// Simple seed generator
module.exports = () => [
  new User({
    "id": "5c085c669b12c7002a8321eb",
    "username": "vigan2",
    "email": "vigan2@mail.com",
    "password": null,
    "tokenHash": null,
    "passwordResetToken": null,
    "passwordResetSentAt": null,
    "created": "2018-12-05T23:16:54.829Z",
    "updated": "2018-12-05T00:28:07.533Z",
    "lastLogin": "2018-12-04T23:31:10.004Z"
  }),
  new User({
    "id": "5c071b97dcf6820403f6d97b",
    "username": "vigan.abd",
    "email": "vig.an.abd@gmail.com",
    "password": null,
    "tokenHash": null,
    "passwordResetToken": null,
    "passwordResetSentAt": null,
    "created": "2018-12-05T00:28:07.533Z",
    "updated": "2018-12-05T00:28:07.533Z",
    "lastLogin": "2018-12-05T00:28:07.533Z"
  })
];