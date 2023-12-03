import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ReactElement,
  Ref,
  forwardRef,
} from 'react'

import clsx from 'clsx'

import s from './card.module.scss'

type OwnProps<T extends ElementType> = {
  as?: T
  className?: string
}

type CardProps<T extends ElementType> = OwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof OwnProps<T>>

const CardRender = <T extends ElementType = 'div'>(
  { as, className, ...props }: CardProps<T>,
  ref: Ref<ElementRef<T>>
) => {
  const Component = as || ('div' as string)

  return <Component className={clsx(s.card, className)} ref={ref} {...props} />
}

export const Card = forwardRef(CardRender) as <T extends ElementType = 'div'>(
  props: CardProps<T> & { ref?: Ref<ElementRef<T>> }
) => ReactElement
