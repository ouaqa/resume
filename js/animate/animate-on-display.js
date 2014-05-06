var anim_Elements ;

readyAndWilling(initAnimateOnDisplay) ;

// if initial screen resolution is okay we listen for animations.
function initAnimateOnDisplay()
{
    // first we check if animations are to be included.
    if (getScreenSize()>1)
    {
        console.log('yepy');

            anim_Elements = document.querySelectorAll('.js-animate-once');            
    }
}

function AnimatedObject( el ) 
{
        'use strict';
        this.el = el;
        this.animateOnce = true ;
        this.callBack = null ;
        this._init();
}

AnimatedObject.prototype._init = function() 
{
    'use strict';
    var self = this;
    this.paths.forEach( function( path, i ) {
        self.pathsArr[i] = path;
        path.style.strokeDasharray = self.lengthsArr[i] = path.getTotalLength();
    } );
    // undraw stroke
    this.draw(0);
}

// val in [0,1] : 0 - no stroke is visible, 1 - stroke is visible
AnimatedObject.prototype.draw = function( val ) {
    'use strict';
    for( var i = 0, len = this.pathsArr.length; i < len; ++i ){
        this.pathsArr[ i ].style.strokeDashoffset = this.lengthsArr[ i ] * ( 1 - val );
    }
}