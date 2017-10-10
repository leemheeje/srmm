function schroom() {
    //댓글 필드부분의 파일올리기 토글;
    var schRoomAnimateCallb = function(obj) {
        return $.extend(false, {
            'duration': 500,
            'easing': 'easeInOutExpo',
            complete: function() {},
        }, obj);
    };
    var fileUpload = (function() {
        $('.fileUploadToggBtn').click(function() {
            $(this).toggleClass('gry');
            $('.fileUploadToggDiv').slideToggle(schRoomAnimateCallb());
            return false;
        });
    })();
    var topBanToggBtn = (function() {
        $('.topBanToggBtn').click(function() {
            $('.topBanToggDiv').slideToggle(schRoomAnimateCallb()).toggleClass('active');
            return false;
        });
        $('.topBanToggBtn02').click(function() {
            $(this).toggleClass('actve');
            $('.stp_lst').slideToggle(schRoomAnimateCallb());
            return false;
        });
    })();
    //카드뉴스 슬라이드 부분 
    $('.ptncmSlideBox').uiSwiper({
        slideObj: {
            draggable: true,
            dots: false,
            speed: 500,
        }
    });
    var guideTipTogg = (function() {
        $('.guideTipToggBtn').click(function() {
            $(this).toggleClass('active');
            $('.guideTipToggDiv').slideToggle(schRoomAnimateCallb());
            return false;
        });
    })();
    var cnnSchrFun = {
        ditFavtAddBtn: {
            init: function(el) {
                this.el = el;
                this.count = 0;
                this.bind();
            },
            bind: function() {
                var _this = this;
                $(this.el).off().on({
                    'click': function() {
                        var $this = $(this);
                        var $thisTxt = $this.text();
                        $this.toggleClass('active');
                        _this.act($this, $thisTxt);
                    },
                });
            },
            act: function($this, $thisTxt) {
                this.count = Number($thisTxt);
                if ($this.is('.active')) {
                    this.count++;
                } else {
                    this.count--;
                }
                $this.text(this.count);
            },
        },
        pcpTnTag: {
            opt: {
                btn: '.pcpTnTagBtn',
                img: '.pcpTnTagImg',
                target: '.pcpTnTagDiv',
                parent: '.pcpTnTagFun',
                closeBtn: '.pcpTnTagCloseBtn',
                lst: {
                    btn: '.pcpTnTagLst',
                    img: '.img',
                    txt: '.txt',
                    num: '.num',
                    maxNum: [],
                },
                clip: {
                    url: location.origin + location.pathname,
                    hiddenUrl: '#clipboardUrl',
                    btn: '.clipboardBtn',
                    msg: '주소를 복사하였습니다.',
                    fild: '.clipbFild',
                    fildInput: '#clipbFildInput',
                },
            },
            currentImgTxt: [],
            init: function(obj) {
                this.obj = $.extend(false, this.opt, obj);
                this.set();
                this.bind();
            },
            clsFormat: function(str) {
                return str.replace('.', '');
            },
            set: function() {
                var _this = this;
                if (this.obj.img) {
                    $(this.obj.lst.btn).each(function() {
                        var $this = $(this);
                        var $img = $this.find(_this.obj.lst.img);
                        var $num = $this.find(_this.obj.lst.num).text();
                        var $data = $this.data('list');
                        _this.obj.lst.maxNum.push($num);
                        if ($img.is('.active') && typeof $data === 'object') {
                            _this.currentImgTxt = [$data.txt, $data.img];
                        }
                    });
                    this.get();
                }
            },
            get: function() {
                $(this.obj.parent).find(this.obj.img).removeAttr('class').addClass('img ' + this.currentImgTxt[1] + ' ' + this.clsFormat(this.obj.img));
                $(this.obj.parent).find(this.obj.img).find('.hidetxt').text(this.currentImgTxt[0]);
            },
            clipboard: function() {
                var url = this.obj.clip.url;
                var $clipboardUrl = $(this.obj.clip.hiddenUrl);
                var $clipboardBtn = $(this.obj.clip.btn);
                $clipboardUrl.val(url);
                if ($('html').is('.ie')) {
                    $clipboardBtn.click(function() {
                        clipboardData.setData('text', $clipboardUrl.val());
                    });
                } else {
                    $clipboardBtn.hide();
                    $(this.obj.clip.fild).show();
                    $(this.obj.clip.fildInput).val(url).focus(function() {
                        $(this).select();
                    }).focus();
                }
            },
            bind: function() {
                var _this = this;
                $(this.obj.lst.btn).off().on({
                    'click': function() {
                        var $this = $(this);
                        $(this).closest(_this.obj.parent).find(_this.obj.lst.img).removeClass('active');
                        $(this).find(_this.obj.lst.img).addClass('active');
                        if (!$this.closest('li').find('input[type=radio]').is(':checked')) {
                            $this.closest('li').find('input[type=radio]').prop('checked', true);
                        }
                        _this.set();
                        return false;
                    },
                });
                $(this.obj.btn).off().on({
                    'click': function() {
                        $(this).toggleClass('active');
                        $(this).closest(_this.obj.parent).find(_this.obj.target).slideToggle(0);
                        if ($(this).is('.icq_btn')) {
                            _this.clipboard();
                        }
                        return false;
                    },
                });
                $(this.obj.closeBtn).off().on({
                    'click': function() {
                        $(this).closest(_this.obj.parent).find(_this.obj.btn).click();
                        return false;
                    },
                });
            },
        },
    };
    cnnSchrFun.pcpTnTag.init();
    cnnSchrFun.ditFavtAddBtn.init('.ditFavtAddBtn');
    //참여결과 레이어팝
    $('.pcpTnResultBtn').click(function() {
        cmmDialogFun.init('.pcpTnResultPop').show();
        return false;
    });
    $('.pcpTnResultStep02Btn').on('click', function() {
        cmmDialogFun.init('.pcpTnResultPop').hide();
        cmmDialogFun.init('.pcpTnResultStep02Pop').show();
        return false;
    });
};