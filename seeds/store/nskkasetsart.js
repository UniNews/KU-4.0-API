const mongoose = require('mongoose')
const User = mongoose.model('User')
const Article = mongoose.model('Article')

let user = {
  username: 'nskkasetsart',
  loginType: 'normal',
  password: '123456',
  displayName: 'ชมรมธารความรู้นนทรี มหาวิทยาลัยเกษตรศาสตร์',
  role: 'store',
  avatarURL: 'https://scontent.fbkk2-3.fna.fbcdn.net/v/t1.0-0/p370x247/91066823_2793303464116168_3542449610825924608_n.jpg?_nc_cat=111&_nc_sid=85a577&_nc_oc=AQnAu8e6PAVSfVih2ewlZ_4A-5oGcH9m6xXP-xYJLs0qOdHWEjYDrOQxYDBwcJ7IfGI&_nc_ht=scontent.fbkk2-3.fna&_nc_tp=6&oh=1daa8396f6c288c4845f6f8414695bc9&oe=5EBE4FA0',
  active: true,
  bio: `กลุ่มธารความรู้นนทรี เป็นกลุ่มนิสิตและบุคคลทั่วไปที่ประกอบกิจกรรมเกี่ยวกับการช่วยเหลือผู้ด้อยโอกาสทางการศึกษา`,
  email: 'nskkasetsart@ku.th',
  firstName: 'NSKKasetsart',
  lastName: 'NSKKasetsart',
  mobilePhone: '0951923921',
  contacts: 'มหาวิทยาลัยเกษตรศาสตร์',
}

let articles = [
  {
    title: 'ฝุ่นอาจทำให้เธอแสบตา แต่อิตาเลี่ยนโซดาของเราซ่าถึงใจนะจ้ะ (จงหาความเชื่อมโยง 10 คะแนนค่ะนิสิต😂)',
    description: `ฝุ่นอาจทำให้เธอแสบตา แต่อิตาเลี่ยนโซดาของเราซ่าถึงใจนะจ้ะ (จงหาความเชื่อมโยง 10 คะแนนค่ะนิสิต😂)
💌 เร่เข้ามาจ้า เร่เข้ามา
ร้าน Honey Moon🌝 ของเราเปิดทำการแล้วนะ
มาลองความซ่ากันได้ที่งาน Kaset Fair
ตั้งแต่เวลา 10:00 น. จนถึง 21:00 น. กันเลยนะคะ
    
💓 ไอติมโมจิหวานฉ่ำลูกละ 25 บาทเท่านั้น
💓 น้ำ Cinema Soda (Italian Soda) เย็นชื๊นใจจจ เพียงแก้วละ 29 บาท
ยัง ยังไม่พอ เรายังมี โปสการ์ดซีนหนังดังในดวงใจให้อีกด้วย บอกเลยว่า ห้ามพลาด‼️
🔺 เพื่อน ๆ อย่าลืมใส่หน้ากากอนามัย เพื่อป้องกันฝุ่นกันด้วยนะ ด้วยความปราถานาดีจาก ชมรมธารความรู้นนทรี 🥰
    
*รายได้หลักหักค่าใช้จ่าย นำไปสมทบทุนทำค่ายอาสานะคะ`,
    articleType: 'news',
    newsType: 'club',
    imageURL: 'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-9/83879793_2669425539837295_8511177407326060544_n.jpg?_nc_cat=106&_nc_sid=110474&_nc_eui2=AeFNE86xlNhkGXCyTnZ97do8Pyx7mpHxl5Y_LHuakfGXlqzLNgMOD7nW_aztO-bQ8guKGF7uIFMuBtA4JJGZHqTc&_nc_oc=AQkeRhWUK33xtDytRjv1sSv3c8uDDoDTb6Ku0EwVH8eL-muSnxdTWRWQ03QNLkWuhP0&_nc_ht=scontent.fbkk22-2.fna&oh=b0906a84ec586ceb4737445f892211f6&oe=5ED5DEC3',
    author: '5e9818e846871726ac3a79e4',
    tags: ['อาหาร', 'ความรัก']
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