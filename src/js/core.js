_S = window._S || {}

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
  $('.toggle-nav .fa').removeClass('fa-bars').addClass('fa-times');
  callback = function(){
    $('.navigation').hide().removeClass('hidden').show();
    $('.toggle-nav').addClass('active');
  }

  _S.showOverlay(callback);
}

_S.hideNavigation = function(){
  $('.toggle-nav .fa').addClass('fa-bars').removeClass('fa-times');
  callback = function(){
    $('.navigation').hide().addClass('hidden');
    $('.toggle-nav').removeClass('active');
  }

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

  $('.navigation a').on('click', function(e){
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
})
