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
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'

            },
            {
                name: 'menu.doctor.manage-schedule',
                link: '/doctor/manage-schedule'
            }




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

export const doctorMenu = [
    {
        name: 'menu.doctor.manage-schedule',
        menus: [
            {
                name: 'menu.doctor.schedule', link: '/doctor/manage-schedule'
            }
        ]
    }
];
