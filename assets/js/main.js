console.log('test');

function expandCat(cat) {
  console.log('expandCat: ', cat);
  var cat = $(cat);
  debugger;
  $(cat).toggle('slow');
}