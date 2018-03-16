var gnbMenuActFun = {
	el: '.gnbDepthLst01',
	gnbAllToggBtn: '.gnbToggleBtn',
	gnbAllClsBtn: '.gnbCloseBtn',
	dept02: '.gnbDepthLst02',
	dept03: '.gnbDepthLst03',
	mmMenuBtn: '.mmMenuBtn',
	mmGnbWrap: '.mmGnbWrap',
	mmGnbAreaInbx: '.mmGnbAreaInbx',
	mmGnbDepthLst01: '.mmGnbDepthLst01',
	mmGnbDepthLst02: '.mmGnbDepthLst02',
	mmGnbDepthLst03: '.mmGnbDepthLst03',
	mmGnbCloseBtn: '.mmGnbCloseBtn',
	glDimm: '.glDimm',
	dept03ToggBtn: '.gnbDepthLst02>.inDp03 > .txt',
	blGround: '.gnbBlGround',
	schObj: {
		el: '.mmStchArea',
		btn: '.mmSchOpenBtn',
		closeBtn: '.mmSchCloseBtn',
		paddingTopBottom: 10,
	},
	cssVal: {
		blGroundPadBottom: 20, // 디자인적 수치. 하단패딩추가
		dept02PadTop: 17,
	},
	subPageName: 'h1.page-title.entry-title',
	crrtMenuName: '',
	paramName: ['page_id', 'crfile_cat', 'resourcecat', 'programcat', 'crmodelcat', 'ebook_cat', 'eventcat', 'issuecat', 'issue-calendar', 'cdnmedia', 'post_type', 'teachercontent', 'experienceplus'],
	ifParamName: ['term_slug'],
	locSearch: location.search,
	crrtParamName: null,
	crrtParamValue: null,
	crrtTargetHref: null,
	init: function() {
		var _this = this;
		this.targEl = this.dept02 + ' ' + this.blGround;
		if (location.pathname.indexOf('sitemap') != -1) {
			jQuery(this.el).find('li').removeClass('active');
			jQuery(this.el).find('li a').each(function() {
				if ($(this).attr('href').indexOf('sitemap') != -1) {
					$(this).parent().addClass('active');
					$(this).parent().parent().parent().addClass('active');
				}
			});
		} else if (location.pathname.indexOf('result') != -1) {
			jQuery(this.el).find('li').removeClass('active');
			jQuery(this.el).find('li a').each(function() {
				if ($(this).attr('href').indexOf('result.php') != -1) {
					$(this).parent().addClass('active');
					$(this).parent().parent().parent().addClass('active');
				}
			});
		} else if (location.pathname.indexOf('result_code') != -1) {
			jQuery(this.el).find('li').removeClass('active');
			jQuery(this.el).find('li a').each(function() {
				if ($(this).attr('href').indexOf('result_code') != -1) {
					$(this).parent().addClass('active');
					$(this).parent().parent().parent().addClass('active');
				}
			});
		} else {
			this.crrtMemuFun();
		}
		this.set();
		this.bind();
		this.callb();
		this.mobileSet();
		this.mobileSch();
	},
	crrtMemuFun: function() {
		var _this = this;
		this.paramName.forEach(function(name) {
			_this.getLocParam(true, name);
		});
		if (!this.crrtParamValue) {
			this.ifParamName.forEach(function(name) {
				_this.getLocParam(false, name);
			});
			this.crrtMemuActive(false);
		} else {
			this.crrtMemuActive(true);
		}
	},
	getLocParam: function(bool, name) {
		var _this = this;
		if (jQuery(window).getParams(name)) {
			var page_id = jQuery(window).getParams('page_id');
			this.crrtParamName = name;
			this.crrtParamValue = jQuery(window).getParams(name);
			var str;
			switch (page_id) { //파라미터속성명이 page_id일때,
				case '424070': //이달의 추천큐레이션 부분
					this.issuCalMenuFun(false);
					break;
				case '428614': //전국교육청 창의체험자원지도 버튼
					_this.crrtParamName = 'resourcecat';
					_this.crrtParamValue = '체험시설';
					break;
			}
			if (!page_id) {
				str = decodeURI(this.crrtParamValue);
				this.crrtParamValue = str;
				if (name == 'issuecat' || name == 'issue-calendar') { //이슈캘린더 부분
					this.issuCalMenuFun(true);
				}
			}
			//if(globarIpTextNumber == '175.208.236.223'){
			switch (_this.crrtParamName) { //파라미터속성명이 page_id가 아닐때,
				case 'cdnmedia':
					_this.crrtParamName = 'page_id';
					_this.crrtParamValue = 124672; //창의교육 > 창의교육 교원연수 > 창의교육 현장포럼 동영상
					break;
				case 'teachercontent':
					_this.crrtParamName = 'post_type';
					_this.crrtParamValue = 'teachercontent'; //크레존 블로그 > 이달의 가정 통신문
					break;
				case 'experienceplus':
					_this.crrtParamName = 'experienceplus';
					_this.crrtParamValue = ''; //크레존 블로그 > 이달의 가정 통신문
					break;
			}
			if(_this.crrtParamName == 'post_type' && _this.crrtParamValue=='experienceplus'){
				_this.crrtParamName = 'experienceplus';
				_this.crrtParamValue = ''; //크레존 블로그 > 이달의 가정 통신문
			}
			//}
			
			this.crrtTargetHref = bool ? '/?' + this.crrtParamName + '=' + this.crrtParamValue : this.crrtParamValue;
			console.log(this.crrtTargetHref)
		}
	},
	issuCalMenuFun: function(bool) {
		this.issuCalGlBool = bool;
		this.crrtParamValue = 424070; //이달의 추천 큐레이션
		this.crrtParamName = 'page_id';
		this.issuCalTabsSet();
	},
	issuCalTabsSet: function() {
		var _this = this;
		this.issuCalTab = {
			target: _this.issuCalGlBool ? ['#sub_listing_categories', '.singular .entry-content'] : '.wpb_row',
			appendLst: '.issCalTabs',
			html: '',
			tit: '이슈캘린더',
			month: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		};
		this.issuCalTabsHtml();
		if (typeof this.issuCalTab.target !== 'object') {
			$(this.issuCalTab.target).before(_this.issuCalTab.html);
		} else {
			this.issuCalTab.target.forEach(function(target) {
				if (!$(_this.issuCalTab.appendLst).length) {
					$(target).before(_this.issuCalTab.html);
				}
			});
		}
		if (!_this.issuCalGlBool) {
			$(this.issuCalTab.appendLst).css('margin-bottom', 36);
		}
	},
	issuCalTabsHtml: function() {
		var _this = this;
		var paramsValue = _this.issuCalGlBool ? 'issuecat' : 'm';
		var paramsAttr = null;
		if (!jQuery(window).getParams(paramsValue)) {
			paramsValue = 'term_slug';
		}
		var params = decodeURI(jQuery(window).getParams(paramsValue));
		_this.issuCalTab.html += '<ul class="cmm_tabs iss_cal_tabs ' + _this.clsFormat(_this.issuCalTab.appendLst) + '">';
		this.issuCalTab.month.forEach(function(str, idx) {
			if (!_this.issuCalGlBool) {
				str = str.replace('월', '');
				if (str != 12) {
					paramsAttr = 'page_id=424070&n=1&m';
				} else {
					paramsAttr = 'page_id=424070&n=0&m';
				}
			} else {
				paramsAttr = 'issuecat';
			}
			if (str == params) {
				_this.issuCalTab.html += '<li class="tp tp' + idx + ' active">';
			} else {
				_this.issuCalTab.html += '<li class="tp tp' + idx + '">';
			}
			_this.issuCalTab.html += '<a href="/?' + paramsAttr + '=' + str + '" class="txt">' + _this.issuCalTab.month[idx] + '</a>';
			_this.issuCalTab.html += '</li>';
		});
		_this.issuCalTab.html += '</ul>';
		if (_this.issuCalGlBool) {
			this.issuCalTitGet();
		}
	},
	issuCalTitGet: function() {
		var beforeMn = '.loop-title';
		var beforeMnName = jQuery(beforeMn).text();
		jQuery(beforeMn).text(this.issuCalTab.tit + ' (' + beforeMnName + ')');
	},
	crrtMemuActive: function(bool) {
		var _this = this;
		var targetMenu = [this.el, this.mmGnbDepthLst01];
		targetMenu.forEach(function(target) {
			jQuery(target).find('li .txt').each(function() {
				var $this = $(this);
				var $thisHref = null;
				switch (_this.crrtParamValue) {
					case '424573': //창의교육 > 창의교육선도 교원양성대학
					case '447628': //창의교육 > 창의교육 거점센터 
						var params = jQuery(window).getParams('m');
						switch (params) {
							case 'RCV':
								params = 'RCL';
								break;
						}
						$thisHref = params ? $this.attr('href').indexOf(_this.crrtTargetHref + '&m=' + params) != -1 : $this.attr('href') == _this.crrtTargetHref;
						break;
					case '126176': //창의교육 > 창의교육 백문백답
						var params = jQuery(window).getParams('C');
						$thisHref = params ? $this.attr('href').indexOf(_this.crrtTargetHref) != -1 && $this.attr('href').indexOf('&C=' + params) != -1 : $this.attr('href').indexOf(_this.crrtTargetHref) != -1;
						break;
					case '계기교육-수업모델':
					case '영남권-창의체험-수업모델':
					case '창의인성교육-수업모델':
					case '멀티미디어-자료실':
						var params = jQuery(window).getParams('term_slug');
						$thisHref = $this.attr('href').indexOf(_this.crrtParamValue) != -1;
						break;
					case '창의적체험활동':
					case '진로직업체험':
					case '교과학습지원':
						var params = jQuery(window).getParams('term_slug');
						$thisHref = $this.attr('href') == '/?programcat=' + _this.crrtParamValue;
						break;
					case '126125':
						$thisHref = $this.attr('href').indexOf('126126') != -1;
						break;
						//창의적 체험활동
					case '동아리봉사-창의적체험활동':
					case '역사체험-창의적체험활동':
					case '과학기술-창의적체험활동':
					case '인문사회-창의적체험활동':
					case '예체능-창의적체험활동':
					case '보건-창의적체험활동':
					case '녹색-창의적체험활동':
					case '기타-창의적체험활동':
						//창의적 진로직업체험
					case '역사체험-진로직업체험':
					case '과학기술-진로직업체험':
					case '인문사회-진로직업체험':
					case '예체능-진로직업체험':
					case '보건-진로직업체험':
					case '녹색-진로직업체험':
					case '기타-진로직업체험':
						//창의적 교과학습지원
					case '역사-교과학습지원':
					case '국어-교과학습지원':
					case '영어-교과학습지원':
					case '수학-교과학습지원':
					case '과학-교과학습지원':
					case '예체능-교과학습지원':
					case '사회-교과학습지원':
						var params = jQuery(window).getParams('term_slug');
						$thisHref = $this.attr('href').indexOf(_this.crrtParamValue.toLowerCase()) != -1;
						break;
					default:
						$thisHref = bool ? $this.attr('href').indexOf(_this.crrtTargetHref) != -1 : $this.attr('href').indexOf(_this.crrtTargetHref) != -1;
				}
				if ($thisHref) {
					jQuery(target).find('li').removeClass('active');
					$this.closest('li').addClass('active');
					$this.closest('li').parent().parent().addClass('active');
					$this.closest('li').parent().parent().parent().parent().addClass('active');
					$this.closest('li').parent().parent().parent().parent().parent().parent().addClass('active');
				} else {
					var $el = $('#sidebar-primary .browse_by_category>li.current-cat')
					var $tar = $el.length ? $el : $('#sidebar-primary .browse_by_category li.current-cat').parent().parent();
					var $href = decodeURI($tar.find('>a').attr('href'));
					if ($href.indexOf('https://www.crezone.net') != -1) {
						$href = $href.replace('https://www.crezone.net', '');
					}
					if ($this.attr('href') == $href) {
						jQuery(target).find('li').removeClass('active');
						$this.closest('li').addClass('active');
						$this.closest('li').parent().parent().addClass('active');
						$this.closest('li').parent().parent().parent().parent().addClass('active');
						$this.closest('li').parent().parent().parent().parent().parent().parent().addClass('active');
					}
				}



			});
		});
		if (true) { // 메인타고들어오는 '인권아,놀자' 잡는코드 //20171122
			var cls01 = decodeURI($(window).getParams('programcat'));
			var clsArry = ['과학기술', '인문사회', '예체능', '보건', '녹색', '기타', '융합', '역사', '국어', '영어', '수학', '과학', '사회', '동아리봉사', '역사체험', '기타-창의적체험활동', '동아리/봉사'];
			var crtNameArry = [$('.breadcrumb-trail>ul>li:eq(2)>span>a').text(), $('.breadcrumb-trail>ul>li:eq(3)').text()];
			if (crtNameArry[1].indexOf('/') != -1) {
				crtNameArry[1] = crtNameArry[1].replace('/', '');
			}
			if (cls01) {
				for (var i = 0; i < clsArry.length; i++) {
					if (cls01 == clsArry[i]) {

						if (globarIpTextNumber == "175.208.236.223") {
							//crtNameArry[0]
							//crtNameArry[1]
							jQuery(_this.el).find('>li').removeClass('active');
							jQuery(_this.dept02).find('>li').removeClass('active');
							jQuery(_this.dept03).find('>li').removeClass('active');
							jQuery(_this.el).find('>li:eq(1)').addClass('active');
							jQuery(_this.el).find('>li.active').find('>ul>li:eq(2)').addClass('active');
							jQuery(_this.dept02).find('>li.active').find('>' + _this.dept03 + ' li').removeClass('active');
							var $tad = null;
							switch (crtNameArry[0]) {
								case '창의적 체험활동':
									$tad = jQuery(_this.dept02).find('>li.active').find('>' + _this.dept03 + '>li:eq(0)');
									break;
								case '진로직업체험':
									$tad = jQuery(_this.dept02).find('>li.active').find('>' + _this.dept03 + '>li:eq(1)');
									break;
								case '교과학습지원':
									$tad = jQuery(_this.dept02).find('>li.active').find('>' + _this.dept03 + '>li:eq(2)');
									break;
							}
							$tad.addClass('active');
							$tad.find('>ul li .txt').each(function() {
								var $this = $(this);
								var $thisHref = $this.attr('href');

								if ($thisHref.indexOf(crtNameArry[1]) != -1) {

									$this.closest('li').addClass('active');
								}
							});
						} else {
							//crtNameArry[0]
							//crtNameArry[1]
							jQuery(_this.el).find('>li').removeClass('active');
							jQuery(_this.dept02).find('>li').removeClass('active');
							jQuery(_this.dept03).find('>li').removeClass('active');
							jQuery(_this.el).find('>li:eq(1)').addClass('active');
							jQuery(_this.el).find('>li.active').find('>ul>li:eq(2)').addClass('active');
							jQuery(_this.dept02).find('>li.active').find('>' + _this.dept03 + ' li').removeClass('active');
							var $tad = null;
							switch (crtNameArry[0]) {
								case '창의적 체험활동':
									$tad = jQuery(_this.dept02).find('>li.active').find('>' + _this.dept03 + '>li:eq(0)');
									break;
								case '진로직업체험':
									$tad = jQuery(_this.dept02).find('>li.active').find('>' + _this.dept03 + '>li:eq(1)');
									break;
								case '교과학습지원':
									$tad = jQuery(_this.dept02).find('>li.active').find('>' + _this.dept03 + '>li:eq(2)');
									break;
							}
							$tad.addClass('active');
							$tad.find('>ul li .txt').each(function() {
								var $this = $(this);
								var $thisHref = $this.attr('href');

								if ($thisHref.indexOf(crtNameArry[1]) != -1) {

									$this.closest('li').addClass('active');
								}
							});
						}
					}
				}
			}

		}
	},
	mobileSch: function() {
		var _this = this;
		jQuery(window).smartresize(function() {
			/* 검색바 속성 초기화 */
			if ($(this).width() > 980) {
				jQuery(_this.schObj.btn).removeClass('active');
				jQuery(_this.schObj.el).removeAttr('style');
			}
		});
		jQuery(this.schObj.btn).off().on({
			'click': function() {
				jQuery(this).toggleClass('active');
				_this.mobileSchMove();
			},
		});
		jQuery(this.schObj.closeBtn).off().on({
			'click': function() {
				jQuery(_this.schObj.btn).click();
			},
		});
	},
	mobileSchMove: function() {
		var _this = this;
		if (jQuery(this.schObj.btn).is('.active')) {
			jQuery(this.schObj.el).stop().animate({
				'height': 192,
				'padding-top': _this.schObj.paddingTopBottom,
				'padding-bottom': _this.schObj.paddingTopBottom,
			}, _this.animateCallback({
				'complete': function() {
					jQuery(this).addClass('active');
				}
			}));
		} else {
			jQuery(this.schObj.el).removeClass('active').stop().animate({
				'height': 0,
				'padding-top': 0,
				'padding-bottom': 0,
			}, _this.animateCallback());
		}
	},
	clsFormat: function(str, fmt) {
		var fmt = fmt ? fmt : '.';
		return str.replace(fmt, '');
	},
	mobileSet: function() {
		var _this = this;
		var nav = jQuery(this.el).html();
		jQuery(this.mmGnbDepthLst01).html(nav).find('ul').each(function() {
			if (jQuery(this).is(_this.dept02)) {
				jQuery(this).removeClass(_this.clsFormat(_this.dept02));
				jQuery(this).addClass(_this.clsFormat(_this.mmGnbDepthLst02));
			} else if (jQuery(this).is(_this.dept03)) {
				jQuery(this).removeClass(_this.clsFormat(_this.dept03));
				jQuery(this).addClass(_this.clsFormat(_this.mmGnbDepthLst03));
			}
		});
		/* 사이트맵 부분 어펜드 */
		var stInfAppend = (function() {
			var html = jQuery('.stInfAppendEl .stInfAppendLst').clone();
			html.appendTo(jQuery('.stInfAppendTarget'));
			jQuery('.stInfAppendTarget').parent().customTags();
		})();
		/* 사이트맵 부분 어펜드 */
		this.mobileBind();
		this.mobileDepthBind();
	},
	mobileBind: function() {
		var _this = this;
		jQuery(this.mmMenuBtn).off().on({
			'click': function() {
				_this.mobileNavMove(true);
			},
		});
		jQuery(this.mmGnbWrap).find(this.glDimm).off().on({
			'touchmove touchstart click': function() {
				_this.mobileNavMove(false);
			},
		});
		jQuery(this.mmGnbWrap).find(this.mmGnbCloseBtn).off().on({
			'touchmove touchstart click': function() {
				_this.mobileNavMove(false);
			},
		});
	},
	mobileDepthBind: function() {
		var _this = this;
		jQuery(this.mmGnbDepthLst01).find('>li>.txt').off().on({
			'click': function() {
				jQuery(_this.mmGnbDepthLst01).find('>li').removeClass('active');
				jQuery(this).closest('li').addClass('active');
				return false;
			},
		});
		jQuery(this.mmGnbDepthLst02).find('>li>.txt').off().on({
			'click': function() {
				if (jQuery(this).closest('li').is('.active')) {
					jQuery(_this.mmGnbDepthLst02).find('>li').removeClass('active');
					return false;
				}
				jQuery(_this.mmGnbDepthLst02).find('>li').removeClass('active');
				jQuery(this).closest('li').addClass('active');
				if (jQuery(this).closest('li').is('.inDp03')) {
					return false;
				}
			},
		});
		if (this.locSearch == '') {
			jQuery(this.mmGnbDepthLst01).find('>li:eq(0)>.txt').click();
		}
	},
	mobileNavMove: function(bool) {
		var _this = this;
		if (bool) {
			jQuery(this.mmGnbWrap).show().find(this.mmGnbAreaInbx).stop().animate({
				'left': 0
			}, _this.animateCallback());
			jQuery(this.mmGnbWrap).show().find(this.glDimm).show().stop().animate({
				'opacity': 1
			}, _this.animateCallback({
				'complete': function() {
					jQuery('body').addClass('scrollOff');
				}
			}));
		} else {
			jQuery(this.mmGnbWrap).find(this.mmGnbAreaInbx).stop().animate({
				'left': '-100%'
			}, _this.animateCallback({
				'complete': function() {
					jQuery(_this.mmGnbWrap).hide();
				},
			}));
			jQuery(this.mmGnbWrap).show().find(this.glDimm).stop().animate({
				'opacity': 0
			}, _this.animateCallback({
				'complete': function() {
					jQuery(this).hide();
					jQuery('body').removeClass('scrollOff');
				}
			}));
		}
	},
	set: function(otp) {
		return jQuery.extend(true, this.cssVal, otp);
	},
	animateCallback: function(obj) {
		return jQuery.extend(true, {
			duration: 700,
			easing: 'easeInOutExpo',
			complete: function() {},
		}, obj);
	},
	maxHeight: function() {
		var maxHeiArry = [];
		jQuery(this.el).find(this.dept02).each(function() {
			var liHei = 0;
			jQuery(this).find('>li').each(function() {
				liHei += jQuery(this).outerHeight();
			});
			maxHeiArry.push(liHei);
		});
		return Math.max.apply(null, maxHeiArry) + this.set().dept02PadTop;
	},
	bind: function() {
		var _this = this;
		var bool = true;
		jQuery(this.gnbAllToggBtn).off().on({
			'click': function() {
				if (bool) {
					_this.show(true);
					bool = false;
				} else {
					_this.show(false);
					bool = true;
				}
				return false;
			}
		});
		jQuery(this.gnbAllClsBtn).off().on({
			'click': function() {
				_this.show(false);
				bool = true;
			}
		});
		jQuery(this.el).find('>li>a').off().on({
			'click': function() {
				_this.show(true);
				bool = false;
				return false;
			}
		});
	},
	show: function(bool, obj) {
		var _this = this;
		if (bool) {
			jQuery(this.el).find(this.dept02).show().stop().animate({
				'height': _this.maxHeight(),
				'padding-top': _this.set().dept02PadTop
			}, _this.animateCallback(obj));
			jQuery(this.blGround).stop().animate({
				'height': _this.maxHeight() + _this.set().blGroundPadBottom,
			}, _this.animateCallback(obj));
		} else {
			jQuery(this.el).find(this.dept02).stop().animate({
				'height': 0,
				'padding-top': 0
			}, _this.animateCallback($.extend(obj,{
					'complete':function(){
						$(this).hide()
					}
				})));
			jQuery(this.blGround).stop().animate({
				'height': 0,
			}, _this.animateCallback(obj));
		}
	},
	callb: function() {
		var _this = this;
		jQuery(this.dept03ToggBtn).off().on({
			'click': function() {
				if (!jQuery(this).closest('li').is('.active')) {
					jQuery(_this.dept02).find('>li').removeClass('active');
					jQuery(this).closest('li').addClass('active');
				} else {
					jQuery(_this.dept02).find('>li').removeClass('active');
				}
				_this.show(true);
				return false;
			},
		});
	},
};
var asideMenuFun = {
	el: '',
	pc: {
		wrap: '.asideMenu',
		dp01: '.asideMenuDepth01',
		dp02: '.asideMenuDepth02',
		dp03: '.asideMenuDepth03',
	},
	mobile: {
		wrap: '.mmAsideMenu',
		lst: '.mmAsideMenuDepthLst',
	},
	vNames: {
		dp01: '.mAsideNameDepth01',
		dp02: '.mAsideNameDepth02',
	},
	gnb: {
		dp01: '.gnbDepthLst01',
		dp02: '.gnbDepthLst02',
		dp03: '.gnbDepthLst03',
		dp04: '.gnbDepthLst04',
	},
	findSet: '>li>.txt',
	dpActiveTxt: {
		dp01: '',
		dp02: '',
		dp03: '',
		dp04: '',
	},
	init: function(obj) {
		this.get().getPc();
		this.get().getMobile();
		this.get().getHistoryAsideBtn();
		this.dpActiveTxtFun();
		this.mobVirNameBox();
		this.bind();
		if (obj) {
			this.obj = obj ? obj : null;
			switch (this.obj.pageapp) {
				case '.ntButNcAppendTarget':
					this.asideAppend().ntButNcAppendTarget(this.obj.pageapp);
					break;
			}

		}
	},
	asideAppend: function() {
		var _this = this;
		var ntButNcAppendTarget = function(app) {
			console.log($(app).length)
			$(_this.pc.wrap).html($(app));
		};
		return {
			ntButNcAppendTarget: ntButNcAppendTarget
		};
	},
	classFormat: function(name) {
		return name.replace('.', '');
	},
	dpActiveTxtFun: function() {
		var _this = this;
		for (var i in _this.gnb) {
			jQuery(_this.gnb[i]).find(_this.findSet).each(function() {
				var $this = jQuery(this);
				var $thisTxt = $this.text();
				if (jQuery(this).closest('li').is('.active')) {
					if ($thisTxt.indexOf('New') != -1) {
						$thisTxt = $thisTxt.replace('New', '');
					}
					_this.dpActiveTxt[i] = $thisTxt;
				}
			});
		}
	},
	get: function() {
		var _this = this;
		var getPc = function() {
			jQuery(_this.gnb.dp01).find(_this.findSet).each(function() {
				var $this = jQuery(this);
				var $thisLi = $this.closest('li');
				var $thisTxt = $this.html();
				if ($thisLi.is('.active')) {
					jQuery(_this.pc.dp01).html($thisTxt);
					var $thisDp02html = $thisLi.find(_this.gnb.dp02).html();
					jQuery(_this.pc.dp02).html($thisDp02html);
				}
			});
			jQuery(_this.pc.wrap).stop().animate({
				'opacity': 1
			}, 200);
		};
		var getMobile = function() {
			var $gnbHtml = jQuery(_this.gnb.dp01).html();
			jQuery(_this.mobile.lst).html($gnbHtml);
		};
		var getHistoryAsideBtn = function(targetNm) {
			var tar = targetNm ? targetNm : ['#templatic_text-31', '#templatic_text-11', '#templatic_text-14']; //,'[id^="directory_mile_range_widget"]'
			if (true) { //globarIpTextNumber != '175.208.236.223'
				for (var i = 0; i < tar.length; i++) {
					if (jQuery(tar[i]).length) {
						if (tar[i] == '#templatic_text-12') {
							/*
							재단 : 220.95.254.247,
							상록 : 175.208.236.223,
							globarIpTextNumber == '175.208.236.223' || location.hostname == 'dev.crezone.net' || globarIpTextNumber == '220.95.254.247'
							*/
							if (true) {
								if ($('#templatic_text-12').css('display') != 'hidden') {
									if (!$('.browse_by_category li.current-cat').length) {
										$('.browse_by_category li:eq(0)').addClass('current-cat');
									}
									var html = $('.browse_by_category').html();
									var appendHrefArry02 = [];
									var appendHrefArry03 = [];
									var pageNm = $('.page-title').text();
									jQuery('.asideMenuDepth02').after(jQuery(tar[i]));
									$('.asideMenuDepth02>li>a').each(function() {
										var $this = $(this);
										var $thisHref = $this.attr('href');
										appendHrefArry02.push($thisHref);
									});
									$('.asideMenuDepth03>li>a').each(function() {
										var $this = $(this);
										var $thisHref = $this.attr('href');
										appendHrefArry03.push($thisHref);
									});
									$('.browse_by_category li a').each(function(idx) {
										var $this = $(this);
										var $thisHref = $this.attr('href');

										if ($thisHref.indexOf('http://www.crezone.net') != -1) {
											$thisHref = $thisHref.replace('http://www.crezone.net', '');
										}
										appendHrefArry02.forEach(function(items) {
											if (items == $thisHref) {
												console.log(items)
												$this.closest('li').remove();
											}
										});
										appendHrefArry03.forEach(function(items) {
											if (items == $thisHref) {
												console.log(items)
												$this.closest('li').remove();
											}
										});
									});
									if (html) {
										if ($('#RCLNB').is('.RCLNB_SHOW')) {
											jQuery(tar[i]).after('<ul class="browse_by_category" style="overflow: hidden;">' + html + '</ul>');
										} else {
											jQuery(tar[i]).after('<ul class="browse_by_category" style="overflow: visible;">' + html + '</ul>');
										}
										if ($('#detail_RC_top').length) {
											jQuery('#detail_RC_top').after('<ul class="memb_inco_tabs browse_by_category" style="display: none;">' + html + '</ul>');
										} else {
											jQuery('.page-title').after('<ul class="memb_inco_tabs browse_by_category" style="display: none;">' + html + '</ul>');
										}
									}

									$('.page-title').each(function() {
										if ($(this).is('.padding0')) {
											$(this).removeClass('padding0');
										}
									});
									(function() {
										var memb = {
											name: $('#RCLNB_name').text(),
											id: $('#RCLNB_id').text(),
											cnt01: $('#RCLNB_visit').text(),
											cnt02: $('#RCLNB_write').text(),
											btn: $('#RCLNB .btn-group').html(),
											html: '',
										};
										if ($('#RCLNB').is('.RCLNB_SHOW')) {
											memb.html += '<div class="memb_cst_form widget Templatic Text templatic_text memb_show" style="display: none;">';
										} else {
											memb.html += '<div class="memb_cst_form widget Templatic Text templatic_text memb_hide" style="display: none;">';
										}
										memb.html += '<div class="textwidget">';
										memb.html += '<div class="login-info">';
										memb.html += '<div class="member-name">';
										memb.html += '<i></i>';
										memb.html += '<strong>' + memb.name + '</strong>';
										memb.html += '<span>' + memb.id + '</span>';
										memb.html += '</div>'; //member-name
										memb.html += '<ul class="member-info">';
										memb.html += '<li class="first">';
										memb.html += '<strong>출석수</strong>';
										memb.html += '<span><em>' + memb.cnt01 + '</em>회</span>';
										memb.html += '</li>';
										memb.html += '<li class="last">';
										memb.html += '<strong>게시물 작성수</strong>';
										memb.html += '<span><em>' + memb.cnt02 + '</em>건</span>';
										memb.html += '</li>';
										memb.html += '</ul>'; //member-info
										memb.html += '<div class="btn-group">';
										memb.html += memb.btn;
										memb.html += '</div>'; //btn-group
										memb.html += '</div>';
										memb.html += '</div>';
										memb.html += '</div>';
										$('.memb_inco_tabs').before(memb.html);
									})();
								}
							}
						} else {
							jQuery('.asideMenuDepth02').after(jQuery(tar[i]));
							if (true) {
								//$('#content').append('<div id="RCregBtn"></div>');
								$('#content').append('<div class="only_mob"></div>');
								setTimeout(function() {
									//console.log('==========='+$('#RCregBtn>div').length)
									$('#RCregBtn>div').each(function() {
										var $thisClone = $(this).clone();
										$thisClone.appendTo($('.only_mob'));
									});
								}, 100);
							}
						}

					}
				}

			} else {
				for (var i = 0; i < tar.length; i++) {
					if (jQuery(tar[i]).length) {
						if (tar[i] == '#templatic_text-12') {
							/*
							재단 : 220.95.254.247,
							상록 : 175.208.236.223,
							globarIpTextNumber == '175.208.236.223' || location.hostname == 'dev.crezone.net' || globarIpTextNumber == '220.95.254.247'
							*/
							if (true) {
								if ($('#templatic_text-12').css('display') != 'hidden') {
									if (!$('.browse_by_category li.current-cat').length) {
										$('.browse_by_category li:eq(0)').addClass('current-cat');
									}
									var html = $('.browse_by_category').html();
									var appendHrefArry02 = [];
									var appendHrefArry03 = [];
									var pageNm = $('.page-title').text();
									jQuery('.asideMenuDepth02').after(jQuery(tar[i]));
									$('.asideMenuDepth02>li>a').each(function() {
										var $this = $(this);
										var $thisHref = $this.attr('href');
										appendHrefArry02.push($thisHref);
									});
									$('.asideMenuDepth03>li>a').each(function() {
										var $this = $(this);
										var $thisHref = $this.attr('href');
										appendHrefArry03.push($thisHref);
									});
									$('.browse_by_category li a').each(function(idx) {
										var $this = $(this);
										var $thisHref = $this.attr('href');

										if ($thisHref.indexOf('http://www.crezone.net') != -1) {
											$thisHref = $thisHref.replace('http://www.crezone.net', '');
										}
										appendHrefArry02.forEach(function(items) {
											if (items == $thisHref) {
												console.log(items)
												$this.closest('li').remove();
											}
										});
										appendHrefArry03.forEach(function(items) {
											if (items == $thisHref) {
												console.log(items)
												$this.closest('li').remove();
											}
										});
									});
									if (html) {
										jQuery(tar[i]).after('<ul class="browse_by_category">' + html + '</ul>');
										if ($('#detail_RC_top').length) {
											jQuery('#detail_RC_top').after('<ul class="memb_inco_tabs browse_by_category" style="display: none;">' + html + '</ul>');
										} else {
											jQuery('.page-title').after('<ul class="memb_inco_tabs browse_by_category" style="display: none;">' + html + '</ul>');
										}
									}

									$('.page-title').each(function() {
										if ($(this).is('.padding0')) {
											$(this).removeClass('padding0');
										}
									});
									(function() {
										var memb = {
											name: $('#RCLNB_name').text(),
											id: $('#RCLNB_id').text(),
											cnt01: $('#RCLNB_visit').text(),
											cnt02: $('#RCLNB_write').text(),
											btn: $('#RCLNB .btn-group').html(),
											html: '',
										};
										memb.html += '<div class="memb_cst_form widget Templatic Text templatic_text" style="display: none;">';
										memb.html += '<div class="textwidget">';
										memb.html += '<div class="login-info">';
										memb.html += '<div class="member-name">';
										memb.html += '<i></i>';
										memb.html += '<strong>' + memb.name + '</strong>';
										memb.html += '<span>' + memb.id + '</span>';
										memb.html += '</div>'; //member-name
										memb.html += '<ul class="member-info">';
										memb.html += '<li class="first">';
										memb.html += '<strong>출석수</strong>';
										memb.html += '<span><em>' + memb.cnt01 + '</em>회</span>';
										memb.html += '</li>';
										memb.html += '<li class="last">';
										memb.html += '<strong>게시물 작성수</strong>';
										memb.html += '<span><em>' + memb.cnt02 + '</em>건</span>';
										memb.html += '</li>';
										memb.html += '</ul>'; //member-info
										memb.html += '<div class="btn-group">';
										memb.html += memb.btn;
										memb.html += '</div>'; //btn-group
										memb.html += '</div>';
										memb.html += '</div>';
										memb.html += '</div>';
										$('.memb_inco_tabs').before(memb.html);
									})();
								}
							}
						} else {
							jQuery('.asideMenuDepth02').after(jQuery(tar[i]));
							if (true) {
								//$('#content').append('<div id="RCregBtn"></div>');
								$('#content').append('<div class="only_mob"></div>');
								setTimeout(function() {
									//console.log('==========='+$('#RCregBtn>div').length)
									$('#RCregBtn>div').each(function() {
										var $thisClone = $(this).clone();
										$thisClone.appendTo($('.only_mob'));
									});
								}, 100);
							}
						}

					}
				}

			}

		};
		return {
			getPc: getPc,
			getMobile: getMobile,
			getHistoryAsideBtn: getHistoryAsideBtn,
		};
	},
	mobVirNameBox: function() {
		var _this = this;
		var args = arguments;
		if (!args.length) {
			jQuery(_this.vNames.dp01).text(_this.dpActiveTxt.dp01);
			jQuery(_this.vNames.dp02).text(_this.dpActiveTxt.dp02);
			jQuery(_this.vNames.dp03).text(_this.dpActiveTxt.dp03);
		} else {
			args[0].text(args[1]);
		}
	},
	bind: function() {
		var _this = this;
		jQuery(_this.pc.dp02).find(_this.findSet).off().on({
			'click': function() {
				if (!jQuery(this).closest('li').is('.inDp03')) {
					return true;
				} else {
					_this.show(true, jQuery(this));
					return false;
				}
			},
		});
		jQuery(_this.vNames.dp01 + ',' + _this.vNames.dp02).off().on({
			'click': function(e) {
				e.preventDefault();
				if (event.target == jQuery(_this.vNames.dp01)[0]) {
					if (!jQuery(_this.mobile.lst).is(':visible') || !jQuery(_this.mobile.lst).find(_this.findSet).is(':visible')) {
						_this.show(false, jQuery(this));
					} else {
						_this.show(false, jQuery(this), 'close');
					}
				} else {
					if (!jQuery(_this.mobile.lst).find(_this.gnb.dp02).is(':visible')) {
						_this.show(false, jQuery(this));
					} else {
						_this.show(false, jQuery(this), 'close');
					}
				}
				return false;
			},
		});
		jQuery(_this.mobile.lst).find(_this.findSet).off().on({
			'click': function(e) {
				e.preventDefault();
				var $thisTxt = jQuery(this).text();
				jQuery(_this.mobile.lst).find('>li').removeClass('active');
				jQuery(this).closest('li').addClass('active');
				if ($thisTxt.indexOf('New') != -1) {
					$thisTxt = $thisTxt.replace('New', '');
				}
				_this.mobVirNameBox(jQuery(_this.vNames.dp01), $thisTxt);
				_this.show(false, jQuery(this), 'close');
				jQuery(_this.vNames.dp02).click().text(_this.callb().nameDp03Re());
				return false;
			},
		});
		jQuery(_this.mobile.lst).find(_this.gnb.dp02).find(_this.findSet).off().on({
			'click': function() {
				var $this = jQuery(this);
				var $thisLi = $this.closest('li');
				var $thisTxt = jQuery(this).text();
				if ($thisTxt.indexOf('New') != -1) {
					$thisTxt = $thisTxt.replace('New', '');
				}
				if ($thisLi.is('.inDp03') && $thisLi.is('.active')) {
					$thisLi.removeClass('active');
					return false;
				}
				jQuery(_this.mobile.lst).find(_this.gnb.dp02).find(_this.findSet).closest('li').removeClass('active');
				$thisLi.addClass('active');
				jQuery(_this.vNames.dp02).text($thisTxt);
				if ($thisLi.is('.inDp03')) {
					return false;
				} else {
					return true;
				}
			},
		});
		jQuery(_this.mobile.lst).find(_this.gnb.dp03).find(_this.findSet).off().on({
			'click': function() {
				var $this = jQuery(this);
				var $thisLi = $this.closest('li');
				jQuery(_this.mobile.lst).find(_this.gnb.dp03).find(_this.findSet).closest('li').removeClass('active');
				$thisLi.addClass('active');
				return true;
			},
		});
	},
	show: function(dv, $target, showhide) {
		var _this = this;
		if (dv) { // pc
			$target.closest('li').toggleClass('active');
		} else { // mob
			if (showhide === 'close') {
				jQuery(this.mobile.lst).hide();
				return;
			}
			jQuery(this.mobile.lst).show().find(this.findSet).each(function() {
				var $this = jQuery(this);
				var $thisLi = $this.closest('li');
				if ($target[0].className.indexOf(_this.classFormat(_this.vNames.dp01)) != -1) { // mobile dp01
					$this.show();
					$thisLi.find(_this.gnb.dp02).hide();
				} else if ($target[0].className.indexOf(_this.classFormat(_this.vNames.dp02)) != -1) { // mobile dp02
					$this.hide();
					$thisLi.find(_this.gnb.dp02).hide();
					if ($thisLi.is('.active')) {
						$thisLi.find(_this.gnb.dp02).show();
					}

				}
			});
		}
	},
	callb: function() {
		var _this = this;
		var nameDp03Re = function() {
			var txt = '';
			var el = jQuery(_this.mobile.lst + '>li.active').find(_this.gnb.dp02);
			if (el.find('>li.active').length) {
				txt = el.find('>li.active>.txt').text();
			} else {
				txt = el.find('>li:eq(0)>.txt').text();
			}
			if (txt.indexOf('New') != -1) {
				txt = txt.replace('New', '');
			}
			return txt;
		};
		return {
			nameDp03Re: nameDp03Re,
		};
	},
	animateCallback: function(obj) {
		return jQuery.extend(true, {
			'duration': 0,
			'easing': 'easeInOutExpo',
			complete: function() {},
		}, obj);
	},
};
var cmmDialogFun = {
	el: '',
	elInnerCont: '.layerPopInner',
	btn: '',
	closeBtn: '.layerPopCloseBtn',
	glDimm: '.glDimm',
	positionTop: 30,
	init: function(el, btn, top) {
		var _this = this;
		this.el = el;
		this.btn = btn;
		this.positionTop = top ? top : this.positionTop;
		this.bind();
		return {
			show: function(callb) {
				_this.act(true);
				if (typeof callb === 'function') {
					callb();
				};
			},
			hide: function() {
				_this.act(false, jQuery(_this.el).find(_this.closeBtn));
				if (typeof callb === 'function') {
					callb();
				};
			},
		};
	},
	bind: function() {
		var _this = this;
		jQuery(this.btn).off().on({
			'click': function() {
				_this.act(true);
				return false;
			},
		});
		jQuery(this.closeBtn).on({
			'click': function() {
				_this.act(false, jQuery(this));
				return false;
			},
		});
	},
	act: function(bool, $this) {
		var _this = this;
		if (bool) {
			jQuery('body').addClass('pcScrollOff');
			jQuery(this.el).find(this.glDimm).show().stop().animate({
				'opacity': 1
			}, _this.animateCallback());
			jQuery(this.el).find(this.elInnerCont).show().stop().animate({
				'opacity': 1,
				'top': _this.align() + _this.positionTop
			}, _this.animateCallback());
		} else {
			jQuery('body').removeClass('pcScrollOff');
			$this.closest(this.el).find(this.glDimm).stop().animate({
				'opacity': 0
			}, _this.animateCallback({
				'complete': function() {
					jQuery(this).hide();
				}
			}));
			$this.closest(this.el).find(this.elInnerCont).stop().animate({
				'opacity': 0,
				'top': 0
			}, _this.animateCallback({
				'complete': function() {
					jQuery(this).hide();
				}
			}));
		}
	},
	align: function() {
		return 0; //jQuery(document).height() - (jQuery(document).height() - jQuery(window).scrollTop());
	},
	callb: function() {},
	animateCallback: function(obj) {
		return jQuery.extend(true, {
			'duration': 500,
			'easing': 'easeInOutExpo',
			complete: function() {}
		}, obj);
	},
};

