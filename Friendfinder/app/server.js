var express = require("express");
var path = require('path');
var app = express();
var PORT = process.env.PORT || 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routing/apiRoutes.js')(app);
require('./routing/htmlRoutes.js')(app);

app.listen(PORT, function () {
console.log("app listening on port " + PORT)
});