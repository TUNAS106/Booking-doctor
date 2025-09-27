import { link } from "fs";

export const adminMenu = [
    { //người dùng
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'

            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'

            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/user-manage'

            },

            {
                name: 'menu.admin.manage-admin', link: '/system/user-manage'

            },


        ]
    },
    { //phóng khám
        name: 'menu.admin.manage-clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/user-clinic'

            }
        ]
    },
    { //chuyên khoa
        name: 'menu.admin.manage-specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/user-specialty'
            }
        ]
    },
    { //cẩm nang
        name: 'menu.admin.manage-handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/user-handbook'
            }
        ]
    }
];