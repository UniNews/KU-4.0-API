const mongoose = require('mongoose')
const User = mongoose.model('User')
const Article = mongoose.model('Article')

let user = {
  username: 'speakerku',
  loginType: 'normal',
  password: '123456',
  displayName: 'ชมรมส่งเสริมศิลปะการพูด มหาวิทยาลัยเกษตรศาสตร์',
  role: 'store',
  avatarURL: 'https://scontent.fbkk22-6.fna.fbcdn.net/v/t1.0-9/85173085_1222909267898624_7886222703269511168_n.jpg?_nc_cat=104&_nc_sid=8024bb&_nc_eui2=AeFjZOIds9O4nUtdSUCV87UXOnLNI1Gk18s6cs0jUaTXy42J30yIwlExDxsrqvzR8WH9Z3tVfJgNTQg61R-UNjzp&_nc_oc=AQlRHzu50VwvhcErIAFHIkJjoSMTJQXEUNet_p3TCKOfAYDhwvmUPcqW5fs47JesLeM&_nc_ht=scontent.fbkk22-6.fna&oh=d8c8a4f9167c4ec1a4cfa066e1db6292&oe=5ED3E75D',
  active: true,
  bio: `ชมรมส่งเสริมศิลปะการพูด มหาวิทยาลัยเกษตรศาสตร์`,
  email: 'speakerku@ku.th',
  firstName: 'SpeakerKU',
  lastName: 'SpeakerKU',
  mobilePhone: '0951923921',
  contacts: 'มหาวิทยาลัยเกษตรศาสตร์',
}

let articles = [
  {
    title: 'TEDxKasetsartU Call for Speakers 🎙',
    description: `TEDxKasetsartU Call for Speakers 🎙

หากคุณเป็นคนที่ต้องการแชร์ประสบการณ์หรือไอเดียดีๆ
แต่ยังไม่มีพื้นที่ที่จะส่งต่อ
TEDxKasetsartU พร้อมที่จะร่วมแชร์ประสบการณ์และไอเดียของคุณผ่านเวที TEDxKasetsartU 2020
ไม่ว่าคุณจะเป็นนิสิต อาจารย์ หรือบุคลากรของมหาวิทยาลัยเกษตรศาสตร์หรือไม่ ก็สามารถร่วมเป็น Speakers บนเวที TEDxKasetsartU 2020 ได้
มาร่วมกันเป็นส่วนหนึ่งของการส่งต่อเรื่องราวดีๆ
และสร้างความเปลี่ยนแปลงจากสิ่งที่เล็กที่สุดสู่สิ่งที่ยิ่งใหญ่ที่สุดได้บนเวที TEDxKasetsartU 2020
    
การคัดเลือก Speaker จะจัดขึ้นที่ ห้องประชุมประเสริฐ ผลดี ชั้น2 อาคารบุญสม สุวชิรัตน์ ภาควิศวกรรมโยธา
วันที่ 19 มีนาคม 2563 เวลา 17.00-19.00 น.
    
สิ่งที่ผู้สมัครต้องเตรียม
  - เตรียมไอเดียหรือเรื่องราวดีๆ ที่อยากจะส่งต่อผ่านการพูดหรือการเล่าเรื่อง
  - เตรียมความกล้าและความมั่นใจในการบอกเล่าไอเดียหรือเรื่องราวดีๆ ของคุณ
  - เตรียมกำลังใจให้พร้อมจะส่งต่อสิ่งดีๆ ให้กับทุกคน
    
สมัครได้ที่ลิงค์
https://bit.ly/2wXxE3I
    
ตั้งแต่วันนี้ จนถึง 11 มีนาคม 2563

ติดตามข่าวสารได้ที่
Facebook : TEDxKasetsartU
Instagram : https://www.instagram.com/tedxkasetsartu
    `,
    articleType: 'news',
    newsType: 'club',
    imageURL: 'https://scontent.fbkk22-1.fna.fbcdn.net/v/t1.0-9/88034257_1235013520021532_1089737192743370752_o.jpg?_nc_cat=100&_nc_sid=8024bb&_nc_eui2=AeEJrYhQzwsiYUnM9uR6ZCsYixM0HrMDUqCLEzQeswNSoEGrJ63RiqxEVqPFTiVV_0mqBdAsgQ1p5nkEKy8fRmoG&_nc_oc=AQnrZCel5uzR3yQeNLxr9TmXZoeXdPOktjLAggvZeqGG32pNbr6twJ1LILKWHN8KANQ&_nc_ht=scontent.fbkk22-1.fna&oh=e38d1c7f8f310976221803ec063daf94&oe=5ED6E8D9',
    author: '5e9818e846871726ac3a79e5',
    tags: ['ทั่วไป']
  },
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