
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
    let ticking = false;

    function doSomething(scroll_pos) {
        for (i in sections) {
            if (sections[i] <= (scroll_pos + 100)) {
                $('.current').removeClass('current');
                $('a[href*=#' + i + ']').parents('li.section-link').addClass('current');
            }
        }
        
    }

    window.addEventListener('scroll', function (e) {
        last_known_scroll_position = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(function () {
                doSomething(last_known_scroll_position);
                ticking = false;
            });

            ticking = true;
        }
    });
    var navbar = document.querySelector('.navbar');
    document.querySelectorAll('.navbar-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
            navbar.classList.toggle('open');
        });
    });
    document.querySelectorAll('.section-link:not(.dropdown) a').forEach(function (link) {
        link.addEventListener('click', function () {
            navbar.classList.remove('open');
        });
    });
})();