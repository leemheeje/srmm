if (location.host.indexOf(':8000') != -1) document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
/*
 * 제작자  : 싸이웍스 - 임희재프로
 * 버전    : v.05
 * 수정내용 : getParams 수정
 */
/*
 * smartresize 기반의 resize개념
 * https://gist.github.com/Pushplaybang/3341936
 */
(function($, sr) {
    var debounce = function(func, threshold, execAsap) {
        var timeout;
        return function debounced() {
            var obj = this,
                args = arguments;

            function delayed() {
                if (!execAsap) func.apply(obj, args);
                timeout = null;
            };
            if (timeout) clearTimeout(timeout);
            else if (execAsap) func.apply(obj, args);
            timeout = setTimeout(delayed, threshold || 150);
        };
    }
    jQuery.fn[sr] = function(fn) {
        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
    };
})(jQuery, 'smartresize');
/* Plugin */
;
(function($) {
    $.fn.extend({
        include: function(bool) {
            if (bool) {
                var include = [
                    ['header', {
                        target: '.nm_header',
                        url: './reRsrc/include/header.html',
                        get: 'on'
                    }],
                    ['footer', {
                        target: '.nm_footer',
                        url: './reRsrc/include/footer.html',
                        get: 'on'
                    }],
                    /*
                    ['asideNav', {
                        target: '.aside_area',
                        url: '/include/asideNav.html',
                        get: 'on'
                    }],
                        
                    ['toolbar', {
                        target: '.toolbar',
                        url: '/include/toolbar.html',
                        get: 'on'
                    }]*/
                ];
                var appendHtml = function(target) {
                    $getUrl.done(function(data) {
                        $(target).append(function() {
                            $(this).append(data);
                            $(this).customTags();
                        });
                    });
                }
                for (var i = 0; i < include.length; i++) {
                    if (include[i]) {
                        if (include[i][1].get == 'on') {
                            var $getUrl = $.get(include[i][1].url);
                            var target = include[i][1].target;
                            appendHtml(target);
                        }
                    }
                }
            }
        },
        multiEllip: function(opt) {
            var defaults = {
                len: 0,
                ellips: '...',
                space: false,
                initTxtAppend: true,
            };

            function MultiEllip($this) {
                this.el = $this;
                this.txt = '';
                this.initTxt = '';
                this.obj = $.extend(true, defaults, opt);
                this.init();
            };
            MultiEllip.prototype = {
                init: function() {
                    this.set();
                },
                set: function() {
                    var _this = this;
                    this.el.each(function() {
                        var $thistxt = $(this).text();
                        _this.initTxt = $thistxt;
                        if (_this.obj.initTxtAppend) {
                            _this.append();
                        }
                        _this.slc($thistxt);
                    });
                },
                append: function() {
                    this.el.after('<span class="mult_init_txt multInitTxt" style="display: none;">' + this.initTxt + '</span>');
                },
                slc: function(txt) {
                    var txt = txt.replace(/(^\s*)|(\s*$)/g, '');
                    var len = this.obj.space ? txt.replace(/ /gi, '').length : txt.length;
                    if (len > this.obj.len) {
                        this.txt = txt.slice(0, this.obj.len);
                        this.el.text(this.txt + this.obj.ellips);
                    }
                },
            };
            this.each(function() {
                $.data(this, new MultiEllip($(this), opt));
            });
            return this;
        },
        getParams: function(param, str, amp) {
            var url = location.search;
            if (url) {
                var arry = url.split(str ? str : '?');
                var amp = amp ? amp : '&';
                var result = null;
                var arryDp = arry[1].split(amp);
                arryDp.forEach(function(loc) {
                    var resArry = loc.split('=');
                    for (var i = 0; i < resArry.length; i++) {
                        if (resArry[0] == param) {
                            result = resArry[1];
                        }
                    }
                });
                return result;
            }
        },
        mapApiSortFun: function(obj) {
            var defaults = {
                LatReturn: null,
                LngReturn: null,
                level: 3,
                marker: {
                    src: '/common/images/sub/baseIco02.png',
                    size: [
                        70, 95
                    ],
                },
            };

            function DaumMapLoad($this) {
                var LatReturn = null;
                var LngReturn = null;
                var level = null;
                var map = null;
                this.el = $this;
                this.obj = $.extend(true, defaults, obj);
                this.init();
            };
            DaumMapLoad.prototype = {
                init: function() {
                    LatReturn = this.obj.LatReturn;
                    LngReturn = this.obj.LngReturn;
                    level = this.obj.level;
                    var mapContainer = this.el[0] ? this.el[0] : null;
                    var mapOption = {
                        center: new daum.maps.LatLng(LatReturn, LngReturn),
                        level: level
                    };
                    map = new daum.maps.Map(mapContainer, mapOption);
                    this.marker();
                    this.overlay();
                },
                marker: function() {
                    var imageSrc = this.obj.marker.src;
                    var imageSize = new daum.maps.Size(this.obj.marker.size[0], this.obj.marker.size[1]);
                    var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize);
                    var markerPosition = new daum.maps.LatLng(LatReturn, LngReturn);
                    var marker = new daum.maps.Marker({
                        position: markerPosition,
                        image: markerImage
                    });
                    marker.setMap(map);
                },
                overlay: function() {
                    var content = '';
                    var position = new daum.maps.LatLng(LatReturn, LngReturn);
                    var customOverlay = new daum.maps.CustomOverlay({
                        map: map,
                        position: position,
                        content: content,
                        yAnchor: 1
                    });
                },
            };
            this.each(function() {
                $.data(this, new DaumMapLoad($(this), obj));
            });
            return this;
        },
        numberEffect: function(obj) {
            var defaults = {
                mode: 'typing',
                speed: 1500
            };

            function NumberEffect($this) {
                this.el = $this;
                this.obj = $.extend(true, defaults, obj);
                this.init();
            };
            NumberEffect.prototype = {
                init: function() {
                    var _this = this;
                    _this.el.each(function() {
                        var $this = $(this);
                        var speed = 10;
                        var $thisTxt = Number($this.text());
                        $this.css({
                            'width': $this.width()
                        });
                        $this.text('');
                        $this.animate({
                            'num': $thisTxt
                        }, {
                            'duration': _this.obj.speed,
                            'step': function(t, o) {
                                var stepNum = Math.ceil(o.now);
                                $this.text(stepNum);
                            },
                            'complete': function() {
                                $this.css({
                                    'width': 'auto'
                                });
                            }
                        });
                    });
                },
            };
            this.each(function() {
                $.data(this, new NumberEffect($(this), obj));
            });
            return this;
        },
        cmmShowHideTabs: function(obj) {
            var defaults = {
                tabUl: '',
                tabDivs: '',
                tabAnimate: false,
                tabAnitype: '',
                tabhref: '.href',
                tabInSlide: false,
                callb: function() {},
            };

            function CmmShowHideTabs($this) {
                this.tabWrap = $this;
                this.obj = $.extend(true, defaults, obj);
                this.li = null;
                this.idx = null;
                this.init();
            };
            CmmShowHideTabs.prototype = {
                init: function() {
                    if (!this.tabWrap.is(this.obj.tabhref)) {
                        this.set();
                        this.bind();
                    } else {
                        this.tabHref();
                    }
                },
                set: function() {
                    if (this.obj.tabInSlide) {
                        $(this.tabWrap).find(this.obj.tabDivs + '>div,' + this.obj.tabDivs + '>ul').css({
                            'overflow': 'hidden',
                            'height': 0
                        });
                    } else {
                        $(this.tabWrap).find(this.obj.tabDivs + '>div,' + this.obj.tabDivs + '>ul').hide();
                    }
                },
                bind: function() {
                    var _this = this;
                    this.tabWrap.find(this.obj.tabUl + '>li').on({
                        'click': function(e) {
                            e.preventDefault();
                            _this.li = $(this);
                            _this.idx = $(this).index();
                            _this.show();
                            return false;
                        },
                    });
                    _this.tabWrap.find(_this.obj.tabUl + '>li:eq(0)').click();
                },
                show: function() {
                    this.tabWrap.find(this.obj.tabUl + '>li').removeClass('active');
                    this.li.addClass('active');
                    if (this.obj.tabInSlide) {
                        $(this.tabWrap).find(this.obj.tabDivs + '>div,' + this.obj.tabDivs + '>ul').css({
                            'overflow': 'hidden',
                            'height': 0
                        });
                        $(this.tabWrap).find(this.obj.tabDivs + '>div:eq(' + this.idx + ') ,' + this.obj.tabDivs + '>ul:eq(' + this.idx + ')').css({
                            'overflow': 'visible',
                            'height': 'auto'
                        });
                    } else {
                        $(this.tabWrap).find(this.obj.tabDivs + '>div,' + this.obj.tabDivs + '>ul').hide();
                        $(this.tabWrap).find(this.obj.tabDivs + '>div:eq(' + this.idx + ') ,' + this.obj.tabDivs + '>ul:eq(' + this.idx + ')').show();
                    }
                    if (typeof this.obj.callb === 'function') {
                        this.obj.callb(this.tabWrap, this.idx, this.li);
                    }
                },
                tabHref: function() {
                    var _this = this;
                    this.tabWrap.attr('data-coldiv');
                    this.tabWrap.find(this.obj.tabUl + '>li').each(function() {
                        if ($(this).is('.active')) {
                            var $color = $(this).find('.txt').attr('data-color');
                            _this.tabWrap.attr('data-coldiv', $color);
                        }
                    });
                },
            };
            this.each(function() {
                $.data(this, new CmmShowHideTabs($(this), obj));
            });
            return this;
        },
        rspGrid: function(obj) {
            var _settings = {
                setBox: {
                    items: '.item',
                    width: 230,
                    margin: null
                },
                animate: true,
                animateOfOptions: {
                    mode: 'flip', // flip,opacity
                    duration: 300,
                    ease: 'easeOutExpo',
                    queue: false,
                    complete: function() {},
                },
                animateAfterCallb: function() {},
            };

            function RspGrid(el, obj) {
                this.col = null;
                this.itemGroup = 'itemsGroup';
                this.opt = $.extend(true, _settings, obj);
                this.el = $(el);
                this.box = this.el.find(this.opt.setBox.items);
                this.init();
            };
            RspGrid.prototype = {
                init: function() {
                    var _this = this;
                    this.el.addClass('clearfix');
                    this.setItem();
                    this.renderItem();
                    $(window).smartresize(function() {
                        _this.resizeble();
                    });
                },
                setItem: function() {
                    var thisOtp = this.opt.setBox;
                    var w = Math.floor(this.el.width() / thisOtp.width);
                    var boxw = 100 / w;
                    this.col = w;
                    for (var i = 0; i < this.col; i++) {
                        var div = $('<div></div>').addClass(this.itemGroup).css({
                            'width': boxw + '%',
                            'float': 'left',
                            'box-sizing': 'border-box',
                            '-webkit-box-sizing': 'border-box',
                            '-moz-box-sizing': 'border-box',
                            '-ms-box-sizing': 'border-box',
                            '-o-box-sizing': 'border-box',
                        }).attr('itemGroup', i);
                        this.el.append(div);
                    }
                },
                renderItem: function(evt, resizeYN) {
                    var itemArry = [];
                    var _this = this;
                    var num = 0;
                    this.box.each(function(idx) {
                        num++;
                        var $this = $(this);
                        $this.css({
                            'padding': _this.opt.setBox.margin / 2
                        });
                        if (idx % _this.col == 0) {
                            num = 0;
                        }
                        $this.attr('itemGroupBox', num);
                        var $thisGroupNum = $this.attr('itemGroupBox');
                        $('.' + _this.itemGroup + '[itemgroup="' + $thisGroupNum + '"]').append($this);
                        if (resizeYN != 'N') _this.renderAnimate($this, idx);
                    });
                },
                renderAnimate: function($this, idx) {
                    var thisOpt = this.opt.animateOfOptions;
                    if (this.opt.animate) {
                        var funs = function() {};
                        if (!thisOpt.queue) {
                            var time = idx * 150;
                        } else {
                            var time = 0;
                        }
                        switch (thisOpt.mode) {
                            case 'flip':
                                $this.css({
                                    'display': 'none'
                                });
                                funs = function() {
                                    $this.slideDown({
                                        'duration': thisOpt.duration,
                                        'easing': thisOpt.ease,
                                        'complete': thisOpt.complete()
                                    });
                                }
                                break;
                            case 'opacity':
                                $this.css({
                                    'opacity': .1
                                });
                                funs = function() {
                                    $this.stop().animate({
                                        'opacity': 1
                                    }, {
                                        'duration': thisOpt.duration,
                                        'easing': thisOpt.ease,
                                        'complete': thisOpt.complete()
                                    });
                                }
                                break;
                            case 'pars':
                                break;
                        }
                        setTimeout(funs, time);
                    }
                    if (typeof this.opt.animateAfterCallb === 'function') {
                        this.opt.animateAfterCallb();
                    }
                },
                resizeble: function() {
                    this.el.find('>').remove();
                    this.setItem();
                    this.renderItem('', 'N');
                }
            };
            this.each(function() {
                $.data(this, new RspGrid($(this), obj));
            });
            return this;
        },
        uiSwiper: function(obj) {
            /*
             * slick.js 기반의 플러그인(http://kenwheeler.github.io/slick/) slick 옵션+커스텀옵션 추가, 제작자 : 임희재 버전 : v.01
             */
            var $this = $(this);
            var defaults = {
                /** slickJS 전용객체 */
                slideObj: {
                    draggable: false,
                },
                /** 페이징+버튼 */
                uiBtnsApp: {
                    target: 'contr',
                    uiDot: true,
                    uiShortDot: false,
                    uiPrev: null,
                    uiNext: null,
                    uiPause: null,
                    uiPlay: null,
                },
                /** dot관련 */
                dotThumb: false,
                dotTabs: false,
                dotTabsLst: '',
                uicallback: function() {},
                /** 슬라이드 콜백관련 */
                callb: function() {},
            };

            function CmmUiSwiper() {
                this.obj = $exObj;
                this.acallb = function(o) {
                    var cb = {
                        duration: 300,
                        ease: 'easeInExpo',
                        complete: function() {}
                    };
                    if (typeof o === 'object') {
                        var $exCb = $.extend(true, cb, o);
                        return $exCb;
                    }
                };
                this.init();
            };
            CmmUiSwiper.prototype = {
                init: function() {
                    this.slickSlide();
                },
                slickSlide: function() {
                    $this.slick($.extend(true, {}, this.obj.slideObj));
                    if (typeof this.obj.callb === 'function') {
                        $this.on({
                            'afterChange swipe edge': this.obj.callb
                        });
                    }
                    this.initButtons();
                },
                initButtons: function() {
                    if (typeof this.obj.uiBtnsApp !== 'object') {
                        $this.find('.slick-prev').show();
                        $this.find('.slick-next').show();
                        return;
                    }
                    $this.find('.slick-prev').hide();
                    $this.find('.slick-next').hide();
                    this.buttons();
                },
                buttons: function() {
                    var uiBtnsAppTarget = this.obj.uiBtnsApp.target;
                    var buttons = {
                        uiDot: this.obj.uiBtnsApp.uiDot ? $this.find('.slick-dots') : null,
                        uiPrev: this.obj.uiBtnsApp.uiPrev ? this.obj.uiBtnsApp.uiPrev : 'uiSlidePrev',
                        uiNext: this.obj.uiBtnsApp.uiNext ? this.obj.uiBtnsApp.uiNext : 'uiSlideNext',
                        uiPause: this.obj.uiBtnsApp.uiPause ? this.obj.uiBtnsApp.uiPause : 'uiSlidePause',
                        uiPlay: this.obj.uiBtnsApp.uiPlay ? this.obj.uiBtnsApp.uiPlay : 'uiSlidePlay',
                        uiShortDot: this.obj.uiBtnsApp.uiShortDot ? 'uiSlideShortDot' : null,
                    };
                    $this.parent().append('<div class="' + uiBtnsAppTarget + '"></div>');
                    var $uiBtnsAppTarget = $this.parent().find('.' + uiBtnsAppTarget);
                    for (var i in buttons) {
                        var buttonsVal = buttons[i];
                        var html = '';
                        switch (i) {
                            case 'uiPrev':
                                html = $('<a href="#" class="uislide_prev ' + buttonsVal + '" title="이전슬라이드"></a>');
                                break;
                            case 'uiNext':
                                html = $('<a href="#" class="uislide_next ' + buttonsVal + '" title="다음슬라이드"></a>');
                                break;
                            case 'uiPause':
                                if (this.obj.slideObj.autoplay) {
                                    html = $('<a href="#" class="uislide_pause ' + buttonsVal + '" title="슬라이드 일시정지"></a>');
                                }
                                break;
                            case 'uiPlay':
                                if (this.obj.slideObj.autoplay) {
                                    html = $('<a href="#" class="uislide_play ' + buttonsVal + '" title="슬라이드 재생"></a>');
                                }
                                break;
                            case 'uiShortDot':
                                if (this.obj.uiBtnsApp.uiShortDot) {
                                    html = $('<div class="uislide_shortdot ' + buttonsVal + '"></div>');
                                }
                                break;
                            default:
                                html = buttonsVal;
                        }
                        $uiBtnsAppTarget.append(html);
                    }
                    if (this.obj.slideObj.dots) {
                        if (this.obj.dotThumb) {
                            this.dotThumb(buttons);
                        } else if (this.obj.dotTabs && this.obj.dotTabsLst) {
                            var _this = this;
                            this.dotTabs();
                            $this.on({
                                'afterChange swipe edge': function() {
                                    _this.dotTabs();
                                }
                            });
                        }
                    }
                    if (this.obj.uiBtnsApp.uiShortDot) {
                        var _this = this;
                        this.dotShort(buttons);
                        $this.on({
                            'afterChange swipe edge': function() {
                                _this.dotShort(buttons);
                            }
                        });
                    }
                    this.buttonsEvent(buttons);
                },
                dotThumb: function(buttons) {
                    var imgSrc = null;
                    buttons.uiDot.find('>li').each(function() {
                        var $thisIdx = $(this).index();
                        var imgSrc = '';
                        $this.find('.slick-slide').each(function() {
                            if ($(this).data('slick-index') == $thisIdx) {
                                imgSrc = $(this).find('img').attr('src');
                            }
                        });
                        $(this).find('button').html('<img src="' + imgSrc + '" alt="슬라이드이미지 썸네일" class="uislide_dotimg" />');
                    });
                },
                dotShort: function(buttons) {
                    var $dots = $this.parent().find('.slick-dots li');
                    var $activeDot = null;
                    var allTxt = $dots.length;
                    $dots.each(function() {
                        if ($(this).is('.slick-active')) {
                            $activeDot = $(this).index() + 1;
                        }
                    });
                    if (!$activeDot) $activeDot = 0;
                    $this.parent().find('.' + buttons.uiShortDot).text($activeDot + '/' + allTxt);
                },
                dotTabs: function() {
                    var _this = this;
                    var $ul = $(this.obj.dotTabsLst);
                    var $li = $ul.find('li');
                    var $dots = $this.parent().find('.slick-dots');
                    var $activeDot = null;
                    $dots.find('li').each(function() {
                        if ($(this).is('.slick-active')) {
                            $activeDot = $(this).index();
                        }
                    });
                    $li.removeClass('active');
                    $ul.find('li:eq(' + $activeDot + ')').addClass('active');
                    $li.off().on({
                        'mouseenter click': function() {
                            var $thisIdx = $(this).closest('li').index();
                            $li.removeClass('active');
                            $dots.find('li:eq(' + $thisIdx + ')').click();
                            return false;
                        },
                    });
                },
                buttonsEvent: function(buttons) {
                    //$this.parent().find('.' + buttons.uiPause).css('opacity', 1);
                    $this.parent().find('.' + buttons.uiPlay).css('opacity', .5);
                    $this.parent().find('.' + buttons.uiPrev).on({
                        'click': function() {
                            $this.find('.slick-prev').click();
                            return false;
                        }
                    });
                    $this.parent().find('.' + buttons.uiNext).on({
                        'click': function() {
                            $this.find('.slick-next').click();
                            return false;
                        }
                    });
                    $this.parent().find('.' + buttons.uiPause).on({
                        'click': function() {
                            $this.slick('slickPause');
                            $(this).css('opacity', .5);
                            $this.parent().find('.' + buttons.uiPlay).css('opacity', 1);
                            return false;
                        }
                    });
                    $this.parent().find('.' + buttons.uiPlay).on({
                        'click': function() {
                            $this.slick('slickPlay');
                            $(this).css('opacity', .5);
                            $this.parent().find('.' + buttons.uiPause).css('opacity', 1);
                            return false;
                        }
                    });
                    if (typeof this.obj.uicallback === 'function') {
                        this.obj.uicallback();
                    }
                },
            };
            var $exObj = $.extend(true, defaults, obj);
            this.each(function() {
                $.data(this, new CmmUiSwiper($exObj));
            });
            return $this;
        },
        musMoveEffect: function(obj) {
            var $this = $(this);
            var opt = $.extend(true, {
                dots: {
                    leng: 40,
                    maxw: 80,
                    minw: 10,
                    type: 'circle',
                    color: ['#fac863', '#c594c5', '#6699cc', '#ec5f67', '#5fb3b3'],
                    group: null,
                    css: {}
                },
                pos: {
                    left: null,
                    top: null,
                },
                move: {
                    dir: 'h', // v , h , vh
                    easing: null,
                    maxRange: 30,
                    distance: 50,
                    delay: 3000,
                    rever: false,
                },
            }, obj);

            function MusMoveEvt(el) {
                this.target = el;
                this.init();
            };
            MusMoveEvt.prototype = {
                init: function() {
                    this.dotDraw();
                    this.bind();
                },
                dotDraw: function() {
                    var $thisTarget = $(this.target);
                    var dots = opt.dots;
                    var pos = this.pos;
                    var dotsType = dots.type == 'circle' ? '50%' : '';
                    $thisTarget.css({
                        'overflow': 'hidden'
                    });
                    for (var i = 1; i <= dots.leng; i++) {
                        var _this = this;
                        var random = Math.random();
                        var ran = Math.floor(random * (dots.maxw - dots.minw + 1)) + dots.minw;
                        var bg = Math.floor(random * ((dots.color.length - 1) - 0 + 1)) + 0;
                        var bg = dots.color[bg];
                        var dotsSize = ran;
                        var pos = function() {
                            var random = Math.random();
                            var left = $(_this.target).width() * random;
                            var top = $(_this.target).height() * random;
                            return {
                                left: left,
                                top: top
                            };
                        };
                        var html = '';
                        html = '<span style="display: inline-block; width: ' + dotsSize + 'px; height: ' + dotsSize + 'px;  border-radius: ' + dotsType + ';  background: ' + bg + ';position: absolute; left: ' + pos().left + 'px; top: ' + pos().top + 'px; opacity: .05; transform: scale(0);"></span>';
                        $thisTarget.append(html);
                        var o = i - 1;
                        $thisTarget.find('span:eq(' + o + ')').animate({
                            'transform': 'scale(1)'
                        }, {
                            'duration': 700,
                            'easing': 'easeInExpo'
                        });
                    }
                    if (typeof dots.css === 'object') {
                        $thisTarget.find('span').css(dots.css);
                    }
                },
                bind: function() {
                    var $thisTarget = $(this.target);
                    var _this = this;
                    var moveObj = opt.move;
                    var lastPos = {
                        x: null,
                        y: null
                    };
                    var leftArry = [];
                    var topArry = [];
                    $thisTarget.find('span').each(function() {
                        var $thisLeft = Number($(this).css('left').replace('px', ''));
                        var $thisTop = Number($(this).css('top').replace('px', ''));
                        leftArry.push($thisLeft);
                        topArry.push($thisTop);
                    });
                    $thisTarget.on({
                        'mousemove': function(e) {
                            if (true) {
                                if (!moveObj.rever) {
                                    var distance = {
                                        x: event.pageX > lastPos.x ? moveObj.distance : -moveObj.distance,
                                        y: event.pageY > lastPos.y ? moveObj.distance : -moveObj.distance,
                                    };
                                } else {
                                    var distance = {
                                        x: event.pageX < lastPos.x ? moveObj.distance : -moveObj.distance,
                                        y: event.pageY < lastPos.y ? moveObj.distance : -moveObj.distance,
                                    };
                                }
                                lastPos = {
                                    x: event.pageX,
                                    y: event.pageY
                                };
                                for (var i = 0; i < leftArry.length; i++) {
                                    if (moveObj.dir == 'h') {
                                        var aa = leftArry.length / 2;
                                        if (i <= aa) {
                                            $(this).find('span:eq(' + i + ')').stop().animate({
                                                'left': leftArry[i] + distance.x,
                                            }, {
                                                'duration': moveObj.delay,
                                                'easing': 'easeOutExpo'
                                            });
                                        } else {
                                            $(this).find('span:eq(' + i + ')').stop().animate({
                                                'left': leftArry[i] + ((distance.x + 30) * -1),
                                            }, {
                                                'duration': (moveObj.delay * 2),
                                                'easing': 'easeOutExpo'
                                            });
                                        }
                                    } else if (moveObj.dir == 'v') {
                                        $(this).find('span:eq(' + i + ')').stop().animate({
                                            'top': topArry[i] + distance.y
                                        }, {
                                            'duration': moveObj.delay,
                                            'easing': 'easeInExpo'
                                        });
                                    } else if (moveObj.dir == 'vh') {
                                        $(this).find('span:eq(' + i + ')').stop().animate({
                                            'left': leftArry[i] + distance.x,
                                            'top': topArry[i] + distance.y
                                        }, {
                                            'duration': moveObj.delay,
                                            'easing': 'easeInExpo'
                                        });
                                    }
                                }
                            }
                        },
                        'mouseleave': function() {
                            for (var i = 0; i < leftArry.length; i++) {
                                $(this).find('span:eq(' + i + ')').stop().animate({
                                    'left': leftArry[i],
                                    'top': topArry[i]
                                }, {
                                    'duration': moveObj.delay,
                                    'easing': 'easeInExpo'
                                });
                            }
                        }
                    });
                },
            };
            this.each(function() {
                $.data(this, new MusMoveEvt(this));
            });
            return $this;
        },
        cmmCalendal: function(obj) {
            var defaults = {
                format: {
                    day: {
                        sun: '일',
                        mon: '월',
                        tue: '화',
                        wed: '수',
                        thu: '목',
                        fri: '굼',
                        sat: '토'
                    },
                    month: [
                        [
                            1, 'January'
                        ],
                        [
                            2, 'February'
                        ],
                        [
                            3, 'March'
                        ],
                        [
                            4, 'April'
                        ],
                        [
                            5, 'May'
                        ],
                        [
                            6, 'June'
                        ],
                        [
                            7, 'July'
                        ],
                        [
                            8, 'August'
                        ],
                        [
                            9, 'September'
                        ],
                        [
                            10, 'October'
                        ],
                        [
                            11, 'November'
                        ],
                        [
                            12, 'December'
                        ]
                    ]
                },
                sch: {
                    schMax: 4,
                    schItem: []
                }
            };

            function CmmCalendal(el, obj) {
                var _this = this;
                var date = new Date();
                this.y = date.getFullYear();
                this.m = date.getMonth();
                this.d = date.getDate();
                this.theDate = new Date(this.y, this.m, 1);
                this.theDay = this.theDate.getDay();
                this.el = $(el);
                this.opt = $.extend(true, defaults, obj);
                this.initPasing();
                this.initSch();
                this.schParsing();
                $(window).smartresize(function() {
                    _this.resize();
                });
            }
            CmmCalendal.prototype = {
                initPasing: function() {
                    var last = [
                        31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
                    ];
                    if (this.y % 4 && this.y % 100 != 0 || this.y % 400 === 0) {
                        lastDate = last[1] = 29;
                    }
                    var lastDate = last[this.m];
                    var row = Math.ceil((this.theDay + lastDate) / 7);
                    this.el.html("<div class='cal_top'><div class=''><a href='#' class='btns_cal cal_prev'>&lt;</a><a href='#' class='btns_cal cal_next'>&gt;</a></div><span class='cal_year'>" + this.y + "</span><span class='cal_month'>" + (this.m + 1) + "</span></div>");
                    var calendar = '';
                    var commColgroup = [
                        7, '14.285%'
                    ];
                    calendar += "<div class='calTableGroup'>";
                    calendar += "<div class='calTheadGroup'>";
                    calendar += "<table class='calendar_table'>";
                    calendar += "<colgroup>";
                    for (var i = 0; i < commColgroup[0]; i++) {
                        calendar += "<col width='" + commColgroup[1] + "'/>";
                    }
                    calendar += "</colgroup>";
                    calendar += "<thead>";
                    calendar += "<tr>";
                    calendar += "<th class='SUN'>" + this.opt.format.day.sun + "</th>";
                    calendar += "<th>" + this.opt.format.day.mon + "</th>";
                    calendar += "<th>" + this.opt.format.day.tue + "</th>";
                    calendar += "<th>" + this.opt.format.day.wed + "</th>";
                    calendar += "<th>" + this.opt.format.day.thu + "</th>";
                    calendar += "<th>" + this.opt.format.day.fri + "</th>";
                    calendar += "<th class='SAT'>" + this.opt.format.day.sat + "</th>";
                    calendar += "</tr>";
                    calendar += "</thead>";
                    calendar += "</table>";
                    calendar += "</div>"; // calTheadGroup
                    var dNum = 1;
                    for (var i = 1; i <= row; i++) {
                        calendar += "<div class='calTbodyGroup'>";
                        calendar += "<table class='calendar_table'>";
                        calendar += "<colgroup>";
                        for (var o = 0; o < commColgroup[0]; o++) {
                            calendar += "<col width='" + commColgroup[1] + "'/>";
                        }
                        calendar += "</colgroup>";
                        calendar += "<tbody>";
                        calendar += "<tr>";
                        for (var k = 1; k <= 7; k++) {
                            if (i === 1 && k <= this.theDay || dNum > lastDate) {
                                calendar += "<td> &nbsp; </td>";
                            } else {
                                calendar += "<td>" + dNum + "</td>";
                                dNum++;
                            }
                        }
                        calendar += "</tr>";
                        calendar += "</tbody>";
                        calendar += "</table>";
                        calendar += "</div>"; // calTbodyGroup
                    }
                    calendar += "</div>"; // calTableGroup
                    this.el.append(calendar);
                    $('.calendar_table tr').each(function() {
                        $(this).find('td:first').addClass('SUN');
                        $(this).find('td:last').addClass('SAT');
                    });
                },
                initSch: function() {
                    var html = '';
                    var _this = this;
                    var $calTbodyGroup = $('.calTbodyGroup');
                    var $calTbl = $('.cal_tbl');
                    html += '<div class="scVirTableGroup">';
                    html += '<table>';
                    html += '<colgroup><col width="14.285%"><col width="14.285%"><col width="14.285%"><col width="14.285%"><col width="14.285%"><col width="14.285%"><col width="14.285%"></colgroup>';
                    html += '<tbody>';
                    html += '<tr>';
                    for (var i = 0; i < 7; i++) {
                        html += '<td>&nbsp;</td>';
                    }
                    html += '</tr>';
                    html += '</tbody>';
                    html += '</table>';
                    html += '</div>';
                    for (var i = 0; i < this.opt.sch.schItem.length; i++) {
                        var time = '<td class="txt_left"><b>' + this.opt.sch.schItem[i][5] + '</b></td>';
                        var suj = '<td class="txt_left">' + this.opt.sch.schItem[i][2] + '</td>';
                        var suj2 = '<td class="txt_left">' + this.opt.sch.schItem[i][4] + '</td>';
                        $calTbl.find('tbody').append('<tr>' + time + suj + suj2 + '</tr>');
                    }
                    $calTbodyGroup.each(function() {
                        for (var i = 0; i < _this.opt.sch.schMax; i++) {
                            $(this).append(html);
                        }
                    });
                },
                schParsing: function() {
                    var _this = this;
                    var $tbl = $('.calTbodyGroup .calendar_table');
                    for (var i = 0; i < this.opt.sch.schItem.length; i++) {
                        $tbl.find('td').each(function() {
                            var $thisIdx = $(this).index();
                            var $thisTxt = $(this).text();
                            var $thisParent = $(this).closest('.calTbodyGroup');
                            if ($thisTxt == _this.opt.sch.schItem[i][1]) {
                                if (_this.opt.sch.schItem[i][0] != 1) {
                                    for (var o = 1; o < _this.opt.sch.schItem[i][0]; o++) {
                                        $thisParent.find('.scVirTableGroup td:eq(' + $thisIdx + ')').next().remove();
                                    }
                                }
                                var $spanW = 200;
                                $thisParent.find('.scVirTableGroup td:eq(' + $thisIdx + ')').attr('colspan', _this.opt.sch.schItem[i][0]).append('<span class="' + _this.opt.sch.schItem[i][3] + '" style="width:' + ($spanW * _this.opt.sch.schItem[i][0]) + 'px">' + (_this.opt.sch.schItem[i][5] + _this.opt.sch.schItem[i][2]) + '</span>');
                            }
                        });
                    }
                },
                resize: function() {
                    $('.calTbodyGroup').find('.scVirTableGroup td span').remove();
                    this.schParsing();
                }
            };
            this.each(function() {
                $.data(this, new CmmCalendal($(this), obj));
            });
            return this;
        },
        musMoveDragPraxx: function(obj) {
            // * 작업소스 예시
            // $('.list li').each(function () {
            //     var $this = $(this);
            //     var $thisImg = $this.find('img');
            //     var $thisSpan = $this.find('.asdf');
            //     $this.musMoveDragPraxx({
            //         motions: [
            //             [$thisImg, '1', '0', '0', '5', '5'],
            //         ],
            //         offset: true,
            //     });
            // });
            // $('.item01').musMoveDragPraxx({
            //     motions: [
            //         ['.i01', '1', '3', '3', '5', '5'],
            //         ['.i02', '1', '6', '6', '5', '2'],
            //     ]
            // });
            var defaults = {
                centerMode: true,
                perspective: 1000,
                motions: [
                    //[클래스, 방향, x거리 , y거리 , x축, y축]
                ],
                callb: {
                    'duration': 0,
                    'easing': 'swing',
                    'complete': function() {}
                },
                offset: false
            };

            function MusMoveDragParxx($this) {
                var _this = this;
                this.el = $this;
                this.elw = $this.width();
                this.elh = $this.height();
                this.obj = $.extend(true, defaults, obj);
                this.callb = function(callbObj) {
                    var extd = $.extend(true, _this.obj.callb, callbObj);
                    return extd;
                };
                this.setOffsetX = this.obj.centerMode ? this.el.width() / 2 : 0;
                this.setOffsetY = this.obj.centerMode ? this.el.height() / 2 : 0;
                this.init();
            };
            MusMoveDragParxx.prototype = {
                init: function() {
                    this.bind();
                },
                bind: function() {
                    var _this = this;
                    this.el.off().on({
                        'mousemove': function(event) {
                            _this.dir(event);
                        },
                        'mouseleave': function(event) {
                            _this.moving('reset');
                        }
                    });
                },
                dir: function(event, offsetX) {
                    var crtOffsetX = this.obj.offset ? event.offsetX : event.clientX;
                    var crtOffsetY = this.obj.offset ? event.offsetY : event.clientY;
                    this.moving('', crtOffsetX, crtOffsetY);
                },
                moving: function(direction, crtOffsetX, crtOffsetY) {
                    var _this = this;
                    var motions = this.obj.motions;
                    var transform = null;
                    for (var i = 0; i < motions.length; i++) {
                        var distance = function() {
                            var x = (crtOffsetX - _this.setOffsetX) * (motions[i][2] * 0.01);
                            var y = (crtOffsetY - _this.setOffsetY) * (motions[i][3] * 0.01);
                            var rx = (crtOffsetX - _this.setOffsetX) * (motions[i][5] * 0.01);
                            var ry = -(crtOffsetY - _this.setOffsetY) * (motions[i][4] * 0.01);
                            return {
                                x: x,
                                y: y,
                                rx: rx,
                                ry: ry
                            };
                        };
                        if (direction == 'reset') {
                            transform = '';
                        } else {
                            transform = 'translateX(' + distance().x + 'px) translateY(' + distance().y + 'px) rotateX(' + distance().ry + 'deg) rotateY( ' + distance().rx + 'deg)';
                        }
                        $(motions[i][0]).parent().css('perspective', '1000px');
                        $(motions[i][0]).css({
                            'transition': 'translateX, translateY, rotateX, rotateY 0.3s',
                            'transform': transform
                        });
                    }
                },
            }
            this.each(function() {
                $.data(this, new MusMoveDragParxx($(this), obj));
            });
            return this;
        },
        fileTreeUpdown: function(obj) {
            var defaults = {
                list: {
                    left: '', //ul태그만
                    right: '', //ul태그만
                },
                btns: {
                    left: '',
                    right: '',
                },
                contrBtns: {
                    up: '',
                    down: '',
                    maxUp: '',
                    maxDown: '',
                },
                dupChk: false,
                callb: function() {}
            };

            function FileTreeUpdown($this) {
                this.el = $this;
                this.num = 0;
                this.idx = 0;
                this.arry = null;
                this.obj = $.extend(true, defaults, obj);
                this.init();
            };
            FileTreeUpdown.prototype = {
                init: function() {
                    this.set();
                    this.updown();
                    this.bind();
                },
                set: function() {},
                updown: function() {
                    var btns = this.obj.contrBtns;
                    var _this = this;
                    var $target = $(this.obj.list.left + ',' + this.obj.list.right).find('>li');
                    $target.off().on({
                        'click': function() {
                            if ($(this).is('.active')) {
                                $(this).removeClass('active');
                                return;
                            }
                            if (!_this.dupChk) {
                                $target.removeClass('active');
                            }
                            $(this).addClass('active');
                        },
                    });
                    this.el.find(btns.up).on({
                        'click': function() {
                            _this.updownMoving('up');
                            return false;
                        }
                    });
                    this.el.find(btns.down).on({
                        'click': function() {
                            _this.updownMoving('down');
                            return false;
                        }
                    });
                    this.el.find(btns.maxUp).on({
                        'click': function() {
                            _this.updownMoving('maxUp');
                            return false;
                        }
                    });
                    this.el.find(btns.maxDown).on({
                        'click': function() {
                            _this.updownMoving('maxDown');
                            return false;
                        }
                    });
                },
                updownMoving: function(type) {
                    var list = this.obj.list;
                    var _this = this;
                    var $this = null;
                    _this.arry = [];
                    this.el.find(this.obj.list.left + '>li').each(function() {
                        if ($(this).is('.active')) {
                            switch (type) {
                                case 'up':
                                    $(this).prev().before($(this));
                                    break;
                                case 'down':
                                    _this.arry.unshift([$(this), $(this).index()]);
                                    break;
                                case 'maxUp':
                                    $(_this.obj.list.left).prepend($(this));
                                    break;
                                case 'maxDown':
                                    $(_this.obj.list.left).append($(this));
                                    break;
                            }
                        }
                    });
                    if (type == 'down') {
                        for (var i = 0; i < this.arry.length; i++) {
                            this.el.find(this.obj.list.left + '>li:eq(' + (this.arry[i][1] + 1) + ')').after(this.arry[i][0]);
                        }
                    }
                },
                bind: function() {
                    var btns = this.obj.btns;
                    var _this = this;
                    this.el.find(btns.right + ',' + btns.left).on({
                        'click': function(e) {
                            _this.moving(e.target);
                            return false;
                        },
                    });
                },
                moving: function(btnType) {
                    var lst = this.obj.list;
                    if (btnType == $(this.obj.btns.right)[0]) {
                        $(lst.left).find('>li').each(function() {
                            if ($(this).is('.active')) {
                                $(lst.right).append($(this));
                            }
                        });
                    } else {
                        $(lst.right).find('>li').each(function() {
                            if ($(this).is('.active')) {
                                $(lst.left).append($(this));
                            }
                        });
                    }
                    if (typeof this.obj.callb === 'function') {
                        this.obj.callb();
                    }
                },
            };
            this.each(function() {
                $.data(this, new FileTreeUpdown($(this), obj));
            });
            return this;
        },
        customScrollBar: function(obj) {
            var defaults = {
                scrVal: {
                    num: 50,
                    callb: {
                        'duration': 300,
                        'easing': 'easeOutExpo',
                        'complete': function() {}
                    },
                },
                scrEl: {
                    bx: 'scr_wrap',
                    el: 'scr_bar',
                    btn: 'scr_btn',
                },
                drag: true,
            };

            function CustomScrollBar($this) {
                var _this = this;
                this.el = $this;
                this.scr = {
                    outw: $this.outerWidth(),
                    scrw: $this[0].clientWidth,
                    outh: $this.outerHeight(),
                    scrh: $this[0].scrollHeight,
                };
                this.scrClassName = {
                    wrap: 'scrWrap',
                    btn: 'scrBtn',
                    bar: 'scrBar',
                };
                this.html = '';
                this.obj = $.extend(true, defaults, obj);
                this.init();
            };
            CustomScrollBar.prototype = {
                init: function() {
                    if (this.scr.outw > this.scr.scrw) {
                        this.set();
                        this.bind();
                    }
                },
                set: function() {
                    var $this = this.el;
                    this.html = '<div class="' + this.obj.scrEl.el + ' ' + this.scrClassName.bar + '"><span class="' + this.obj.scrEl.btn + ' ' + this.scrClassName.btn + '"></span></div>';
                    var scrBtnHei = (this.scr.outh / this.scr.scrh) * 100;
                    if (!$this.closest('.' + this.scrClassName.wrap).length) {
                        $this.wrap('<div class="' + this.obj.scrEl.bx + ' ' + this.scrClassName.wrap + '" style="width:' + this.scr.outw + 'px; overflow: hidden;"></div>').css({
                            'margin-right': -(this.scr.outw - this.scr.scrw),
                            'padding-right': this.scr.outw - this.scr.scrw,
                        });
                        $this.closest('.' + this.scrClassName.wrap).append(this.html);
                    }
                    $this.closest('.' + this.scrClassName.wrap).find('.' + this.scrClassName.btn).css('height', scrBtnHei + '%');
                },
                bind: function() {
                    var _this = this;
                    var $this = this.el;
                    var $thisWrap = $this.closest('.' + this.scrClassName.wrap);
                    var $thisBar = $thisWrap.find('.' + this.scrClassName.bar);
                    var $thisBtn = $thisWrap.find('.' + this.scrClassName.btn);
                    var vScrVal = 0;
                    var scrBarHei = Math.round($thisBar.height() - $thisBtn.height());
                    var scrInnerHei = $this.find('>*').height() - $this.height();
                    $this.scroll(function(e) {
                        var $thisScrTop = $(this).scrollTop();
                        var $thisScr = (scrBarHei * $thisScrTop) / scrInnerHei;
                        $thisBtn.css('top', $thisScr);
                    });
                    $thisBtn.mousedown(function() {
                        $(window).scrollTop(0);
                    });
                    if (this.drag) {
                        $thisBtn.draggable({
                            scroll: false,
                            axis: "y",
                            containment: $thisBar[0],
                            drag: function() {
                                $top = Number($thisBtn.css('top').replace('px', ''));
                                vScrVal = Math.round((scrInnerHei * $top) / scrBarHei);
                                _this.el.scrollTop(vScrVal);
                            },
                        });
                    }

                },
                drag: function() {
                    var _this = this;
                },
            };
            this.each(function() {
                $.data(this, new CustomScrollBar($(this), obj));
            });
            return this;
        },
        swipListBtns: function(obj) {
            var defaults = {
                minDistance: 20,
                maxDistance: 30,
                animatecallb: {
                    'duration': 50,
                    'easing': 'easeOutExpo',
                }
            };

            function SwipListBtns($this) {
                this.el = $this;
                this.oriEvents = null;
                this.moveObj = {};
                this.obj = $.extend(true, defaults, obj);
                this.clientXArry = [];
                this.movedir = function(dirobj) {
                    if (dirobj) {
                        return $.extend(true, {
                            'start': null,
                            'end': null
                        }, dirobj);
                    }
                };
                this.initNum = 0;
                this.acallb = $.extend(true, {
                    'duration': 300,
                    'easing': 'easeOutExpo',
                    'complete': function() {}
                }, this.obj.animatecallb);
                this.init();
            };
            SwipListBtns.prototype = {
                init: function() {
                    this.bind();
                },
                bind: function() {
                    var _this = this;
                    var distanceStart = null;
                    var distanceEnd = null;
                    this.el.each(function() {
                        $(this).bind({
                            'touchstart': function(event) {
                                distanceStart = event.originalEvent.changedTouches[0].clientX;
                            },
                            // 'touchmove': function(event) {
                            // var offsetX = event.originalEvent.changedTouches[0].clientX;
                            // //if (offsetX > _this.obj.minDistance && offsetX < _this.obj.maxDistance) _this.cnt(offsetX);
                            // },
                            'touchend': function(event) {
                                distanceEnd = event.originalEvent.changedTouches[0].clientX;
                                // this.clientXArry = new Array();
                                _this.moveSet(distanceStart, distanceEnd);
                            },
                        });
                    });
                },
                moveSet: function(distanceStart, distanceEnd) {
                    var movedir = this.movedir({
                        'start': distanceStart,
                        'end': distanceEnd
                    });
                    if (Math.abs(movedir.start - movedir.end) > this.obj.minDistance) this.move(movedir);
                },
                move: function(movedir) {
                    if (movedir.start > movedir.end) { // 열기
                        this.el.stop().animate({
                            'transform': 'translateX(-' + this.obj.maxDistance + 'px)'
                        }, this.acallb);
                    } else { // 닫기
                        this.el.stop().animate({
                            'transform': 'translateX(0px)'
                        }, this.acallb);
                    }
                },
            };
            this.each(function() {
                $.data(this, new SwipListBtns($(this), obj));
            });
            return this;
        },
        rowGraph: function(obj) {
            /** 미병 */
            var defaults = {
                line: null,
                lineClassName: 'sline',
                value: null,
                responsive: true,
                animated: false,
            };

            function RowGraph($this) {
                var _this = this;
                this.el = $this;
                this.obj = $.extend(true, defaults, obj);
                this.w = function() {
                    return (this.obj.value.current / this.obj.value.max) * 100;
                };
                this.init();
                if (this.obj.responsive) {
                    $(window).smartresize(function() {
                        _this.resize();
                    });
                }
            };
            RowGraph.prototype = {
                init: function() {
                    this.settings();
                    this.move();
                },
                settings: function() {
                    if (this.obj.imgcut.stepimgs) {
                        for (var i = 1; i < this.obj.imgcut.stepimgs.length; i++) {
                            this.el.append($('<i></i>').addClass(this.obj.lineClassName + ' ' + this.obj.lineClassName + (i - 1)));
                        }
                    }
                },
                imgcuts: function() {
                    var imgcut = this.obj.imgcut;
                    var cnt = 0;
                    var num = 0;
                    while (!(this.w() - cnt <= (100 / imgcut.stepimgs.length))) {
                        cnt += 100 / imgcut.stepimgs.length;
                        num++;
                    }
                    $(imgcut.targetimg).addClass(imgcut.stepimgs[num][0]);
                    $(imgcut.targettxt).text(imgcut.stepimgs[num][1]);
                },
                move: function() {
                    var duration = this.obj.animated ? 1000 : 0;
                    $(this.obj.bar).stop().animate({
                        'width': this.w() + '%'
                    }, {
                        'duration': duration,
                        'easing': 'easeOutExpo'
                    });
                    this.imgcuts();
                },
                resize: function() {
                    // this.move();
                },
            };
            this.each(function() {
                $.data(this, new RowGraph($(this), obj));
            });
            return this;
        },
    });
})(jQuery);