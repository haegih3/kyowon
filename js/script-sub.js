$(function() {
	//evt-group 탭메뉴
	$('.contents').each(function() {
		var $Content = $(this),
				$titleGroup = $Content.find('.tab-title'),
				$titleAll = $titleGroup.find('a'),
				$tabContents = $Content.find('.inner-contents'),
				contentsID = $tabContents.attr('id');
		$titleAll.on('click', function(e) {
			e.preventDefault();
			$titleAll.add($tabContents).removeClass('on');
			var $titleID = $($(this).attr('href'));
			$(this).add($titleID).addClass('on');
			$('html').scrollTop(0);
		});
	});
	//상품소개 dl 내용열기
	$('.prd-faq').each(function() {
		var $prdFaq = $('.prd-faq'),
				$dtAll = $prdFaq.find('dt');
		$dtAll.on('click', function() {
			$(this).next('dd').slideToggle('on');
		});
	});
});