jQuery(
    function($) {
        $(document).ready(function() {
            console.log("开源: github.com/yougoer\n多一个你、多一份力量、多一份执着\n加入有果儿，加入数据挖掘，我们，让留学更精彩。");
            console.log("请发送至 %c 909552623@qq.com（ 邮件标题请以“xxxxx-来自console”命名）", "color:red");


            var contentButton = [];
            var contentTop = [];
            var content = [];
            var lastScrollTop = 0;
            var scrollDir = null;
            var itemClass = '';
            var itemHover = '';
            var menuSize = null;
            var stickyHeight = 0;
            var vartop = 0;
            var itemSelector = null;

            var itemRelation = [];

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
                        if (scrollDir == 1 && varscroll > contentTop[i] - 50 && varscroll < contentTop[i] + 50) {
                            $('.' + itemClass).removeClass(itemHover);
                            $('.' + itemClass + ':eq(' + i + ')').addClass(itemHover);
                        }
                        if (scrollDir == 0) {
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
                    $('.stuckMenu').next().closest('div').css({
                        'margin-top': '0px'
                    }, 10);
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
                    scrollDir = 1; //down
                } else {
                    scrollDir = 0; //up
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

                    itemSelector = options.itemSelector;
                    itemHover = options.itemHover;
                    menuSize = $(this).find(itemSelector).size();

                }
                stickyHeight = parseInt($(this).height());
                vartop = parseInt($(this).offset().top);

                refresh();
            }

            $(document).on('scroll', refresh);

        });

    });