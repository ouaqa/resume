// global var definitions
var folding_box__dispatcherClass = 'js-folding_box__opener',
    folding_box__foldedClass = 'folding_box--folded',
    folding_box__containerClass = 'folding_box' ,
    folding_box__foldableContentClass = 'folding_box--foldable' ,

    folding_box__flap_injection = '<div class="folding_box__flap--top" style="height : ___halfContentHeight___px ; background: ___bgcolor___ ;">___bottomHalf___</div><div class="folding_box__flap--bottom" style="height :___halfContentHeight___px; background : ___bgcolor___ ;">___topHalf___</div><div class="folding_box--content" style="height:___contentHeight___px;">___content___</div>';


// document ready handler
readyAndWilling( initFoldingBox ); 

function initFoldingBox(){

    // init click listeners
    var unfolders = document.getElementsByClassName(folding_box__dispatcherClass);
    appendClickListenerToAll(unfolders,folding_box__clickHandler);    

    // injecting fold bells and whistles to the boxes
    initAdditionalContentToFolds();
    
}

function initAdditionalContentToFolds(injectInFolds,injectColors)
{
    injectInFolds = typeof injectInFolds !== 'undefined' ? injectInFolds : false;
    injectColors = typeof injectColors !== 'undefined' ? injectColors : false;
    var folds = document.getElementsByClassName(folding_box__foldableContentClass),
    text = '',
    topHalf='',
    bottomHalf='',
    half=0,
    cpt = 0,
    len = folds.length ,
    elem,
    height=0,
    halfContentHeight=0,
    content = '',
    bg_color='',
    parent_bg_color='';

    while (cpt<len)
    {
      //variables reset
        text = '' ;
        content = '';
        topHalf='';
        bottomHalf='';
        half=0;
        height=0;
        halfContentHeight=0;
        bg_color='';
        parent_bg_color='';

        elem = folds[cpt] ;
        height = outerHeight(elem);
        halfContentHeight = height / 2 ;
        content =  elem.innerHTML ;
        
        if (injectColors)
        {
          bg_color = getBackground(elem.parentNode) ;
          if (elem.parentNode.parentNode)
          { parent_bg_color =  getBackground(elem.parentNode.parentNode) ; }
        }
 
        if (injectInFolds)
        {
          text = elem.innerText ? elem.innerText  : elem.textContent;
          // if there is only text, we inject directly in the flaps
          if( text.trim().length && elem.children.length==0)
          {
             content = '';
              half = Math.floor(text.length/2);
              topHalf =  text.substr(0,half);
              bottomHalf = text.substr(half+1,text.length);
          }
        }

        
       var replaceValues = 
        {
          ___content___ : content,
          ___halfContentHeight___ : halfContentHeight,
          ___contentHeight___ : height,
          ___topHalf___ : topHalf,
          ___bottomHalf___ : bottomHalf,
          ___bgcolor___ : bg_color
        };
         

         elem.innerHTML = injectAll(folding_box__flap_injection,replaceValues) ;
         //elem.innerHTML = elem.innerHTML.replace('___content___',content) ;
         //elem.innerHTML = elem.innerHTML.replace('___halfContentHeight___',halfContentHeight) ;
         //elem.innerHTML = elem.innerHTML.replace('___halfContentHeight___',halfContentHeight) ;
         //elem.innerHTML = elem.innerHTML.replace('___contentHeight___',height) ;
         //elem.innerHTML = elem.innerHTML.replace('___topHalf___',topHalf) ;
         //elem.innerHTML = elem.innerHTML.replace('___bottomHalf___',bottomHalf) ;
//
         //elem.innerHTML = elem.innerHTML.replace('___bgcolor___',bg_color) ;
         //elem.innerHTML = elem.innerHTML.replace('___bgcolor___',bg_color) ;
         elem.style.height = height+'px' ;
         
        
        elem.style.background = parent_bg_color ;

        // force close of tabs
        findAndCLoseParent(elem);

        cpt++;
    }

    folds = null ;
    elem = null ;
}



function findAndCLoseParent(elem)
{
    var found = false, classes = null, existingIndex = -1 ;
   
// searching for the parent folding_box
    while (elem!=document.body) {

        
        if (elem.classList)
        { found = elem.classList.contains(folding_box__containerClass); }
        else
        {found = new RegExp('(^| )' + folding_box__containerClass + '( |$)', 'gi').test(elem.className); }

            
        if (found)
        { break; }
        else
        { elem = elem.parentNode ; }

           
    }

    

    if (elem!=document.body)
    {
        if (elem.classList) 
        { elem.classList.toggle(folding_box__foldedClass); } 
        else 
        {
           classes = elem.className.split(' ');
           existingIndex = classes.indexOf(folding_box__foldedClass);

          if (existingIndex >= 0)
          {  classes.splice(existingIndex, 1); }
          else
          {  classes.push(folding_box__foldedClass); }

          elem.className = classes.join(' ');

          classes = null ;
          existingIndex = -1 ;
        }
    }
    else
    {

        // var raz 
        elem = null ;
        classes = null ;
        existingIndex = -1 ;  
        return ; 
    }
     // var raz 
    //    elem = null ;
        classes = null ;
        existingIndex = -1 ; 
}

/*

*/
function folding_box__clickHandler(event)
{
    var elem = event.target || event.srcElement ;
    findAndCLoseParent(elem);
 //       return null;
}
