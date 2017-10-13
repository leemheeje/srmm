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
    paramName: ['page_id', 'crfile_cat', 'resourcecat', 'programcat', 'crmodelcat', 'ebook_cat', 'eventcat', 'issuecat'],
    ifParamName: ['term_slug'],
    locSearch: location.search,
    crrtParamName: null,
    crrtParamValue: null,
    crrtTargetHref: null,
    init: function() {
        var _this = this;
        this.targEl = this.dept02 + ' ' + this.blGround;
        this.crrtMemuFun();
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
        if(!this.crrtParamValue) {
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
        if(jQuery(window).getParams(name)) {
            var page_id = jQuery(window).getParams('page_id');
            this.crrtParamName = name;
            this.crrtParamValue = jQuery(window).getParams(name);
            var str;
            if(page_id == 424070) { //이달의 추천큐레이션 부분
                this.issuCalMenuFun(false);
            }
            if(!page_id) {
                str = decodeURI(this.crrtParamValue);
                this.crrtParamValue = str;
                if(name == 'issuecat') { //이슈캘린더 부분
                    this.issuCalMenuFun(true);
                }
            }
            this.crrtTargetHref = bool ? '/?' + this.crrtParamName + '=' + this.crrtParamValue : this.crrtParamValue;
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
            target: _this.issuCalGlBool ? '#sub_listing_categories' : '.wpb_row',
            appendLst: '.issCalTabs',
            html: '',
            tit: '이슈캘린더',
            month: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        };
        this.issuCalTabsHtml();
        $(this.issuCalTab.target).before(this.issuCalTab.html);
        if(!_this.issuCalGlBool) {
            $(this.issuCalTab.appendLst).css('margin-bottom', 36);
        }
    },
    issuCalTabsHtml: function() {
        var _this = this;
        var paramsValue = _this.issuCalGlBool ? 'issuecat' : 'm';
        var paramsAttr = null;
        var params = decodeURI(jQuery(window).getParams(paramsValue));
        _this.issuCalTab.html += '<ul class="cmm_tabs iss_cal_tabs ' + _this.clsFormat(_this.issuCalTab.appendLst) + '">';
        this.issuCalTab.month.forEach(function(str, idx) {
            if(!_this.issuCalGlBool) {
                str = str.replace('월', '');
                paramsAttr = 'page_id=424070&n=1&m';
            }else{
                paramsAttr = 'issuecat';
            }
            if(str == params) {
                _this.issuCalTab.html += '<li class="tp tp' + idx + ' active">';
            } else {
                _this.issuCalTab.html += '<li class="tp tp' + idx + '">';
            }
            _this.issuCalTab.html += '<a href="/?'+paramsAttr+'=' + str + '" class="txt">' + _this.issuCalTab.month[idx] + '</a>';
            _this.issuCalTab.html += '</li>';
        });
        _this.issuCalTab.html += '</ul>';
        if(_this.issuCalGlBool) {
            this.issuCalTitGet();
        }
    },
    issuCalTitGet: function() {
        var beforeMn = '.loop-title';
        var beforeMnName = jQuery(beforeMn).text();
        jQuery(beforeMn).text(this.issuCalTab.tit+'('+beforeMnName+')');
        //this.issuCalTab.html += '<div class="iss_tit">' + this.issuCalTab.tit + '</div>';
    },
    crrtMemuActive: function(bool) {
        var _this = this;
        var targetMenu = [this.el, this.mmGnbDepthLst01];

        targetMenu.forEach(function(target) {
            jQuery(target).find('li .txt').each(function() {
                var $this = $(this);
                var $thisHref = null;
                switch(_this.crrtParamValue) {
                    case '424573': //창의교육 > 창의교육선도 교원양성대학
                    case '447628': //창의교육 > 창의교육 거점센터 
                        var params = jQuery(window).getParams('m');
                        $thisHref = params ? $this.attr('href').indexOf(_this.crrtTargetHref + '&m=' + params) != -1 : $this.attr('href').indexOf(_this.crrtTargetHref) != -1;
                        break;
                    case '126176': //창의교육 > 창의교육 백문백답
                        var params = jQuery(window).getParams('C');
                        $thisHref = params ? $this.attr('href').indexOf(_this.crrtTargetHref) != -1 && $this.attr('href').indexOf('&C=' + params) != -1 : $this.attr('href').indexOf(_this.crrtTargetHref) != -1;
                        break;
                    case '%EA%B3%84%EA%B8%B0%EA%B5%90%EC%9C%A1-%EC%88%98%EC%97%85%EB%AA%A8%EB%8D%B8':
                    case '%EC%98%81%EB%82%A8%EA%B6%8C-%EC%B0%BD%EC%9D%98%EC%B2%B4%ED%97%98-%EC%88%98%EC%97%85%EB%AA%A8%EB%8D%B8':
                    case '%EC%B0%BD%EC%9D%98%EC%9D%B8%EC%84%B1%EA%B5%90%EC%9C%A1-%EC%88%98%EC%97%85%EB%AA%A8%EB%8D%B8':
                    case '%EB%A9%80%ED%8B%B0%EB%AF%B8%EB%94%94%EC%96%B4-%EC%9E%90%EB%A3%8C%EC%8B%A4':
                        //창의적 체험활동
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
                        $thisHref = $this.attr('href').indexOf(_this.crrtParamValue.toLowerCase()) != -1 || $this.attr('href').indexOf(_this.crrtParamValue.toUpperCase()) != -1;
                        break;
                    default:
                        $thisHref = bool ? $this.attr('href').indexOf(_this.crrtTargetHref) != -1 : $this.attr('href').indexOf(_this.crrtTargetHref) != -1;
                }

                if($thisHref) {
                    jQuery(target).find('li').removeClass('active');
                    $this.closest('li').addClass('active');
                    $this.closest('li').parent().parent().addClass('active');
                    $this.closest('li').parent().parent().parent().parent().addClass('active');
                    $this.closest('li').parent().parent().parent().parent().parent().parent().addClass('active');
                }
            });
        });
    },
    mobileSch: function() {
        var _this = this;
        jQuery(window).smartresize(function() {
            /* 검색바 속성 초기화 */
            if($(this).width() > 980) {
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
        if(jQuery(this.schObj.btn).is('.active')) {
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
            if(jQuery(this).is(_this.dept02)) {
                jQuery(this).removeClass(_this.clsFormat(_this.dept02));
                jQuery(this).addClass(_this.clsFormat(_this.mmGnbDepthLst02));
            } else if(jQuery(this).is(_this.dept03)) {
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
                jQuery(this).closest('li').toggleClass('active');
                if(jQuery(this).closest('li').is('.inDp03')) {
                    return false;
                }
            },
        });
        if(this.locSearch == '') {
            jQuery(this.mmGnbDepthLst01).find('>li:eq(0)>.txt').click();
        }
    },
    mobileNavMove: function(bool) {
        var _this = this;
        if(bool) {
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
                if(bool) {
                    _this.show(true);
                    bool = false;
                } else {
                    _this.show(false);
                    bool = true;
                }
            },
        });
        jQuery(this.gnbAllClsBtn).off().on({
            'click': function() {
                _this.show(false);
            },
        });
        jQuery(this.blGround).off().on({
            'mouseenter': function() {
                _this.show(true);
            },
        });
        jQuery(this.el).off().on({
            'mouseenter': function() {
                _this.show(true);
            },
            'mouseleave': function() {
                // _this.show(false);
            },
        });
        jQuery('.nm_container').off().on({
            'mouseenter': function() {
                _this.show(false);
            }
        });
    },
    show: function(bool, obj) {
        var _this = this;
        if(bool) {
            jQuery(this.el).find(this.dept02).stop().animate({
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
            }, _this.animateCallback(obj));
            jQuery(this.blGround).stop().animate({
                'height': 0,
            }, _this.animateCallback(obj));
        }
    },
    callb: function() {
        var _this = this;
        jQuery(this.dept03ToggBtn).off().on({
            'click': function() {
                if(!jQuery(this).closest('li').is('.active')) {
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
    init: function() {
        this.get().getHistoryAsideBtn();
        this.get().getPc();
        this.get().getMobile();
        this.dpActiveTxtFun();
        this.mobVirNameBox();
        this.bind();
    },
    classFormat: function(name) {
        return name.replace('.', '');
    },
    dpActiveTxtFun: function() {
        var _this = this;
        for(var i in _this.gnb) {
            jQuery(_this.gnb[i]).find(_this.findSet).each(function() {
                var $this = jQuery(this);
                if(jQuery(this).closest('li').is('.active')) {
                    _this.dpActiveTxt[i] = $this.text();
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
                var $thisTxt = $this.text();
                if($thisLi.is('.active')) {
                    jQuery(_this.pc.dp01).text($thisTxt);
                    var $thisDp02html = $thisLi.find(_this.gnb.dp02).html();
                    jQuery(_this.pc.dp02).html($thisDp02html);
                }
            });
        };
        var getMobile = function() {
            var $gnbHtml = jQuery(_this.gnb.dp01).html();
            jQuery(_this.mobile.lst).html($gnbHtml);
        };
        var getHistoryAsideBtn = function() {
            var tar = ['#templatic_text-31', '#templatic_text-11', '#templatic_text-14']; //,'[id^="directory_mile_range_widget"]'
            for(var i = 0; i < tar.length; i++) {
                if(jQuery(tar[i]).length) {
                    jQuery('.asideMenuDepth02').after(jQuery(tar[i]));
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
        if(!args.length) {
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
                if(!jQuery(this).closest('li').is('.inDp03')) {
                    return true;
                } else {
                    _this.show(true, jQuery(this));
                    return false;
                }
            },
        });
        jQuery(_this.vNames.dp01 + ',' + _this.vNames.dp02).off().on({
            'click': function() {
                event.preventDefault();
                if(event.target == jQuery(_this.vNames.dp01)[0]) {
                    if(!jQuery(_this.mobile.lst).is(':visible') || !jQuery(_this.mobile.lst).find(_this.findSet).is(':visible')) {
                        _this.show(false, jQuery(this));
                    } else {
                        _this.show(false, jQuery(this), 'close');
                    }
                } else {
                    if(!jQuery(_this.mobile.lst).find(_this.gnb.dp02).is(':visible')) {
                        _this.show(false, jQuery(this));
                    } else {
                        _this.show(false, jQuery(this), 'close');
                    }
                }
                return false;
            },
        });
        jQuery(_this.mobile.lst).find(_this.findSet).off().on({
            'click': function() {
                event.preventDefault();
                jQuery(_this.mobile.lst).find('>li').removeClass('active');
                jQuery(this).closest('li').addClass('active');
                _this.mobVirNameBox(jQuery(_this.vNames.dp01), jQuery(this).text());
                _this.show(false, jQuery(this), 'close');
                jQuery(_this.vNames.dp02).click().text(_this.callb().nameDp03Re());
                return false;
            },
        });
        jQuery(_this.mobile.lst).find(_this.gnb.dp02).find(_this.findSet).off().on({
            'click': function() {
                var $this = jQuery(this);
                var $thisLi = $this.closest('li');
                if($thisLi.is('.inDp03') && $thisLi.is('.active')) {
                    $thisLi.removeClass('active');
                    return false;
                }
                jQuery(_this.mobile.lst).find(_this.gnb.dp02).find(_this.findSet).closest('li').removeClass('active');
                $thisLi.addClass('active');
                jQuery(_this.vNames.dp02).text(jQuery(this).text());
                if($thisLi.is('.inDp03')) {
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
        if(dv) { // pc
            $target.closest('li').toggleClass('active');
        } else { // mob
            if(showhide === 'close') {
                jQuery(this.mobile.lst).hide();
                return;
            }
            jQuery(this.mobile.lst).show().find(this.findSet).each(function() {
                var $this = jQuery(this);
                var $thisLi = $this.closest('li');
                if($target[0].className.indexOf(_this.classFormat(_this.vNames.dp01)) != -1) { // mobile dp01
                    $this.show();
                    $thisLi.find(_this.gnb.dp02).hide();
                } else if($target[0].className.indexOf(_this.classFormat(_this.vNames.dp02)) != -1) { // mobile dp02
                    $this.hide();
                    $thisLi.find(_this.gnb.dp02).hide();
                    if($thisLi.is('.active')) {
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
            if(el.find('>li.active').length) {
                txt = el.find('>li.active>.txt').text();
            } else {
                txt = el.find('>li:eq(0)>.txt').text();
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
                if(typeof callb === 'function') {
                    callb();
                };
            },
            hide: function() {
                _this.act(false, jQuery(_this.el).find(_this.closeBtn));
                if(typeof callb === 'function') {
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
        jQuery(this.closeBtn).off().on({
            'click': function() {
                _this.act(false, jQuery(this));
                return false;
            },
        });
    },
    act: function(bool, $this) {
        var _this = this;
        if(bool) {
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
        if(this.obj.ratioOn) {
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
            if(jQuery(window).width() <= i.maxwidth) {
                ratio = (i.ratio[1] / i.ratio[0]);
            }
        });
        jQuery(_this.obj.img).each(function(idx) {
            $thisParent = _this.obj.parent ? jQuery(this).closest(_this.obj.parent) : jQuery(this).parent();
            $thisParent.css({
                'height': jQuery(this).width() * ratio,
                'overflow': 'hidden'
            });
            if(jQuery(this).height() > $thisParent.height()) {
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
            if(i >= min) {
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
            _blankNm: ' ',
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
            'click': function() {
                event.preventDefault();
                _this.act();
                if(typeof _this.callb === 'function') {
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