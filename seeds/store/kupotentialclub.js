const mongoose = require('mongoose')
const User = mongoose.model('User')
const Article = mongoose.model('Article')

let user = {
  username: 'kupotential',
  loginType: 'normal',
  password: '123456',
  displayName: 'KU Potential Club',
  role: 'store',
  avatarURL: 'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-9/84346910_2232643480171387_247239238343458816_n.jpg?_nc_cat=100&_nc_sid=85a577&_nc_oc=AQnU8l690Jq5muk7o4B4hQEQ2c159Y0s0MEkuegRnSMb87B6p-anQ0UqatDv20XA-is&_nc_ht=scontent.fbkk2-8.fna&oh=04c455da260fbcedb6d89bb2a0b1e257&oe=5EBC9989',
  active: true,
  bio: 'ชมรมที่จัดตั้งขึ้นมาเพื่อพัฒนาศักยภาพด้านต่าง ๆ ให้กับนักศึกษามหาวิทยาลัยเกษตรศาสตร์โดยใช้ธรรมมะเป็นแนววทาในการสอน ขึ้นตรงกับวัดที่ใคร ๆ ก็รู้จัก ซึ่งนั้นก็คือ วัดธรรมกาย',
  email: 'kupotentialclub@ku.th',
  firstName: 'KUPotentialClub',
  lastName: 'KUPotentialClub',
  mobilePhone: '0951923921',
  contacts: 'มหาวิทยาลัยเกาตรศาสตร์',
}

let articles = [
  {
    title: '🔥 ด่วน !! รู้ Passion ตัวเองทันที !',
    description:
      `คอร์สนี้เหมาะสำหรับ

      ... คนที่กำลังหาเป้าหมายชีวิต
      ... คนที่กำลังลังเลทางที่เลือก
      ... คนที่อยากตรวจสอบเป้าหมาย
      ... ทุกคนที่กำลังอ่านอยู่ ^^
      
สมัครเล้ยยยยย https://bit.ly/2HaLXDZ
      `,
    articleType: 'news',
    newsType: 'club',
    imageURL: 'https://scontent.fbkk22-3.fna.fbcdn.net/v/t1.0-9/86376255_2258413247594410_9110489137990860800_o.jpg?_nc_cat=103&_nc_sid=8024bb&_nc_eui2=AeHF-0-d1eg0iIOe8TJ9jAvu0UmYvHhit47RSZi8eGK3js5mZ3Kmuc8h-INj-y9ea38n1s1ZuwaxMm6uJh_j8qG-&_nc_oc=AQkRJN2iLtQYeK6TPGnnnpVWQgljL229Ru1lpQWkoMDXs5CuuH4XH_is3btlfDxJ3B0&_nc_ht=scontent.fbkk22-3.fna&oh=cbe2190b976e652dd09869b2039348c9&oe=5ED5B6DD',
    author: '5e9814f6f2300524bf542f1c',
    tags: ['ทั่วไป', 'ความรัก']
  },
  {
    title: 'เปิดรับสมัคร STAFF : Potential Day 2020 🌟',
    description:
      ` เปิดรับสมัคร STAFF : Potential Day 2020 🌟 พื้นที่งัดศักยภาพและความสามารถของน้อง ๆ ให้ได้เป็นผู้สร้างสรรค์งานนี้ โดยไม่มีกรอบใด ๆ (ซึ่งงานจะจัดวันที่ 3 มีนาคม 63) 
👤 พร้อมพี่ ๆ คอยให้คำแนะนำ
ดูฝ่ายและรายละเอียดเพิ่มเติมได้ในลิ้งค์ลงทะเบียนโล้ดดดดด
ลงทะเบียนสมัครเล้ยยยย https://forms.gle/JPgynaaUVWJMQBGGA
สอบถามเพิ่มเติม Facebook: KU Pontential Club
      `,
    articleType: 'news',
    newsType: 'club',
    imageURL: 'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-9/83842485_2239797029456032_5609525539694968832_o.jpg?_nc_cat=105&_nc_sid=110474&_nc_eui2=AeFb5hf98gBy0XsiN1e4Yu09COVkkZUkQa0I5WSRlSRBrTQ2C7XbgZ-zAL0Xe0tgi1Xrfn4dlwR9mkMjtJxbq5KM&_nc_oc=AQlqkd3qRzbekUEgqZlRpFcENJqvvW-q8Cj6YNdVpPfncK-upJalmpVsXdsOItMuPUo&_nc_ht=scontent.fbkk22-2.fna&oh=575b50c5749b682c4ec21407d451a6aa&oe=5ED2ADE4',
    author: '5e9814f6f2300524bf542f1c',
    tags: ['ทั่วไป', 'ความรัก']
  }
]

const insertMany = async () => {
  const createdUser = new User(user)
  await createdUser.setPassword(user.password)
  await createdUser.save()
  for (const article of articles) {
    const createdArticle = new Article(article)
    createdArticle.author = createdUser
    await createdArticle.save()
  }
}

module.exports = insertMany