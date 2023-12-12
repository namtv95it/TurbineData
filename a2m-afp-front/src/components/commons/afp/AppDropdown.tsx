import React, { useState, useEffect } from 'react';
import $ from "jquery";

type DataModel = {
    label: string,
    value: any
}

type SelectModel = {
    sources: any[],
    bindLabel: string,
    bindValue: any,
    value?: any,
    onChange: (data?: any) => void,
    disabled?: boolean,
}

export default function AppDropdown(props: SelectModel) {

    const [datas, setDataSource] = useState(props.sources);
    const [valueView, setValueView] = useState(null);
    const [value, setValue] = useState(props.value);

    // const [disable, setDisable] = useState(props.disabled)

    useEffect(() =>{
        // $('body').on('click', '.select-trigger', function(e) {
        //     e.stopPropagation();
        //     // close any open select menus
        //     $('.select-option-list.active').not($(this).siblings('.select-option-list')).removeClass('active');
          
        //     // toggle the clicked select menu
        //     $(this).siblings('.select-option-list').toggleClass('active');
        // });
          
        // $('body').on('click', '.select-option', function(e) {
        //     e.stopPropagation();
        //     var text = $(this).text();
        //     $(this).closest('.select-group').find('.select-trigger .text').text(text).siblings('.placeholder').addClass('remove');
        //     $(this).closest('.select-option-list').removeClass('active');
        // });
          
        // $('body').on('click', function(e) {
        //     if (!$('.select-group').has(e.target).length) {
        //         $('.select-option-list').removeClass('active');
        //     }
        // });
    });

    useEffect(() => {
        setDataSource(props.sources);
    }, [props.sources])

    useEffect(() => {
        let temp = props.sources.find(ele => ele[props.bindValue] == props.value);
        if (temp){
            setValueView(temp[props.bindLabel])
        }
    }, [props.value, props.sources]);


    const onSelectOption = (event: any, data: any) => {
        props.onChange(data[props.bindValue]);
        $(event.target).closest('.select-group').find('.select-trigger .text').text(data[props.bindLabel]).siblings('.placeholder').addClass('remove');
        $(event.target).closest('.select-option-list').removeClass('active');
    }

    // useEffect(() => {
    //     setDisable(props.disabled)
    // }, [props.disabled])

    const onClickSelect = (event: any) => {
        $('.select-option-list.active').not($(event.target).siblings('.select-option-list')).removeClass('active');
        $(event.target).siblings('.select-option-list').toggleClass('active');
    }

    return (
        <div className="select-group">
            <div className="select-trigger" onClick={(event) => onClickSelect(event)}>
                {
                    valueView !== null && valueView !== undefined ? "" : <span className="placeholder">선택하세요</span>
                }
                <span className="text">{valueView}</span>
                <div className="arrow"></div>
            </div>
            <div className="select-option-list">
                {
                    datas.map((ele, idx)=> (
                        <span key={idx} className="select-option" onClick={(event) => onSelectOption(event, ele)}>{ele[props.bindLabel]}</span>
                    ))
                }
            </div>
        </div >
    )
}
