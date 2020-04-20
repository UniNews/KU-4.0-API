const mongoose = require('mongoose')
const User = mongoose.model('User')
const Article = mongoose.model('Article')

let user = {
  username: 'kuphotoclub',
  loginType: 'normal',
  password: '123456',
  displayName: 'ชมรมศิลปะการถ่ายภาพ มหาวิทยาลัยเกษตรศาสตร์',
  role: 'store',
  avatarURL: 'https://scontent.fbkk2-3.fna.fbcdn.net/v/t1.0-9/p960x960/39700613_2009471645785153_2911180338476613632_o.jpg?_nc_cat=111&_nc_sid=85a577&_nc_oc=AQkAfXHzQPJBOLRy4Jf90QrZ4otfZ_MCX9BTq4ocJC3LYtnMc1jpzmjxOceJ18Fs2Xw&_nc_ht=scontent.fbkk2-3.fna&_nc_tp=6&oh=d7dc4ce7af1bfb43b80c8265758b169f&oe=5EBDC8B1',
  active: true,
  bio: 'ห้องรกๆ ที่จัดเท่าไหร่ก็ไม่เป็นระเบียบ ใครที่เข้ามานั่งๆนอนๆข้างในนี้เราถือว่าเป็นพวกเราหมด จริงๆแล้วก็ตั้งใจไว้สำหรับคนที่ชอบถ่ายรูป แต่ไม่ค่อยจะถ่ายรูปกันเท่าไหร่ ว่างๆก็ card game สนุกสนานกันไป ห้องนี้อยู่ชั้น1ฝั่งขวาก็ชมรมเห็ด ซ้ายก็พช. ตึก8 หลังคาสีฟ้า ใกล้ๆบาร์ใหม่ ในมหาวิทยาลัยเกษตรศาสตร์ ใครยังจำได้ว่าเคยอยู่ ยังอยู่หรือคิดจะอยู่ ยินดีต้อนรับ',
  email: 'kuphotoclub@ku.th',
  firstName: 'KUPhotoClub',
  lastName: 'KUPhotoClub',
  mobilePhone: '0951923921',
  contacts: 'มหาวิทยาลัยเกาตรศาสตร์',
}

const articles = [
  {
      title: 'EMOTIONAL Live Concert & Gallery ',
      description: `
      อ๊ะๆ นี่มันอะไรนะ 🤔😆

      กลับมาอีกครั้งกับการจับมือกันระหว่าง KU Acoustic และ KU Photo กับงาน EMOTIONAL Live Concert & Gallery ที่ถึงแม้ว่าปีนี้เราจะไม่สามารถจัดงานใหญ่ได้เหมือนทุกปีที่ผ่านมา แต่รับรองว่าความสนุกจัดเต็มไม่แพ้ครั้งไหนๆ แน่นอน
      
      โดยกิจกรรมในครั้งนี้จะจัดขึ้นในวันพฤหัสที่ 19 มีนาคมนี้ บริเวณลานข้างบาร์ใหม่ (ลานฟู้ดทรัค) มีทั้งแกลเลอรี่สวยๆ ดนตรีสนุกๆ แถมยังมีของกินให้เลือกซื้อกันแบบจุกๆ แบบนี้ไม่มาไม่ได้แล้วนะ
      
      🗓 19 มีนาคม 2563
      📍 ลานฟู้ดทรัค บาร์ใหม่
      `,
      articleType: 'news',
      newsType: 'club',
      imageURL: 'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-9/90137181_3060407284024912_7631052485691441152_n.jpg?_nc_cat=100&_nc_sid=110474&_nc_oc=AQm1JsOA_DGEGes5puqVHWJQtdkFB9zARVq26KYi0GopBR3RutWxmPWFHzwUUHX2h34&_nc_ht=scontent.fbkk2-8.fna&oh=36097a96e505a65829440f777ef5fc46&oe=5EBC90E4',
      author: '5e9814f6f2300524bf542f1d',
      tags: ['ทั่วไป']
  },
  {
    title: 'รับสมัคร Staff งาน TEDxKasetsartU2020',
    description: `
    มาร่วมสร้างการเปลี่ยนแปลงอันยิ่งใหญ่ด้วยกัน

    งาน TED Talk ที่สร้างแรงบันดาลใจดี ๆ มาแล้วทั่วโลก ซึ่งได้กระจายไปสู่พื้นที่ต่าง ๆ จนถึงระดับมหาวิทยาลัย
    
    ตอนนี้ TEDxKasetsartU เปิดรับสมัคร Staff เหล่าผู้ขับเคลื่อน และผลักดันงาน TEDxKasetsartU2020 เพื่อแบ่งปันไอเดียที่ควรค่าต่อการส่งต่อไม่สิ้นสุด
    จึงขอเชิญคุณมาร่วมเป็นส่วนหนึ่งกับทีมที่สุดแสนพิเศษ พร้อมรับการแนะนำดี ๆ จากเหล่าที่ปรึกษาที่จะช่วยให้คุณได้พัฒนาตนให้เจ๋งยิ่งกว่าเดิม
    
    เปิดรับสมัคร 24 มกราคม - 19 กุมภาพันธ์นี้ นะคะ
    
    กรอกใบสมัครได้ที่ https://forms.gle/uVqMr5bzpPeRyVV46
    
    กรุณาดูกำหนดการสัมภาษณ์ด้านท้ายนะคะ
    
    มาร่วมสร้างการเปลี่ยนแปลงอันยิ่งใหญ่ด้วยกัน เพราะไอเดียที่ดีแม้จะเป็นไอเดียเล็ก ๆ ก็สามารถสร้างการเปลี่ยนแปลงได้นะคะ
    
    
    `,
    articleType: 'news',
    newsType: 'club',
    imageURL: 'https://scontent.fbkk2-6.fna.fbcdn.net/v/t1.0-0/p640x640/83455419_1210568652466019_5264062370681978880_o.jpg?_nc_cat=104&_nc_sid=e007fa&_nc_oc=AQnLUzpQ81Z7LssAz0LUpq-YI6Xae-GvJQz7mZ2iWQfPqAytjkF4BIGqD3__zLNw58A&_nc_ht=scontent.fbkk2-6.fna&_nc_tp=6&oh=4244d40237439de088d3f8e0356f5eb2&oe=5EBE72DE',
    author: '5e9814f6f2300524bf542f1d',
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

module.exports = insertMany;