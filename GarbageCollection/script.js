var theThing = null;

var replaceThing = function () {
  var originalThing = theThing;

  console.log(originalThing);
  var unused = function () {
    if (originalThing)
      // a reference to 'originalThing'
      console.log("hi", originalThing);
  };
  theThing = {
    longStr: new Array(1000000).join("*"),

    someMethod: function () {
      console.log("message");
    },
  };
};
setInterval(replaceThing, 1000);
