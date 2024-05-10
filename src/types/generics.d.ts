export type DeepReadonly<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> }
export type DeepPartial<T> = Partial<{ [P in keyof T]: DeepPartial<T[P]> }>
export type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> }
