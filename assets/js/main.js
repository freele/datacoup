console.log('test');

var selected = 'project';

function updateQueryWithoutReload(newQuery) {
  if (history.pushState) {
    var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + newQuery;
    window.history.pushState({path:newUrl},'',newUrl);
  }
}

function toggle(element, state) {
  const node = $(element);
  if (state === true) {
    node.show(400);
  } else if (state === false) {
    node.hide(400);
  } else {
    console.log('TOGGLE');
    debugger;
    node.toggle(400); 
  }

  // const temp = node.is(":visible");
  // node.prev().addClass('isHidden');
  if (state) {
    node.prev().addClass('expanded');
  } else {
    node.prev().removeClass('expanded');
  };
}

function expandCat(cat, state, initialLoad) {
  console.log('expandCat: ', cat);

  if (!initialLoad) {
    var openTabs = $.deparam(window.location.search.substr(1))
    if (openTabs[cat] === undefined || openTabs[cat] === '0') {
      openTabs[cat] = '1';
      state = true;
    } else {
      openTabs[cat] = '0';
      state = false;
    }
    lastOpenTabs = openTabs;

    var newQuery = $.param(openTabs);
    updateQueryWithoutReload(newQuery);
  }

  var cat = $('[id=' + cat + ']');
  cat.each(function(ind, obj) {
    toggle(obj, state);
  })
}


var lastOpenTabs = {};
var openTabs = {};
function initFromUrl() {
  openTabs = $.deparam(window.location.search.substr(1));
  var initialLoad = true;
  Object.keys(openTabs).forEach(function(key){
    if (openTabs[key] === '1'){
      expandCat(key, true, initialLoad);
    } else if (openTabs[key] === '0') {
      expandCat(key, false, initialLoad);
    }
  });
  Object.keys(lastOpenTabs).forEach(function(key){
    if (lastOpenTabs[key] === '1' && !openTabs[key]){
      expandCat(key, false, initialLoad);
    }
  });
}


window.onpopstate = function(event) {
  initFromUrl();
};

initFromUrl();
