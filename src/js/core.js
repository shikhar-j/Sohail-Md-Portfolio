_S = window._S || {}
_S.reel_url = "http://player.vimeo.com/video/134927853?autoplay=1";

_S.showOverlay = function(callback){
  callback = callback || function(){}
  $('body').addClass('no-scroll');
  $('#page-overlay')
    .hide()
    .removeClass('hidden')
    .show(150, function(e){
      callback();
    });
}

_S.hideOverlay = function(callback){
  callback = callback || function(){}
  $('#page-overlay')
    .hide(150, function(e){
      $(e).addClass('hidden');
      $('body').removeClass('no-scroll');
      callback();
    });
}

_S.showNavigation = function(){
  $('.toggle-nav .nav-text').addClass('hidden');
  $('.toggle-nav .nav-close').removeClass('hidden');

  callback = function(){
    $('.navigation').hide().removeClass('hidden').show();
    $('.toggle-nav').addClass('active');
  }

  _S.showOverlay(callback);
}

_S.hideNavigation = function(){
  $('.toggle-nav .nav-close').addClass('hidden');
  $('.toggle-nav .nav-text').removeClass('hidden');
  callback = function(){
    $('.navigation').hide().addClass('hidden');
    $('.toggle-nav').removeClass('active');
  }

  _S.hideOverlay(callback);
}

_S.showReel = function(){
  callback = function(){
    width = $(window).width() - 40
    height = width * 0.5625

    $('.reel-video').hide().removeClass('hidden').show();
    $('.reel-video iframe').show().attr('src', _S.reel_url).width(width + 'px').height(height + 'px');
    $('.toggle-nav').addClass('hidden');
  };

  _S.showOverlay(callback);
}

_S.hideReel = function(){
  callback = function(){
    $('.reel-video').hide().addClass('hidden');
    $('.reel-video iframe').hide().attr('src', '');
    $('.toggle-nav').removeClass('hidden');
  };

  _S.hideOverlay(callback);
}

$(document).ready(function(){
  $('.toggle-nav').on('click', function(e){
    e.preventDefault();

    if($(e.currentTarget).hasClass('active')){
      _S.hideNavigation();
    } else {
      _S.showNavigation();
    }

  });

  $('.view-reel-shortcut a').tooltip();

  $('.navigation a, .view-reel-shortcut a').on('click', function(e){
    e.preventDefault();

    target = $(e.currentTarget).attr('href');
    _S.hideNavigation();
    offset = $(target).offset().top;

    if (target == '#demo-reel') {
      offset += 150;
    } else if (target == '#downloads') {
      offset += 150;
    }
    $('html,body').animate({ scrollTop: offset }, 300);
  });

  $('.play-button').on('click', function(e) {
    e.preventDefault();

    _S.showReel();
  });

  $('.close-reel').on('click', function(e) {
    e.preventDefault();

    _S.hideReel();
  });

  $(document).on('keyup', function(e){
    if(e.keyCode == 27 || e.which == 27) {
      if($('.toggle-nav').hasClass('active')) {
        _S.hideNavigation();
      } else if (!$('.reel-video').hasClass('.hidden')){
        _S.hideReel();
      };
    }
  });
})
