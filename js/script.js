$(function() {
  //main-visual 스와이퍼
  var swiper = new Swiper('.swiper-container', {
    spaceBetween: 30,
    effect: 'fade',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });
  
  //#main-service 탭메뉴
  $('.svc-list-tit a').on('click', function() {
    $('.svc-list-tit a').removeClass('on');
    $('.svc-list ul').removeClass('on');

    var i = $(this).index();
    $(this).addClass('on');
    $('.svc-list ul').eq(i).addClass('on');
  });
  
  //클릭하면 패밀리 사이트 목록 보이기
	$('.fam-site-tit').on('click', function() {
		if ($(this).hasClass('on')) {
			  $(this).removeClass('on');
			  $('.fam-site-list').slideUp();
			} else {
			  $(this).addClass('on');
			  $('.fam-site-list').slideDown();
			}
	});
  $('.fam-site-list li').on('click', function() {
    $('.fam-site-list').slideUp();
    $('.fam-site-tit').removeClass('on');
	});

  //스크롤 내리면 header 배경색 흰색 & 위로가기 버튼 보이기
  $(window).scroll( function() {
    if($(this).scrollTop() > 95) {
        $('header').addClass('active');
        $('.btn-fix').fadeIn();
      } else {
        $('header').removeClass('active');
        $('.btn-fix').fadeOut();
      }
  });
	
  //사이즈별
	if($(window).width() > 640) {
		//gnb에 마우스 올리면 하위메뉴 나타나기
		$('.gnb li').on('mouseover', function() {
			$('.gnb, .sub-menu').addClass('action');
		});
		$('.gnb').on('mouseout', function() {
			$('.gnb, .sub-menu').removeClass('action');
		});
		//menu-all 클릭하면 하위메뉴 나타나기
		$('.menu-all').on('click', function() {
			if($('.gnb').hasClass('action')) {
				$('.gnb, .sub-menu').removeClass('action');
			} else {
				$('.gnb, .sub-menu').addClass('action');
			}
		});
	}	else {
		//mobile 메뉴 클릭하면 gnb 나타나기
		$('.menu-all').on('click', function() {
			$('#main-header, .login-area, .gnb').addClass('mb-action');
			$('h2').fadeOut('fast');
		});
		$('.btn-close').on('click', function() {
			$('#main-header, .login-area, .gnb').removeClass('mb-action');
			$('.submenu-title, .sub-menu').removeClass('on');
			$('.sub-menu').slideUp();
			$('h2').show();
		});
		// mobile 아코디언 메뉴
		$('.gnb').each(function() {
			var gnb = $('.gnb'),
					gnbAlla = gnb.find('.submenu-title'),
					subMenu = gnb.find('.sub-menu');
			gnbAlla.on('click', function() {
					var subId = $(this).attr('href');
				if ($(this).hasClass('on')) {
						$(this).removeClass('on');
						$(subId).slideUp('slow');
					} else {
						gnbAlla.removeClass('on');
						subMenu.slideUp('slow');
						$(this).addClass('on');
						$(subId).slideDown('slow');
					}
			});
		});
	}
  
});