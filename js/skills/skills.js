
var svgElList = Array();

toolBox.readyAndWilling(initSvgSkills) ;

// load svg file to inject in skills container.
function initSvgSkills()
{
    'use strict';
    toolBox.loadMedia('media/svg/skill__svg.svg',svgLoadSucess,svgLoadFail);
}

function svgLoadSucess (payload)
{
    'use strict';
    //injecting svg to all skill meters
    var elements = document.querySelectorAll('.skill__meter');
    //injecting svg.
    Array.prototype.forEach.call(elements, 
        function(el, i)
        {
            // inject svg instance
            el.innerHTML = payload + el.innerHTML;
         
            if (el.classList)
            {  el.classList.add('skill__meter--circled'); }
            else
            { el.className += ' ' + 'skill__meter--circled'; }

            var svgEl = new SVGEl(el.querySelector('svg.skill__svg'));
            svgElList.push([el,svgEl]);

            if (!visibilityManager.isVisible(el))
            {
                visibilityManager.addOnce(el,isVisible);

            }
            else
            {
                isVisible (el);
            }
        }
    );
}

function isVisible (el)
{
    'use strict';
    var svgEl = getSvgEl(el);
    var percent = el.dataset.level.split('-');
    var ratio = percent[0]/percent[1];

    svgEl.draw(ratio);
}

function getSvgEl (el)
{
    'use strict';
    var len = svgElList.length ;
    if (len>0)
    {
        var cpt = 0;
        var found = false ;
        while (cpt<len&&found==false)
        {
            if (svgElList[cpt][0]===el)
            {
                return svgElList[cpt][1];
                break;
            }
            cpt++;
        }

        if (!found)
        {
            var svgEl = new SVGEl(el.querySelector('svg.skill__svg'));
            svgElList.push([el,svgEl]);
            return svgEl ;
        }
    }
}

function svgLoadFail ()
{

}


    function SVGEl( el ) 
    {
        'use strict';
        this.el = el;
        // the path elements
        this.paths = [].slice.call( this.el.querySelectorAll( 'path' ) );
        // we will save both paths and its lengths in arrays
        this.pathsArr = new Array();
        this.lengthsArr = new Array();
        this._init();
    }

    SVGEl.prototype._init = function() {
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
    SVGEl.prototype.draw = function( val ) {
        'use strict';
        for( var i = 0, len = this.pathsArr.length; i < len; ++i ){
            this.pathsArr[ i ].style.strokeDashoffset = this.lengthsArr[ i ] * ( 1 - val );
        }
    }