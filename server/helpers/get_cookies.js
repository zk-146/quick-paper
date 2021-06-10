const get_cookies = (request) => {
  const cookies = {};
  try {
    request.headers &&
      request.headers.cookie.split(";").forEach(function (cookie) {
        var parts = cookie.match(/(.*?)=(.*)$/);
        cookies[parts[1].trim()] = (parts[2] || "").trim();
      });
    return cookies;
  } catch (err) {
    throw new Error("Error occurred while getting cookies");
  }
};

module.exports = get_cookies;
