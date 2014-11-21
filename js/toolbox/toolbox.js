// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

// easing functions http://goo.gl/5HLl8
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
  if (t < 1) {
    return c/2*t*t + b
  }
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
};
 
Math.easeInCubic = function(t, b, c, d) {
  var tc = (t/=d)*t*t;
  return b+c*(tc);
};
 
Math.inOutQuintic = function(t, b, c, d) {
  var ts = (t/=d)*t,
  tc = ts*t;
  return b+c*(6*tc*ts + -15*ts*ts + 10*tc);
};

var toolBox = new _toolBox() ; 
window.toolBox = toolBox;

function _toolBox () {}

// return screen size of possible value :  1, 2 or 3 for small, medium & large.
_toolBox.prototype.getScreenSize = function()
{
    'use strict';
    var currentSize = window.getComputedStyle(document.querySelector('body'), ':after' ).getPropertyValue('content'); 
    currentSize = currentSize.replace(/\D/g,'');
    return parseInt(currentSize) ; 
}

_toolBox.prototype.getViewPortHeight = function()
{
  'use strict';
   return document.documentElement.clientHeight || window.innerHeight;
}

// http://stackoverflow.com/a/5598797/989439
_toolBox.prototype.getAbsoluteOffset = function(el)
{
  'use strict';
    var offsetTop = 0, offsetLeft = 0;
    do {
      if ( !isNaN( el.offsetTop ) ) {
        offsetTop += el.offsetTop;
      }
      if ( !isNaN( el.offsetLeft ) ) {
        offsetLeft += el.offsetLeft;
      }
    } while( el = el.offsetParent )

    return {
      top : offsetTop,
      left : offsetLeft
    }
}
// /-/-/-/-/-/-/-/

// handle for document ready
_toolBox.prototype.readyAndWilling = function(fn) 
{
    'use strict';
    if (document.readyState== 'complete')
    {
        fn();
        return;
    }

    if (document.addEventListener) 
    { document.addEventListener('DOMContentLoaded', fn); } 
    else 
    {
        document.attachEvent('onreadystatechange', function() 
        {
            if (document.readyState === 'interactive')
            { fn(); }
        }); 
    }
}

// load a media, througt a GET request.
_toolBox.prototype.loadMedia = function (url,onResult,onFault)
{
    'use strict';
    var request = new XMLHttpRequest();
    request.open ('GET',url,true);

    request.onload = function() {
    if (request.status >= 200 && request.status < 400)
    {
        onResult( request.responseText);
    } 
    else 
    {
        onFault();
    }
    };

    request.onerror = function() 
    {
        onFault();
    };

    request.send();
}



// return element's outer height including margins
_toolBox.prototype.outerHeight = function (el)
{
    'use strict';
  var height = el.offsetHeight;
  var style = getComputedStyle(el);

  height += parseInt(style.marginTop) + parseInt(style.marginBottom);
  return height;
}
