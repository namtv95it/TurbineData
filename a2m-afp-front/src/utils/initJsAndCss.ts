
const appendJS = (src: string) => {
    if (!src) return;
    let head = document.querySelector('head');
    if (!head) return;
    if (head.innerHTML.indexOf(src) != -1) return; // imported
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    head.appendChild(script);
    return { head: head, script: script }
}

const appendCSS = (href: string) => {
    if (!href) return;
    let head = document.querySelector('head');
    if (!head) return;
    if (head.innerHTML.indexOf(href) != -1) return; // imported
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = href;
    head.appendChild(link);
    return { head: head, link: link }
}

const deleteCSS = (href: string) => {
    if (!href) return;
    let head = document.querySelector('head');
    if (!head) return;
    if (head.innerHTML.indexOf(href) == -1) return; // imported
    var links = document.head.getElementsByTagName('link');
    for (var link in links) {
        if (links.hasOwnProperty(link)) {
            var l = links[link];
            if (l.href.indexOf(href) != -1) {
                l.remove();
            }
        }
    }
}

export const AppendJsAndCss = {
    appendJS: appendJS,
    appendCSS: appendCSS,
    deleteCSS: deleteCSS
}