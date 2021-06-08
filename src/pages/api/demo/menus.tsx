import { NextApiRequest, NextApiResponse } from 'next'

export default (_: NextApiRequest, res: NextApiResponse) => {
  const menus = [
    {
      title: '설정관리',
      id: 'menu_1',
      icon: 'settings',
      level: 1,
      children: [
        {
          title: '이용약관 관리',
          id: 'menu_1_sub_1',
          icon: 'assignment',
          url: '/terms',
          level: 2,
        },
        {
          title: '게시판1 서브 2',
          id: 'menu_1_sub_2',
          url: '/board/skin_2',
          level: 2,
        },
      ],
    },
    {
      title: '게시판2',
      id: 'menu_2',
      icon: 'home',
      level: 1,
      children: [
        {
          title: '게시판2 서브 1',
          id: 'menu_2_sub_1',
          url: '/board/skin_3',
          level: 2,
        },
      ],
    },
    {
      title: '통계',
      id: 'menu_3',
      icon: 'home',
      url: '/statistics',
      level: 1,
    },
  ]

  res.status(200).json(JSON.stringify(menus))
}
