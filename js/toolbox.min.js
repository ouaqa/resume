function appendClickListenerToAll (list,func)
{
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

// handle for document ready
function readyAndWilling(fn) 
{
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

function injectAll(str,reps)
{
    for (var key in reps)
    {
        str =  str.replace(/(___[a-zA-Z]+___)/g, function(s, key) 
        {
            var rep = reps[key];
            return typeof rep === "undefined" ? s : rep;
        });
    }
    return str ; 
}

// return element's outer height including margins
function outerHeight(el){
  var height = el.offsetHeight;
  var style = getComputedStyle(el);

  height += parseInt(style.marginTop) + parseInt(style.marginBottom);
  return height;
}

// get element style
function getBackground(el)
{
    var style ='' ;
    if (el.currentStyle)
    {
        style = el.currentStyle['backgroundColor'];
    }
    else if (window.getComputedStyle)
    {style = document.defaultView.getComputedStyle(el,null).getPropertyValue('background');}
    return style;
}