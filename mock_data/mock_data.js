const News = require('../models/news')
const uniqid = require('uniqid')

const arr = [
    {
        title: 'jamie',
        description: "ชมรม หรือ องค์กรไหนต้องการใช้ห้องสามารถมาจองได้ทุกหน่วยงานเลยน้าาา พี่ๆที่นี้ดูแลมาก และสำคัญที่สุดคือ ห้องเขาดีย์มากกกกก",
        type: 'club',
        name: 'CPE-KU',
        imageURL:'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-9/23561811_1135234089912337_1179326037024457840_n.jpg?_nc_cat=109&_nc_eui2=AeFysjOSF3xWYESqfcW9KoHTtcWYukLTo6KzeQLj_DTyUjTJjzlKkx4RDrPSWYM2daroDOaawb1Ks0fW3Fz9oIYAx2WvwmKFACAYgxcqXPLbjA&_nc_ohc=L_CxCVBf3e4AX_obb7O&_nc_ht=scontent.fbkk22-2.fna&oh=f289d7c81f072c185ad16aac05f3d340&oe=5E9B6E97',
        views: 0,
        comments: [
            {
                id: uniqid(),
                name: 'varit',
                text: 'เอ๋อสัส',
                avatarURl: 'https://scontent.fbkk22-1.fna.fbcdn.net/v/t31.0-8/913957_540038519399895_1074698814_o.jpg?_nc_cat=101&_nc_eui2=AeF7qiZikqeeuE0hlZteTMPlps_bwxitbHk6eaaVWbosVhSLU69t0TFddrZBSzvYOPwRQbq_lc5CyX_Slrdbq2rvCS_4fbFAVWkRmd36od20ow&_nc_ohc=VdDFKI0OUAAAX8HNkZV&_nc_ht=scontent.fbkk22-1.fna&oh=99db65f5322ef348e0e780805c52f621&oe=5E9969BD'
            },
            {
                id: uniqid(),
                name: 'varit',
                text: 'โพเทนเชี่ย',
                avatarURl: 'https://scontent.fbkk22-1.fna.fbcdn.net/v/t31.0-8/913957_540038519399895_1074698814_o.jpg?_nc_cat=101&_nc_eui2=AeF7qiZikqeeuE0hlZteTMPlps_bwxitbHk6eaaVWbosVhSLU69t0TFddrZBSzvYOPwRQbq_lc5CyX_Slrdbq2rvCS_4fbFAVWkRmd36od20ow&_nc_ohc=VdDFKI0OUAAAX8HNkZV&_nc_ht=scontent.fbkk22-1.fna&oh=99db65f5322ef348e0e780805c52f621&oe=5E9969BD'
            }
        ]
    },
    {
        title: 'jamie',
        description: 'potential',
        type: 'club',
        name: 'CPE-KU',
        imageURL: 'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-9/23561811_1135234089912337_1179326037024457840_n.jpg?_nc_cat=109&_nc_eui2=AeFysjOSF3xWYESqfcW9KoHTtcWYukLTo6KzeQLj_DTyUjTJjzlKkx4RDrPSWYM2daroDOaawb1Ks0fW3Fz9oIYAx2WvwmKFACAYgxcqXPLbjA&_nc_ohc=L_CxCVBf3e4AX_obb7O&_nc_ht=scontent.fbkk22-2.fna&oh=f289d7c81f072c185ad16aac05f3d340&oe=5E9B6E97',
        views: 0,
        comments: [
            {
                id: uniqid(),
                name: 'varit',
                text: 'เอ๋อสัส',
                avatarURl: 'https://scontent.fbkk22-1.fna.fbcdn.net/v/t31.0-8/913957_540038519399895_1074698814_o.jpg?_nc_cat=101&_nc_eui2=AeF7qiZikqeeuE0hlZteTMPlps_bwxitbHk6eaaVWbosVhSLU69t0TFddrZBSzvYOPwRQbq_lc5CyX_Slrdbq2rvCS_4fbFAVWkRmd36od20ow&_nc_ohc=VdDFKI0OUAAAX8HNkZV&_nc_ht=scontent.fbkk22-1.fna&oh=99db65f5322ef348e0e780805c52f621&oe=5E9969BD'
            }
        ]
    },
    {
        title: 'varit',
        description: 'assava',
        type: 'universities',
        imageURL: 'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-9/23561811_1135234089912337_1179326037024457840_n.jpg?_nc_cat=109&_nc_eui2=AeFysjOSF3xWYESqfcW9KoHTtcWYukLTo6KzeQLj_DTyUjTJjzlKkx4RDrPSWYM2daroDOaawb1Ks0fW3Fz9oIYAx2WvwmKFACAYgxcqXPLbjA&_nc_ohc=L_CxCVBf3e4AX_obb7O&_nc_ht=scontent.fbkk22-2.fna&oh=f289d7c81f072c185ad16aac05f3d340&oe=5E9B6E97',
        name: 'CPE-KU',
        views: 0,
        comments: [
            {
                id: uniqid(),
                name: 'varit',
                text: 'เอ๋อสัส',
                avatarURl: 'https://scontent.fbkk22-1.fna.fbcdn.net/v/t31.0-8/913957_540038519399895_1074698814_o.jpg?_nc_cat=101&_nc_eui2=AeF7qiZikqeeuE0hlZteTMPlps_bwxitbHk6eaaVWbosVhSLU69t0TFddrZBSzvYOPwRQbq_lc5CyX_Slrdbq2rvCS_4fbFAVWkRmd36od20ow&_nc_ohc=VdDFKI0OUAAAX8HNkZV&_nc_ht=scontent.fbkk22-1.fna&oh=99db65f5322ef348e0e780805c52f621&oe=5E9969BD'
            }
        ]
    },
    {
        title: 'varit',
        description: 'assava',
        type: 'universities',
        imageURL: 'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-9/23561811_1135234089912337_1179326037024457840_n.jpg?_nc_cat=109&_nc_eui2=AeFysjOSF3xWYESqfcW9KoHTtcWYukLTo6KzeQLj_DTyUjTJjzlKkx4RDrPSWYM2daroDOaawb1Ks0fW3Fz9oIYAx2WvwmKFACAYgxcqXPLbjA&_nc_ohc=L_CxCVBf3e4AX_obb7O&_nc_ht=scontent.fbkk22-2.fna&oh=f289d7c81f072c185ad16aac05f3d340&oe=5E9B6E97',
        name: 'CPE-KU',
        views: 0,
        comments: [
            {
                id: uniqid(),
                name: 'varit',
                text: 'เอ๋อสัส',
                avatarURl: 'https://scontent.fbkk22-1.fna.fbcdn.net/v/t31.0-8/913957_540038519399895_1074698814_o.jpg?_nc_cat=101&_nc_eui2=AeF7qiZikqeeuE0hlZteTMPlps_bwxitbHk6eaaVWbosVhSLU69t0TFddrZBSzvYOPwRQbq_lc5CyX_Slrdbq2rvCS_4fbFAVWkRmd36od20ow&_nc_ohc=VdDFKI0OUAAAX8HNkZV&_nc_ht=scontent.fbkk22-1.fna&oh=99db65f5322ef348e0e780805c52f621&oe=5E9969BD'
            }
        ]
    },
    {
        title: 'varit',
        description: 'assava',
        type: 'promotions',
        imageURL: 'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-9/23561811_1135234089912337_1179326037024457840_n.jpg?_nc_cat=109&_nc_eui2=AeFysjOSF3xWYESqfcW9KoHTtcWYukLTo6KzeQLj_DTyUjTJjzlKkx4RDrPSWYM2daroDOaawb1Ks0fW3Fz9oIYAx2WvwmKFACAYgxcqXPLbjA&_nc_ohc=L_CxCVBf3e4AX_obb7O&_nc_ht=scontent.fbkk22-2.fna&oh=f289d7c81f072c185ad16aac05f3d340&oe=5E9B6E97',
        name: 'CPE-KU',
        views: 0,
        comments: [
            {
                id: uniqid(),
                name: 'varit',
                text: 'เอ๋อสัส',
                avatarURl: 'https://scontent.fbkk22-1.fna.fbcdn.net/v/t31.0-8/913957_540038519399895_1074698814_o.jpg?_nc_cat=101&_nc_eui2=AeF7qiZikqeeuE0hlZteTMPlps_bwxitbHk6eaaVWbosVhSLU69t0TFddrZBSzvYOPwRQbq_lc5CyX_Slrdbq2rvCS_4fbFAVWkRmd36od20ow&_nc_ohc=VdDFKI0OUAAAX8HNkZV&_nc_ht=scontent.fbkk22-1.fna&oh=99db65f5322ef348e0e780805c52f621&oe=5E9969BD'
            }
        ]
    },
    {
        title: 'varit',
        description: 'assava',
        type: 'lost-founds',
        imageURL: 'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-9/23561811_1135234089912337_1179326037024457840_n.jpg?_nc_cat=109&_nc_eui2=AeFysjOSF3xWYESqfcW9KoHTtcWYukLTo6KzeQLj_DTyUjTJjzlKkx4RDrPSWYM2daroDOaawb1Ks0fW3Fz9oIYAx2WvwmKFACAYgxcqXPLbjA&_nc_ohc=L_CxCVBf3e4AX_obb7O&_nc_ht=scontent.fbkk22-2.fna&oh=f289d7c81f072c185ad16aac05f3d340&oe=5E9B6E97',
        name: 'CPE-KU',
        views: 0,
        comments: [
            {
                id: uniqid(),
                name: 'varit',
                text: 'เอ๋อสัส',
                avatarURl: 'https://scontent.fbkk22-1.fna.fbcdn.net/v/t31.0-8/913957_540038519399895_1074698814_o.jpg?_nc_cat=101&_nc_eui2=AeF7qiZikqeeuE0hlZteTMPlps_bwxitbHk6eaaVWbosVhSLU69t0TFddrZBSzvYOPwRQbq_lc5CyX_Slrdbq2rvCS_4fbFAVWkRmd36od20ow&_nc_ohc=VdDFKI0OUAAAX8HNkZV&_nc_ht=scontent.fbkk22-1.fna&oh=99db65f5322ef348e0e780805c52f621&oe=5E9969BD'
            }
        ]
    }
]
News.insertMany(arr, function (err, news) {
    if (err) return console.error(err)
    console.log(" saved to collection.")
})

