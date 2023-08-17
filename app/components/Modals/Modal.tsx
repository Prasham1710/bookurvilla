'use client'
import{useEffect, useState, useCallback} from 'react' 
interface ModalProps{
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement
    actionLabel: string;
    disabled?: boolean;
    secondaryAcion?: () => void;
    secondaryLabel?: string;
}
const Modal:React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAcion,
    secondaryLabel
}) => {
    const [ShowModal, setShowModel]= useState(isOpen);

    useEffect(()=> {
        setShowModel(isOpen);
    },[isOpen]);
    const handleClose =useCallback(()=> {
        if (disabled) {
            return;
        }

        setShowModel(false);
        setTimeout(()=> {
            onClose();
        },300 );
    }, [disabled, onClose])

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit();
    },[disabled, onSubmit])

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAcion) {
            return;
        }
        secondaryAcion();
    }, [disabled, secondaryAcion]);
    if (!isOpen){
        return null;
    }
  return (
    <div></div>
  )
}

export default Modal