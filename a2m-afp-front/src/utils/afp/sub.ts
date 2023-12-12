
const init = () => {
    // Bookmark toggle event
    $('.utility .bookmark').on("click", function () {
        $(this).toggleClass('active');
    });

    // view-type toggle event
    // $('button[class^="view-type"]').on("click", function () {
    //     $(this).addClass('active').siblings('button').removeClass('active');
    // });

    // More button toggle event
    // $('button[class^="more"]').on("click", function () {
    //     $(this).siblings('.context-menu').toggleClass('active');
    // });

    // Close the context-menu when you click the outside area
    // $(document).on("mouseup", function (e: any) {
    //     let menuActive = $('.context-menu.active')
    //     if (menuActive.has(e.target).length === 0) {
    //         menuActive.removeClass('active');
    //     }
    // });
}

export const AfpSubTs = {
    init: init
}