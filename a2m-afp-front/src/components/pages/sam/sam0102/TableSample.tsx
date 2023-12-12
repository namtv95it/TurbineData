import React, { useState, useRef } from 'react'
import FooterHashTag from '../common/FooterHashTag'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SelectButton } from 'primereact/selectbutton';
import { InputSwitch } from 'primereact/inputswitch';
import { Toast } from 'primereact/toast';

export default function TableSample() {

    const [show, setShow] = useState('')
    const [metaKey, setMetaKey] = useState<any>(true);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [selectedCell, setSelectedCell] = useState<any>(null);

    const toast = useRef<any>(null);

    const data = [
        { code: "TABLE01", name: "Table sample 01", category: "Front end", quantity: "1" },
        { code: "TABLE02", name: "Table sample 02", category: "Front end", quantity: "2" },
        { code: "TABLE03", name: "Table sample 03", category: "Front end", quantity: "3" },
        { code: "TABLE04", name: "Table sample 04", category: "Front end", quantity: "4" },
        { code: "TABLE05", name: "Table sample 05", category: "Front end", quantity: "5" }
    ]

    const onRowSelect = (event: any) => {
        toast.current.show({ severity: 'info', summary: 'Product Selected', detail: `Name: ${event.data.name}`, life: 3000 });
    };

    const onRowUnselect = (event: any) => {
        toast.current.show({ severity: 'warn', summary: 'Product Unselected', detail: `Name: ${event.data.name}`, life: 3000 });
    };

    const columns = [
        { field: 'code', header: 'Code' },
        { field: 'name', header: 'Name' },
        { field: 'category', header: 'Category' },
        { field: 'quantity', header: 'Quantity' }
    ];

    const [products, setProducts] = useState(data);

    const [sizeOptions] = useState<any>([
        { label: 'Small', value: 'small' },
        { label: 'Normal', value: 'normal' },
        { label: 'Large', value: 'large' }
    ]);
    const [size, setSize] = useState(sizeOptions[1].value);


    return (
        <>
            <Toast ref={toast} />
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">DataTable</h4>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">DataTable displays data in tabular format.</p>
                            <pre className="language-jsx">
                                <code className="language-jsx">
                                    <span className="token keyword">import</span> <span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span> DataTable <span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span> <span className="token keyword">from</span> <span className="token string">'primereact/datatable'</span><span className="token punctuation">;</span><br />
                                    <span className="token keyword">import</span> <span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span> Column <span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span> <span className="token keyword">from</span> <span className="token string">'primereact/column'</span><span className="token punctuation">;</span>
                                </code>
                            </pre>
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
                                <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="code" header="Code"></Column>
                                    <Column field="name" header="Name"></Column>
                                    <Column field="category" header="Category"></Column>
                                    <Column field="quantity" header="Quantity"></Column>
                                </DataTable>
                            </div>
                            {
                                show == "Basic" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">DataTable</span></span> <span className="token attr-name">value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>products<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">tableStyle</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span> <span className="token literal-property property">minWidth</span><span className="token operator">:</span> <span className="token string">'50rem'</span> <span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>code<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Code<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>name<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Name<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>category<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Category<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>quantity<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Quantity<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">DataTable</span></span><span className="token punctuation">&gt;</span></span>
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
                            <h4 className="card-title mb-0 flex-grow-1">Dynamic Columns</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("DynamicColumns")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Columns can be created programmatically.</p>
                            <div className="flex justify-content-center">
                                <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                                    {columns.map((col: any, i: number) => (
                                        <Column key={col.field} field={col.field} header={col.header} />
                                    ))}
                                </DataTable>
                            </div>
                            {
                                show == "DynamicColumns" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">DataTable</span></span> <span className="token attr-name">value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>products<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">tableStyle</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span> <span className="token literal-property property">minWidth</span><span className="token operator">:</span> <span className="token string">'50rem'</span> <span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text">
                                                </span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>columns<span className="token punctuation">.</span><span className="token function">map</span><span className="token punctuation">(</span><span className="token punctuation">(</span><span className="token parameter">col<span className="token punctuation">,</span> i</span><span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token punctuation">(</span>
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">key</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>col<span className="token punctuation">.</span>field<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">field</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>col<span className="token punctuation">.</span>field<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">header</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>col<span className="token punctuation">.</span>header<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token punctuation">/&gt;</span></span>
                                                <span className="token punctuation">)</span><span className="token punctuation">)</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span><span className="token plain-text">
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">DataTable</span></span><span className="token punctuation">&gt;</span></span>
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
                            <h4 className="card-title mb-0 flex-grow-1">Size</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("Size")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">In addition to a regular table, alternatives with alternative sizes are available.</p>
                            <p className="text-muted">Size in small, normal, large</p>
                            <div className="flex justify-content-center">
                                <SelectButton value={size} onChange={(e: any) => setSize(e.value)} options={sizeOptions} />
                                <DataTable className='mt-2' value={products} size={size} tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="code" header="Code"></Column>
                                    <Column field="name" header="Name"></Column>
                                    <Column field="category" header="Category"></Column>
                                    <Column field="quantity" header="Quantity"></Column>
                                </DataTable>
                            </div>
                            {
                                show == "Size" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">DataTable</span></span> <span className="token attr-name">value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>products<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>
                                                    <span className="token attr-name"> size</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>size<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>
                                                    <span className="token attr-name"> tableStyle</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span> <span className="token literal-property property">minWidth</span><span className="token operator">:</span> <span className="token string">'50rem'</span> <span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>code<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Code<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>name<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Name<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>category<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Category<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>quantity<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Quantity<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">DataTable</span></span><span className="token punctuation">&gt;</span></span>
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
                            <h4 className="card-title mb-0 flex-grow-1">Grid Lines</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("GridLines")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Enabling showGridlines displays borders between cells.</p>
                            <div className="flex justify-content-center">
                                <DataTable value={products} showGridlines tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="code" header="Code"></Column>
                                    <Column field="name" header="Name"></Column>
                                    <Column field="category" header="Category"></Column>
                                    <Column field="quantity" header="Quantity"></Column>
                                </DataTable>
                            </div>
                            {
                                show == "GridLines" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">DataTable</span></span> <span className="token attr-name">value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>products<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>
                                                    <span className="token attr-name"> showGridlines </span>

                                                    <span className="token attr-name">tableStyle</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span> <span className="token literal-property property">minWidth</span><span className="token operator">:</span> <span className="token string">'50rem'</span> <span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>code<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Code<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>name<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Name<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>category<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Category<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>quantity<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Quantity<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">DataTable</span></span><span className="token punctuation">&gt;</span></span>
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
                            <h4 className="card-title mb-0 flex-grow-1">Striped Rows</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("StripedRows")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Alternating rows are displayed when stripedRows property is present.</p>
                            <div className="flex justify-content-center">
                                <DataTable value={products} stripedRows tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="code" header="Code"></Column>
                                    <Column field="name" header="Name"></Column>
                                    <Column field="category" header="Category"></Column>
                                    <Column field="quantity" header="Quantity"></Column>
                                </DataTable>
                            </div>
                            {
                                show == "StripedRows" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">DataTable</span></span> <span className="token attr-name">value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>products<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>
                                                    <span className="token attr-name"> stripedRows </span>

                                                    <span className="token attr-name">tableStyle</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span> <span className="token literal-property property">minWidth</span><span className="token operator">:</span> <span className="token string">'50rem'</span> <span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>code<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Code<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>name<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Name<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>category<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Category<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>quantity<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Quantity<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">DataTable</span></span><span className="token punctuation">&gt;</span></span>
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
                            <h4 className="card-title mb-0 flex-grow-1">Sort</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("SingleColumn")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Single Column</p>
                            <p className="text-muted">Sorting on a column is enabled by adding the sortable property.</p>
                            <div className="flex justify-content-center">
                                <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="code" sortable header="Code"></Column>
                                    <Column field="name" sortable header="Name"></Column>
                                    <Column field="category" sortable header="Category"></Column>
                                    <Column field="quantity" sortable header="Quantity"></Column>
                                </DataTable>
                            </div>
                            {
                                show == "SingleColumn" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">DataTable</span></span> <span className="token attr-name">value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>products<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>
                                                    <span className="token attr-name"> tableStyle</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span> <span className="token literal-property property">minWidth</span><span className="token operator">:</span> <span className="token string">'50rem'</span> <span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name"> sortable </span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>code<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Code<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name"> sortable </span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>name<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Name<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name"> sortable </span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>category<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Category<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name"> sortable </span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>quantity<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Quantity<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">DataTable</span></span><span className="token punctuation">&gt;</span></span>
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
                            <h4 className="card-title mb-0 flex-grow-1">Sort</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("MultipleColumns")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Multiple Columns</p>
                            <p className="text-muted">Multiple columns can be sorted by defining sortMode as multiple. This mode requires metaKey (e.g. ⌘) to be pressed when clicking a header.</p>
                            <div className="flex justify-content-center">
                                <DataTable value={products} sortMode="multiple" tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="code" sortable header="Code"></Column>
                                    <Column field="name" sortable header="Name"></Column>
                                    <Column field="category" sortable header="Category"></Column>
                                    <Column field="quantity" sortable header="Quantity"></Column>
                                </DataTable>
                            </div>
                            {
                                show == "MultipleColumns" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">DataTable</span></span> <span className="token attr-name">value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>products<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>
                                                    <span className="token attr-name"> sortMode </span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>multiple<span className="token punctuation">"</span></span>

                                                    <span className="token attr-name"> tableStyle</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span> <span className="token literal-property property">minWidth</span><span className="token operator">:</span> <span className="token string">'50rem'</span> <span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name"> sortable </span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>code<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Code<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name"> sortable </span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>name<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Name<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name"> sortable </span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>category<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Category<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name"> sortable </span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>quantity<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Quantity<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">DataTable</span></span><span className="token punctuation">&gt;</span></span>
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
                            <h4 className="card-title mb-0 flex-grow-1">Row Selection</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("Single")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Single row selection is enabled by defining selectionMode as single along with a value binding using selection and onSelectionChange properties. When available, it is suggested to provide a unique identifier of a row with dataKey to optimize performance.</p>
                            <p className="text-muted">By default, metaKey press (e.g. ⌘) is necessary to unselect a row however this can be configured with disabling the metaKeySelection property. In touch enabled devices this option has no effect and behavior is same as setting it to false.</p>
                            <div className="flex justify-content-center">
                                <div className="flex justify-content-center align-items-center mb-4 gap-2">
                                    <InputSwitch inputId="input-metakey" checked={metaKey} onChange={(e) => setMetaKey(e.value)} />
                                    <label className='ms-2' htmlFor="input-metakey">MetaKey</label>
                                </div>
                                <DataTable value={products} selectionMode="single" selection={selectedProduct}
                                    onSelectionChange={(e) => setSelectedProduct(e.value)} dataKey="code"
                                    metaKeySelection={metaKey} tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="code" header="Code"></Column>
                                    <Column field="name" header="Name"></Column>
                                    <Column field="category" header="Category"></Column>
                                    <Column field="quantity" header="Quantity"></Column>
                                </DataTable>
                            </div>
                            {
                                show == "Single" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">DataTable</span></span>
                                                    <span className="token attr-name"> value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>products<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>

                                                    <span className="token attr-name"> selection</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>selectedProduct<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>
                                                    <span className="token attr-name"> metaKeySelection</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>metaKey<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>

                                                    <span className="token attr-name"> selectionMode</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "'" }}></span>single<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "'" }}></span></span>
                                                    <span className="token attr-name"> dataKey</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "'" }}></span>code<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "'" }}></span></span><br />

                                                    <span className="token attr-name"> onSelectionChange</span>
                                                    <span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation">(</span><span className="token parameter">e</span><span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token function">setSelectedProduct</span><span className="token punctuation">(</span>e<span className="token punctuation">.</span>value<span className="token punctuation">)</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>

                                                    <span className="token attr-name"> tableStyle</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span> <span className="token literal-property property">minWidth</span><span className="token operator">:</span> <span className="token string">'50rem'</span> <span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>code<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Code<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>name<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Name<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>category<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Category<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>quantity<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Quantity<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">DataTable</span></span><span className="token punctuation">&gt;</span></span>
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
                            <h4 className="card-title mb-0 flex-grow-1">Events</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("Events")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">DataTable provides onRowSelect and onRowUnselect events to listen selection events.</p>
                            <div className="flex justify-content-center">
                                <DataTable value={products} selectionMode="single" selection={selectedProduct} onSelectionChange={(e) => setSelectedProduct(e.value)} dataKey="code"
                                    onRowSelect={onRowSelect} onRowUnselect={onRowUnselect} metaKeySelection={false} tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="code" header="Code"></Column>
                                    <Column field="name" header="Name"></Column>
                                    <Column field="category" header="Category"></Column>
                                    <Column field="quantity" header="Quantity"></Column>
                                </DataTable>
                            </div>
                            {
                                show == "Events" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">DataTable</span></span>
                                                    <span className="token attr-name"> value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>products<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>

                                                    <span className="token attr-name"> selection</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>selectedProduct<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>
                                                    <span className="token attr-name"> metaKeySelection</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>false<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>

                                                    <span className="token attr-name"> selectionMode</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "'" }}></span>single<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "'" }}></span></span>
                                                    <span className="token attr-name"> dataKey</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "'" }}></span>code<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "'" }}></span></span>

                                                    <span className="token attr-name"> onRowSelect</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>onRowSelect<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span><br />
                                                    <span className="token attr-name"> onRowUnselect</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>onRowUnselect<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>

                                                    <span className="token attr-name"> onSelectionChange</span>
                                                    <span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation">(</span><span className="token parameter">e</span><span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token function">setSelectedProduct</span><span className="token punctuation">(</span>e<span className="token punctuation">.</span>value<span className="token punctuation">)</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>

                                                    <span className="token attr-name"> tableStyle</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span> <span className="token literal-property property">minWidth</span><span className="token operator">:</span> <span className="token string">'50rem'</span> <span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>code<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Code<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>name<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Name<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>category<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Category<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>quantity<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Quantity<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">DataTable</span></span><span className="token punctuation">&gt;</span></span>
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
                            <h4 className="card-title mb-0 flex-grow-1">Cell Selection</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("CellSelection")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Single cell selection is enabled by adding cellSelection, defining selectionMode as single along with a value binding using selection and onSelectionChange properties. The type of the selection would beDataTableCellSelection that provides information about the cell such as cellIndex and rowIndex.</p>
                            <p className="text-muted">By default, metaKey press (e.g. ⌘) is necessary to unselect a cell however this can be configured with disabling the metaKeySelection property. In touch enabled devices this option has no effect and behavior is same as setting it to false.</p>
                            <div className="flex justify-content-center">
                                <div className="flex justify-content-center align-items-center mb-4 gap-2">
                                    <InputSwitch inputId="input-metakey" checked={metaKey} onChange={(e) => setMetaKey(e.value)} />
                                    <label className='ms-2' htmlFor="input-metakey">MetaKey</label>
                                </div>
                                <DataTable value={products} cellSelection selectionMode="single" selection={selectedCell}
                                    onSelectionChange={(e) => setSelectedCell(e.value)} metaKeySelection={metaKey} tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="code" header="Code"></Column>
                                    <Column field="name" header="Name"></Column>
                                    <Column field="category" header="Category"></Column>
                                    <Column field="quantity" header="Quantity"></Column>
                                </DataTable>
                            </div>
                            {
                                show == "CellSelection" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">DataTable</span></span>
                                                    <span className="token attr-name"> value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>products<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>
                                                    <span className="token attr-name"> cellSelection</span>
                                                    <span className="token attr-name"> selection</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>selectedCell<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>
                                                    <span className="token attr-name"> metaKeySelection</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>false<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>

                                                    <span className="token attr-name"> selectionMode</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "'" }}></span>single<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "'" }}></span></span>



                                                    <span className="token attr-name"> onSelectionChange</span>
                                                    <span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation">(</span><span className="token parameter">e</span><span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token function">setSelectedCell</span><span className="token punctuation">(</span>e<span className="token punctuation">.</span>value<span className="token punctuation">)</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>


                                                    <span className="token attr-name"> tableStyle</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span> <span className="token literal-property property">minWidth</span><span className="token operator">:</span> <span className="token string">'50rem'</span> <span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>code<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Code<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>name<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Name<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>category<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Category<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Column</span></span> <span className="token attr-name">field</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>quantity<span className="token punctuation">"</span></span> <span className="token attr-name">header</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>Quantity<span className="token punctuation">"</span></span><span className="token punctuation">&gt;</span></span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">Column</span></span><span className="token punctuation">&gt;</span></span><span className="token plain-text"><br />
                                                </span><span className="token tag"><span className="token tag"><span className="token punctuation">&lt;/</span><span className="token className-name">DataTable</span></span><span className="token punctuation">&gt;</span></span>
                                            </code>
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
