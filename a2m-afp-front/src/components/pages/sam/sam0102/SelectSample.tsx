import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import React, { useState } from 'react'
import FooterHashTag from '../common/FooterHashTag';

interface City {
    name: string;
    code: string;
}

export default function SelectSample() {

    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [show, setShow] = useState('')
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Dropdown</h4>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Dropdown also known as Select, is used to choose an item from a collection of options.</p>
                            <pre className="language-jsx"><code className="language-jsx">
                                <span className="token keyword">import</span> <span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span> Dropdown <span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span> <span className="token keyword">from</span> <span className="token string">'primereact/dropdown'</span><span className="token punctuation">;</span>
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
                            <p className="text-muted">Dropdown is used as a controlled component with value and onChange properties along with an options collection. Label and value of an option are defined with the optionLabel and optionValue properties respectively. Default property name for the optionLabel is label and value for the optionValue. If optionValue is omitted and the object has no value property, the object itself becomes the value of an option. Note that, when options are simple primitive values such as a string array, no optionLabel and optionValue would be necessary.</p>
                            <div className="flex justify-content-center">
                                <Dropdown value={selectedCity} onChange={(e: DropdownChangeEvent) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                                    placeholder="Select a City" className="w-full md:w-14rem" />
                            </div>
                            {
                                show == "Basic" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Dropdown</span></span> <span className="token attr-name">value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>selectedCity<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">onChange</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation">(</span><span className="token parameter">e</span><span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token function">setSelectedCity</span><span className="token punctuation">(</span>e<span className="token punctuation">.</span>value<span className="token punctuation">)</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">options</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>cities<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">optionLabel</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>name<span className="token punctuation">"</span></span>
                                                    <span className="token attr-name">placeholder</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Select a City<span className="token punctuation">"</span></span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>w-full md:w-14rem<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span>
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
                            <h4 className="card-title mb-0 flex-grow-1">Editable</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("Editable")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">When editable is present, the input can also be entered with typing.</p>
                            <div className="flex justify-content-center">
                                <Dropdown value={selectedCity} onChange={(e: DropdownChangeEvent) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                                    editable placeholder="Select a City" className="w-full md:w-14rem" />
                            </div>
                            {
                                show == "Editable" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Dropdown</span></span> <span className="token attr-name">value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>selectedCity<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">onChange</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation">(</span><span className="token parameter">e</span><span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token function">setSelectedCity</span><span className="token punctuation">(</span>e<span className="token punctuation">.</span>value<span className="token punctuation">)</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">options</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>cities<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">optionLabel</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>name<span className="token punctuation">"</span></span>
                                                    <span className="token attr-name"> editable </span><span className="token attr-name">placeholder</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Select a City<span className="token punctuation">"</span></span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>w-full md:w-14rem<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span>
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
                            <h4 className="card-title mb-0 flex-grow-1">Filter</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("Filter")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Dropdown provides built-in filtering that is enabled by adding the filter property.</p>
                            <div className="flex justify-content-center">
                                <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                                    filter placeholder="Select a City" className="w-full md:w-14rem" />
                            </div>
                            {
                                show == "Filter" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Dropdown</span></span> <span className="token attr-name">value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>selectedCity<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">onChange</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation">(</span><span className="token parameter">e</span><span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token function">setSelectedCity</span><span className="token punctuation">(</span>e<span className="token punctuation">.</span>value<span className="token punctuation">)</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">options</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>cities<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">optionLabel</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>name<span className="token punctuation">"</span></span>
                                                    <span className="token attr-name"> filter </span><span className="token attr-name">placeholder</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Select a City<span className="token punctuation">"</span></span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>w-full md:w-14rem<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span>
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
                            <h4 className="card-title mb-0 flex-grow-1">Clear Icon</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("ClearIcon")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">When showClear is enabled, a clear icon is added to reset the Dropdown.</p>
                            <div className="flex justify-content-center">
                                <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                                    showClear placeholder="Select a City" className="w-full md:w-14rem" />
                            </div>
                            {
                                show == "ClearIcon" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Dropdown</span></span> <span className="token attr-name">value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>selectedCity<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">onChange</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation">(</span><span className="token parameter">e</span><span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token function">setSelectedCity</span><span className="token punctuation">(</span>e<span className="token punctuation">.</span>value<span className="token punctuation">)</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">options</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>cities<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">optionLabel</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>name<span className="token punctuation">"</span></span>
                                                    <span className="token attr-name"> showClear </span><span className="token attr-name">placeholder</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Select a City<span className="token punctuation">"</span></span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>w-full md:w-14rem<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span>
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
                                    <Dropdown inputId="dd-city" value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                                        placeholder="Select a City" className="w-full md:w-14rem" />
                                    <label htmlFor="dd-city">Select a City</label>
                                </span>
                            </div>
                            {
                                show == "FloatLabel" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>span</span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>p-float-label<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><br />
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Dropdown</span></span> <span className="token attr-name">value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>selectedCity<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">onChange</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation">(</span><span className="token parameter">e</span><span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token function">setSelectedCity</span><span className="token punctuation">(</span>e<span className="token punctuation">.</span>value<span className="token punctuation">)</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">options</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>cities<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">optionLabel</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>name<span className="token punctuation">"</span></span>
                                                    <span className="token attr-name"> inputId</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>dd-city<span className="token punctuation">" </span></span><span className="token attr-name">placeholder</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Select a City<span className="token punctuation">"</span></span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>w-full md:w-14rem<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span><br />
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span>label</span> <span className="token attr-name">htmlFor</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>dd-city<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span>
                                                <span className="token plain-text">Select a City</span>
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>label</span><span className="token punctuation">&gt;</span></span><br />
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span>span</span><span className="token punctuation">&gt;</span></span>
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
                                <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                                    placeholder="Select a City" className="p-invalid w-full md:w-14rem" />
                            </div>
                            {
                                show == "Invalid" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Dropdown</span></span> <span className="token attr-name">value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>selectedCity<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">onChange</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation">(</span><span className="token parameter">e</span><span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token function">setSelectedCity</span><span className="token punctuation">(</span>e<span className="token punctuation">.</span>value<span className="token punctuation">)</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">options</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>cities<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">optionLabel</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>name<span className="token punctuation">"</span></span>
                                                    <span className="token attr-name">placeholder</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Select a City<span className="token punctuation">"</span></span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>p-invalid w-full md:w-14rem<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span>
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
                                <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                                    disabled placeholder="Select a City" className="w-full md:w-14rem" />
                            </div>
                            {
                                show == "Disabled" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Dropdown</span></span> <span className="token attr-name">disabled</span> <span className="token attr-name">placeholder</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Select a City<span className="token punctuation">"</span></span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>w-full md:w-14rem<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span>
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
                            <div className="doc-tablewrapper"><table className="doc-table col-lg-6"><thead><tr><th>Name</th><th>Element</th></tr></thead><tbody><tr><td>p-dropdown</td><td>Container element.</td></tr><tr><td>p-dropdown-label</td><td>Element to display label of selected option.</td></tr><tr><td>p-dropdown-trigger</td><td>Icon element.</td></tr><tr><td>p-dropdown-panel</td><td>Icon element.</td></tr><tr><td>p-dropdown-items-wrapper</td><td>Wrapper element of items list.</td></tr><tr><td>p-dropdown-items</td><td>List element of items.</td></tr><tr><td>p-dropdown-item</td><td>An item in the list.</td></tr><tr><td>p-dropdown-filter-container</td><td>Container of filter input.</td></tr><tr><td>p-dropdown-filter</td><td>Filter element.</td></tr><tr><td>p-dropdown-open</td><td>Container element when overlay is visible.</td></tr></tbody></table></div>
                        </div>
                    </div>
                </div>
            </div>

            <FooterHashTag />
        </>
    )
}
