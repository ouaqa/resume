WebFontConfig = {
	custom: {
		families : ['dude','Great Vibes'], 
		urls : ['/css/fonts.css']
	}
}

 var webfont = document.createElement('script');
    webfont.src = ('https:' == document.location.protocol ? 'https' : 'http') +
              '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    webfont.type = 'text/javascript';
    webfont.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(webfont, s);'