const User = require('../models/user')

const arr = [
    {
        password: '5910545833',
        displayName: 'KU Photo CLUB',
        accessType: 'club',
        avatarURL: 'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-9/260348_165282603537409_3541000_n.jpg?_nc_cat=105&_nc_ohc=mspb4GiagJoAX8yWtDv&_nc_ht=scontent.fbkk22-2.fna&oh=5426f69d27aea9252b12f6f3d0d86472&oe=5EF9B923',
        email: 'kuphoto@ku.ac.th',
        mobilePhone: '0936784333',
        category: 'ประเทืองปัญญา',
        description: 'ถ่ายรูป',
        owner: 'KU',
        address: 'kasetsart university',
        fbPage: 'https://www.facebook.com/kuphotoclub/posts/2948291431903165',
        follower: [],
        likeNews:[],
        likeCommunity:[],
        active: true
    },
    {
        password: '12345',
        displayName: 'ชมรมค่ายอาสาพัฒนา มหาวิทยาลัยเกษตรศาสตร์',
        accessType: 'club',
        avatarURL: 'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-9/14650254_1138459696244060_4004163000038598621_n.jpg?_nc_cat=107&_nc_ohc=i3qpVduwFDgAX9MZXl_&_nc_ht=scontent.fbkk22-2.fna&oh=5202616cffd8fd265e4c7a71cef53a5e&oe=5F033CD1',
        email: 'kuarsa@ku.ac.th',
        mobilePhone: '0936784333',
        category: 'พัฒนาตัวเอง',
        description: 'ช่วยเหลือชุมชน',
        owner: 'KU',
        address: 'kasetsart university',
        fbPage: 'https://www.facebook.com/kuvolunteergroup/posts/2510919652331384',
        follower: [],
        likeNews:[],
        likeCommunity:[],
        active: true
    },
    {
        password: '1134',
        displayName: 'ประชาสัมพันธ์ มหาวิทยาลัยเกษตรศาสตร์',
        accessType: 'admin',
        avatarURL: 'https://upload.wikimedia.org/wikipedia/commons/9/97/KU_Logo.png',
        email: 'kuapp@ku.ac.th'
    },
    {
        password: '1123',
        displayName: 'Kuma Shabu',
        accessType: 'store',
        avatarURL: 'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-9/15027487_715730821910342_9089226803614118721_n.jpg?_nc_cat=105&_nc_ohc=OxtWbIhGyz8AX8dEmaX&_nc_ht=scontent.fbkk22-2.fna&oh=0ac5b0182b2eba39d555878cfdc66b1c&oe=5EB74E90',
        email: 'kumaku@ku.ac.th',
        mobilePhone: '0936784333',
        category: 'ชาบู',
        description: 'บุฟเฟ่ 299',
        owner: 'KU',
        address: 'kasetsart university',
        fbPage: 'https://www.facebook.com/KumaShabu/posts/1496956427121107',
        follower: [],
        likeNews:[],
        likeCommunity:[],
        active: true
    },
    {
        password: '112',
        displayName: 'jamie',
        avatarURL: 'https://scontent.fbkk2-5.fna.fbcdn.net/v/t1.0-1/c0.0.820.820a/66686017_1125283600997160_4542151837934944256_n.jpg?_nc_cat=110&_nc_oc=AQmNpBihC6kLplVjqVJTIrCFMMm59mZi4qLk9VaYlJEaVjaWaGnRNVpvjGEXBl3tINA&_nc_ht=scontent.fbkk2-5.fna&oh=326e11cf10014a155dd953be098951f0&oe=5E90FC5F',
        email: 'jamie@ku.ac.th',
        mobilePhone: '0946878555',
        active: true,
        description: 'ซอฟต์แวร์และความรู้',
        following: [],
        likeNews:[],
        likeCommunity:[]
    },
    {
        password: '123',
        displayName: 'mond',
        email: 'mond@ku.ac.th',
        mobilePhone: '0946878555',
        active: true,
        description: 'ซอฟต์แวร์และความรู้',
        likeNews:[],
        likeCommunity:[],
        following: []
    },
    {
        password: '113',
        displayName: 'paul',
        email: 'paul@ku.ac.th',
        mobilePhone: '0946878555',
        active: true,
        description: 'ซอฟต์แวร์และความรู้',
        likeNews:[],
        likeCommunity:[],
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
