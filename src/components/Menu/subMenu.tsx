import React, { useState, FunctionComponentElement, useContext } from 'react'
import classnames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import Icon from '../Icon/icon'
export interface SubMenuProps {
    index?: string
    title: string
    className?: string
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, className, children }) => {
    const context = useContext(MenuContext)
    const openSubmenus = context.defaultOpenSubMenus as Array<string>
    const isOpened = (index && context.mode === 'vertical') ? openSubmenus.includes(index) : false
    const [menuOpen, setOpen] = useState(isOpened)
    const classes = classnames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    })
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setOpen(!menuOpen)
    }
    let timer: any
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        timer && clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setOpen(toggle)
        }, 300)
    }
    const clickEvents = context.mode === 'vertical' ? { onClick: handleClick } : {}
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true)
        },
        onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false)
        }
    } : {}
    const renderChildren = () => {
        const subMenuClasses = classnames('money-submenu', {
            'menu-opened': menuOpen
        })
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                })
            } else {
                console.log("Warning: Submenu has a child which is not a MenuItem")
            }
        })
        return (
            <CSSTransition unmountOnExit={true}
            in={menuOpen} timeout={300} classNames="zoom-in-top" appear>
                <ul className={subMenuClasses}>
                    {childrenComponent}
                </ul>
            </CSSTransition>

        )
    }
    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>
                {title}
                <Icon icon="angle-down" className="arrow-icon" />
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = "SubMenu"
export default SubMenu