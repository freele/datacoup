console.log('test');

var selected = 'project';

function expandCat(cat) {
  console.log('expandCat: ', cat);
  var cat = $(cat);
  // debugger;
  $(cat).toggle(400);
}

