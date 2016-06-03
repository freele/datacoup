console.log('test');

var selected = 'project';

function updateQueryWithoutReload(newQuery) {
  if (history.pushState) {
    var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + newQuery;
    window.history.pushState({path:newUrl},'',newUrl);
  }
}

function toggle(element, state) {
  if (state === true) {
    $(element).show(400);
  } else if (state === false) {
    $(element).hide(400);
  } else {
    $(element).toggle(400); 
  }
}

function expandCat(cat, state, initialLoad) {
  console.log('expandCat: ', cat);

  if (!initialLoad) {
    var openTabs = $.deparam(window.location.search.substr(1))
    if (openTabs[cat] === undefined || openTabs[cat] === '0') {
      openTabs[cat] = '1';
    } else {
      openTabs[cat] = '0';
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
