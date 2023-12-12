const instance = () => {
    var hljs = require('highlight.js');
    var md = require('markdown-it')(
        {
            linkify: true,
            typographer: true,
            highlight: function (str: any, lang: any) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return hljs.highlight(str, { language: lang }).value;
                    } catch (__) { }
                }
                return '';
            }
        }
    )
        .use(require('markdown-it-sub'))
        .use(require('markdown-it-sup'))
        .use(require('markdown-it-mark'))
        .use(require('markdown-it-ins'))
        .use(require('markdown-it-footnote'))
        .use(require('markdown-it-deflist'))
        .use(require('markdown-it-abbr'))
        .use(require('markdown-it-emoji'))
        .use(require('markdown-it-container'), 'warning', {
            validate: function (params: any) {
                return params.trim().split(" ", 2)[0] === 'warning';
            },

            render: function (tokens: any, idx: any, _options: any, env: any, slf: any) {
                if (tokens[idx].nesting === 1) {
                    tokens[idx].attrJoin("class", 'warning');
                }
                return slf.renderToken(tokens, idx, _options, env, slf);
            }
        });
    md.renderer.rules.table_open = function () {
        return '<table class="table table-bordered table-responsive">\n';
    };
    md.renderer.rules.footnote_ref = function (tokens: any, idx: any, _options: any, env: any, slf: any) {
        let id = slf.rules.footnote_anchor_name(tokens, idx, _options, env, slf);
        var caption = slf.rules.footnote_caption(tokens, idx, _options, env, slf);
        var refid = id;
        if (tokens[idx].meta.subId > 0) {
            refid += ":" + tokens[idx].meta.subId;
        }
        return `<sup class="footnote-ref"><a href="javascript:void(0)" onclick="scrollFootnote('fn${id}')" id="fnref${refid}">${caption}</a></sup>`
    };
    md.renderer.rules.footnote_anchor = function (tokens: any, idx: any, _options: any, env: any, slf: any) {
        var id = slf.rules.footnote_anchor_name(tokens, idx, _options, env, slf);
        if (tokens[idx].meta.subId > 0) {
            id += ":" + tokens[idx].meta.subId;
        }
        return `<a href="javascript:void(0)" onclick="scrollFootnote('fnref${id}')" class="footnote-backref">\u21a9\ufe0e</a>`
    };
    return md;
}

export const MarkdownUtil = {
    getInstance: instance
}