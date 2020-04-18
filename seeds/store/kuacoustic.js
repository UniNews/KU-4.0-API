const mongoose = require('mongoose')
const User = mongoose.model('User')
const Article = mongoose.model('Article')

const user = {
  username: 'kuacoustic',
  loginType: 'normal',
  password: '123456',
  displayName: 'KU Acoustic',
  role: 'store',
  avatarURL: 'https://scontent.fbkk2-3.fna.fbcdn.net/v/t1.0-0/p370x247/40049780_2123443481200599_5711734804878196736_n.jpg?_nc_cat=109&_nc_sid=85a577&_nc_oc=AQnmev0cM9nsiralaSjH6FskbKwqrCDaM4tPAsi2WM2yKGvwIYFIRk-LP1AULT_hrgw&_nc_ht=scontent.fbkk2-3.fna&_nc_tp=6&oh=a48f644f40b3a7b8a468c249d8d32a27&oe=5EBCD0D8',
  active: true,
  bio: `ชมรมดนตรีAcoustic แห่ง มหาวิทยาลัย เกษตรศาสตร์ (บางเขน)

  "KU Acoustic"
  ชมรมดนตรีที่ไม่ได้มีแค่ดนตรี
  
  Vocal,Guitar,Bass,Keyboard,Piano,Percussion,Violin, etc.
  
  ที่ตั้งชมรม - อาคารกองกิจการนิสิต(เก่า)ชั้น 2 ฝั่งไปรษณีย์`,
  email: 'kuacoustic@ku.th',
  firstName: 'KUAcoustic',
  lastName: 'KUAcoustic',
  mobilePhone: '0951923921',
  contacts: 'มหาวิทยาลัยเกษตรศาสตร์',
}

const articles = [
  {
    title: 'โอกาสที่ทุกคนจะได้มาทำความรู้จักชมรม KU Acoustic ให้มากขึ้นมาถึงแล้ว',
    description: `
      มาแล้วจ้าาาาาาาา 💖🎉
      โอกาสที่ทุกคนจะได้มาทำความรู้จักชมรม KU Acoustic ให้มากขึ้นมาถึงแล้ว
      
      พบกับพวกเรา KU Acoustic ได้ในงานเปิดโลกกิจกรรม ตั้งแต่วันที่ 8-9 สิงหาคมนี้ ที่อาคารจักรพันธ์เพ็ญสิริ โซน A หมายเลขบูธ A12
      โดยในงานนี้ ชมรมเราจะเปิดรับสมาชิกใหม่ด้วย สำหรับน้องๆ คนไหนที่สนใจอย่าลืมมาเจอกันน้า
      
      นอกจากนี้ชมรมเรายังมีการแสดงที่เวทีใหญ่ในวันที่ 8 สิงหาคม เวลา 17.00-18.00 ด้วย อย่าลืมมาดูกันเยอะๆ น้า 💕
      
      สำหรับคำที่มีข้อสงสัยสามารถทักมาถามข้อมูลเพิ่มเติมได้ที่ inbox เลยจ้า
      `,
    articleType: 'news',
    newsType: 'club',
    imageURL: 'https://scontent.fbkk2-7.fna.fbcdn.net/v/t1.0-9/s960x960/67594089_2325505854327693_3484114458773553152_o.jpg?_nc_cat=106&_nc_sid=8024bb&_nc_oc=AQmsM1LnTK4ZdnSJQdYDwW0FyR3rjehNySZ4KBvjIfBKfU-jP6etppifCCZ5yVG6a-o&_nc_ht=scontent.fbkk2-7.fna&_nc_tp=7&oh=728c586fb02dee3a126a02b82f870cb3&oe=5EBE7171',
    author: '5e981d00eaa56028e5d6fe59',
    tags: ['ทั่วไป']
  },
  {
    title: 'Workshop KU Acoustic 2018',
    description: `
      Workshop KU Acoustic 2018
      อีเว้นท์นี้เราจัดขึ้นให้พี่และน้องได้

      • SHOW&SHARE •

      ⚠️ Show ความสามารถบนเวทีจริง
      ⚠️ Share เทคนิคและความรู้จากพี่สู่น้อง

      ใครคิดว่าพร้อมมาเจอกัน
      29 - ตุลา - 61 นี้
      ที่เก่าเวลาเดิม
      16:00 น. ชั้น 2 ตึกปณ. ชมรมอคูสตุก แฮ่! อคูสติก
    `,
    articleType: 'news',
    newsType: 'club',
    imageURL: 'https://scontent.fbkk2-4.fna.fbcdn.net/v/t1.0-9/44707091_2154405594771054_2343103452529295360_n.jpg?_nc_cat=101&_nc_sid=110474&_nc_oc=AQl_7vcOaN8rZ2zN_GfCGvg8884DA-4NyRub6nzxPQYPLfWCUIXVlyEn2yasJNxYkj0&_nc_ht=scontent.fbkk2-4.fna&oh=2e04f510549e23083d3befd8e2760cc7&oe=5EBC79DC',
    tags: ['ทั่วไป']
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