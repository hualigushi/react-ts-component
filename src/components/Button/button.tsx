import React from 'react'
import classnames from 'classnames'

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary'| 'default'| 'danger'| 'link'

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string
}

type NativeBttonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeBttonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
    const {
        btnType,
        className,
        disabled,
        size,
        children,
        href,
        ...restProps
    } = props
    const classes = classnames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === 'link') && disabled
    })

    if (btnType === 'link' && href) {
        return (
            <a {...restProps} className={classes} href={href}>{children}</a>
        )
    } else {
        return (
            <button {...restProps} className={classes} disabled={disabled}>{children}</button>
        )
    }
}

Button.defaultProps = {
    disabled: false,
    btnType: 'default'
}
export default Button;