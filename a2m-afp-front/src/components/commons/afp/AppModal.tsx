import React, { Fragment } from 'react'

type ModalProps = {
    open: boolean,
    title?: string,
    children: React.ReactNode,
    titleIcon?: string, //example: "xi-bookmark"
    onClose: (data?: any) => void
}

export default function AppModal(props: ModalProps) {

    const { open, title, children, titleIcon, onClose } = props

    const handleClickClose = () => {
        onClose(false)
    }

    return (
        <div className={`modal ${open ? 'open' : ''}`}>
            <div className="modal-cont">
                {title != undefined ? 
                    <h1 className="modal-tit">
                        {title}
                        {
                            titleIcon != undefined ? <i className={titleIcon}></i> : <Fragment />
                        }
                    </h1> : <Fragment />}
                {children}
                <button className="close-btn" onClick={handleClickClose}></button>
            </div>
        </div>
    )
}
