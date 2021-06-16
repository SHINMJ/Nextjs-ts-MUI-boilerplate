import { atom, selector } from 'recoil'

export interface IMenu {
  title: string
  id: string
  url?: string
  icon?: string
  expanded?: boolean
  hidden?: boolean
  children?: IMenu[]
  level: number
  auth: 'read' | 'edit' | 'none'
}

export const menusState = atom({
  key: 'menusState',
  default: [] as IMenu[],
})

export const currentMenuState = atom({
  key: 'currentMenuState',
  default: {} as IMenu,
})

export const menuAuthSelect = selector({
  key: 'menuAuthSelect',
  get: ({ get }) => {
    const current = get(currentMenuState)
    return current?.auth || 'none'
  },
})
