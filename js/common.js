$(function(){
	/* language:Start */
	if($(window).width() > 767){

		/*$('body').scroll(function(){
		   if($('body').scrollTop() > $('#header').height()){
				$('#header').css({
					position:'fixed'
				});
				$('#wrap').css({
					paddingTop:$('#header').height()
				});
		   } else {
				$('#header, #wrap').removeAttr('style');
		   }
		});*/

		$('#header .user_nav a').click(function(){
			$(this).siblings('ul').stop().slideDown();
		});
		$('#header .user_nav > li').mouseleave(function(){
			$(this).find('ul').slideUp();
		});
		$('#header .user_nav ul a').click(function(){
			$(this).closest('ul').siblings('a').text($(this).text());
			$(this).closest('ul').slideUp();
		});
	} else {
		$('#header .user_nav li').eq(1).find('a').click(function(){
			toggle_class($(this).siblings('ul'));
			if($('#header .user_nav ul').find('button').length < 1){
				$('#header .user_nav ul').append('<button>닫기</button>');
				$('#header .user_nav button').click(function(){
					if($('.user_nav ul').hasClass('active')){
						$('#header .user_nav ul').removeClass('active');
						$('#header .user_nav li').eq(1).find('a').removeClass('active');
					} else {
						$('#header .user_nav li').eq(1).find('a').addClass('active');
					}
				});
			}

			if($('.user_nav ul').hasClass('active')){
				$('#header .user_nav li').eq(1).find('a').addClass('active');
			} else {
				$('#header .user_nav li').eq(1).find('a').removeClass('active');
			}
		});
	}
	/* language:End */

	/* navi:Start */
	$('#header .g_menu > li').mouseenter(function(){
		//console.log('BB');
		$('#header .g_menu ul').stop().slideUp(200);
		$(this).find('ul').slideDown(200);
	});
	$('#header .g_menu > li').mouseleave(function(){
		$(this).find('ul').stop().slideUp(200);
	});
	$('.sitemap dt a').click(function(){
		toggle_class($(this).closest('dl'));
	});
	/* navi:End */

	/* site map:Start */
	$('#header .sitemap_btn').click(function(){
		toggle_class($(this));
		toggle_class($('#header'));
		toggle_class($('#header .inner'));
		toggle_class($('.sitemap'));
		toggle_class($('.user_nav'));

		if($(window).width() < 768){
			if(!$('#header').hasClass('active')){
				$('.user_nav ul').removeClass('active');
				$('#header .user_nav li').eq(1).find('a').removeClass('active');
				$('.sitemap dl').removeClass('active');
			}
		}

		if($(this).hasClass('active')){
			$('body').css({overflow:'hidden'});
		} else {
			$('body').removeAttr('style');
		}

	});
	/* site map:End */

	$('.cate_navi a').click(function(){
		select_change(this);
	});
	
	tab($('.tab_area'));

	$('.placeholder input').each(function(){
		placeholder(this);
	});

	$('.placeholder input').siblings('label').click(function(){
		$(this).siblings('input').focus();
	});

	$('.placeholder input').focus(function(){
		$(this).next('label').hide();
	});

	$('.placeholder input').blur(function(){
		placeholder(this);
	});

	$('.select_box a').click(function(){
		select_change(this);
	});

	$('.join div div.textarea').load('../common/article/join.asp');

	$('.select_tab dl a').click(function(){
		var _target = $(this);
		if(_target.parent()[0].nodeName == 'DT'){
			if(_target.closest('dl').hasClass('active')){
				_target.closest('dl').removeClass('active');
			} else {
				_target.closest('dl').addClass('active');
			}
		} else {
			if(_target.closest('dl').hasClass('active')){
				_target.closest('dd').siblings().find('a').text(_target.text());
				_target.closest('dl').removeClass('active');

				_target.closest('dl').siblings('.tab_area').find('li').removeClass('current');
				_target.closest('dl').siblings('.tab_area').find('li').eq(_target.parent().index()).children().trigger('click');
				console.log(_target.parent().index());
			} else {
				_target.closest('dl').addClass('active');
			}
		}
	});

	$('.reply_list li a.reply').click(function(){
		toggle_class($(this));
	});

	/*$('.reply_list li').each(function(){
		$(this).find('a').click(function(){
			toggle_class($(this));
			if($(this).hasClass('reply')){
				toggle_class($(this).siblings('.input_reply'));
				toggle_class($(this).siblings('.del'));
			} else if ($(this).hasClass('del')){
				toggle_class($(this).siblings('.input_reply'));
				toggle_class($(this).siblings('.reply'));
			}
		});
	});*/

	$('.file_box input').focus(function(){
		file_box_trigger(this);
	});

	$('.btn_top').click(function(){
		$('html, body').animate({
			scrollTop: 0
		});
	});

	if($(this).scrollTop() > 10){
		$('.btn_top').show();
	} else {
		$('.btn_top').hide();
	}

	$('html, body').scroll(function(){
		if($(this).scrollTop() > 10){
			$('.btn_top').show();
		} else {
			$('.btn_top').hide();
		}
	});
});

