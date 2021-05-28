import { NextApiRequest, NextApiResponse } from 'next'

export default (_: NextApiRequest, res: NextApiResponse) => {
  const menus = [
    {
      title: '설정관리',
      id: 'menu_1',
      icon: 'settings',
      children: [
        {
          title: '설정관리 서브 1',
          id: 'menu_1_sub_1',
          link: '/board/skin_1',
        },
        {
          title: '설정관리 서브 2',
          id: 'menu_1_sub_2',
          link: '/board/skin_2',
        },
      ],
    },
    {
      title: '서비스관리',
      id: 'menu_2',
      icon: 'home',
      children: [
        {
          title: '서비스관리 서브 1',
          id: 'menu_2_sub_1',
          link: '/board/skin_3',
        },
      ],
    },
    {
      title: '통계',
      id: 'menu_3',
      icon: 'home',
      link: '/statistics',
    },
  ]

  res.status(200).json(JSON.stringify(menus))
}
