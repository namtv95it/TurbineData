import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { CommonUtil } from '../../utils/commonUtil'
import { AfpTab } from '../../utils/afp/tab'

type MarkdownProps = {
  content: string
  onChange: (data: any) => void
}

export default function AppMarkdown(props: MarkdownProps) {
  const { content, onChange } = props
  const textareaRef = useRef<any>();
  const [modelContent, setModelContent] = useState(content);

  const handleChange = (event: any) => {
    setModelContent(event.target.value);
  }

  useEffect(() => {
    setModelContent(content)
  }, [content])

  useEffect(() => {
    onChange(modelContent)
  }, [modelContent])

  const [isScreenEdit, setScreenEdit] = useState(true)
  const [markdownToHtml, convertMarkdownToHtml] = useState("")
  const changeScreen = (event: boolean) => {
    if (!event) {
      convertMarkdownToHtml(CommonUtil.convertMarkdownToHtml(modelContent))
    }
    setScreenEdit(event)
  }

  const handleChangeFile = (e: any) => {
    const file = e.currentTarget.files[0];
    if (file != null && file != undefined) {
      sendFile(file)
    }
  }

  const sendFile = (file: any) => {
    const name = file.name.replace(/ /g, "_");
    const data = new FormData();
    data.append('file', file);
    axios.post(process.env.REACT_APP_MAIN_URL + "/ckeditor/upload", data, {
    }).then(rep => {
      if (rep.data.status) {
        let url = rep.data.message
        setModelContent(modelContent.slice(0, textareaRef.current.selectionStart) + `![${name}](${url})` + modelContent.slice(textareaRef.current.selectionStart))
      }
    }).catch(err => {

    })
  }

  const onDropMarkdown = (event: any) => {
    const file = event.dataTransfer.files[0];
    if (file != null && file != undefined && CommonUtil.checkImageType(file.type)) {
      sendFile(file)
    }
  }

  const onPasteMarkdown = (event: any) => {
    let file = event.clipboardData.files[0];
    if (file != null && file != undefined && CommonUtil.checkImageType(file.type)) {
      sendFile(file)
    }
  }

  const tabClick = (tabIndex: number) => {
    AfpTab.showTab(tabIndex, ".tab-menu-2");
    changeScreen(tabIndex ? false : true)
  }

  useEffect(() => {
    AfpTab.showTab(0, ".tab-menu-2");
  }, [])

  return (
    <div className='col-12 markdown-body'>
      <div className='col-12 text-end'>
        {/* <button type="button" onClick={() => changeScreen(true)} className="btn btn-primary btn-label rounded-pill waves-effect waves-light"><i className="ri-edit-line label-icon align-middle rounded-pill fs-16 me-2"></i> Edit</button> */}
        {/* <button type="button" onClick={() => changeScreen(false)} className="btn btn-forth btn-label rounded-pill waves-effect waves-light" ><i className="mdi mdi-check label-icon align-middle rounded-pill fs-16 me-2"></i> Preview</button> */}
        <div className="tab-type2">
          <div className="tab-menu-2">
            <button onClick={() => { tabClick(0) }} className="tab-btn">Edit</button>
            <button onClick={() => { tabClick(1) }} className="tab-btn">Preview</button>
            <div className="tab-indicator"></div>
          </div>
        </div>
      </div>
      {
        isScreenEdit ?
          <div data-simplediff-enabled="true" className="js-file file-markdown js-code-editor container-preview show-code   mx-lg-3 " data-github-confirm-unload="false" data-is-gist="false" discovered-secrets="" data-hpc="" data-catalyst="" data-editor-loaded="">
            <div className="commit-create position-relative">
              <div className='textarea-wrapper'>
                <textarea ref={textareaRef} value={modelContent} className="form-control-markdown file-editor-textarea js-blob-contents js-code-textarea textarea-markdown"
                  onChange={handleChange} onDrop={(event) => onDropMarkdown(event)} onPaste={(event: any) => onPasteMarkdown(event)}
                  rows={25} name="content" data-filename="README.md" data-codemirror-mode="text/x-gfm" data-allow-unchanged="" data-hotkey-scope-id="code-editor" data-codemirror-fixed-height="true" placeholder="Enter contents here" aria-label="Enter contents here"></textarea>
              </div>
              <label className="text-normal-markdown hx_drag-and-drop position-relative d-flex flex-justify-between">
                <input accept=".gif,.jpeg,.jpg,.png,.svg" type="file" onChange={handleChangeFile} className="manual-file-chooser manual-file-chooser-transparent top-0 right-0 bottom-0 left-0 width-full ml-0 form-control-markdown rounded-top-0" id="blob-dragged-file-input" />
                <span className="position-absolute top-0 left-0 rounded-bottom-2 width-full height-full" style={{ textAlign: 'center', backgroundColor: '#f0f0f0' }}>
                  <span className="markdown-attach">Attach files by dragging &amp; dropping, selecting or pasting them.</span>
                </span>
              </label>
            </div>
          </div> :
          <div className='result-html' dangerouslySetInnerHTML={{ __html: markdownToHtml }}></div>
      }
    </div>
  )
}
