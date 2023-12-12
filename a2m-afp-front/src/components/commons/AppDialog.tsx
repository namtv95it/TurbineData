// import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
import { Dialog } from 'primereact/dialog';
import React from 'react'

type DialogProps = {
    title?: string
    open: boolean
    width?: {
        maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
        fullWidth?: boolean
        fullScreen?: boolean
    }
    style?: any
    className?: any
    children: React.ReactNode
    onClose: (data?: any) => void
}

export default function AppDialog(props: DialogProps) {
    const { open, className, children, onClose, title, style } = props

    const handleClickClose = () => {
        onClose(false)
    }

    return (
        <>
            {/* <Dialog {...width} className={className} open={open}>
                <DialogTitle sx={{ marginRight: '40px' }}>
                    <div className="mb-sm-0 card-title mb-0 flex-grow-1">{title}</div>
                    <IconButton aria-label="close" onClick={handleClickClose}
                        sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
            </Dialog> */}
            <Dialog header={title} className={className} style={style} visible={open} onHide={() => handleClickClose()}>
                {children}
            </Dialog>
        </>
    )
}
