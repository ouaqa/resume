var visibilityManager = new _visibilityManager();
window.visibilityManager = visibilityManager ;

function _visibilityInstance()
{
    this.element = null ;
    this.callback = null ;
    this.dispatchOnce = false ;
    

}




function _visibilityManager ()
{
    'use strict';
    this.visibilityInstancesList = Array(); 
    this._isTicking = false;
    this._latestScrollY = window.pageYOffset || window.document.documentElement.scrollTop;

    this._viewedHeight = this._latestScrollY + toolBox.getViewPortHeight() ;
} 


_visibilityManager.prototype.isVisible = function (el,h)
{
    'use strict';
  
    var elOffsetHeight = el.offsetHeight,
        scrolled = this._latestScrollY ,
        viewedHeight = this._viewedHeight,
        elTop = toolBox.getAbsoluteOffset(el).top ,
        elBottom = elTop + elOffsetHeight,
        // if 0, the element is considered in the viewport as soon as it enters.
        // if 1, the element is considered in the viewport only when it's fully inside
        // value in percentage (1 >= h >= 0)
            h = h || 0;

        return ( 
            (elTop + elOffsetHeight * h) <= viewedHeight &&
            (elBottom - elOffsetHeight * h) >= scrolled 
            );

}


_visibilityManager.prototype._requestTick = function()
{
    'use strict';
    if (this._isTicking == false )
    {
        requestAnimationFrame(this._updateVisibility)
    }
    this._isTicking = true ;
}



_visibilityManager.prototype._refreshValues = function()
{
    'use strict';

    window.visibilityManager._latestScrollY = window.pageYOffset || window.document.documentElement.scrollTop; 
    window.visibilityManager._requestTick();
}

_visibilityManager.prototype._updateVisibility = function()
{
    'use strict';

    var self = window.visibilityManager ,
    len = self.visibilityInstancesList.length ,
    instance = null ,
    cpt = 0,
    element = null;


    if (len>0)
    {
        //refresh global values
        self._viewedHeight = self._latestScrollY + toolBox.getViewPortHeight();
        
        while (cpt<len)
        {
            instance = self.visibilityInstancesList[cpt] ; 

            element = instance.element ;  

            if (self.isVisible(element))
            {
                instance.callback(element);
                if (instance.dispatchOnce)
                { 
                    self.visibilityInstancesList.remove(cpt); 
                    cpt--;
                    len--;
                }
            }
            instance = null ;
            element = null ;
            cpt++;
        }
    }


    instance = null ;
    element = null ;        

    if (self.visibilityInstancesList == 0)
    { self._detachVisibilityHandler(); }


    // reset Tick
    self._isTicking = false ;
}


_visibilityManager.prototype.addOnce = function (el,callback)
{
    'use strict';
    var visibilityInstance = new _visibilityInstance();
    visibilityInstance.element = el ;
    visibilityInstance.callback = callback ;
    visibilityInstance.dispatchOnce = true ; 

    this._attachVisibilityHandler(visibilityInstance.handler);


    this.visibilityInstancesList.push(visibilityInstance);

    if (this.visibilityInstancesList == 1)
    {
        this._detachVisibilityHandler();
        this._attachVisibilityHandler();
    }

    visibilityInstance = null ;

}

_visibilityManager.prototype.add = function (el,callback)
{
    'use strict';
    var visibilityInstance = new _visibilityInstance();
    visibilityInstance.element = el ;
    visibilityInstance.callback = callback ;
    visibilityInstance.dispatchOnce = false ; 

    this._attachVisibilityHandler(visibilityInstance.handler);


    this.visibilityInstancesList.push(visibilityInstance);

    if (this.visibilityInstancesList == 1)
    {
        this._detachVisibilityHandler();
        this._attachVisibilityHandler();
    }

    visibilityInstance = null ;
}

_visibilityManager.prototype.remove = function (el)
{
   'use strict';
    var len = this.visibilityInstancesList.length ,
    instance = null ;

    if (len>0)
    {
        var cpt = 0;
        var found = false ;
        while (cpt<len&&found==false)
        {
            instance = this.visibilityInstancesList[cpt] ;            
            if (instance.element===el)
            {
                found=true;
                this.visibilityInstancesList.remove(cpt);
                break;
            }
            cpt++;
        }
    }

    if (this.visibilityInstancesList == 0)
    {
        this._detachVisibilityHandler();
    }

    instance = null;
}


_visibilityManager.prototype._attachVisibilityHandler = function()
{
    'use strict';
    if (window.addEventListener) 
    {
        addEventListener('DOMContentLoaded', this._refreshValues, false); 
        addEventListener('load', this._refreshValues, false); 
        addEventListener('scroll', this._refreshValues, false); 
        addEventListener('resize', this._refreshValues, false); 
    } else if (window.attachEvent)  {
        attachEvent('onDOMContentLoaded', this._refreshValues); // IE9+ :(
        attachEvent('onload', this._refreshValues);
        attachEvent('onscroll', this._refreshValues);
        attachEvent('onresize', this._refreshValues);
    }
}

_visibilityManager.prototype._detachVisibilityHandler = function()
{
    'use strict';
    if (window.addEventListener) 
    {
        removeEventListener('DOMContentLoaded', this._refreshValues, false); 
        removeEventListener('load', this._refreshValues, false); 
        removeEventListener('scroll', this._refreshValues, false); 
        removeEventListener('resize', this._refreshValues, false); 
    } else if (window.attachEvent)  {
        detachEvent('onDOMContentLoaded', this._refreshValues); // IE9+ :(
        detachEvent('onload', this._refreshValues);
        detachEvent('onscroll', this._refreshValues);
        detachEvent('onresize', this._refreshValues);
    }
}

