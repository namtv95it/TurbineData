
const showTab = (tabIndex: number, container?: string) => {
    
    if (container == undefined) {
        container = ".tab-menu"
    }

    // Tab
    const tabButtons = $(`${container} .tab-btn`);
    // const tabContents = $(".tab-content");
    const tabIndicator = $(`${container} .tab-indicator`);
    tabButtons.removeClass("active");
    // tabContents.removeClass("active");
    tabButtons.eq(tabIndex).addClass("active");
    // tabContents.eq(tabIndex).addClass("active");

    // Move the tab indicator to the active button (탭 활성버튼 이동)
    const activeButton = tabButtons.eq(tabIndex);
    const buttonRect = activeButton[0].getBoundingClientRect();
    const tabIndicatorWidth = buttonRect.width;
    const tabIndicatorOffset = buttonRect.left - activeButton.parent()[0].getBoundingClientRect().left;

    tabIndicator.css({ width: `${tabIndicatorWidth}px`, transform: `translateX(${tabIndicatorOffset}px)` });
}

export const AfpTab = {
    showTab: showTab
}