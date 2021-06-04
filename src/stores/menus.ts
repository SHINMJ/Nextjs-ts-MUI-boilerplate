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
}

export const menusState = atom({
  key: 'menusState',
  default: [] as IMenu[],
})

export const currentMenuState = atom({
  key: 'currentMenuState',
  default: {} as IMenu,
})
