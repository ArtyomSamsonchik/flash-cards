import { ElementRef, forwardRef } from 'react'

import getClassNames, { ClassesObj } from '@/app/helpers/get-class-names'
import { Input, InputAdornment, InputProps, InputSlot, InputSlotModifier } from '@/app/ui/input'
import { CloseIcon } from '@/icons/close-icon'
import { SearchIcon } from '@/icons/search-icon'

import s from './search-input.module.scss'

type SearchInputSlot = 'button' | 'closeIcon' | 'searchIcon' | InputSlot
export type SearchInputClasses = ClassesObj<SearchInputSlot, InputSlotModifier>

type OwnProps = {
  classes?: SearchInputClasses
  onResetValue?: () => void
}

type SearchInputProps = OwnProps & Omit<InputProps, 'type' | keyof OwnProps>

export const SearchInput = forwardRef<ElementRef<'input'>, SearchInputProps>(
  ({ classes, disabled, error, onResetValue, ...props }, ref) => {
    const cls = getClassNames(
      ['root', 'input', 'button', 'searchIcon', 'closeIcon'] as SearchInputSlot[],
      { disabled, error }
    )(s, classes)

    return (
      <Input
        classes={cls}
        disabled={disabled}
        endAdornment={
          onResetValue && (
            <InputAdornment position={'end'}>
              <button className={cls.button} onClick={() => onResetValue()}>
                <CloseIcon className={cls.closeIcon} />
              </button>
            </InputAdornment>
          )
        }
        error={error}
        ref={ref}
        startAdornment={
          <InputAdornment position={'start'}>
            <SearchIcon className={cls.searchIcon} />
          </InputAdornment>
        }
        type={'search'}
        {...props}
      ></Input>
    )
  }
)
