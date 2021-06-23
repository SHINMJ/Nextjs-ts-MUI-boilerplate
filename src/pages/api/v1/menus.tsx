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
          auth: 'edit',
        },
      ],
    },
    {
      title: '게시판',
      id: 'menu_2',
      icon: 'home',
      level: 1,
      children: [
        {
          title: '게시판 서브 1',
          id: 'menu_2_sub_1',
          level: 2,
          url: '/board/skin_3',
          auth: 'read',
        },
        {
          title: '게시판2 서브 2',
          id: 'menu_2_sub_2',
          url: '/board/skin_1',
          level: 2,
          auth: 'read',
        },
      ],
    },
    {
      title: '통계',
      id: 'menu_3',
      icon: 'home',
      url: '/statistics',
      level: 1,
      auth: 'read',
    },
  ]

  res.status(200).json(JSON.stringify(menus))
}
