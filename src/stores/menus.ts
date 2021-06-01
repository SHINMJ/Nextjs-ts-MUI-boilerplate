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

export const menus = selector({
  key: 'menus',
  get: ({ get }) => ({
    total: get(menusState).length,
    menus: get(menusState),
  }),
})
