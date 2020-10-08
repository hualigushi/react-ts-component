import React,{FC,ButtonHTMLAttributes,AnchorHTMLAttributes} from 'react'
import classnames from 'classnames'

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary'| 'default'| 'danger'| 'link'

interface BaseButtonProps {
    className?: string;
    /**设置 Button 的禁用 */
    disabled?: boolean;
    /**设置 Button 的尺寸 */
    size?: ButtonSize;
    /**设置 Button 的类型 */
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string
}

type NativeBttonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeBttonProps & AnchorButtonProps>

/**
 * 这是第一个 Button 组件
 *  
 */
export const Button: FC<ButtonProps> = (props) => {
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