var cmmImgAlignClip = {
	img: '',
	imgArry: [],
	clipArry: [],
	init: function(obj) {
		var _this = this;
		this.obj = obj;
		jQuery(window).smartresize(function() {
			_this.set();
		});
		this.set();
	},
	set: function() {
		var _this = this;
		_this.imgArry = [];
		jQuery(this.obj.img).each(function() {
			_this.imgArry.push(jQuery(this).height());
		});
		this.clipValue();
		if (this.obj.ratioOn) {
			this.ratioGetHeight();
		} else {
			this.getHeight();
		}
	},
	ratioGetHeight: function() {
		var _this = this;
		var $thisParent = null;
		var ratio = 0;

		this.obj.break.forEach(function(i) {
			if (jQuery(window).width() <= i.maxwidth) {
				ratio = (i.ratio[1] / i.ratio[0]);
			}
		});
		jQuery(_this.obj.img).each(function(idx) {
			$thisParent = _this.obj.parent ? jQuery(this).closest(_this.obj.parent) : jQuery(this).parent();
			$thisParent.css({
				'height': jQuery(this).width() * ratio,
				'overflow': 'hidden'
			});
			if (jQuery(this).height() > $thisParent.height()) {
				jQuery(this).css({
					'margin-top': -(jQuery(this).height() - $thisParent.height()) / 2,
				});
			} else {
				jQuery(this).css({
					'margin-top': 0,
					// 'height' : $thisParent.height() + 1
				});
			}
		});
	},
	getHeight: function() {
		var _this = this;
		var $thisParent = null;
		jQuery(this.obj.img).each(function(idx) {
			$thisParent = _this.obj.parent ? jQuery(this).closest(_this.obj.parent) : jQuery(this).parent();
			$thisParent.css({
				'height': _this.minHeight(_this.imgArry),
				'overflow': 'hidden',
			});
			jQuery(this).css({
				'margin-top': -(_this.clipArry[idx] / 2)
			});
		});

	},
	clipValue: function() {
		var _this = this;
		var min = this.minHeight(this.imgArry);
		_this.clipArry = [];
		this.imgArry.forEach(function(i) {
			if (i >= min) {
				_this.clipArry.push(i - min);
			}
		});
	},
	minHeight: function(arry) {
		return Math.min.apply(null, arry);
	},
};
var cmmWinOpenFun = {
	init: function($this, opt, callb) {
		this.btn = $this;
		this.opt = $.extend(false, {
			url: '',
			_blankNm: '팝업',
			width: 900,
			height: 500,
			left: 0,
			top: 0,
			scrollbars: true,
			toolbar: false,
			resizable: true,
			status: true,
			menubar: false,
			locations: true,
			fullscreen: false,
		}, opt);
		this.callb = callb;
		this.bind();
	},
	bind: function() {
		var _this = this;
		this.btn.off().on({
			'click': function(e) {
				e.preventDefault();
				_this.act();
				if (typeof _this.callb === 'function') {
					_this.callb();
				}
			},
		});
	},
	act: function() {
		var optset = {
			scrollbars: this.opt.scrollbars ? 'yes' : 'no',
			toolbar: this.opt.toolbar ? 'yes' : 'no',
			resizable: this.opt.resizable ? 'yes' : 'no',
			status: this.opt.status ? 'yes' : 'no',
			menubar: this.opt.menubar ? 'yes' : 'no',
			locations: this.opt.locations ? 'yes' : 'no',
			fullscreen: this.opt.fullscreen ? 'fullscreen' : '',
		};
		window.open(this.opt.url, this.opt._blankNm, 'scrollbars=' + optset.scrollbars + ',toolbar=' + optset.toolbar + ',location=' + optset.locations + ',resizable=' + optset.resizable + ',status=' + optset.status + ',menubar=' + optset.menubar + ',resizable=' + optset.resizable + ',width=' + this.opt.width + ',height=' + this.opt.height + ',left=' + this.opt.left + ',top=' + this.opt.top + ',' + this.opt.fullscreen + '');
	},
};
jQuery(document).ready(function() {
	cmmAlertFun();
	$('.dataEditSlide').each(function() {
		var $data = $(this).data('params');
		$(this).uiSwiper({
			slideObj: $data,
			uiBtnsApp: {
				uiShortDot: true,
			}
		});
	});
	 /* 20171214 추가 : S */
	;(function(){
		var $params = $(window).getParams('page_id');
		var txt1 = '중등학교 예비교원의 창의·인성 교육에 대한 전문성 함양 및 학생 본인의 창의·인성 함양을 목적으로 교육과정을 개발하였습니다.';
		var txt2 = '사범대학이 운영하는 교직과목과 전공과목을 대상으로 하여 교과지식, 창의성 교육요소, 인성 교육요소를 기반으로, 인지역량, 실행 역량, 리더 역량을 함양할 수 있는 교육과정을 개발하였습니다.';
		if($params == '424573'){
			$('.bu-sq>li>ul>li').each(function(idx){
				var $this = $(this);
				var $thisTxt = $this.text();
				if($thisTxt == txt1){
					var rep = $thisTxt.replace('중등학교' , '');
					$this.text(rep);
				}else if($thisTxt == txt2){
					var rep = $thisTxt.replace('사범대학' , '교원양성대학');
					$this.text(rep);
				}
			});
		}
	})();
	/* 20171214 추가 : E */
});

function cmmAlertFun() {
	$('.cmmAlertFun').click(function() {
		var $this = $(this);
		var $thisMsg = $this.data('msg');
		alert($thisMsg);
	});
}