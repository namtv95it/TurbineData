
const init = () => {

    $('[modal-id]').click(function () {
        let id = $(this).attr('modal-id');
        $('.modal').removeClass('open').filter('#' + id).addClass('open');
        $('html').addClass('scroll-hidden');
    });

    // modal close
    $('.modal .close-btn').click(function() {
        $(this).parents('.modal').removeClass('open');
        $('html').removeClass('scroll-hidden');
    });

}


export const AfpModal = {
    modal: init
}