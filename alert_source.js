//https://stackoverflow.com/a/7808754/973425
var old = alert;

alert = function() {
  console.log(new Error().stack);
  old.apply(window, arguments);
};
