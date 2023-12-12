import React, { useState } from 'react'
import FooterHashTag from '../common/FooterHashTag'

export default function GridSample() {

    const [show, setShow] = useState('')

    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className='card'>
                        <div className="card-header">
                            <h4 className="card-title mb-0">Grid Options</h4>
                        </div>

                        <div className="card-body">
                            <p className="text-muted">See how aspects of the Bootstrap grid
                                system work across multiple devices with a handy table.</p>
                            <div className="table-responsive">
                                <table className="table table-bordered table-nowrap mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col" className="text-center">
                                                xs<br />
                                                <span className="fw-normal">&lt;576px</span>
                                            </th>
                                            <th scope="col" className="text-center">
                                                sm<br />
                                                <span className="fw-normal">≥576px</span>
                                            </th>
                                            <th scope="col" className="text-center">
                                                md<br />
                                                <span className="fw-normal">≥768px</span>
                                            </th>
                                            <th scope="col" className="text-center">
                                                lg<br />
                                                <span className="fw-normal">≥992px</span>
                                            </th>
                                            <th scope="col" className="text-center">
                                                xl<br />
                                                <span className="fw-normal">≥1200px</span>
                                            </th>
                                            <th scope="col" className="text-center">
                                                xxl<br />
                                                <span className="fw-normal">≥1400px</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th className="text-nowrap" scope="row">Grid behavior</th>
                                            <td>Horizontal at all times</td>
                                            <td colSpan={5}>Collapsed to start, horizontal above breakpoints</td>
                                        </tr>
                                        <tr>
                                            <th className="text-nowrap" scope="row">Max container width</th>
                                            <td>None (auto)</td>
                                            <td>540px</td>
                                            <td>720px</td>
                                            <td>960px</td>
                                            <td>1140px</td>
                                            <td>1320px</td>
                                        </tr>
                                        <tr>
                                            <th className="text-nowrap" scope="row">Class prefix</th>
                                            <td><code>col-</code></td>
                                            <td><code>col-sm-</code></td>
                                            <td><code>col-md-</code></td>
                                            <td><code>col-lg-</code></td>
                                            <td><code>col-xl-</code></td>
                                            <td><code>col-xxl-</code></td>
                                        </tr>
                                        <tr>
                                            <th className="text-nowrap" scope="row"># of columns</th>
                                            <td colSpan={6}>12</td>
                                        </tr>
                                        <tr>
                                            <th className="text-nowrap" scope="row">Gutter width</th>
                                            <td colSpan={6}>24px (12px on each side of a column)</td>
                                        </tr>
                                        <tr>
                                            <th className="text-nowrap" scope="row">Custom gutters</th>
                                            <td colSpan={6}>Yes</td>
                                        </tr>
                                        <tr>
                                            <th className="text-nowrap" scope="row">Nestable</th>
                                            <td colSpan={6}>Yes</td>
                                        </tr>
                                        <tr>
                                            <th className="text-nowrap" scope="row">Offsets</th>
                                            <td colSpan={6}>Yes</td>
                                        </tr>
                                        <tr>
                                            <th className="text-nowrap" scope="row">Column ordering</th>
                                            <td colSpan={6}>Yes</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Vertical alignment (align-items-start)</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("align-items-start")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Use align-items-start className to vertically align-items at the start.</p>
                            <div className="live-preview">

                                <div className="bg-light p-3 text-center">
                                    <div className="row align-items-start" style={{ minHeight: "6rem" }}>
                                        <div className="col-sm-4">
                                            <div className="bg-soft-primary text-primary rounded p-2">
                                                col-sm-4
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="bg-soft-primary text-primary rounded p-2 mt-2 mt-sm-0">
                                                col-sm-4
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="bg-soft-primary text-primary rounded p-2 mt-2 mt-sm-0">
                                                col-sm-4
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                show == "align-items-start" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="language-markup"><span className="token comment">&lt;!-- Vertical alignment (align-items-start) --&gt;</span><br />
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>div</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>row align-items-start<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><br />
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>div</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>col-sm-4<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span>
                                                ...
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>div</span><span className="token punctuation">&gt;</span></span>
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>div</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>col-sm-4<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span>
                                                ...
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>div</span><span className="token punctuation">&gt;</span></span>
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>div</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>col-sm-4<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span>
                                                ...
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>div</span><span className="token punctuation">&gt;</span></span>
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>div</span><span className="token punctuation">&gt;</span></span></code>
                                        </pre>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Vertical alignment (align-items-center)</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("align-items-center")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Use align-items-center className to vertically align-items at the center.</p>
                            <div className="live-preview">

                                <div className="bg-light p-3 text-center">
                                    <div className="row align-items-center" style={{ minHeight: "6rem" }}>
                                        <div className="col-sm-4">
                                            <div className="bg-soft-primary text-primary rounded p-2">
                                                col-sm-4
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="bg-soft-primary text-primary rounded p-2 mt-2 mt-sm-0">
                                                col-sm-4
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="bg-soft-primary text-primary rounded p-2 mt-2 mt-sm-0">
                                                col-sm-4
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                show == "align-items-center" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="language-markup"><span className="token comment">&lt;!-- Vertical alignment (align-items-center) --&gt;</span><br />
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>div</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>row align-items-center<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><br />
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>div</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>col-sm-4<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span>
                                                ...
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>div</span><span className="token punctuation">&gt;</span></span>
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>div</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>col-sm-4<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span>
                                                ...
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>div</span><span className="token punctuation">&gt;</span></span>
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>div</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>col-sm-4<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span>
                                                ...
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>div</span><span className="token punctuation">&gt;</span></span>
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>div</span><span className="token punctuation">&gt;</span></span></code>
                                        </pre>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Vertical alignment (align-items-end)</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("align-items-end")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Use align-items-end className to vertically align-items at the end.</p>
                            <div className="live-preview">

                                <div className="bg-light p-3 text-center">
                                    <div className="row align-items-end" style={{ minHeight: "6rem" }}>
                                        <div className="col-sm-4">
                                            <div className="bg-soft-primary text-primary rounded p-2">
                                                col-sm-4
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="bg-soft-primary text-primary rounded p-2 mt-2 mt-sm-0">
                                                col-sm-4
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="bg-soft-primary text-primary rounded p-2 mt-2 mt-sm-0">
                                                col-sm-4
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                show == "align-items-end" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="language-markup"><span className="token comment">&lt;!-- Vertical alignment (align-items-end) --&gt;</span><br />
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>div</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>row align-items-end<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><br />
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>div</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>col-sm-4<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span>
                                                ...
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>div</span><span className="token punctuation">&gt;</span></span>
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>div</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>col-sm-4<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span>
                                                ...
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>div</span><span className="token punctuation">&gt;</span></span>
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>div</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>col-sm-4<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span>
                                                ...
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>div</span><span className="token punctuation">&gt;</span></span>
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>div</span><span className="token punctuation">&gt;</span></span></code>
                                        </pre>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Align Self</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("AlignSelf")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Use the align-self-start,align-self-center, or align-self-end className respectively to vertically align items with a different position.</p>
                            <div className="live-preview">

                                <div className="bg-light p-3 text-center">
                                    <div className="row" style={{ minHeight: "6rem" }}>
                                        <div className="col-sm-4 align-self-start">
                                            <div className="bg-soft-primary text-primary rounded p-2">
                                                col-sm-4
                                            </div>
                                        </div>
                                        <div className="col-sm-4 align-self-center">
                                            <div className="bg-soft-primary text-primary rounded p-2 mt-2 mt-sm-0">
                                                col-sm-4
                                            </div>
                                        </div>
                                        <div className="col-sm-4 align-self-end">
                                            <div className="bg-soft-primary text-primary rounded p-2 mt-2 mt-sm-0">
                                                col-sm-4
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                show == "AlignSelf" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="language-markup"><span className="token comment">&lt;!-- Align Self --&gt;</span><br />
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>div</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>row<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><br />
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>div</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>col-sm-4 align-self-start<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span>
                                                ...
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>div</span><span className="token punctuation">&gt;</span></span>
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>div</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>col-sm-4 align-self-center<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span>
                                                ...
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>div</span><span className="token punctuation">&gt;</span></span>
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>div</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>col-sm-4 align-self-end<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span>
                                                ...
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>div</span><span className="token punctuation">&gt;</span></span>
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>div</span><span className="token punctuation">&gt;</span></span></code>
                                        </pre>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Horizontal Alignment</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("HorizontalAlignment")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Use the justify-content-start,justify-content-center, or justify-content-end className respectively to horizontally align items with a different position.</p>
                            <div className="live-preview">

                                <div className="bg-light p-3 text-center">
                                    <div className="row justify-content-start">
                                        <div className="col-sm-4">
                                            <div className="bg-soft-primary text-primary rounded p-2">
                                                justify-content-start
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-sm-4">
                                            <div className="bg-soft-primary text-primary rounded p-2 mt-2 mt-sm-0">
                                                justify-content-center
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-end">
                                        <div className="col-sm-4">
                                            <div className="bg-soft-primary text-primary rounded p-2 mt-2 mt-sm-0">
                                                justify-content-end
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                show == "HorizontalAlignment" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="language-markup"><span className="token comment">&lt;!-- Horizontal Alignment --&gt;</span><br />
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>div</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>row justify-content-start<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span>
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>div</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>col-sm-4<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span>
                                                ...
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>div</span><span className="token punctuation">&gt;</span></span>
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>div</span><span className="token punctuation">&gt;</span></span></code><br />
                                            <code className="language-markup"><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>div</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>row justify-content-center<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span>
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>div</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>col-sm-4<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span>
                                                ...
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>div</span><span className="token punctuation">&gt;</span></span>
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>div</span><span className="token punctuation">&gt;</span></span></code><br />
                                            <code className="language-markup"><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>div</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>row justify-content-end<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span>
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>div</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>col-sm-4<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span>
                                                ...
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>div</span><span className="token punctuation">&gt;</span></span>
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>div</span><span className="token punctuation">&gt;</span></span></code>
                                        </pre>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>


            <FooterHashTag />
        </>
    )
}
