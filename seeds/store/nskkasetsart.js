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
  bio: `กลุ่มธารความรู้นนทรี เป็นกลุ่มนิสิตและบุคคลทั่วไปที่ประกอบกิจกรรมเกี่ยวกับการช่วยเหลือผู้ด้อยโอกาสทางการศึกษา ให้เกิดความเท่าเทียมกันทางสังคมอย่างต่อเนื่องและครบวงจร อีกทั้งปลูกฝังและกระตุ้นให้ผู้คนในท้องถิ่นได้ตระหนักถึงความสำคัญทางการศึกษาและร่วมมือกันแก้ไขปัญหา อันจะนำไปสู่การพัฒนาและความเท่าเทียมกันทางสังคมและการศึกษา โดยดำเนินกิจกรรมภายใต้ปณิธานของกลุ่มที่ว่า "สร้างทาง ให้โอกาส เปิดตลาดวิชาการ`,
  email: 'nskkasetsart@ku.th',
  firstName: 'NSKKasetsart',
  lastName: 'NSKKasetsart',
  mobilePhone: '0951923921',
  contacts: 'มหาวิทยาลัยเกษตรศาสตร์',
}

let articles = [
  {
      title: 'ฝุ่นอาจทำให้เธอแสบตา แต่อิตาเลี่ยนโซดาของเราซ่าถึงใจนะจ้ะ (จงหาความเชื่อมโยง 10 คะแนนค่ะนิสิต😂)',
      description: `
      ฝุ่นอาจทำให้เธอแสบตา แต่อิตาเลี่ยนโซดาของเราซ่าถึงใจนะจ้ะ (จงหาความเชื่อมโยง 10 คะแนนค่ะนิสิต😂)
      💌 เร่เข้ามาจ้า เร่เข้ามา
      ร้าน Honey Moon🌝 ของเราเปิดทำการแล้วนะ
      มาลองความซ่ากันได้ที่งาน Kaset Fair
      ตั้งแต่เวลา 10:00 น. จนถึง 21:00 น. กันเลยนะคะ
      
      💓 ไอติมโมจิหวานฉ่ำลูกละ 25 บาทเท่านั้น
      💓 น้ำ Cinema Soda (Italian Soda) เย็นชื๊นใจจจ
      เพียงแก้วละ 29 บาท
      ยัง ยังไม่พอ เรายังมี โปสการ์ดซีนหนังดังในดวงใจให้อีกด้วย บอกเลยว่า ห้ามพลาด‼️
      
      🔺 เพื่อน ๆ อย่าลืมใส่หน้ากากอนามัย เพื่อป้องกันฝุ่นกันด้วยนะ ด้วยความปราถานาดีจาก ชมรมธารความรู้นนทรี 🥰
      
      *รายได้หลักหักค่าใช้จ่าย นำไปสมทบทุนทำค่ายอาสานะคะ
      `,
      articleType: 'news',
      newsType: 'club',
      imageURL: 'https://scontent.fbkk2-7.fna.fbcdn.net/v/t1.0-9/83879793_2669425539837295_8511177407326060544_n.jpg?_nc_cat=106&_nc_sid=110474&_nc_oc=AQmg4QtnLMIq0nnQ9ZPtzSP2mG-axmPTd8LeFTQHjv9JyFR-TnJFyI8J5ZX7W_T6hyQ&_nc_ht=scontent.fbkk2-7.fna&oh=8cc5029a36f6a5a71f8c2954b55f8d89&oe=5EBE23C3',
      author: '5e9818e846871726ac3a79e4',
      tags: ['ทั่วไป']
  },
  {
    title: 'NSK HomeComing 2563',
    description: `
    เร่เข้ามาจ้า เร่เข้ามาาาา ~
    พับกบ พบกับ งานวัดที่ยิ่งใหญ่ที่สุดในทุ่งบางเขนกับงาน
    
    🥳 NSK HomeComing 2563
    
    ภายในงานพบกับ
    🔺 กิจกรรมสนุก ๆ
    🔺บรรยากาศชาวค่ายอาสาสุดอบอุ่น
    🔺อาหารอร่อย ๆ และพ่อค้าแม่ค้าที่น่ารัก
    
    🗓วันเสาร์ ที่ 7 มีนาคม 2563
    🕔เริ่มลงทะเบียนเวลา 17:00-17:30 น.
    
    📍ณ ลานหน้าตึก 8
    
    🎡เจอกันในธีม งานวัด (บอกเลยว่า งานนี้ไม่มีใครยอมใครเลยนะคะ!)
    แล้วพบกันน้าาาา 💓
    `,
    articleType: 'news',
    newsType: 'club',
    imageURL: 'https://scontent.fbkk2-4.fna.fbcdn.net/v/t1.0-9/s960x960/87959972_2741342292645619_7339830248206237696_o.jpg?_nc_cat=101&_nc_sid=110474&_nc_oc=AQkmLrf_HgfnvisCrDkep1Gi0CYDu6-r7myYXonglSGj9O8mJVRWJNyZziTRTx-RU7M&_nc_ht=scontent.fbkk2-4.fna&_nc_tp=7&oh=a18c363c011a128b4d75b78d32866ea6&oe=5EBDF628',
    author: '5e9818e846871726ac3a79e4',
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