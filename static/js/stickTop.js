jQuery(
    function($) {
        $(document).ready(function() {
            console.log("开源: github.com/yougoer\n多一个你、多一份力量、多一份执着\n加入有果儿，加入数据挖掘，我们，让留学更精彩。");
            console.log("请发送至 %c 909552623@qq.com（ 邮件标题请以“xxxxx-来自console”命名）", "color:red");


            var contentButton = [];
            var contentTop = [];
            var content = [];
            var lastScrollTop = 0;
            var scrollDir = '';
            var itemClass = '';
            var itemHover = '';
            var menuSize = null;
            var stickyHeight = 0;
            //var stickyMarginB = 0;
            //var currentMarginT = 0;
            //var topMargin = 0;
            var vartop = 0;

            function refresh() {
                varscroll = parseInt($(document).scrollTop());
                if (menuSize != null) {
                    for (var i = 0; i < menuSize; i++) {
                        contentTop[i] = $('.detail-section[data-section-id="' + content[i] + '"]').offset().top;

                        function bottomView(i) {
                            contentView = $('.detail-section[data-section-id="' + content[i] + '"]').height() * .4;
                            testView = contentTop[i] - contentView;
                            //console.log(varscroll);
                            if (varscroll > testView) {
                                $('.' + itemClass).removeClass(itemHover);
                                $('.' + itemClass + ':eq(' + i + ')').addClass(itemHover);
                            } else if (varscroll < 50) {
                                $('.' + itemClass).removeClass(itemHover);
                                $('.' + itemClass + ':eq(0)').addClass(itemHover);
                            }
                        }
                        if (scrollDir == 'down' && varscroll > contentTop[i] - 50 && varscroll < contentTop[i] + 50) {
                            $('.' + itemClass).removeClass(itemHover);
                            $('.' + itemClass + ':eq(' + i + ')').addClass(itemHover);
                        }
                        if (scrollDir == 'up') {
                            bottomView(i);
                        }
                    }
                }

                if (vartop < varscroll) {
                    $('.stuckMenu').addClass('isStuck');
                    $('.stuckMenu').next().closest('div').css({
                        'margin-top': stickyHeight + 'px'
                    }, 10);
                    $('.stuckMenu').css("position", "fixed");
                    $('.isStuck').css({
                        top: '0px'
                    }, 10, function() {

                    });
                };

                if (varscroll < vartop) {
                    $('.stuckMenu').removeClass('isStuck');
                    $('.stuckMenu').css("position", "relative");
                };


                $('.' + itemClass).click(function() {
                    var content_click = $(this).data('section-id');
                    var click_pos = $('.detail-section[data-section-id="' + content_click + '"]').offset().top;
                    scrollTo(0, click_pos);
                });
            }

            $(window).scroll(function(event) {
                var st = $(this).scrollTop();
                if (st > lastScrollTop) {
                    scrollDir = 'down';
                } else {
                    scrollDir = 'up';
                }
                lastScrollTop = st;
            });

            $.fn.stickUp = function(options) {
                // adding a class to users div
                $(this).addClass('stuckMenu');
                //getting options
                var objn = 0;
                if (options != null) {
                    for (var o in options.parts) {
                        if (options.parts.hasOwnProperty(o)) {
                            content[objn] = options.parts[objn];
                            objn++;
                        }
                    }
                    if (objn == 0) {
                        console.log('error:needs arguments');
                    }

                    itemClass = options.itemClass;
                    itemHover = options.itemHover;
                    menuSize = $('.' + itemClass).size();

                }
                stickyHeight = parseInt($(this).height());
                //stickyMarginB = parseInt($(this).css('margin-bottom'));
                //currentMarginT = parseInt($(this).next().closest('div').css('margin-top'));
                vartop = parseInt($(this).offset().top);
                //$(this).find('*').removeClass(itemHover);

                refresh();
            }

            $.fn.scrollMinimal = function(smooth) {
                var cTop = this.offset().top;
                var cHeight = this.outerHeight(true);
                var windowTop = $(window).scrollTop();
                var visibleHeight = $(window).height();

                if (cTop < windowTop) {
                    if (smooth) {
                        $('body').animate({
                            'scrollTop': cTop
                        }, 'slow', 'swing');
                    } else {
                        $(window).scrollTop(cTop);
                    }
                } else if (cTop + cHeight > windowTop + visibleHeight) {
                    if (smooth) {
                        $('body').animate({
                            'scrollTop': cTop - visibleHeight + cHeight
                        }, 'slow', 'swing');
                    } else {
                        $(window).scrollTop(cTop - visibleHeight + cHeight);
                    }
                }
            };

            $(document).on('scroll', refresh);

        });

    });