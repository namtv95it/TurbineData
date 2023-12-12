import { Button } from 'primereact/button'
import React, { useState } from 'react'
import FooterHashTag from '../common/FooterHashTag'
import { InputText } from 'primereact/inputtext';

export default function InputSample() {
    const [show, setShow] = useState('')
    const [value, setValue] = useState<string>('');
    return (
        <>

            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">InputText</h4>

                        </div>
                        <div className="card-body">
                            <p className="text-muted">InputText is an extension to standard input element with theming and keyfiltering.</p>
                            <pre className="language-jsx"><code className="language-jsx">
                                <span className="token keyword">import</span> <span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span> InputText <span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span> <span className="token keyword">from</span> <span className="token string">'primereact/inputtext'</span><span className="token punctuation">;</span>
                            </code></pre>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Basic</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("Basic")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">InputText is used as a controlled input with value and onChange properties.</p>
                            <div className="flex justify-content-center">
                                <InputText value={value} onChange={(e) => setValue(e.target.value)} />
                            </div>
                            {
                                show == "Basic" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">InputText</span></span> <span className="token attr-name">value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>value<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">onChange</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation">(</span><span className="token parameter">e</span><span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token function">setValue</span><span className="token punctuation">(</span>e<span className="token punctuation">.</span>target<span className="token punctuation">.</span>value<span className="token punctuation">)</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token punctuation">/&gt;</span></span>
                                            </code>
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
                            <h4 className="card-title mb-0 flex-grow-1">Icons</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("Icons")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Icons can be placed inside an input element by wrapping both the input and the icon with an element that has either .p-input-icon-left or p-input-icon-right className.</p>
                            <div className="flex justify-content-center">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-search" />
                                    <InputText placeholder="Search" />
                                </span>

                                <span className="p-input-icon-right ms-2">
                                    <i className="pi pi-spin pi-spinner" />
                                    <InputText />
                                </span>
                            </div>
                            {
                                show == "Icons" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>span</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>p-input-icon-left<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text">
                                                </span><br /><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>i</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>pi pi-search<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
                                                </span><br /><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">InputText</span></span> <span className="token attr-name">placeholder</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Search<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
                                                </span><br /><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>span</span><span className="token punctuation">&gt;</span></span><br /><br />

                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>span</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>p-input-icon-right<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text">
                                                </span><br /><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>i</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>pi pi-spin pi-spinner<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
                                                </span><br /><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">InputText</span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
                                                </span><br /><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>span</span><span className="token punctuation">&gt;</span></span>
                                            </code>
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
                            <h4 className="card-title mb-0 flex-grow-1">Sizes</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("Sizes")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Apply .p-input-sm to reduce the size of the input element or .p-input-lg to enlarge it.</p>
                            <div className="flex justify-content-center">
                                <InputText type="text" className="p-inputtext-sm" placeholder="Small" />
                                <InputText type="text" className='ms-2' placeholder="Normal" />
                                <InputText type="text" className="p-inputtext-lg ms-2" placeholder="Large" />
                            </div>
                            {
                                show == "Sizes" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">InputText</span></span> <span className="token attr-name">type</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>text<span className="token punctuation">"</span></span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>p-inputtext-sm<span className="token punctuation">"</span></span> <span className="token attr-name">placeholder</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Small<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><br />
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">InputText</span></span> <span className="token attr-name">type</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>text<span className="token punctuation">"</span></span> <span className="token attr-name">placeholder</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Normal<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><br />
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">InputText</span></span> <span className="token attr-name">type</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>text<span className="token punctuation">"</span></span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>p-inputtext-lg<span className="token punctuation">"</span></span> <span className="token attr-name">placeholder</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Large<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><br />
                                            </code>
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
                            <h4 className="card-title mb-0 flex-grow-1">Help Text</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("HelpText")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">An advisory text can be defined with the semantic small tag.</p>
                            <div className="flex justify-content-center">
                                <InputText id="username" aria-describedby="username-help" />
                            </div>
                            {
                                show == "HelpText" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">InputText</span></span> <span className="token attr-name">id</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>username<span className="token punctuation">"</span></span> <span className="token attr-name">aria-describedby</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>username-help<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
                                                </span>
                                            </code>
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
                            <h4 className="card-title mb-0 flex-grow-1">Float Label</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("FloatLabel")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">A floating label appears on top of the input field when focused.</p>
                            <div className="flex justify-content-center">
                                <span className="p-float-label">
                                    <InputText id="username" value={value} onChange={(e) => setValue(e.target.value)} />
                                    <label htmlFor="username">Username</label>
                                </span>
                            </div>
                            {
                                show == "FloatLabel" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>span</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>p-float-label<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text">
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">InputText</span></span> <span className="token attr-name">id</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>username<span className="token punctuation">"</span></span> <span className="token attr-name">value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>value<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">onChange</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation">(</span><span className="token parameter">e</span><span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token function">setValue</span><span className="token punctuation">(</span>e<span className="token punctuation">.</span>target<span className="token punctuation">.</span>value<span className="token punctuation">)</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>label</span> <span className="token attr-name">htmlFor</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>username<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text">Username</span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>label</span><span className="token punctuation">&gt;</span></span><span className="token plain-text">
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>span</span><span className="token punctuation">&gt;</span></span>
                                            </code>
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
                            <h4 className="card-title mb-0 flex-grow-1">Invalid</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("Invalid")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Invalid state style is added using the p-invalid className to indicate a failed validation.</p>
                            <div className="flex justify-content-center">
                                <InputText className="p-invalid" />
                            </div>
                            {
                                show == "Invalid" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">InputText</span></span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>p-invalid<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span>
                                            </code>
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
                            <h4 className="card-title mb-0 flex-grow-1">Disabled</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("Disabled")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">When disabled is present, the element cannot be edited and focused.</p>
                            <div className="flex justify-content-center">
                                <InputText disabled placeholder="Disabled" />
                            </div>
                            {
                                show == "Disabled" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">InputText</span></span> <span className="token attr-name">disabled</span> <span className="token attr-name">placeholder</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Disabled<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span>
                                            </code>
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
                            <h4 className="card-title mb-0 flex-grow-1">Style</h4>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Following is the list of structural style classes, for theming classes visit theming page.</p>
                            <div className="doc-tablewrapper">
                                <table className="doc-table col-lg-6"><thead><tr><th>Name</th><th>Element</th></tr></thead><tbody><tr><td>p-inputtext</td><td>Input element</td></tr></tbody></table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            <FooterHashTag />
        </>
    )
}
