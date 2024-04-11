const navLinkEls = document.querySelectorAll('.nav-link');
const sectionEls = document.querySelectorAll('.section');

let currentSection = 'banner';
window.addEventListener('scroll', () => {
    sectionEls.forEach(sectionEl => {
        if (window.scrollY >= (sectionEl.offsetTop - sectionEl.clientHeight / 2)) {
            currentSection = sectionEl.id;
        }
    })
    navLinkEls.forEach(navLinkEl => {
        if (navLinkEl.href.includes(currentSection)) {
            document.querySelector('.active').classList.remove('active');
            navLinkEl.classList.add('active');
        }
    })
})
jQuery(".filters").on("click", function () {
    jQuery("#menu-dish").removeClass("bydefault_show");
});
$(function () {
    var filterList = {
        init: function () {
            $("#menu-dish").mixItUp({
                selectors: {
                    target: ".dish-box-wp",
                    filter: ".filter",
                },
                animation: {
                    effects: "fade",
                    easing: "ease-in-out",
                },
                load: {
                    filter: ".entradas, .peixe, .marisco, .sobremesa",
                },
            });
        },
    };
    filterList.init();
});
jQuery(window).on('load', function () {
    $('body').removeClass('body-fixed');

    //activating tab of filter
    let targets = document.querySelectorAll(".filter");
    let activeTab = 0;
    let old = 0;
    let animation;

    for (let i = 0; i < targets.length; i++) {
        targets[i].index = i;
        targets[i].addEventListener("click", moveBar);
    }

    // initial position on first === All
    gsap.set(".filter-active", {
        x: targets[0].offsetLeft,
        width: targets[0].offsetWidth
    });

    function moveBar() {
        if (this.index !== activeTab) {
            if (animation && animation.isActive()) {
                animation.progress(1);
            }
            animation = gsap.timeline({
                defaults: {
                    duration: 0.4
                }
            });
            old = activeTab;
            activeTab = this.index;
            animation.to(".filter-active", {
                x: targets[activeTab].offsetLeft,
                width: targets[activeTab].offsetWidth
            });

            animation.to(targets[old], {
                color: "#0d0d25",
                ease: "none"
            }, 0);
            animation.to(targets[activeTab], {
                color: "#fff",
                ease: "none"
            }, 0);

        }

    }
});
