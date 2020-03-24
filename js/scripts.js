
'use strict';
(function () {
    'use strict';
    var section = document.querySelectorAll(".anchor");
    var sections = {};
    var i = 0;
    Array.prototype.forEach.call(section, function (e) {
        sections[e.id] = getPosition(e).y;
    });

    function getPosition(element) {
        var xPosition = 0;
        var yPosition = 0;

        while (element) {
            xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
            yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
            element = element.offsetParent;
        }

        return {
            x: xPosition,
            y: yPosition
        };
    }

    let last_known_scroll_position = 0;
    let scrolling = false;

    function doSomething(scroll_pos) {
        for (i in sections) {
            if (sections[i] <= (scroll_pos - 100)) {
                $('.current').removeClass('current');
                $('a[href*=#' + i + ']').parents('li.section-link').addClass('current');
            }
        }
        if (scroll_pos >= 50) {
            document.body.classList.add('menu-fixed');
        } else {
            document.body.classList.remove('menu-fixed');
        }
    }

    window.addEventListener('scroll', function (e) {
        last_known_scroll_position = window.scrollY;

        if (!scrolling) {
            window.requestAnimationFrame(function () {
                doSomething(last_known_scroll_position);
                scrolling = false;
            });

            scrolling = true;
        }
    });
    var navbar = document.querySelector('.navbar');
    document.querySelectorAll('.navbar-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
            navbar.classList.toggle('open');
        });
    });
    document.querySelectorAll('.navigation li:not(.dropdown) a').forEach(function (link) {
        link.addEventListener('click', function () {
            navbar.classList.remove('open');
        });
    });
    document.querySelectorAll('.navigation .dropdown>a').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
        })
    });
    $('.banner-slider').slick();
    var maxTesimonialHeight = 0;
    document.querySelectorAll('.single-testimonial-item .text-holder').forEach(function (item) {
        var height = $(item).outerHeight();
        maxTesimonialHeight = (height > maxTesimonialHeight ? height : maxTesimonialHeight);
    });
    document.querySelectorAll('.single-testimonial-item .text-holder').forEach(function (item) {
        item.style.height = maxTesimonialHeight + "px";
    })
})();