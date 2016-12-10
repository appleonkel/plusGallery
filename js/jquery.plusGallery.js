
(function() {
    var $ = jQuery;

    $.fn.plusGallery = function(options) {
        var $gallery = $(this);
        var slideRange, totalWidth, maxPos, curPos;

        curPos = 0;

        totalWidth = 0;
        $gallery.find('figure').each(function() {
            totalWidth += parseInt($(this).width(), 10);
        });

        slideRange = $gallery.width();
        maxPos = totalWidth-slideRange;
        
        /* Set line-height of the buttons to img height, so arrows are vertical-aligned */
        $('.img-prev, .img-next').css('line-height', $('.img-slide img').height()+'px');

        /* If there are not enough pictures to fill the gallery
         * arrange them in the middle */
        if (slideRange > totalWidth) {
            var offset = (slideRange-totalWidth)/2;
            var overlayPadding = parseInt($('.img-overlay').css('padding-left'), 10);
            $('figure', $gallery).css('transform', 'translate('+offset+'px, 0)');
            $('.img-overlay').width(totalWidth-overlayPadding*2).css('left', offset+'px');
        }

        /* Mouse functions */
        $gallery.hover(function() {
            if (curPos > 0) {
                $('.img-prev').show('fast');
            }
            if (curPos < maxPos) {
                $('.img-next').show('fast');
            }

        }, function() {
            $('.img-prev').hide('fast');
            $('.img-next').hide('fast');
        });
        $('.img-next').click(function() {
            if ((curPos+slideRange) <= maxPos) {
                curPos += slideRange;
            } else {
                curPos = maxPos;
                $(this).hide();
            }
            $('figure', $gallery).css('transform', 'translate(-'+curPos+'px, 0)');
            if (curPos > 0) {
                $('.img-prev').show();
            }
        });
        $('.img-prev').click(function() {
            if ((curPos-slideRange) > 0) {
                curPos -= slideRange;
            } else {
                curPos = 0;
                $(this).hide();
            }
            $('figure', $gallery).css('transform', 'translate(-'+curPos+'px, 0)');
            if (curPos < maxPos) {
                $('.img-next').show('fast');
            }
        });

        /* Touchfunctions */
        var touchX;
        $gallery.bind('touchstart', function(e) {
            touchX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
        });
        var curX;
        $gallery.bind('touchmove', function(e) {
            curX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
        });
        $gallery.bind('touchend', function(e) {
            if (touchX-curX > 75) {
                if ((curPos+slideRange) <= maxPos) {
                    curPos += slideRange;
                } else {
                    curPos = maxPos;
                }
                $('figure', $gallery).css('transform', 'translate(-'+curPos+'px, 0)');
                console.log('right');
            } else if (touchX-curX < -75) {
                if ((curPos-slideRange) > 0) {
                    curPos -= slideRange;
                } else {
                    curPos = 0;
                }
                $('figure', $gallery).css('transform', 'translate(-'+curPos+'px, 0)');
            }
        });
    };
}).call(this);
