import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useEffect, useState } from 'react'
import CKServerUploaderPlugin from '../../utils/CKServerUploaderPlugin';
import { writer } from 'repl';

type CKEditorProps = {
    content: string
    onChange: (data: any) => void
}

export default function AppCKEditor(props: CKEditorProps) {
    const { content, onChange } = props
    const [modelContent, setModelContent] = useState(content);
    const editorConfig = {
        extraPlugins: [CKServerUploaderPlugin]
    };

    useEffect(()=>{
        setModelContent(props.content);
    }, [props.content])

     useEffect(() => {
    window.addEventListener('error', e => {
        if (e.message === 'ResizeObserver loop limit exceeded') {
            const resizeObserverErrDiv = document.getElementById(
                'webpack-dev-server-client-overlay-div'
            );
            const resizeObserverErr = document.getElementById(
                'webpack-dev-server-client-overlay'
            );
            if (resizeObserverErr) {
                resizeObserverErr.setAttribute('style', 'display: none');
            }
            if (resizeObserverErrDiv) {
                resizeObserverErrDiv.setAttribute('style', 'display: none');
            }
        }
    });
}, []);

    return (
        <div className='col-12'>
            <CKEditor
                editor={DecoupledEditor}
                data={modelContent}
                onReady={(editor: any) => {
                    editor.ui.getEditableElement().parentElement.insertBefore(
                        editor.ui.view.toolbar.element,
                        editor.ui.getEditableElement()
                    );
                    editor.editing.view.change((writer: any) => {
                        writer.setStyle(
                            "height",
                            "350px",
                            editor.editing.view.document.getRoot()
                        );
                    });
                }}

                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data)
                    // console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                    // console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    // console.log('Focus.', editor);
                }}
                config={editorConfig}
            />
        </div>
    )
}
