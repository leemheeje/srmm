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
        blGroundPadBottom: 20, //디자인적 수치. 하단패딩추가
        dept02PadTop: 17,
    },
    init: function() {
        this.targEl = this.dept02 + ' ' + this.blGround;
        this.set();
        this.bind();
        this.callb();
        this.mobileSet();
        this.mobileSch();
    },
    mobileSch: function() {
        var _this = this;
        $(window).smartresize(function() {
            /* 검색바 속성 초기화 */
            $(_this.schObj.btn).removeClass('active');
            $(_this.schObj.el).removeAttr('style');
        });
        $(this.schObj.btn).off().on({
            'click': function() {
                $(this).toggleClass('active');
                _this.mobileSchMove();
            },
        });
        $(this.schObj.closeBtn).off().on({
            'click': function() {
                $(_this.schObj.btn).click();
            },
        });
    },
    mobileSchMove: function() {
        var _this = this;
        if ($(this.schObj.btn).is('.active')) {
            $(this.schObj.el).stop().animate({
                'height': 192,
                'padding-top': _this.schObj.paddingTopBottom,
                'padding-bottom': _this.schObj.paddingTopBottom,
            }, _this.animateCallback({
                'complete': function() {
                    $(this).addClass('active')
                }
            }));
        } else {
            $(this.schObj.el).removeClass('active').stop().animate({
                'height': 0,
                'padding-top': 0,
                'padding-bottom': 0,
            }, _this.animateCallback());
        }
    },
    clsFormat: function(str) {
        return str.replace('.', '');
    },
    mobileSet: function() {
        var _this = this;
        var nav = $(this.el).html();
        $(this.mmGnbDepthLst01).html(nav).find('ul').each(function() {
            if ($(this).is(_this.dept02)) {
                $(this).removeClass(_this.clsFormat(_this.dept02));
                $(this).addClass(_this.clsFormat(_this.mmGnbDepthLst02));
            } else if ($(this).is(_this.dept03)) {
                $(this).removeClass(_this.clsFormat(_this.dept03));
                $(this).addClass(_this.clsFormat(_this.mmGnbDepthLst03));
            }
        });
        /* 사이트맵 부분 어펜드 */
        var stInfAppend = (function() {
            var html = $('.stInfAppendEl .stInfAppendLst').clone();
            html.appendTo($('.stInfAppendTarget'));
            $('.stInfAppendTarget').parent().customTags();
        })();
        /* 사이트맵 부분 어펜드 */
        this.mobileBind();
        this.mobileDepthBind();
    },
    mobileBind: function() {
        var _this = this;
        $(this.mmMenuBtn).off().on({
            'click': function() {
                _this.mobileNavMove(true);
            },
        });
        $(this.mmGnbWrap).find(this.glDimm).off().on({
            'touchmove touchstart click': function() {
                _this.mobileNavMove(false);
            },
        });
    },
    mobileDepthBind: function() {
        var _this = this;
        $(this.mmGnbDepthLst01).find('>li>.txt').off().on({
            'click': function() {
                $(_this.mmGnbDepthLst01).find('>li').removeClass('active');
                $(this).closest('li').addClass('active');
            },
        });
        $(this.mmGnbDepthLst02).find('>li>.txt').off().on({
            'click': function() {
                $(this).closest('li').toggleClass('active');
                if ($(this).closest('li').is('.inDp03')) {
                    return false;
                }
            },
        });
        $(this.mmGnbDepthLst01).find('>li:eq(0)>.txt').click();
    },
    mobileNavMove: function(bool) {
        var _this = this;
        if (bool) {
            $(this.mmGnbWrap).show().find(this.mmGnbAreaInbx).stop().animate({
                'left': 0
            }, _this.animateCallback());
            $(this.mmGnbWrap).show().find(this.glDimm).show().stop().animate({
                'opacity': 1
            }, _this.animateCallback({
                'complete': function() {
                    $('body').addClass('scrollOff');
                }
            }));
        } else {
            $(this.mmGnbWrap).find(this.mmGnbAreaInbx).stop().animate({
                'left': '-100%'
            }, _this.animateCallback({
                'complete': function() {
                    $(_this.mmGnbWrap).hide();
                },
            }));
            $(this.mmGnbWrap).show().find(this.glDimm).stop().animate({
                'opacity': 0
            }, _this.animateCallback({
                'complete': function() {
                    $(this).hide();
                    $('body').removeClass('scrollOff');
                }
            }));
        }
    },
    set: function(otp) {
        return $.extend(true, this.cssVal, otp);
    },
    animateCallback: function(obj) {
        return $.extend(true, {
            duration: 700,
            easing: 'easeInOutExpo',
            complete: function() {},
        }, obj);
    },
    maxHeight: function() {
        var maxHeiArry = [];
        $(this.el).find(this.dept02).each(function() {
            var liHei = 0;
            $(this).find('>li').each(function() {
                liHei += $(this).outerHeight();
            });
            maxHeiArry.push(liHei);
        });
        return Math.max.apply(null, maxHeiArry) + this.set().dept02PadTop;
    },
    bind: function() {
        var _this = this;
        var bool = true;
        $(this.gnbAllToggBtn).off().on({
            'click': function() {
                if (bool) {
                    _this.show(true);
                    bool = false;
                } else {
                    _this.show(false);
                    bool = true;
                }
            },
        });
        $(this.gnbAllClsBtn).off().on({
            'click': function() {
                _this.show(false);
            },
        });
        $(this.blGround).off().on({
            'mouseenter': function() {
                _this.show(true);
            },
        });
        $(this.el).off().on({
            'mouseenter': function() {
                _this.show(true);
            },
            'mouseleave': function() {
                _this.show(false);
            },
        });
    },
    show: function(bool, obj) {
        var _this = this;
        if (bool) {
            $(this.el).find(this.dept02).stop().animate({
                'height': _this.maxHeight(),
                'padding-top': _this.set().dept02PadTop
            }, _this.animateCallback(obj));
            $(this.blGround).stop().animate({
                'height': _this.maxHeight() + _this.set().blGroundPadBottom,
            }, _this.animateCallback(obj));
        } else {
            $(this.el).find(this.dept02).stop().animate({
                'height': 0,
                'padding-top': 0
            }, _this.animateCallback(obj));
            $(this.blGround).stop().animate({
                'height': 0,
            }, _this.animateCallback(obj));
        }
    },
    callb: function() {
        var _this = this;
        $(this.dept03ToggBtn).off().on({
            'click': function() {
                $(this).closest('li').toggleClass('active');
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
    },
    findSet: '>li>.txt',
    dpActiveTxt: {
        dp01: '',
        dp02: '',
        dp03: '',
    },
    init: function() {
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
        for (var i in _this.gnb) {
            $(_this.gnb[i]).find(_this.findSet).each(function() {
                var $this = $(this);
                if ($(this).closest('li').is('.active')) {
                    _this.dpActiveTxt[i] = $this.text();
                }
            });
        }
    },
    get: function() {
        var _this = this;
        var getPc = function() {
            $(_this.gnb.dp01).find(_this.findSet).each(function() {
                var $this = $(this);
                var $thisLi = $this.closest('li');
                var $thisTxt = $this.text();
                if ($thisLi.is('.active')) {
                    $(_this.pc.dp01).text($thisTxt);
                    var $thisDp02html = $thisLi.find(_this.gnb.dp02).html();
                    $(_this.pc.dp02).html($thisDp02html);
                }
            });
        };
        var getMobile = function() {
            var $gnbHtml = $(_this.gnb.dp01).html();
            $(_this.mobile.lst).html($gnbHtml);
        };
        return {
            getPc: getPc,
            getMobile: getMobile,
        };
    },
    mobVirNameBox: function() {
        var _this = this;
        var args = arguments;
        if (!args.length) {
            $(_this.vNames.dp01).text(_this.dpActiveTxt.dp01);
            $(_this.vNames.dp02).text(_this.dpActiveTxt.dp02);
            $(_this.vNames.dp03).text(_this.dpActiveTxt.dp03);
        } else {
            args[0].text(args[1]);
        }
    },
    bind: function() {
        var _this = this;
        $(_this.pc.dp02).find(_this.findSet).off().on({
            'click': function() {
                event.preventDefault();
                _this.show(true, $(this));
            },
        });
        $(_this.vNames.dp01 + ',' + _this.vNames.dp02).off().on({
            'click': function() {
                event.preventDefault();
                if (event.target == $(_this.vNames.dp01)[0]) {
                    if (!$(_this.mobile.lst).is(':visible') || !$(_this.mobile.lst).find(_this.findSet).is(':visible')) {
                        _this.show(false, $(this));
                    } else {
                        _this.show(false, $(this), 'close');
                    }
                } else {
                    if (!$(_this.mobile.lst).find(_this.gnb.dp02).is(':visible')) {
                        _this.show(false, $(this));
                    } else {
                        _this.show(false, $(this), 'close');
                    }
                }
                /*$(this).toggleClass('active')
                if ($(this).is('.active')) {
                    _this.show(false, $(this));
                } else {
                    _this.show(false, $(this), 'close');
                }*/
                return false;
            },
        });
        $(_this.mobile.lst).find(_this.findSet).off().on({
            'click': function() {
                event.preventDefault();
                $(_this.mobile.lst).find('>li').removeClass('active');
                $(this).closest('li').addClass('active');
                _this.mobVirNameBox($(_this.vNames.dp01), $(this).text());
                _this.show(false, $(this), 'close');
                $(_this.vNames.dp02).click().text(_this.callb().nameDp03Re());
                return false;
            },
        });
        $(_this.mobile.lst).find(_this.gnb.dp02).find(_this.findSet).off().on({
            'click': function() {
                var $this = $(this);
                var $thisLi = $this.closest('li');
                if ($thisLi.is('.inDp03') && $thisLi.is('.active')) {
                    $thisLi.removeClass('active');
                    return false;
                }
                $(_this.mobile.lst).find(_this.gnb.dp02).find(_this.findSet).closest('li').removeClass('active');
                $thisLi.addClass('active');
                $(_this.vNames.dp02).text($(this).text());
                if ($thisLi.is('.inDp03')) {
                    return false;
                } else {
                    return true;
                }
            },
        });
        $(_this.mobile.lst).find(_this.gnb.dp03).find(_this.findSet).off().on({
            'click': function() {
                var $this = $(this);
                var $thisLi = $this.closest('li');
                $(_this.mobile.lst).find(_this.gnb.dp03).find(_this.findSet).closest('li').removeClass('active');
                $thisLi.addClass('active');
                return true;
            },
        });
    },
    show: function(dv, $target, showhide) {
        var _this = this;
        if (dv) { // pc
            $this.closest('li').toggleClass('active');
        } else { //mob
            if (showhide === 'close') {
                $(this.mobile.lst).hide();
                return;
            }
            $(this.mobile.lst).show().find(this.findSet).each(function() {
                var $this = $(this);
                var $thisLi = $this.closest('li');
                if ($target[0].className.indexOf(_this.classFormat(_this.vNames.dp01)) != -1) { //mobile dp01
                    $this.show();
                    $thisLi.find(_this.gnb.dp02).hide();
                } else if ($target[0].className.indexOf(_this.classFormat(_this.vNames.dp02)) != -1) { //mobile dp02
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
            var el = $(_this.mobile.lst + '>li.active').find(_this.gnb.dp02);
            if (el.find('>li.active').length) {
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
        return $.extend(true, {
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
        this.el = el;
        this.btn = btn;
        this.positionTop = top ? top : this.positionTop;
        this.bind();
    },
    bind: function() {
        var _this = this;
        $(this.btn).off().on({
            'click': function() {
                _this.show(true);
                return false;
            },
        });
        $(this.closeBtn).off().on({
            'click': function() {
                _this.show(false, $(this));
                return false;
            },
        });
    },
    show: function(bool, $this) {
        var _this = this;
        if (bool) {
            $('body').addClass('pcScrollOff');
            $(this.el).find(this.glDimm).show().stop().animate({
                'opacity': 1
            }, _this.animateCallback());
            $(this.el).find(this.elInnerCont).show().stop().animate({
                'opacity': 1,
                'top': _this.align() + _this.positionTop
            }, _this.animateCallback());
        } else {
            $('body').removeClass('pcScrollOff');
            $this.closest(this.el).find(this.glDimm).stop().animate({
                'opacity': 0
            }, _this.animateCallback({
                'complete': function() {
                    $(this).hide();
                }
            }));
            $this.closest(this.el).find(this.elInnerCont).stop().animate({
                'opacity': 0,
                'top': 0
            }, _this.animateCallback({
                'complete': function() {
                    $(this).hide();
                }
            }));
        }
    },
    align: function() {
        return $(document).height() - ($(document).height() - $(window).scrollTop());
    },
    callb: function() {},
    animateCallback: function(obj) {
        return $.extend(true, {
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
        $(window).smartresize(function() {
            _this.set();
        });
        this.set();
    },
    set: function() {
        var _this = this;
        _this.imgArry = [];
        $(this.obj.img).each(function() {
            _this.imgArry.push($(this).height());
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
            if ($(window).width() <= i.maxwidth) {
                ratio = (i.ratio[1] / i.ratio[0]);
            }
        });
        $(_this.obj.img).each(function(idx) {
            $thisParent = _this.obj.parent ? $(this).closest(_this.obj.parent) : $(this).parent();
            $thisParent.css({
                'height': $(this).width() * ratio,
                'overflow': 'hidden'
            });
            if ($(this).height() > $thisParent.height()) {
                $(this).css({
                    'margin-top': -($(this).height() - $thisParent.height()) / 2,
                });
            } else {
                $(this).css({
                    'margin-top': 0,
                    //'height' : $thisParent.height() + 1
                });
            }
        });
    },
    getHeight: function() {
        var _this = this;
        var $thisParent = null;
        $(this.obj.img).each(function(idx) {
            $thisParent = _this.obj.parent ? $(this).closest(_this.obj.parent) : $(this).parent();
            $thisParent.css({
                'height': _this.minHeight(_this.imgArry),
                'overflow': 'hidden',
            });
            $(this).css({
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