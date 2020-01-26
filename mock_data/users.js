const User = require('../models/user')

const arr = [
    {
        username: 'kuband',
        password: '5910545833',
        displayName: 'KUBand',
        accessType: 'club',
        avatarURl: 'https://scontent.fbkk22-1.fna.fbcdn.net/v/t31.0-8/913957_540038519399895_1074698814_o.jpg?_nc_cat=101&_nc_eui2=AeF7qiZikqeeuE0hlZteTMPlps_bwxitbHk6eaaVWbosVhSLU69t0TFddrZBSzvYOPwRQbq_lc5CyX_Slrdbq2rvCS_4fbFAVWkRmd36od20ow&_nc_ohc=VdDFKI0OUAAAX8HNkZV&_nc_ht=scontent.fbkk22-1.fna&oh=99db65f5322ef348e0e780805c52f621&oe=5E9969BD'
    },
    {
        username: 'kuapp',
        password: '113',
        displayName: 'สำนัคบริการคอมพิวเตอร์',
        accessType: 'admin',
        avatarURl: 'https://scontent.fbkk22-1.fna.fbcdn.net/v/t31.0-8/913957_540038519399895_1074698814_o.jpg?_nc_cat=101&_nc_eui2=AeF7qiZikqeeuE0hlZteTMPlps_bwxitbHk6eaaVWbosVhSLU69t0TFddrZBSzvYOPwRQbq_lc5CyX_Slrdbq2rvCS_4fbFAVWkRmd36od20ow&_nc_ohc=VdDFKI0OUAAAX8HNkZV&_nc_ht=scontent.fbkk22-1.fna&oh=99db65f5322ef348e0e780805c52f621&oe=5E9969BD'
    },
    {
        username: '4uburger',
        password: '112',
        displayName: '4UBurger',
        accessType: 'store',
        avatarURl: 'https://scontent.fbkk22-1.fna.fbcdn.net/v/t31.0-8/913957_540038519399895_1074698814_o.jpg?_nc_cat=101&_nc_eui2=AeF7qiZikqeeuE0hlZteTMPlps_bwxitbHk6eaaVWbosVhSLU69t0TFddrZBSzvYOPwRQbq_lc5CyX_Slrdbq2rvCS_4fbFAVWkRmd36od20ow&_nc_ohc=VdDFKI0OUAAAX8HNkZV&_nc_ht=scontent.fbkk22-1.fna&oh=99db65f5322ef348e0e780805c52f621&oe=5E9969BD'
    },
    {
        username: 'jamie',
        password: '112',
        displayName: 'jamie',
        avatarURl: 'https://scontent.fbkk22-1.fna.fbcdn.net/v/t31.0-8/913957_540038519399895_1074698814_o.jpg?_nc_cat=101&_nc_eui2=AeF7qiZikqeeuE0hlZteTMPlps_bwxitbHk6eaaVWbosVhSLU69t0TFddrZBSzvYOPwRQbq_lc5CyX_Slrdbq2rvCS_4fbFAVWkRmd36od20ow&_nc_ohc=VdDFKI0OUAAAX8HNkZV&_nc_ht=scontent.fbkk22-1.fna&oh=99db65f5322ef348e0e780805c52f621&oe=5E9969BD'
    },
    {
        username: 'mond',
        password: '123',
        displayName: 'mond'
    },
    {
        username: 'paul',
        password: '113',
        displayName: 'paul'
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
