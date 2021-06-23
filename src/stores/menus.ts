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

export const flatMenusSelect = selector({
  key: 'flatMenusSelect',
  get: ({ get }) => {
    const menus = get(menusState)

    let flatMenus = []
    const getAllItems = (menu: IMenu) => {
      flatMenus.push(menu)
      if (menu.children) {
        return menu.children.map(i => getAllItems(i))
      }
    }

    menus.forEach(item => {
      getAllItems(item)
    })

    return flatMenus
  },
})
