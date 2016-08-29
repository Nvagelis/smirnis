$(document).ready(function (){
    var $darkButton = $('.btn-dark');
    var $lightButton = $('.btn-light');

    var $slide1 = $('.sl1');
    var $slide2 = $('.sl2');
   
    $darkButton.on('click', function (e){
        e.preventDefault();
        $slide2.css({'z-index' : '10'})
            .addClass('animating');
    });
   
    $lightButton.on('click', function (e){
        e.preventDefault();
        $slide1.css({'z-index' : '10'})
            .addClass('animating');
    });
   
    $('.close-btn').on('click', function (e){
        e.preventDefault();
        $('.slide').removeClass('animating')
            .delay(500)
            .queue(function (next){
                $(this).css({'z-index' : '0'});
                next();
        });
    });
   
});

$(document).ready(function (){
    var $slides = $('.light-box').find('li');
    var $view = $('.view');
    var current = 0;

    var $prev = $('.prev');
    var $next = $('.next');
    var $close = $('.close-light');
    var $lightBox = $('.light-box');
    var $darkBox = $('.dark-box');

    var $grey = $('.gallery-grey');
    var $brown = $('.gallery-brown');

    $slides.each(function (i){
        $(this).css({transform: 'translate(' + i*100 + '%, 0%)'});
    });
  
  
  
    $grey.on('click', function (e){
        e.preventDefault();
        $lightBox.css({'opacity':'1',
                        'height':'100%',
                        'z-index':'10',
                        'display':'block'
                    });
    });
    $brown.on('click', function (e){
        e.preventDefault();
        $darkBox.css({'opacity':'1',
                        'height':'100%',
                        'z-index':'10',
                        'display':'block'
                    });
    });
  
    function move(pos){
        $view.animate({  view: (100*pos) }, {
            step: function(now) {
                $(this).css('transform','translate(-' + now + '%, 0%)');  
            },
            duration:'slow'
        },'linear');
    }
  
  
    $next.on('click', function (e){
        e.preventDefault();
        if(current >= $slides.length-1 || $view.is(':animated')){return false;}
        current ++;
        move(current);
    });
  
  
    $prev.on('click', function (e){
        e.preventDefault();
        if(current <= 0 || $view.is(':animated')){return  false;}
        current --;
        move(current);
    });
  
    $close.on('click', function (e){
        e.preventDefault();
        $lightBox.css({'opacity':'0',
                      'height':'0',
                      'z-index':'-1',
                      'display':'none'
                });
    });
    $close.on('click', function (e){
        e.preventDefault();
        $darkBox.css({'opacity':'0',
                      'height':'0',
                      'z-index':'-1',
                      'display':'none'
                });
    });
});

$(document).ready(function (){
    var $window = $(window);
    var $viewpoint = $('.onepage');
    var current = 0;
    
    var $contList = $('.controls-nav');
    var $controls = $contList.find('li');
    
    function page(pos){
    $controls.removeClass('active').eq(pos).addClass('active');
    $viewpoint.animate({  view: (100*pos) }, {
        step: function(now) {
            $(this).css('transform','translate(0%, -' + now + '%)');  
        },
            duration:'slow'
        },'linear');
    }
    
    $controls.on('click',function (e){
    e.preventDefault();
    if($viewpoint.is(':animated')){return  false;}
    current = $(this).index();
    page(current);
    });
  
    function scroll(k){
        if(k < 0){
            if(current >= 4 || $viewpoint.is(':animated')){return false;}
            current ++;
            page(current);
        }else{
            if(current <= 0 || $viewpoint.is(':animated')){return  false;}
            current --;
            page(current);
        }
    }

    $window.bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(event) {     // 3 event gia olous tous browsers
    event.preventDefault();
    var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
        scroll(delta);
    });
    
});