function toggle_class(_target){
	if(_target.hasClass('active')){
		_target.removeClass('active');
	} else {
		_target.addClass('active');
	}
}

function tab($target){
	var $target = $target;
	width_division($target);

	$target.find('a').click(function(){
		if(!$(this).parent().hasClass('current')){
			$target.children().removeClass('current');
			$(this).parent().addClass('current');

			$('.tab_content > div').removeClass('current');
			$('.tab_content > div').eq($(this).parent().index()).addClass('current');
		}
	});
}

function select_change(_target){
	var _target = $(_target);
	if(_target.parent()[0].nodeName == 'DT'){
		if(_target.closest('dl').hasClass('active')){
			_target.closest('dl').removeClass('active');
		} else {
			_target.closest('dl').addClass('active');
		}
	} else {
		if(_target.closest('dl').hasClass('active')){
			_target.closest('dd').siblings().find('a').text(_target.text());
			_target.closest('dl').removeClass('active');
			/* select option 선택 */
			_target.closest('dl').siblings('select').find('option').removeAttr('selected');
			_target.closest('dl').siblings('select').find('option').eq(_target.parent().index()).attr('selected','selected');
		} else {
			_target.closest('dl').addClass('active');
		}
	}
}

function placeholder(_target){
	var _target = $(_target);
	if(_target.val().length > 0){
		_target.siblings('label').hide();
	} else {
		_target.siblings('label').show();
	}
}

function width_division(_target){
	var _target = $(_target);
	_target.children().css({
		width:_target.width() / _target.children().length +'px'
	});
}

function pop_open(_target, url, productKind){
	$('body').css({
		overflow:'hidden'
	});
	var _target = $(_target);
	_target.addClass('active');
	_target.addClass(url);
	_target.load('/common/pop/pop_'+url+'.asp?productKind=' + productKind);

	setTimeout(function(){
		if(_target.children().outerHeight() > $(window).height()){
			_target.children().css({
				top:20+'px',
				bottom:20+'px'
			});

			setTimeout(function(){
					_target.find('#pop_container').outerHeight(_target.children().height() - (_target.find('#pop_header').outerHeight() + _target.find('#pop_footer').outerHeight()));
			},500);
		} else {
			_target.children().css({
				marginTop:-(_target.children().outerHeight() / 2)+'px'
			});
		}

		if(_target.find('#pop_footer').length > 0){
			_target.find('#pop_footer a').width((100 / _target.find('#pop_footer a').length) -1 +'%');
		}
	}, 200);

	setTimeout(function(){
		if(_target.children().outerHeight() < (_target.find('#pop_container').outerHeight() + (_target.find('#pop_header').outerHeight() + _target.find('#pop_footer').outerHeight()))){
			_target.find('#pop_container').outerHeight(_target.children().height() - (_target.find('#pop_header').outerHeight() + _target.find('#pop_footer').outerHeight()));
		}
	},200);
}

