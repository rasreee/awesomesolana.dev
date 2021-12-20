/* eslint-disable @typescript-eslint/ban-types */
export type Merge<T, P> = P & Omit<T, keyof P>

export type UnionStringArray<T extends Readonly<string[]>> = T[number]

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type LiteralUnion<T extends U, U = string> = T | (U & { _?: never })

export type AnyFunction<T = any> = (...args: T[]) => any

export type FunctionArguments<T extends Function> = T extends (...args: infer R) => any ? R : never

export type Dict<T = any> = Record<string, T>

export type Booleanish = boolean | 'true' | 'false'
export type StringOrNumber = string | number

export type ColoringProps = { bg: string; txt: string; _hoverBg: string; _activeBg: string; border: string }

export type FetcherOptions = { limit: number }
