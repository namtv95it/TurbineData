import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import React, { useState } from 'react'
import { addLocale } from 'primereact/api';
import FooterHashTag from '../common/FooterHashTag';

export default function DateSample() {
    const [date, setDate] = useState<any>(null);

    const [show, setShow] = useState('')

    const [datetime12h, setDateTime12h] = useState<any>(null);
    const [datetime24h, setDateTime24h] = useState<any>(null);
    const [time, setTime] = useState<any>(null);

    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Limpiar'
    });

    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Calendar</h4>

                        </div>
                        <div className="card-body">
                            <p className="text-muted">Calendar, also known as DatePicker, is a form component to work with dates.</p>
                            <pre className="language-jsx"><code className="language-jsx">
                                <span className="token keyword">import</span> <span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span> Calendar <span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span> <span className="token keyword">from</span> <span className="token string">'primereact/calendar'</span><span className="token punctuation">;</span>
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
                            <p className="text-muted">Text to display on a button is defined with the label property.</p>
                            <div className="flex justify-content-center">
                                <Calendar value={date} onChange={(e: CalendarChangeEvent) => setDate(e.value)} />
                            </div>
                            {
                                show == "Basic" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Calendar</span></span> <span className="token attr-name">value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>date<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">onChange</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation">(</span><span className="token parameter">e</span><span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token function">setDate</span><span className="token punctuation">(</span>e<span className="token punctuation">.</span>value<span className="token punctuation">)</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token punctuation">/&gt;</span></span>
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
                            <h4 className="card-title mb-0 flex-grow-1">Format</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("Format")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Default date format is mm/dd/yy which can be customized using the dateFormat property. Following options can be a part of the format.</p>
                            <div className="flex justify-content-center">
                                <Calendar value={date} onChange={(e: CalendarChangeEvent) => setDate(e.value)} dateFormat="dd/mm/yy" />
                            </div>
                            <div className="flex justify-content-center mt-2">
                                <ul className="mb-4 line-height-4"><li><i>d</i> - day of month (no leading zero)</li><li><i>dd</i> - day of month (two digit)</li><li><i>o</i> - day of the year (no leading zeros)</li><li><i>oo</i> - day of the year (three digit)</li><li><i>D</i> - day name short</li><li><i>DD</i> - day name long</li><li><i>m</i> - month of year (no leading zero)</li><li><i>mm</i> - month of year (two digit)</li><li><i>M</i> - month name short</li><li><i>MM</i> - month name long</li><li><i>y</i> - year (two digit)</li><li><i>yy</i> - year (four digit)</li><li><i>@</i> - Unix timestamp (ms since 01/01/1970)</li><li><i>!</i> - Windows ticks (100ns since 01/01/0001)</li><li><i>'...'</i> - literal text</li><li><i>''</i> - single quote</li><li><i>anything else</i> - literal text</li></ul>
                            </div>
                            {
                                show == "Format" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Calendar</span></span> <span className="token attr-name">value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>date<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">onChange</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation">(</span><span className="token parameter">e</span><span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token function">setDate</span><span className="token punctuation">(</span>e<span className="token punctuation">.</span>value<span className="token punctuation">)</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>
                                                    <span className="token attr-name"> dateFormat</span>
                                                    <span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>dd/mm/yy<span className="token punctuation">"</span></span>
                                                    <span className="token punctuation">/&gt;</span></span>
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
                            <h4 className="card-title mb-0 flex-grow-1">Locale</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("Locale")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Locale based settings such as labels, dateFormat and firstDayOfWeek are derived from the global Locale configuration. In case, a certain calendar needs to be customized, locale property can be used to override the global setting.</p>
                            <div className="flex justify-content-center">
                                <Calendar value={date} onChange={(e: CalendarChangeEvent) => setDate(e.value)} locale="es" />
                            </div>

                            <div>
                                import {'{ '} addLocale {' }'} from 'primereact/api';<br />
                                addLocale('es', {'{ '} <br />
                                &nbsp;&nbsp;&nbsp;firstDayOfWeek: 1,<br />
                                &nbsp;&nbsp;&nbsp;dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],<br />
                                &nbsp;&nbsp;&nbsp;dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],<br />
                                &nbsp;&nbsp;&nbsp;dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],<br />
                                &nbsp;&nbsp;&nbsp;monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],<br />
                                &nbsp;&nbsp;&nbsp;monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],<br />
                                &nbsp;&nbsp;&nbsp;today: 'Hoy',<br />
                                &nbsp;&nbsp;&nbsp;clear: 'Limpiar'<br />
                                {' }'});
                            </div>
                            {
                                show == "Locale" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Calendar</span></span> <span className="token attr-name">value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>date<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">onChange</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation">(</span><span className="token parameter">e</span><span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token function">setDate</span><span className="token punctuation">(</span>e<span className="token punctuation">.</span>value<span className="token punctuation">)</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>
                                                    <span className="token attr-name"> locale</span>
                                                    <span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>es<span className="token punctuation">"</span></span>
                                                    <span className="token punctuation">/&gt;</span></span>
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
                            <h4 className="card-title mb-0 flex-grow-1">Icon</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("Icon")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">An additional icon is displayed next to the input field when showIcon is present.</p>
                            <div className="flex justify-content-center">
                                <Calendar value={date} onChange={(e: CalendarChangeEvent) => setDate(e.value)} showIcon />
                            </div>
                            {
                                show == "Icon" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Calendar</span></span> <span className="token attr-name">value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>date<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">onChange</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation">(</span><span className="token parameter">e</span><span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token function">setDate</span><span className="token punctuation">(</span>e<span className="token punctuation">.</span>value<span className="token punctuation">)</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>
                                                    <span className="token attr-name"> showIcon</span>
                                                    <span className="token punctuation">/&gt;</span></span>
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
                            <h4 className="card-title mb-0 flex-grow-1">Range</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("Range")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">A range of dates can be selected by defining selectionMode as range, in this case the bound value would be an array with two values where first date is the start of the range and second date is the end.</p>
                            <div className="flex justify-content-center">
                                <Calendar value={date} onChange={(e: CalendarChangeEvent) => setDate(e.value)} selectionMode="range" readOnlyInput />
                            </div>
                            {
                                show == "Range" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Calendar</span></span> <span className="token attr-name">value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>date<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">onChange</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation">(</span><span className="token parameter">e</span><span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token function">setDate</span><span className="token punctuation">(</span>e<span className="token punctuation">.</span>value<span className="token punctuation">)</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>
                                                    <span className="token attr-name"> selectionMode</span>
                                                    <span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>range<span className="token punctuation">"</span></span>
                                                    <span className="token attr-name"> readOnlyInput</span>
                                                    <span className="token punctuation">/&gt;</span></span>
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
                            <h4 className="card-title mb-0 flex-grow-1">Button Bar</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("ButtonBar")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">When showButtonBar is present, today and clear buttons are displayed at the footer.</p>
                            <div className="flex justify-content-center">
                                <Calendar value={date} onChange={(e: CalendarChangeEvent) => setDate(e.value)} showButtonBar />
                            </div>
                            {
                                show == "ButtonBar" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Calendar</span></span> <span className="token attr-name">value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>date<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">onChange</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation">(</span><span className="token parameter">e</span><span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token function">setDate</span><span className="token punctuation">(</span>e<span className="token punctuation">.</span>value<span className="token punctuation">)</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>
                                                    <span className="token attr-name"> showButtonBar</span>
                                                    <span className="token punctuation">/&gt;</span></span>
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
                            <h4 className="card-title mb-0 flex-grow-1">Time</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("Time")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">A time picker is displayed when showTime is enabled where 12/24 hour format is configured with hourFormat property. In case, only time needs to be selected, add timeOnly to hide the date section.</p>
                            <div className="d-flex flex-wrap gap-3 p-fluid">
                                <div className="flex-auto">
                                    <label htmlFor="calendar-12h" className="font-bold block mb-2">
                                        12h Format
                                    </label>
                                    <Calendar id="calendar-12h" value={datetime12h} onChange={(e) => setDateTime12h(e.value)} showTime hourFormat="12" />
                                </div>
                                <div className="flex-auto">
                                    <label htmlFor="calendar-24h" className="font-bold block mb-2">
                                        24h Format
                                    </label>
                                    <Calendar id="calendar-24h" value={datetime24h} onChange={(e) => setDateTime24h(e.value)} showTime hourFormat="24" />
                                </div>
                                <div className="flex-auto">
                                    <label htmlFor="calendar-timeonly" className="font-bold block mb-2">
                                        Time Only
                                    </label>
                                    <Calendar id="calendar-timeonly" value={time} onChange={(e) => setTime(e.value)} timeOnly />
                                </div>
                            </div>
                            {
                                show == "Time" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Calendar</span></span> <span className="token attr-name">value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>datetime12h<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">onChange</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation">(</span><span className="token parameter">e</span><span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token function">setDateTime12h</span><span className="token punctuation">(</span>e<span className="token punctuation">.</span>value<span className="token punctuation">)</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>
                                                    <span className="token attr-name"> showTime</span>
                                                    <span className="token attr-name"> hourFormat</span>
                                                    <span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>12<span className="token punctuation">"</span></span>
                                                    <span className="token punctuation">/&gt;</span></span><br />

                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Calendar</span></span> <span className="token attr-name">value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>datetime24h<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">onChange</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation">(</span><span className="token parameter">e</span><span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token function">setDateTime24h</span><span className="token punctuation">(</span>e<span className="token punctuation">.</span>value<span className="token punctuation">)</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>
                                                    <span className="token attr-name"> showTime</span>
                                                    <span className="token attr-name"> hourFormat</span>
                                                    <span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>24<span className="token punctuation">"</span></span>
                                                    <span className="token punctuation">/&gt;</span></span><br />


                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Calendar</span></span> <span className="token attr-name">value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>time<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">onChange</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation">(</span><span className="token parameter">e</span><span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token function">setTime</span><span className="token punctuation">(</span>e<span className="token punctuation">.</span>value<span className="token punctuation">)</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>
                                                    <span className="token attr-name"> timeOnly </span>
                                                    <span className="token punctuation">/&gt;</span></span>
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
                            <h4 className="card-title mb-0 flex-grow-1">Month Picker</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("MonthPicker")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Month only picker is enabled by specifying view as month in addition to a suitable dateFormat.</p>
                            <div className="flex justify-content-center">
                                <Calendar value={date} onChange={(e: CalendarChangeEvent) => setDate(e.value)} view="month" dateFormat="mm/yy" />
                            </div>
                            {
                                show == "MonthPicker" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Calendar</span></span> <span className="token attr-name">value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>date<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">onChange</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation">(</span><span className="token parameter">e</span><span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token function">setDate</span><span className="token punctuation">(</span>e<span className="token punctuation">.</span>value<span className="token punctuation">)</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>
                                                    <span className="token attr-name"> dateFormat</span>
                                                    <span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"
                                                    </span>mm/yy<span className="token punctuation">"</span></span>

                                                    <span className="token attr-name"> view</span>
                                                    <span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"
                                                    </span>month<span className="token punctuation">"</span></span>
                                                    <span className="token punctuation">/&gt;</span></span>
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
                            <h4 className="card-title mb-0 flex-grow-1">Date Picker</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("YearPicker")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Specifying view as date in addition to a suitable dateFormat enables the date picker.</p>
                            <div className="flex justify-content-center">
                                <Calendar value={date} onChange={(e: CalendarChangeEvent) => setDate(e.value)} view="date" dateFormat="dd" />
                            </div>
                            {
                                show == "YearPicker" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Calendar</span></span> <span className="token attr-name">value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>date<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">onChange</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation">(</span><span className="token parameter">e</span><span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token function">setDate</span><span className="token punctuation">(</span>e<span className="token punctuation">.</span>value<span className="token punctuation">)</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>
                                                    <span className="token attr-name"> dateFormat</span>
                                                    <span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"
                                                    </span>dd<span className="token punctuation">"</span></span>

                                                    <span className="token attr-name"> view</span>
                                                    <span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"
                                                    </span>date<span className="token punctuation">"</span></span>
                                                    <span className="token punctuation">/&gt;</span></span>
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
                            <h4 className="card-title mb-0 flex-grow-1">Inline</h4>
                            <div className="flex-shrink-0">
                                <label onClick={() => setShow("Inline")} className="text-muted cus-cursor">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Calendar is displayed as a popup by default, add inline property to customize this behavior.</p>
                            <div className="flex justify-content-center">
                                <Calendar value={date} onChange={(e: CalendarChangeEvent) => setDate(e.value)} inline showWeek />
                            </div>
                            {
                                show == "Inline" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Calendar</span></span> <span className="token attr-name">value</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span>date<span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span> <span className="token attr-name">onChange</span><span className="token script language-javascript"><span className="token script-punctuation punctuation">=</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "{" }}></span><span className="token punctuation">(</span><span className="token parameter">e</span><span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token function">setDate</span><span className="token punctuation">(</span>e<span className="token punctuation">.</span>value<span className="token punctuation">)</span><span className="token punctuation" dangerouslySetInnerHTML={{ __html: "}" }}></span></span>
                                                    <span className="token attr-name"> inline</span>


                                                    <span className="token attr-name"> showWeek </span>

                                                    <span className="token punctuation">/&gt;</span></span>
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
                                <Calendar className='p-invalid' value={date} onChange={(e: CalendarChangeEvent) => setDate(e.value)} />
                            </div>
                            {
                                show == "Invalid" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Calendar</span></span> <span className="token attr-name">className</span><span className="token attr-value"><span className="token punctuation attr-equals">=</span><span className="token punctuation">"</span>p-invalid<span className="token punctuation">"</span></span> <span className="token punctuation">/&gt;</span></span>
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
                                <Calendar disabled value={date} onChange={(e: CalendarChangeEvent) => setDate(e.value)} />
                            </div>
                            {
                                show == "Disabled" && (
                                    <div className="code-view mt-2">
                                        <pre className='language-tsx'>
                                            <code className="pt-5 language-jsx">
                                                <span className="token tag"><span className="token tag"><span className="token punctuation">&lt;</span><span className="token className-name">Calendar</span></span> <span className="token attr-name">disabled</span> <span className="token punctuation">/&gt;</span></span>
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
                            <table className="doc-table col-lg-6"><thead><tr><th>Name</th><th>Element</th></tr></thead><tbody><tr><td>p-calendar</td><td>Main container element</td></tr><tr><td>p-calendar-w-btn</td><td>Main container element when button is enabled.</td></tr><tr><td>p-calendar-timeonly</td><td>Main container element in time picker only mode.</td></tr><tr><td>p-inputtext</td><td>Input element</td></tr><tr><td>p-datepicker</td><td>Datepicker element</td></tr><tr><td>p-datepicker-inline</td><td>Datepicker element in inline mode</td></tr><tr><td>p-monthpicker</td><td>Datepicker element in month view.</td></tr><tr><td>p-monthpicker-month</td><td>Month cell in month view mode.</td></tr><tr><td>p-datepicker-touch-ui</td><td>Datepicker element in touch ui mode.</td></tr><tr><td>p-datepicker-calendar</td><td>Table containing dates of a month.</td></tr><tr><td>p-datepicker-current-day</td><td>Cell of selected date.</td></tr><tr><td>p-datepicker-today</td><td>Cell of today's date.</td></tr></tbody></table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FooterHashTag />
        </>
    )
}
