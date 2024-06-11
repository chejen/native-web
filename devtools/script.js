// function f1 () {
//   console.log('f1-start');
//   f2();
//   console.log('f1-end');
// }

// function f2 () {
//   console.log('f2-start');
//   f3();
//   console.log('f2-end');
// }

// function f3 () {
//   console.log('f3-start');
//   console.log('f3-end');
// }

// f1();
// f2();
// f3();

var i = 0;
function updateHeader() {
  ++i;
  console.log('day =>', new Date().getDay());
  var name = getName(); // A
  updateName(name); // D
}
function getName() {
  ++i;
  var name = 'name'; // B
  return name; // C
}
function updateName(name) {
  ++i;
  console.log('updateName =>', name);
}
updateHeader();