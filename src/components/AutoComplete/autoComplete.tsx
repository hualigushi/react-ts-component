import React, { FC, useState, ChangeEvent, ReactElement, KeyboardEvent, useEffect, useRef } from 'react'
import classnames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

interface DataSourceOject {
    value: string;
}
export type DataSourceType<T = {}> = T & DataSourceOject
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void
    renderOption?: (item: DataSourceType) => ReactElement
}

const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const {
        fetchSuggestions,
        onSelect,
        value,
        renderOption,
        ...restProps
    } = props
    const [inputValue, setInputValue] = useState(value as string)
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
    const [loading, setLoading] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)

    const [highlightIndex, setHignlightIndex] = useState(-1)
    const triggerSearch = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)

    const debounceValue = useDebounce(inputValue, 500)
    useClickOutside(componentRef, () => { setSuggestions([]) })

    useEffect(() => {
        if (debounceValue && triggerSearch.current) {
            setSuggestions([])
            const results = fetchSuggestions(debounceValue)
            if (results instanceof Promise) {
                setLoading(true)
                results.then(data => {
                    setLoading(false)
                    setSuggestions(data)
                    if (data.length > 0) {
                        setShowDropdown(true)
                    }
                })
            } else {
                setSuggestions(results)
                setShowDropdown(true)
            }
        } else {
            setShowDropdown(false)
        }
        setHignlightIndex(-1)
    }, [debounceValue, fetchSuggestions])

    const highlight = (index: number) => {
        if (index < 0) index = 0
        if (index > suggestions.length) {
            index = suggestions.length - 1
        }
        setHignlightIndex(index)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'Enter':
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex])
                }
                break
            case 'ArrowUp':
                highlight(highlightIndex - 1)
                break
            case 'ArrowDown':
                highlight(highlightIndex + 1)
                break
            case 'Escape':
                setShowDropdown(false)
                break
            default:
                break
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        triggerSearch.current = true
    }

    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setShowDropdown(false)
        if (onSelect) {
            onSelect(item)
        }
        triggerSearch.current = false
    }

    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }

    const generateDropdown = () => {
        return (
            // <Transition
            //     in={showDropdown || loading}
            //     animation="zoom-in-top"
            //     timeout={300}
            //     onExited={() => { setSuggestions([]) }}
            // >
                <ul className="money-suggestion-list">
                    {
                        loading && <div className="suggstions-loading-icon">
                            <Icon icon="spinner" spin />
                        </div>
                    }
                    {
                        suggestions.map((item, index) => {
                            const cnames = classnames('suggestion-item', {
                                'is-active': index === highlightIndex
                            })
                            return (
                                <li key={index} className={cnames} onClick={() => handleSelect(item)}>
                                    {renderTemplate(item)}
                                </li>
                            )
                        })
                    }
                </ul>
            // </Transition>
        )
    }
    return (
        <div className="money-auto-complete" ref={componentRef}>
            <Input value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...restProps} />

            {
                generateDropdown()
            }
        </div>
    )
}
export default AutoComplete;