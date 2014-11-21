var animateClasses = Array('animate__moveUp', 'animate__scaleUp' ,'animate__fall' ,'animate__fly', 'animate__flip', 'animate__helix', 'animate__left', 'animate__right');

toolBox.readyAndWilling(initAnimateOnDisplay) ;


// if initial screen resolution is okay we listen for animations.
function initAnimateOnDisplay()
{
    // first we check if animations are to be included.
    if (toolBox.getScreenSize()>1)
    {
        anim_Elements = document.querySelectorAll('.js-animate--once');      

        //injecting svg.
        Array.prototype.forEach.call(anim_Elements, 
        function(el, i)
        {
            // adding animate class to hide
            if (el.classList)
            { el.classList.add('animate'); }
            else
            { el.className += ' animate'; }

            // adding more animate class if necessarry
                if (typeof (el.dataset.animateinit) != 'undefined')
                {
                    if (el.classList)
                    { el.classList.add(el.dataset.animateInit); }
                    else
                    { el.className += ' ' + el.dataset.animateInit; }
                }
            

            if (!visibilityManager.isVisible(el))
            {
                visibilityManager.addOnce(el,animateWhenVisible);
            }
            else
            {
                animateWhenVisible (el);
            }
        });
    }
}


function animateWhenVisible(el)
{
    el.offsetWidth  = el.offsetWidth  ;
    var animationClass  = el.dataset.animate || 'animate__rand' ;

    if (animationClass == 'animate__rand' )
    {
        animationClass = animateClasses[Math.floor(Math.random()*animateClasses.length)];
    }
    
   if (el.classList)
    { el.classList.add(animationClass); }
    else
    { el.className += ' ' + animationClass; }
}
