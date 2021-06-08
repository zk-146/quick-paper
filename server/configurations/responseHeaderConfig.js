const helmet = require("helmet");

const responseHeaderConfig = (app) => {
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'none'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        connectSrc: ["'self'"],
        reportUri: "/cspviolation",
      },
    })
  );
};

module.exports = responseHeaderConfig;
