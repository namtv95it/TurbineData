import { useState, useEffect } from 'react'
import AppMarkdown from '../../../commons/AppMarkdown';
import { CommonUtil } from '../../../../utils/commonUtil';

export default function Markdown() {
    const [content, setContent] = useState("")
    useEffect(() => {
        // console.log(content);
        // console.log(CommonUtil.convertMarkdownToHtml(content));
    }, [content])
    return (
        <div className="card">
            <div className="card-body">
                <AppMarkdown content={content} onChange={(data) => { setContent(data) }} />
            </div>
        </div>
    )
}
