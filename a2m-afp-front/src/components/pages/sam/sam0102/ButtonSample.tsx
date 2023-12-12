import { Button } from 'primereact/button'
import React, { useState } from 'react'
import FooterHashTag from '../common/FooterHashTag'

export default function ButtonSample() {

    const [show, setShow] = useState('')

    return (
        <>

            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Button</h4>

                        </div>
                        <div className="card-body">
                            <p className="text-muted">Button is an extension to standard input element with icons and theming.</p>
                            <pre className="language-jsx"><code className="language-jsx">
                                <span className="token keyword">import</span> <span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span> Button <span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span> <span className="token keyword">from</span> <span className="token string">'primereact/button'</span><span className="token punctuation">;</span>
                            </code></pre>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Base Buttons</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("BUTTON_PRIMERACT")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Text to display on a button is defined with the label property.</p>
                            <div className="flex justify-content-center">
                                <Button label="Submit" />
                            </div>
                            {
                                show == "BUTTON_PRIMERACT" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-tsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Submit<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
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
                            <h4 className="card-title mb-0 flex-grow-1">Icons</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("BUTTON_PRIMERACT_ICONS")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Icon of a button is specified with icon property and position is configured using iconPos attribute.</p>
                            <div className="flex justify-content-center">
                                <Button icon="pi pi-check" />
                                <Button label="Submit" icon="pi pi-check" className='ms-2' />
                                <Button label="Submit" icon="pi pi-check" className='ms-2' iconPos="right" />
                            </div>
                            {
                                show == "BUTTON_PRIMERACT_ICONS" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">icon</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>pi pi-check<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
                                                </span><br /><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Submit<span className="token punctuation">"</span></span> <span className="token attr-name">icon</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>pi pi-check<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
                                                </span><br /><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Submit<span className="token punctuation">"</span></span> <span className="token attr-name">icon</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>pi pi-check<span className="token punctuation">"</span></span> <span className="token attr-name">iconPos</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>right<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
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
                            <h4 className="card-title mb-0 flex-grow-1">Severity</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("Severity")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Severity defines the type of button.</p>
                            <div className="flex justify-content-center">
                                <Button label="Primary" />
                                <Button label="Secondary" severity="secondary" className='ms-2' />
                                <Button label="Success" severity="success" className='ms-2' />
                                <Button label="Info" severity="info" className='ms-2' />
                                <Button label="Warning" severity="warning" className='ms-2' />
                                <Button label="Danger" severity="danger" className='ms-2' />
                            </div>
                            {
                                show == "Severity" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Primary<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
                                                </span><br /><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Secondary<span className="token punctuation">"</span></span> <span className="token attr-name">severity</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>secondary<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
                                                </span><br /><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Success<span className="token punctuation">"</span></span> <span className="token attr-name">severity</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>success<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
                                                </span><br /><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Info<span className="token punctuation">"</span></span> <span className="token attr-name">severity</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>info<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
                                                </span><br /><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Warning<span className="token punctuation">"</span></span> <span className="token attr-name">severity</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>warning<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
                                                </span><br /><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Help<span className="token punctuation">"</span></span> <span className="token attr-name">severity</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>help<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
                                                </span><br /><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Danger<span className="token punctuation">"</span></span> <span className="token attr-name">severity</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>danger<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
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
                            <h4 className="card-title mb-0 flex-grow-1">Rounded</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("Rounded")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Rounded buttons have a circular border radius.</p>
                            <div className="flex justify-content-center">
                                <Button label="Primary" rounded />
                                <Button className='ms-2' label="Secondary" severity="secondary" rounded />
                                <Button className='ms-2' label="Success" severity="success" rounded />
                                <Button className='ms-2' label="Info" severity="info" rounded />
                                <Button className='ms-2' label="Warning" severity="warning" rounded />
                                <Button className='ms-2' label="Danger" severity="danger" rounded />
                            </div>
                            {
                                show == "Rounded" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Primary<span className="token punctuation">" <span className="token attr-name">rounded</span></span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
                                                </span><br /><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Secondary<span className="token punctuation">"</span></span> <span className="token attr-name">severity</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>secondary<span className="token punctuation">" <span className="token attr-name">rounded</span></span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
                                                </span><br /><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Success<span className="token punctuation">"</span></span> <span className="token attr-name">severity</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>success<span className="token punctuation">" <span className="token attr-name">rounded</span></span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
                                                </span><br /><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Info<span className="token punctuation">"</span></span> <span className="token attr-name">severity</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>info<span className="token punctuation">" <span className="token attr-name">rounded</span></span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
                                                </span><br /><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Warning<span className="token punctuation">"</span></span> <span className="token attr-name">severity</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>warning<span className="token punctuation">" <span className="token attr-name">rounded</span></span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
                                                </span><br /><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Help<span className="token punctuation">"</span></span> <span className="token attr-name">severity</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>help<span className="token punctuation">" <span className="token attr-name">rounded</span></span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
                                                </span><br /><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Danger<span className="token punctuation">"</span></span> <span className="token attr-name">severity</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>danger<span className="token punctuation">" <span className="token attr-name">rounded</span></span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
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
                            <h4 className="card-title mb-0 flex-grow-1">Outlined</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("Outlined")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Outlined buttons display a border without a background initially.</p>
                            <div className="flex justify-content-center">
                                <Button label="Primary" outlined />
                                <Button className='ms-2' label="Secondary" severity="secondary" outlined />
                                <Button className='ms-2' label="Success" severity="success" outlined />
                                <Button className='ms-2' label="Info" severity="info" outlined />
                                <Button className='ms-2' label="Warning" severity="warning" outlined />
                                <Button className='ms-2' label="Danger" severity="danger" outlined />
                            </div>
                            {
                                show == "Outlined" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Primary<span className="token punctuation">" <span className="token attr-name">outlined</span></span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
                                                </span><br /><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Secondary<span className="token punctuation">"</span></span> <span className="token attr-name">severity</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>secondary<span className="token punctuation">" <span className="token attr-name">outlined</span></span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
                                                </span><br /><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Success<span className="token punctuation">"</span></span> <span className="token attr-name">severity</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>success<span className="token punctuation">" <span className="token attr-name">outlined</span></span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
                                                </span><br /><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Info<span className="token punctuation">"</span></span> <span className="token attr-name">severity</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>info<span className="token punctuation">" <span className="token attr-name">outlined</span></span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
                                                </span><br /><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Warning<span className="token punctuation">"</span></span> <span className="token attr-name">severity</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>warning<span className="token punctuation">" <span className="token attr-name">outlined</span></span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
                                                </span><br /><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Help<span className="token punctuation">"</span></span> <span className="token attr-name">severity</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>help<span className="token punctuation">" <span className="token attr-name">outlined</span></span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
                                                </span><br /><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Danger<span className="token punctuation">"</span></span> <span className="token attr-name">severity</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>danger<span className="token punctuation">" <span className="token attr-name">outlined</span></span></span> <span className="token punctuation">/&gt;</span></span><span className="token plain-text">
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
                            <h4 className="card-title mb-0 flex-grow-1">Icon Only</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("IconOnly")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Buttons can have icons without labels.</p>
                            <div className="flex justify-content-center">
                                <Button icon="pi pi-check" rounded />
                                <Button icon="pi pi-bookmark" className='ms-2' severity="secondary" rounded />
                                <Button icon="pi pi-search" className='ms-2' severity="success" rounded />
                                <Button icon="pi pi-user" className='ms-2' severity="info" rounded />
                                <Button icon="pi pi-bell" className='ms-2' severity="warning" rounded />
                                <Button icon="pi pi-times" className='ms-2' severity="danger" rounded />
                            </div>
                            {
                                show == "IconOnly" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">icon</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>pi pi-check<span className="token punctuation">"</span></span> <span className="token attr-name">rounded</span> <span className="token attr-name">aria-label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Filter<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><br />
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">icon</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>pi pi-bookmark<span className="token punctuation">"</span></span> <span className="token attr-name">rounded</span> <span className="token attr-name">severity</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>secondary<span className="token punctuation">"</span></span> <span className="token attr-name">aria-label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Bookmark<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><br />
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">icon</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>pi pi-search<span className="token punctuation">"</span></span> <span className="token attr-name">rounded</span> <span className="token attr-name">severity</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>success<span className="token punctuation">"</span></span> <span className="token attr-name">aria-label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Search<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><br />
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">icon</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>pi pi-user<span className="token punctuation">"</span></span> <span className="token attr-name">rounded</span> <span className="token attr-name">severity</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>info<span className="token punctuation">"</span></span> <span className="token attr-name">aria-label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>User<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><br />
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">icon</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>pi pi-bell<span className="token punctuation">"</span></span> <span className="token attr-name">rounded</span> <span className="token attr-name">severity</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>warning<span className="token punctuation">"</span></span> <span className="token attr-name">aria-label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Notification<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><br />
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">icon</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>pi pi-times<span className="token punctuation">"</span></span> <span className="token attr-name">rounded</span> <span className="token attr-name">severity</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>danger<span className="token punctuation">"</span></span> <span className="token attr-name">aria-label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Cancel<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><br />
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
                            <h4 className="card-title mb-0 flex-grow-1">Badges</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("Badges")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Buttons have built-in badge support with badge and badgeClassName properties.</p>
                            <div className="flex justify-content-center">
                                <Button type="button" label="Emails" badge="8" />
                                <Button className='ms-2' type="button" label="Messages" icon="pi pi-users" outlined badge="2" badgeClassName="p-badge-danger" />
                            </div>
                            {
                                show == "Badges" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">type</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>button<span className="token punctuation">"</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Emails<span className="token punctuation">"</span></span> <span className="token attr-name">badge</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>8<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><br />
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">type</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>button<span className="token punctuation">"</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Messages<span className="token punctuation">"</span></span> <span className="token attr-name">icon</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>pi pi-users<span className="token punctuation">"</span></span> <span className="token attr-name">outlined</span> <span className="token attr-name">badge</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>2<span className="token punctuation">"</span></span> <span className="token attr-name">badgeClassName</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>p-badge-danger<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span>
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
                            <p className="text-muted">Button provides small and large sizes as alternatives to the standard.</p>
                            <div className="flex justify-content-center">
                                <Button label="Small" icon="pi pi-check" size="small" />
                                <Button className='ms-2' label="Normal" icon="pi pi-check" />
                                <Button className='ms-2' label="Large" icon="pi pi-check" size="large" />
                            </div>
                            {
                                show == "Sizes" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Small<span className="token punctuation">"</span></span> <span className="token attr-name">icon</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>pi pi-check<span className="token punctuation">"</span></span> <span className="token attr-name">size</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>sm<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><br />
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Normal<span className="token punctuation">"</span></span> <span className="token attr-name">icon</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>pi pi-check<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><br />
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Button</span></span> <span className="token attr-name">label</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Large<span className="token punctuation">"</span></span> <span className="token attr-name">icon</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>pi pi-check<span className="token punctuation">"</span></span> <span className="token attr-name">size</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>lg<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span>
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
                            <h4 className="card-title mb-0 flex-grow-1">Default Buttons</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("BUTTON")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Use the<code> btn</code> className to show the default button style.</p>
                            <div className="live-preview">
                                <div className="d-flex flex-wrap gap-2">
                                    <button type="button" className="btn btn-primary waves-effect waves-light">Primary</button>
                                    <button type="button" className="btn btn-secondary waves-effect waves-light">Secondary</button>
                                    <button type="button" className="btn btn-success waves-effect waves-light">Success</button>
                                    <button type="button" className="btn  waves-effect waves-light">Info</button>
                                    <button type="button" className="btn btn-warning waves-effect waves-light">Warning</button>
                                    <button type="button" className="btn btn-danger waves-effect waves-light">Danger</button>
                                    <button type="button" className="btn btn-dark waves-effect waves-light">Dark</button>
                                    <button type="button" className="btn btn-link waves-effect">Link</button>
                                    <button type="button" className="btn btn-light waves-effect">Light</button>
                                </div>
                            </div>
                            {
                                show == "BUTTON" && (
                                    <div className="code-view mt-2">
                                        <pre className="language-markup"><code>&lt;!-- Base Buttons --&gt;</code><br />
                                            <code className="language-markup">&lt;button type=&quot;button&quot; className=&quot;btn btn-primary waves-effect waves-light&quot;&gt;Primary&lt;/button&gt;</code><br />

                                            <code className="language-markup">&lt;button type=&quot;button&quot; className=&quot;btn btn-secondary waves-effect waves-light&quot;&gt;Secondary&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-success waves-effect waves-light&quot;&gt;Success&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn  waves-effect waves-light&quot;&gt;Info&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-warning waves-effect waves-light&quot;&gt;Warning&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-danger waves-effect waves-light&quot;&gt;Danger&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-dark waves-effect waves-light&quot;&gt;Dark&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-light waves-effect&quot;&gt;Light&lt;/button&gt;</code></pre>
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
                            <h4 className="card-title mb-0 flex-grow-1">Outline Buttons</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("OUTLINE")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Use <code>btn-outline-</code>  className with the below-mentioned variation to create a button with the outline.</p>
                            <div className="live-preview">
                                <div className="d-flex flex-wrap gap-2">
                                    <button type="button" className="btn btn-outline-primary waves-effect waves-light shadow-none">Primary</button>
                                    <button type="button" className="btn btn-outline-secondary waves-effect waves-light shadow-none">Secondary</button>
                                    <button type="button" className="btn btn-outline-success waves-effect waves-light shadow-none">Success</button>
                                    <button type="button" className="btn btn-outline-info waves-effect waves-light shadow-none">Info</button>
                                    <button type="button" className="btn btn-outline-warning waves-effect waves-light shadow-none">Warning</button>
                                    <button type="button" className="btn btn-outline-danger waves-effect waves-light shadow-none">Danger</button>
                                    <button type="button" className="btn btn-outline-dark waves-effect waves-light shadow-none">Dark</button>
                                    <button type="button" className="btn btn-outline-light waves-effect shadow-none">Light</button>
                                </div>
                            </div>
                            {
                                show == "OUTLINE" && (
                                    <div className="code-view mt-2">
                                        <pre className="language-markup"><code>&lt;!-- Outline Buttons --&gt;</code> <br />
                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-primary waves-effect waves-light shadow-none&quot;&gt;Primary&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-outline-secondary waves-effect waves-light shadow-none&quot;&gt;Secondary&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-outline-success waves-effect waves-light shadow-none&quot;&gt;Success&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-outline-info waves-effect waves-light shadow-none&quot;&gt;Info&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-outline-warning waves-effect waves-light shadow-none&quot;&gt;Warning&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-outline-danger waves-effect waves-light shadow-none&quot;&gt;Danger&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-outline-dark waves-effect waves-light shadow-none&quot;&gt;Dark&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-outline-light waves-effect shadow-none&quot;&gt;Light&lt;/button&gt;</code></pre>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-21">
                    <div className="card">
                        <div className="card-header align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Rounded Buttons</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("ROUNDED")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Use the <code >rounded-pill </code>className to make a rounded button.</p>
                            <div className="live-preview">
                                <div className="d-flex flex-wrap gap-2">
                                    <button type="button" className="btn rounded-pill btn-primary waves-effect waves-light">Primary</button>
                                    <button type="button" className="btn rounded-pill btn-secondary waves-effect waves-light">Secondary</button>
                                    <button type="button" className="btn rounded-pill btn-success waves-effect waves-light">Success</button>
                                    <button type="button" className="btn rounded-pill  waves-effect waves-light">Info</button>
                                    <button type="button" className="btn rounded-pill btn-warning waves-effect waves-light">Warning</button>
                                    <button type="button" className="btn rounded-pill btn-danger waves-effect waves-light">Danger</button>
                                    <button type="button" className="btn rounded-pill btn-dark waves-effect waves-light">Dark</button>
                                    <button type="button" className="btn rounded-pill btn-light waves-effect">Light</button>
                                </div>
                            </div>
                            {
                                show == "ROUNDED" && (
                                    <div className="code-view mt-2">
                                        <pre className="language-markup"><code>&lt;!-- Rounded Buttons --&gt;</code><br />
                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn rounded-pill btn-primary waves-effect waves-light&quot;&gt;Primary&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn rounded-pill btn-secondary waves-effect waves-light&quot;&gt;Secondary&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn rounded-pill btn-success waves-effect waves-light&quot;&gt;Success&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn rounded-pill  waves-effect waves-light&quot;&gt;Info&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn rounded-pill btn-warning waves-effect waves-light&quot;&gt;Warning&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn rounded-pill btn-danger waves-effect waves-light&quot;&gt;Danger&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn rounded-pill btn-dark waves-effect waves-light&quot;&gt;Dark&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn rounded-pill btn-light waves-effect&quot;&gt;Light&lt;/button&gt;</code></pre><br />
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
                            <h4 className="card-title mb-0 flex-grow-1">Soft Buttons</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("SOFT")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Use <code>btn-soft-</code>  className with the below-mentioned variation to create a button with the soft background.</p>                                        <div className="live-preview">
                                <div className="d-flex flex-wrap gap-2">
                                    <button type="button" className="btn btn-soft-primary waves-effect waves-light shadow-none">Primary</button>
                                    <button type="button" className="btn btn-soft-secondary waves-effect waves-light shadow-none">Secondary</button>
                                    <button type="button" className="btn btn-soft-success waves-effect waves-light shadow-none">Success</button>
                                    <button type="button" className="btn btn-soft-info waves-effect waves-light shadow-none">Info</button>
                                    <button type="button" className="btn btn-soft-warning waves-effect waves-light shadow-none">Warning</button>
                                    <button type="button" className="btn btn-soft-danger waves-effect waves-light shadow-none">Danger</button>
                                    <button type="button" className="btn btn-soft-dark waves-effect waves-light shadow-none">Dark</button>
                                </div>
                            </div>
                            {
                                show == "SOFT" && (
                                    <div className="code-view mt-2">
                                        <pre className="language-markup" ><code>&lt;!-- Soft Buttons --&gt;</code><br />
                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-soft-primary waves-effect waves-light shadow-none&quot;&gt;Primary&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-soft-secondary waves-effect waves-light shadow-none&quot;&gt;secondary&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-soft-success waves-effect waves-light shadow-none&quot;&gt;Success&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-soft-info waves-effect waves-light shadow-none&quot;&gt;Info&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-soft-warning waves-effect waves-light shadow-none&quot;&gt;Warning&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-soft-danger waves-effect waves-light shadow-none&quot;&gt;Danger&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-soft-dark waves-effect waves-light shadow-none&quot;&gt;Dark&lt;/button&gt;</code></pre>
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
                            <h4 className="card-title mb-0 flex-grow-1">Ghost Buttons</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("GHOST")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Use <code>btn-ghost-</code>  className with the below-mentioned variation to create a button with the transparent background.</p>
                            <div className="live-preview">
                                <div className="d-flex flex-wrap gap-2">
                                    <button type="button" className="btn btn-ghost-primary waves-effect waves-light shadow-none">Primary</button>
                                    <button type="button" className="btn btn-ghost-secondary waves-effect waves-light shadow-none">Secondary</button>
                                    <button type="button" className="btn btn-ghost-success waves-effect waves-light shadow-none">Success</button>
                                    <button type="button" className="btn btn-ghost-info waves-effect waves-light shadow-none">Info</button>
                                    <button type="button" className="btn btn-ghost-warning waves-effect waves-light shadow-none">Warning</button>
                                    <button type="button" className="btn btn-ghost-danger waves-effect waves-light shadow-none">Danger</button>
                                    <button type="button" className="btn btn-ghost-dark waves-effect waves-light shadow-none">Dark</button>
                                </div>
                            </div>
                            {
                                show == "GHOST" && (
                                    <div className="code-view mt-2">
                                        <pre className="language-markup" ><code>&lt;!-- ghost Buttons --&gt;</code><br />
                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-ghost-primary waves-effect waves-light shadow-none&quot;&gt;Primary&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-ghost-secondary waves-effect&quot;&gt;secondary&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-ghost-success waves-effect waves-light shadow-none&quot;&gt;Success&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-ghost-info waves-effect waves-light shadow-none&quot;&gt;Info&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-ghost-warning waves-effect waves-light shadow-none&quot;&gt;Warning&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-ghost-danger waves-effect waves-light shadow-none&quot;&gt;Danger&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-ghost-dark waves-effect waves-light shadow-none&quot;&gt;Dark&lt;/button&gt;</code></pre>
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
                            <h4 className="card-title mb-0 flex-grow-1">Gradient Buttons</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("GRADIENT")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Use <code >bg-gradient </code>className to create a gradient button.</p>
                            <div className="live-preview">
                                <div className="d-flex flex-wrap gap-2">
                                    <button type="button" className="btn btn-primary bg-gradient waves-effect waves-light">Primary</button>
                                    <button type="button" className="btn btn-secondary bg-gradient waves-effect waves-light">Secondary</button>
                                    <button type="button" className="btn btn-success bg-gradient waves-effect waves-light">Success</button>
                                    <button type="button" className="btn  bg-gradient waves-effect waves-light">Info</button>
                                    <button type="button" className="btn btn-warning bg-gradient waves-effect waves-light">Warning</button>
                                    <button type="button" className="btn btn-danger bg-gradient waves-effect waves-light">Danger</button>
                                    <button type="button" className="btn btn-dark bg-gradient waves-effect waves-light">Dark</button>
                                    <button type="button" className="btn btn-light bg-gradient waves-effect">Light</button>
                                </div>
                            </div>
                            {
                                show == "GRADIENT" && (
                                    <div className="code-view mt-2">
                                        <pre className="language-markup"><code>&lt;!-- Gradient Buttons --&gt;</code><br />
                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-primary bg-gradient waves-effect waves-light&quot;&gt;Primary&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-secondary bg-gradient waves-effect waves-light&quot;&gt;Secondary&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-success bg-gradient waves-effect waves-light&quot;&gt;Success&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn  bg-gradient waves-effect waves-light&quot;&gt;Info&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-warning bg-gradient waves-effect waves-light&quot;&gt;Warning&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-danger bg-gradient waves-effect waves-light&quot;&gt;Danger&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-dark bg-gradient waves-effect waves-light&quot;&gt;Dark&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-light bg-gradient waves-effect&quot;&gt;Light&lt;/button&gt;</code></pre>
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
                            <h4 className="card-title mb-0 flex-grow-1">Animation Buttons</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("ANIMATION")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Use <code >bg-animation </code>className to create an animated button.</p>
                            <div className="live-preview">
                                <div className="d-flex flex-wrap gap-2">
                                    <button type="button" className="btn btn-primary btn-animation waves-effect waves-light" data-text="Primary"><span>Primary</span></button>
                                    <button type="button" className="btn btn-secondary btn-animation waves-effect waves-light" data-text="Secondary"><span>Secondary</span></button>
                                    <button type="button" className="btn btn-success btn-animation waves-effect waves-light" data-text="Success"><span>Success</span></button>
                                    <button type="button" className="btn  btn-animation waves-effect waves-light" data-text="Info"><span>Info</span></button>
                                    <button type="button" className="btn btn-warning btn-animation waves-effect waves-light" data-text="Warning"><span>Warning</span></button>
                                    <button type="button" className="btn btn-danger btn-animation waves-effect waves-light" data-text="Danger"><span>Danger</span></button>
                                    <button type="button" className="btn btn-dark btn-animation waves-effect waves-light" data-text="Dark"><span>Dark</span></button>
                                </div>
                            </div>
                            {
                                show == "ANIMATION" && (
                                    <div className="code-view mt-2">
                                        <pre className="language-markup"><code>&lt;!-- Animation Buttons --&gt;</code><br />
                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-primary btn-animation waves-effect waves-light&quot; data-text=&quot;Primary&quot;&gt;&lt;span&gt;Primary&lt;/span&gt;&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-secondary btn-animation waves-effect waves-light&quot; data-text=&quot;Secondary&quot;&gt;&lt;span&gt;Secondary&lt;/span&gt;&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-success btn-animation waves-effect waves-light&quot; data-text=&quot;Success&quot;&gt;&lt;span&gt;Success&lt;/span&gt;&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn  btn-animation waves-effect waves-light&quot; data-text=&quot;Info&quot;&gt;&lt;span&gt;Info&lt;/span&gt;&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-warning btn-animation waves-effect waves-light&quot; data-text=&quot;Warning&quot;&gt;&lt;span&gt;Warning&lt;/span&gt;&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-danger btn-animation waves-effect waves-light&quot; data-text=&quot;Danger&quot;&gt;&lt;span&gt;Danger&lt;/span&gt;&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-dark btn-animation waves-effect waves-light&quot; data-text=&quot;Dark&quot;&gt;&lt;span&gt;Dark&lt;/span&gt;&lt;/button&gt;</code></pre>
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
                            <h4 className="card-title mb-0 flex-grow-1">Buttons with Label</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("WITHLABEL")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Use <code >btn-label </code>className to create a button with the label.</p>
                            <div className="live-preview">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="d-flex flex-wrap gap-2 mb-3 mb-lg-0">
                                            <a className="btn btn-primary btn-label waves-effect waves-light">
                                                <div className="d-flex">
                                                    <div className="flex-shrink-0">
                                                        <i className="ri-user-smile-line label-icon align-middle fs-16 me-2"></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        Primary
                                                    </div>
                                                </div>
                                            </a>
                                            <button type="button" className="btn btn-success btn-label waves-effect waves-light"><i className="ri-check-double-line label-icon align-middle fs-16 me-2"></i> Success</button>
                                            <button type="button" className="btn btn-warning btn-label waves-effect waves-light"><i className="ri-error-warning-line label-icon align-middle fs-16 me-2 "></i> Warning</button>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="d-flex flex-wrap gap-2 mb-3 mb-lg-0">
                                            <button type="button" className="btn btn-primary btn-label rounded-pill waves-effect waves-light"><i className="ri-user-smile-line label-icon align-middle rounded-pill fs-16 me-2"></i> Primary</button>
                                            <button type="button" className="btn btn-success btn-label rounded-pill waves-effect waves-light"><i className="ri-check-double-line label-icon align-middle rounded-pill fs-16 me-2"></i> Success</button>
                                            <button type="button" className="btn btn-warning btn-label rounded-pill waves-effect waves-light"><i className="ri-error-warning-line label-icon align-middle rounded-pill fs-16 me-2 "></i> Warning</button>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="d-flex flex-wrap gap-2">
                                            <button type="button" className="btn btn-primary btn-label waves-effect waves-light right"><i className="ri-user-smile-line label-icon align-middle fs-16 ms-2"></i> Primary</button>
                                            <button type="button" className="btn btn-success btn-label waves-effect waves-light right rounded-pill"><i className="ri-check-double-line label-icon align-middle rounded-pill fs-16 ms-2"></i> Success</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                show == "WITHLABEL" && (
                                    <div className="code-view mt-2">
                                        <pre className="language-markup" ><code>&lt;!-- Buttons with Label --&gt;</code><br />
                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-primary btn-label waves-effect waves-light&quot;&gt;&lt;i className=&quot;ri-user-smile-line label-icon align-middle fs-16 me-2&quot;&gt;&lt;/i&gt; Primary&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-success btn-label waves-effect waves-light&quot;&gt;&lt;i className=&quot;ri-check-double-line label-icon align-middle fs-16 me-2&quot;&gt;&lt;/i&gt; Success&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-warning btn-label waves-effect waves-light&quot;&gt;&lt;i className=&quot;ri-error-warning-line label-icon align-middle fs-16 me-2&quot;&gt;&lt;/i&gt; Warning&lt;/button&gt;</code><br />

                                            <code>&lt;!-- Rounded with Label --&gt;</code><br />
                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-primary btn-label waves-effect waves-light rounded-pill&quot;&gt;&lt;i className=&quot;ri-user-smile-line label-icon align-middle rounded-pill fs-16 me-2&quot;&gt;&lt;/i&gt; Primary&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-success btn-label waves-effect waves-light rounded-pill&quot;&gt;&lt;i className=&quot;ri-check-double-line label-icon align-middle rounded-pill fs-16 me-2&quot;&gt;&lt;/i&gt; Success&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-warning btn-label waves-effect waves-light rounded-pill&quot;&gt;&lt;i className=&quot;ri-error-warning-line label-icon align-middle rounded-pill fs-16 me-2&quot;&gt;&lt;/i&gt; Warning&lt;/button&gt;</code><br />

                                            <code>&lt;!-- Buttons with Label Right --&gt;</code><br />
                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-primary btn-label waves-effect right waves-light&quot;&gt;&lt;i className=&quot;ri-user-smile-line label-icon align-middle fs-16 ms-2&quot;&gt;&lt;/i&gt; Primary&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-success btn-label waves-effect right waves-light rounded-pill&quot;&gt;&lt;i className=&quot;ri-check-double-line label-icon align-middle rounded-pill fs-16 ms-2&quot;&gt;&lt;/i&gt; Success&lt;/button&gt;</code></pre>
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
                            <h4 className="card-title mb-0 flex-grow-1">Load More Buttons</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("LOADMORE")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Example of loading buttons.</p>
                            <div className="live-preview">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="hstack flex-wrap gap-2 mb-3 mb-lg-0">
                                            <button className="btn btn-outline-primary btn-load">
                                                <span className="d-flex align-items-center">
                                                    <span className="spinner-border flex-shrink-0" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </span>
                                                    <span className="flex-grow-1 ms-2">
                                                        Loading...
                                                    </span>
                                                </span>
                                            </button>
                                            <button type="button" className="btn btn-success btn-load">
                                                <span className="d-flex align-items-center">
                                                    <span className="spinner-border flex-shrink-0" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </span>
                                                    <span className="flex-grow-1 ms-2">
                                                        Loading...
                                                    </span>
                                                </span>
                                            </button>
                                            <button type="button" className="btn btn-outline-secondary btn-load">
                                                <span className="d-flex align-items-center">
                                                    <span className="spinner-grow flex-shrink-0" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </span>
                                                    <span className="flex-grow-1 ms-2">
                                                        Loading...
                                                    </span>
                                                </span>
                                            </button>
                                            <button type="button" className="btn btn-danger btn-load">
                                                <span className="d-flex align-items-center">
                                                    <span className="spinner-grow flex-shrink-0" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </span>
                                                    <span className="flex-grow-1 ms-2">
                                                        Loading...
                                                    </span>
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="d-flex flex-wrap gap-2 mb-3 mb-lg-0">
                                            <button className="btn btn-outline-primary btn-load">
                                                <span className="d-flex align-items-center">
                                                    <span className="flex-grow-1 me-2">
                                                        Loading...
                                                    </span>
                                                    <span className="spinner-border flex-shrink-0" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </span>
                                                </span>
                                            </button>
                                            <button type="button" className="btn btn-success btn-load">
                                                <span className="d-flex align-items-center">
                                                    <span className="flex-grow-1 me-2">
                                                        Loading...
                                                    </span>
                                                    <span className="spinner-border flex-shrink-0" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </span>
                                                </span>
                                            </button>
                                            <button type="button" className="btn btn-outline-warning btn-load">
                                                <span className="d-flex align-items-center">
                                                    <span className="flex-grow-1 me-2">
                                                        Loading...
                                                    </span>
                                                    <span className="spinner-grow flex-shrink-0" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </span>
                                                </span>
                                            </button>
                                            <button type="button" className="btn  btn-load">
                                                <span className="d-flex align-items-center">
                                                    <span className="flex-grow-1 me-2">
                                                        Loading...
                                                    </span>
                                                    <span className="spinner-grow flex-shrink-0" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </span>
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {
                                show == "LOADMORE" && (
                                    <div className="code-view mt-2">
                                        <pre className="language-markup" ><code>&lt;!-- Load More Buttons --&gt;</code><br />
                                            <code>&lt;div className=&quot;hstack flex-wrap gap-2 mb-3 mb-lg-0&quot;&gt;<br />
                                                &lt;button className=&quot;btn btn-outline-primary btn-load&quot;&gt;
                                                &lt;span className=&quot;d-flex align-items-center&quot;&gt;
                                                &lt;span className=&quot;spinner-border flex-shrink-0&quot; role=&quot;status&quot;&gt;
                                                &lt;span className=&quot;visually-hidden&quot;&gt;Loading...&lt;/span&gt;
                                                &lt;/span&gt;
                                                &lt;span className=&quot;flex-grow-1 ms-2&quot;&gt;
                                                Loading...
                                                &lt;/span&gt;
                                                &lt;/span&gt;
                                                &lt;/button&gt;</code><br />
                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-success btn-load&quot;&gt;
                                                &lt;span className=&quot;d-flex align-items-center&quot;&gt;
                                                &lt;span className=&quot;spinner-border flex-shrink-0&quot; role=&quot;status&quot;&gt;
                                                &lt;span className=&quot;visually-hidden&quot;&gt;Loading...&lt;/span&gt;
                                                &lt;/span&gt;
                                                &lt;span className=&quot;flex-grow-1 ms-2&quot;&gt;
                                                Loading...
                                                &lt;/span&gt;
                                                &lt;/span&gt;
                                                &lt;/button&gt;</code><br />
                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-outline-secondary btn-load&quot;&gt;
                                                &lt;span className=&quot;d-flex align-items-center&quot;&gt;
                                                &lt;span className=&quot;spinner-grow flex-shrink-0&quot; role=&quot;status&quot;&gt;
                                                &lt;span className=&quot;visually-hidden&quot;&gt;Loading...&lt;/span&gt;
                                                &lt;/span&gt;
                                                &lt;span className=&quot;flex-grow-1 ms-2&quot;&gt;
                                                Loading...
                                                &lt;/span&gt;
                                                &lt;/span&gt;
                                                &lt;/button&gt;</code><br />
                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-danger btn-load&quot;&gt;
                                                &lt;span className=&quot;d-flex align-items-center&quot;&gt;
                                                &lt;span className=&quot;spinner-grow flex-shrink-0&quot; role=&quot;status&quot;&gt;
                                                &lt;span className=&quot;visually-hidden&quot;&gt;Loading...&lt;/span&gt;
                                                &lt;/span&gt;
                                                &lt;span className=&quot;flex-grow-1 ms-2&quot;&gt;
                                                Loading...
                                                &lt;/span&gt;
                                                &lt;/span&gt;
                                                &lt;/button&gt;
                                                &lt;/div&gt;</code><br />

                                            <code>&lt;div className=&quot;d-flex flex-wrap gap-2 mb-3 mb-lg-0&quot;&gt;</code><br />
                                            <code>&lt;button className=&quot;btn btn-outline-primary btn-load&quot;&gt;
                                                &lt;span className=&quot;d-flex align-items-center&quot;&gt;
                                                &lt;span className=&quot;flex-grow-1 me-2&quot;&gt;
                                                Loading...
                                                &lt;/span&gt;
                                                &lt;span className=&quot;spinner-border flex-shrink-0&quot; role=&quot;status&quot;&gt;
                                                &lt;span className=&quot;visually-hidden&quot;&gt;Loading...&lt;/span&gt;
                                                &lt;/span&gt;
                                                &lt;/span&gt;
                                                &lt;/button&gt;</code><br />
                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-success btn-load&quot;&gt;
                                                &lt;span className=&quot;d-flex align-items-center&quot;&gt;
                                                &lt;span className=&quot;flex-grow-1 me-2&quot;&gt;
                                                Loading...
                                                &lt;/span&gt;
                                                &lt;span className=&quot;spinner-border flex-shrink-0&quot; role=&quot;status&quot;&gt;
                                                &lt;span className=&quot;visually-hidden&quot;&gt;Loading...&lt;/span&gt;
                                                &lt;/span&gt;
                                                &lt;/span&gt;
                                                &lt;/button&gt;</code><br />
                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-outline-warning btn-load&quot;&gt;
                                                &lt;span className=&quot;d-flex align-items-center&quot;&gt;
                                                &lt;span className=&quot;flex-grow-1 me-2&quot;&gt;
                                                Loading...
                                                &lt;/span&gt;
                                                &lt;span className=&quot;spinner-grow flex-shrink-0&quot; role=&quot;status&quot;&gt;
                                                &lt;span className=&quot;visually-hidden&quot;&gt;Loading...&lt;/span&gt;
                                                &lt;/span&gt;
                                                &lt;/span&gt;
                                                &lt;/button&gt;</code><br />
                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn  btn-load&quot;&gt;
                                                &lt;span className=&quot;d-flex align-items-center&quot;&gt;
                                                &lt;span className=&quot;flex-grow-1 me-2&quot;&gt;
                                                Loading...
                                                &lt;/span&gt;
                                                &lt;span className=&quot;spinner-grow flex-shrink-0&quot; role=&quot;status&quot;&gt;
                                                &lt;span className=&quot;visually-hidden&quot;&gt;Loading...&lt;/span&gt;
                                                &lt;/span&gt;
                                                &lt;/span&gt;
                                                &lt;/button&gt;
                                                &lt;/div&gt;</code></pre>
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
                            <h4 className="card-title mb-0 flex-grow-1">Buttons Sizes</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("SIZE")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Use <code >btn-lg</code> className to create a large size button and <code >btn-sm</code> className to create a small size button.</p>
                            <div className="live-preview">
                                <div className="d-flex flex-wrap align-items-center gap-2">

                                    <button type="button" className="btn btn-primary btn-lg waves-effect waves-light">Large button</button>
                                    <button type="button" className="btn btn-light btn-lg waves-effect">Large button</button>


                                    <button type="button" className="btn btn-primary btn-sm waves-effect waves-light">Small button</button>
                                    <button type="button" className="btn btn-light btn-sm waves-effect">Small button</button>
                                </div>
                            </div>
                            {
                                show == "SIZE" && (
                                    <div className="code-view mt-2">
                                        <pre className="language-markup">
                                            <code>&lt;!-- Large Button --&gt;</code><br />
                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-primary btn-lg waves-effect waves-light&quot;&gt;Large button&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-light btn-lg waves-effect&quot;&gt;Large button&lt;/button&gt;</code><br />

                                            <code>&lt;!-- Small Button --&gt;</code><br />
                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-primary btn-sm waves-effect waves-light&quot;&gt;Small button&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-light btn-sm waves-effect&quot;&gt;Small button&lt;/button&gt;</code></pre>
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
                            <h4 className="card-title mb-0 flex-grow-1">Buttons Width</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("WIDTH")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Use <code >w-xs,w-sm,w-md,w-lg</code> className to make different sized buttons respectively.</p>
                            <div className="live-preview">
                                <div className="d-flex flex-wrap gap-2">
                                    <button type="button" className="btn btn-primary w-xs waves-effect waves-light">Xs</button>
                                    <button type="button" className="btn btn-danger w-sm waves-effect waves-light">Small</button>
                                    <button type="button" className="btn btn-warning w-md waves-effect waves-light">Medium</button>
                                    <button type="button" className="btn btn-success w-lg waves-effect waves-light">Large</button>
                                </div>
                            </div>
                            {
                                show == "WIDTH" && (
                                    <div className="code-view mt-2">
                                        <pre className="language-markup">
                                            <code>&lt;!-- Width Button --&gt;</code><br />
                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-primary w-xs waves-effect waves-light&quot;&gt;Xs&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-danger w-sm waves-effect waves-light&quot;&gt;Small&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-warning w-md waves-effect waves-light&quot;&gt;Medium&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-success w-lg waves-effect waves-light&quot;&gt;Large&lt;/button&gt;</code></pre>
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
                            <h4 className="card-title mb-0 flex-grow-1">Buttons Group</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("GROUP")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">

                            <p className="text-muted">Use the <code>btn-group </code> className in the parent className to wrap a series of buttons.</p>
                            <div className="live-preview">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="btn-group shadow" role="group" aria-label="Basic example">
                                            <button type="button" className="btn btn-primary waves-effect waves-light shadow-none">Left</button>
                                            <button type="button" className="btn btn-primary waves-effect waves-light shadow-none">Middle</button>
                                            <button type="button" className="btn btn-primary waves-effect waves-light shadow-none">Right</button>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="btn-group shadow mt-4 mt-sm-0" role="group" aria-label="Basic example">
                                            <button type="button" className="btn btn-light btn-icon waves-effect shadow-none"><i className="ri-align-right"></i></button>
                                            <button type="button" className="btn btn-light btn-icon waves-effect shadow-none"><i className="ri-align-center"></i></button>
                                            <button type="button" className="btn btn-light btn-icon waves-effect shadow-none"><i className="ri-align-left"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                show == "GROUP" && (
                                    <div className="code-view mt-2">
                                        <pre className="language-markup">
                                            <code>&lt;!-- Buttons Group --&gt;</code><br />
                                            <code>&lt;div className=&quot;btn-group shadow&quot; role=&quot;group&quot; aria-label=&quot;Basic example&quot;&gt;
                                                &lt;button type=&quot;button&quot; className=&quot;btn btn-primary waves-effect waves-light shadow-none&quot;&gt;Left&lt;/button&gt;
                                                &lt;button type=&quot;button&quot; className=&quot;btn btn-primary waves-effect waves-light shadow-none&quot;&gt;Middle&lt;/button&gt;
                                                &lt;button type=&quot;button&quot; className=&quot;btn btn-primary waves-effect waves-light shadow-none&quot;&gt;Right&lt;/button&gt;
                                                &lt;/div&gt;</code><br />

                                            <code>&lt;div className=&quot;btn-group shadow&quot; role=&quot;group&quot; aria-label=&quot;Basic example&quot;&gt;
                                                &lt;button type=&quot;button&quot; className=&quot;btn btn-light btn-icon waves-effect shadow-none&quot;&gt;&lt;i className=&quot;ri-align-right&quot;&gt;&lt;/i&gt;&lt;/button&gt;
                                                &lt;button type=&quot;button&quot; className=&quot;btn btn-light btn-icon waves-effect shadow-none&quot;&gt;&lt;i className=&quot;ri-align-center&quot;&gt;&lt;/i&gt;&lt;/button&gt;
                                                &lt;button type=&quot;button&quot; className=&quot;btn btn-light btn-icon waves-effect shadow-none&quot;&gt;&lt;i className=&quot;ri-align-left&quot;&gt;&lt;/i&gt;&lt;/button&gt;
                                                &lt;/div&gt;</code></pre>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>

                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Icon Buttons</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("ICON")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Use <code>btn-icon</code> className to wrap icon in button</p>
                            <div className="live-preview">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="hstack gap-2 ">
                                            <button type="button" className="btn btn-primary btn-icon waves-effect waves-light"><i className="ri-map-pin-line"></i></button>
                                            <button type="button" className="btn btn-danger btn-icon waves-effect waves-light"><i className="ri-delete-bin-5-line"></i></button>
                                            <button type="button" className="btn btn-success btn-icon waves-effect waves-light"><i className="ri-check-double-line"></i></button>
                                            <button type="button" className="btn btn-light btn-icon waves-effect"><i className="ri-brush-2-fill"></i></button>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="hstack gap-2 mt-4 mt-sm-0">
                                            <button type="button" className="btn btn-outline-primary btn-icon waves-effect waves-light shadow-none"><i className="ri-24-hours-fill"></i></button>
                                            <button type="button" className="btn btn-outline-danger btn-icon waves-effect waves-light shadow-none"><i className="ri-customer-service-2-line"></i></button>
                                            <button type="button" className="btn btn-outline-success btn-icon waves-effect waves-light shadow-none"><i className="ri-mail-send-line"></i></button>
                                            <button type="button" className="btn btn-outline-warning btn-icon waves-effect waves-light shadow-none"><i className="ri-menu-2-line"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                show == "ICON" && (
                                    <div className="code-view mt-2">
                                        <pre className="language-markup">
                                            <code>&lt;!-- Buttons Group --&gt;</code><br />
                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-primary waves-effect waves-light&quot;&gt;&lt;i className=&quot;ri-map-pin-line&quot;&gt;&lt;/i&gt;&lt;/button&gt;</code><br />
                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-danger btn-icon waves-effect waves-light&quot;&gt;&lt;i className=&quot;ri-delete-bin-5-line&quot;&gt;&lt;/i&gt;&lt;/button&gt;</code><br />
                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-success btn-icon waves-effect waves-light&quot;&gt;&lt;i className=&quot;ri-check-double-line&quot;&gt;&lt;/i&gt;&lt;/button&gt;</code><br />
                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-light btn-icon waves-effect&quot;&gt;&lt;i className=&quot;ri-brush-2-fill&quot;&gt;&lt;/i&gt;&lt;/button&gt;</code><br />

                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-outline-primary btn-icon waves-effect waves-light shadow-none&quot;&gt;&lt;i className=&quot;ri-24-hours-fill&quot;&gt;&lt;/i&gt;&lt;/button&gt;</code><br />
                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-outline-danger btn-icon waves-effect waves-light shadow-none&quot;&gt;&lt;i className=&quot;ri-customer-service-2-line&quot;&gt;&lt;/i&gt;&lt;/button&gt;</code><br />
                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-outline-success btn-icon waves-effect waves-light shadow-none&quot;&gt;&lt;i className=&quot;ri-mail-send-line&quot;&gt;&lt;/i&gt;&lt;/button&gt;</code><br />
                                            <code>&lt;button type=&quot;button&quot; className=&quot;btn btn-outline-warning btn-icon waves-effect waves-light shadow-none&quot;&gt;&lt;i className=&quot;ri-menu-2-line&quot;&gt;&lt;/i&gt;&lt;/button&gt;</code></pre><br />
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
                                <table className="doc-table col-lg-6"><thead><tr><th>Name</th><th>Element</th></tr></thead><tbody><tr><td>p-button</td><td>Button element</td></tr><tr><td>p-button-icon</td><td>Icon element</td></tr><tr><td>p-button-text</td><td>Label element of the button</td></tr></tbody></table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FooterHashTag />
        </>
    )
}