function pop_resize(_target){
	_target.closest('#pop_wrap').children().removeAttr('style');
	//setTimeout(function(){
		if(_target.closest('#pop_wrap').children().outerHeight() > $(window).height()){
			_target.closest('#pop_wrap').children().css({
				top:20+'px',
				bottom:20+'px'
			});

			setTimeout(function(){
					_target.closest('#pop_wrap').find('#pop_container').outerHeight(_target.closest('#pop_wrap').children().height() - (_target.closest('#pop_wrap').find('#pop_header').outerHeight() + _target.closest('#pop_wrap').find('#pop_footer').outerHeight()));
			},100);
		} else {
			_target.closest('#pop_wrap').children().css({
				marginTop:-(_target.closest('#pop_wrap').children().outerHeight() / 2)+'px'
			});
		}

		if(_target.closest('#pop_wrap').find('#pop_footer').length > 0){
			_target.closest('#pop_wrap').find('#pop_footer a').width((100 / _target.closest('#pop_wrap').find('#pop_footer a').length) -1 +'%');
		}
	//}, 200);

	setTimeout(function(){
		if(_target.closest('#pop_wrap').children().outerHeight() < (_target.closest('#pop_wrap').find('#pop_container').outerHeight() + (_target.closest('#pop_wrap').find('#pop_header').outerHeight() + _target.closest('#pop_wrap').find('#pop_footer').outerHeight()))){
			_target.closest('#pop_wrap').find('#pop_container').outerHeight(_target.closest('#pop_wrap').children().height() - (_target.closest('#pop_wrap').find('#pop_header').outerHeight() + _target.closest('#pop_wrap').find('#pop_footer').outerHeight()));
		}
	},200);
}

function pop_close(_target){
	$('body').removeAttr('style');
	var _target = $(_target);
	_target.closest('#pop_wrap').removeAttr('class');
}

function file_box_trigger(_target){
	var _target = $(_target);
	/*_target.siblings('input[type="file"]').trigger('click');

	placeholder(_target);*/
	var uploadFile = _target.closest('.fileBox').find('.uploadBtn');
	
	placeholder(_target);
	
	_target.siblings('.uploadBtn').trigger('click');
	//console.log(_target.siblings('.uploadBtn').attr('class'));
	

	/*uploadFile.on('change', function(){
		if(window.FileReader){
			var filename = $(this)[0].files[0].name;
		} else {
			var filename = $(this).val().split('/').pop().split('\\').pop();
		}
		_target.siblings('.fileName').val(filename);
		
		console.log(filename);
	});*/

	/*_target.closest('.fileBox').find('input[type="file"]').change(function(){
		file_change(this);
		if(_target.val().length > 0){
			if(_target.siblings('.row_del').length < 1){
				_target.parent().append('<a href="#none" onclick="row_del(this);" class="row_del">Delete</a>');
			}
		}
		//console.log($(this).val().length);
	});*/
}

function file_change(_target){
	var _target = $(_target);
	_target.siblings('input[type="text"]').val(getFileName(_target.val()));
	
	if(window.FileReader){
		var filename = _target[0].files[0].name;
	} else {
		var filename = _target.val().split('/').pop().split('\\').pop();
	}
	_target.siblings('.fileName').val(filename);
	
	//_target.closest('.fileBox').find('input[type="file"]').change(function(){
		//file_change(this);
		/* Add 삭제 버튼 */
		if(_target.val().length > 0){
			if(_target.siblings('.row_del').length < 1){
				_target.parent().append('<a href="#none" onclick="row_del(this);" class="row_del">Delete</a>');
			}
		}
		//console.log($(this).val().length);
	//});
}

function getFileName(fileName) {
	var arSplitUrl = fileName.split("\\");
	var nArLength = arSplitUrl.length;
	var arFileName = arSplitUrl[nArLength-1];

	return arFileName;
}

/* 180802 Add:jh첨부파일 등록 시 삭제버튼 기능 */
function row_del(_target){
	var _target = $(_target);
	
	if(_target.closest('.file_box').children().length > 1){
		_target.parent().remove();
	} else {
			alert('더이상 삭제하실 수 없습니다.');
	}
	
}