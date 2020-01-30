const User = require('../models/user')

const arr = [
    {
        username: 'kuphoto',
        password: '5910545833',
        displayName: 'KU Photo CLUB',
        accessType: 'club',
        avatarURl: 'https://scontent-sin2-1.xx.fbcdn.net/v/t1.0-9/39700613_2009471645785153_2911180338476613632_o.jpg?_nc_cat=111&_nc_ohc=WD9vW0dJfLQAX-emlap&_nc_ht=scontent-sin2-1.xx&oh=637e5e10ad6cc72ea50796e1fb3e3912&oe=5EDBCA78',
        email: 'test@ku.ac.th',
        mobilePhone: '0936784333',
        category: 'ประเทืองปัญญา',
        description: 'ถ่ายรูป',
        owner: 'KU',
        address: 'kasetsart university',
        fbPage: 'https://www.facebook.com/kuphotoclub/posts/2948291431903165',
        follower: [],
        active: true
    },
    {
        username: 'kuarsa',
        password: '12345',
        displayName: 'ชมรมค่ายอาสาพัฒนา มหาวิทยาลัยเกษตรศาสตร์',
        accessType: 'club',
        avatarURl: 'https://scontent-sin2-1.xx.fbcdn.net/v/t1.0-9/52487965_2114158535340833_6446977534587305984_n.jpg?_nc_cat=107&_nc_ohc=NftJ9AOLqvgAX9wTsi7&_nc_ht=scontent-sin2-1.xx&oh=4b3fd45f966a89c6526be8a7abbe4ecd&oe=5EDA2211',
        email: 'test@ku.ac.th',
        mobilePhone: '0936784333',
        category: 'พัฒนาตัวเอง',
        description: 'ช่วยเหลือชุมชน',
        owner: 'KU',
        address: 'kasetsart university',
        fbPage: 'https://www.facebook.com/kuvolunteergroup/posts/2510919652331384',
        follower: [],
        active: true
    },
    {
        username: 'kuapp',
        password: '1134',
        displayName: 'ประชาสัมพันธ์ มหาวิทยาลัยเกษตรศาสตร์',
        accessType: 'admin',
        avatarURl: 'https://scontent-sin2-1.xx.fbcdn.net/v/t31.0-8/178263_465729813479359_751914567_o.jpg?_nc_cat=102&_nc_ohc=nmeXmwEglM0AX9ipmdt&_nc_ht=scontent-sin2-1.xx&oh=483fa9033e60715e0704f98d5595f25f&oe=5EDAABD8',
        email: 'test@ku.ac.th'
    },
    {
        username: 'kumaku',
        password: '1123',
        displayName: 'Kuma Shabu',
        accessType: 'store',
        avatarURl: 'https://scontent-sin2-1.xx.fbcdn.net/v/t1.0-9/22852956_928949130588509_1852747991864105926_n.jpg?_nc_cat=106&_nc_ohc=ITUyP0zNi0UAX-UZAXG&_nc_ht=scontent-sin2-1.xx&oh=09f93774b423f65323b2396324af82ae&oe=5ED878D2',
        email: 'test@ku.ac.th',
        mobilePhone: '0936784333',
        category: 'ชาบู',
        description: 'บุฟเฟ่ 299',
        owner: 'KU',
        address: 'kasetsart university',
        fbPage: 'https://www.facebook.com/KumaShabu/posts/1496956427121107',
        follower: [],
        active: true
    },
    {
        username: 'jamie',
        password: '112',
        displayName: 'jamie',
        avatarURl: 'https://scontent.fbkk22-1.fna.fbcdn.net/v/t31.0-8/913957_540038519399895_1074698814_o.jpg?_nc_cat=101&_nc_eui2=AeF7qiZikqeeuE0hlZteTMPlps_bwxitbHk6eaaVWbosVhSLU69t0TFddrZBSzvYOPwRQbq_lc5CyX_Slrdbq2rvCS_4fbFAVWkRmd36od20ow&_nc_ohc=VdDFKI0OUAAAX8HNkZV&_nc_ht=scontent.fbkk22-1.fna&oh=99db65f5322ef348e0e780805c52f621&oe=5E9969BD',
        email: 'test@ku.ac.th',
        mobilePhone: '0946878555',
        active: true,
        description: 'ซอฟต์แวร์และความรู้',
        following: []
    },
    {
        username: 'mond',
        password: '123',
        displayName: 'mond',
        email: 'test@ku.ac.th',
        mobilePhone: '0946878555',
        active: true,
        description: 'ซอฟต์แวร์และความรู้',
        following: []
    },
    {
        username: 'paul',
        password: '113',
        displayName: 'paul',
        email: 'test@ku.ac.th',
        mobilePhone: '0946878555',
        active: true,
        description: 'ซอฟต์แวร์และความรู้',
        following: []
    }
]
function insertManyData() {
    for (const user of arr) {
        const testUser = new User(
            user
        )
        testUser.save(function (err) {
            if (err) throw err;
            console.log("User has been saved to User collection!")
        });
    }
}

insertManyData()
