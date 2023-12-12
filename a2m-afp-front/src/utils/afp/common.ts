
const init = () => {
    // User-info toggle event
    $('.user-info-area .toggle-btn').on("click", function () {
        $(this).parents('.user-info-area').toggleClass('menu-open');
    })

    // Close the user-dropdown when you click the outside area
    $(document).on("mouseup", function (e: any) {
        let menuActive = $('.menu-open')
        if (menuActive.has(e.target).length === 0) {
            menuActive.removeClass('menu-open');
        }
    })

    // Left-menu collapse
    $('.left-area .collapse-toggle').on("click", function () {
        $('.left-area').toggleClass('collapse');
    });

    // Left-menu depth1  'a' click event
    // $('.left-menu ul.depth1-ul > li > a').on("click", function () {
    //     $(this).addClass('active').parent('li').siblings('li').find('a').removeClass('active');
    // });

    // Left-menu depth2 'a' click event
    // $('.left-menu ul.depth2-ul > li > a').on("click", function () {
    //     $(this).addClass('active').parent('li').siblings('li').find('a').removeClass('active');
    // });

    // Left-menu depth2 slide event
    // $('.left-menu .sub-menu > a').on("click", function () {
    //     $(this).parent('.sub-menu').toggleClass('open');
    // });
    
}

export const AfpCommonTs = {
    init: init
}