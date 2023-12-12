
const treeMenu = (target: any) => {
    // $('.treemenu .caret').click(function() {
    //     // Toggle the nested items
    //     $(this).toggleClass('caret-down');
    //     let submenu = $(this).siblings('.sub-menu');
    //     if (submenu.css('display') === 'block') {
    //         submenu.css('display', 'none');
    //     } else {
    //         submenu.css('display', 'block');
    //     }
    // });

    // // Remove all 'a' but clicked 'a' elements (level-3에서 클릭한 a를 제외한 나머지 a태그 비활성화)
    // $('.treemenu .level-3 a').click(function (e) {
    //     $('.treemenu .level-3 a').removeClass('active');
    //     $(this).addClass('active');
    // });

    // $('.treemenu .level-3 a').click(function (e) {
    //     $('.treemenu .level-3 a').removeClass('active');
    //     $(this).addClass('active');
    // });

    $(target).toggleClass('caret-down');
    let submenu = $(target).siblings('.sub-menu');
    if (submenu.css('display') === 'block') {
        submenu.css('display', 'none');
    } else {
        submenu.css('display', 'block');
    }

    // $('.treemenu .level-3 a').removeClass('active');
    // $(target).addClass('active');

    // $('.treemenu .level-3 a').removeClass('active');
    // $(target).addClass('active');

}


export const AfpTreeMenu = {
    treeMenu: treeMenu
}