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


// return screen size of possible value :  1, 2 or 3 for small, medium & large.
function getScreenSize()
{
    'use strict';
    var currentSize = window.getComputedStyle(document.querySelector('body'), ':after' ).getPropertyValue('content'); 
    currentSize = currentSize.replace(/\D/g,'');
    return parseInt(currentSize) ; 
}

// from http://stackoverflow.com/a/7557433
// returns true if element is visible.
function isElementInViewport (el) 
{
    'use strict';
    var rect = el.getBoundingClientRect(),
        result = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
        rect = null ;
        return result;
}



function appendClickListenerToAll (list,func)
{
    'use strict';
    var cpt = 0, len = list.length ,elem ;


    while (cpt<len)
    {
        elem = list[cpt] ;
        if (elem.addEventListener)
        { elem.addEventListener('click', func, false); }
        else if (elem.attachEvent) 
        { elem.attachEvent('onclick', func); }

        cpt++;
    }
    elem = null;
}



// event listener for element visibility.
function fireIfElementVisible (el, callback) {
    return function () {
        if ( isElementInViewport(el) ) {
            callback(el);
        }
    }

}

function attachVisibilityHandler (handler)
{
    if (window.addEventListener) 
    {
        addEventListener('DOMContentLoaded', handler, false); 
        addEventListener('load', handler, false); 
        addEventListener('scroll', handler, false); 
        addEventListener('resize', handler, false); 
    } else if (window.attachEvent)  {
        attachEvent('onDOMContentLoaded', handler); // IE9+ :(
        attachEvent('onload', handler);
        attachEvent('onscroll', handler);
        attachEvent('onresize', handler);
    }
}

function detachVisibilityHandler (handler)
{
    if (window.addEventListener) 
    {
        removeEventListener('DOMContentLoaded', handler, false); 
        removeEventListener('load', handler, false); 
        removeEventListener('scroll', handler, false); 
        removeEventListener('resize', handler, false); 
    } else if (window.attachEvent)  {
        detachEvent('onDOMContentLoaded', handler); // IE9+ :(
        detachEvent('onload', handler);
        detachEvent('onscroll', handler);
        detachEvent('onresize', handler);
    }
}
// /-/-/-/-/-/-/-/

// handle for document ready
function readyAndWilling(fn) 
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
function loadMedia(url,onResult,onFault)
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

function injectAll(str,reps)
{
    'use strict';
    for (var key in reps)
    {
        str =  str.replace(/(___[a-zA-Z]+___)/g, function(s, key) 
        {
            var rep = reps[key];
            return typeof rep === 'undefined' ? s : rep;
        });
    }
    return str ; 
}

// return element's outer height including margins
function outerHeight(el)
{
    'use strict';
  var height = el.offsetHeight;
  var style = getComputedStyle(el);

  height += parseInt(style.marginTop) + parseInt(style.marginBottom);
  return height;
}

// get element style
function getBackground(el)
{
    'use strict';
    var style ='' ;
    if (el.currentStyle)
    {
        style = el.currentStyle['backgroundColor'];
    }
    else if (window.getComputedStyle)
    {style = document.defaultView.getComputedStyle(el,null).getPropertyValue('background');}
    return style;
}