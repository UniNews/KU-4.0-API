const mongoose = require('mongoose')
const User = mongoose.model('User')
const Article = mongoose.model('Article')

let user = {
  username: 'yujinshabu',
  loginType: 'normal',
  password: '123456',
  displayName: 'Yujin Shabu',
  role: 'store',
  avatarURL: 'https://scontent.fbkk2-3.fna.fbcdn.net/v/t1.0-0/p370x247/11781674_766859736754075_2995903946138721140_n.jpg?_nc_cat=111&_nc_sid=85a577&_nc_oc=AQm4sQ-Jmna25o77awN7Khs9B2wP4gaHUD7zOL7x25Bd6JpNWPlSjIVNOx-xsMlj500&_nc_ht=scontent.fbkk2-3.fna&_nc_tp=6&oh=431f2396041fcbb341b0829a24a55aec&oe=5EBBD481',
  active: true,
  bio: `YUJIN SHABU is a Japanese BUFFET restaurant. Limit time: 1 hours and 20 minutes`,
  email: 'yujinshabu@ku.th',
  firstName: 'Yujin Shabu',
  lastName: 'Yujin Shabu',
  mobilePhone: '0863041997',
  contacts: 'สามารถเดินทางได้ด้วยรถสาธารณะ และรถยนต์ส่วนบุคคล ร้านจะอยู่ฝั่งตรงข้าม ประตูงามวงศ์วาน 1 มหาวิทยาลัยเกษตรศาสตร์ บางเขน',
}

let articles = [
  {
    title: 'ร้านยูจินชาบูกลับมาเปิดให้บริการนั่งทานอาหารในร้านอีกครั้ง!',
    description: `🥳 พร้อมกันหรือยัง? เราพร้อมแล้วนะ ☺️ ร้านยูจินชาบูกลับมาเปิดให้บริการนั่งทานอาหารในร้านอีกครั้งตั้งแต่วันที่ 3 พ.ค. 2563 เป็นต้นไป ให้บริการตั้งแต่เวลา 10.30น. จนถึง 20.30น. ของทุกวัน

โดยทางร้านขอความร่วมมือทุกท่านที่มาใช้บริการ เพื่อให้มาตรการการจัดการร้านในสถานการณ์โควิด-19 เป็นไปอย่างมีประสิทธิภาพ
    
ทางร้านขอขอบคุณลูกค้าทุกท่านที่ทวงถามเกี่ยวกับการกลับมาเปิดร้านอีกครั้งและไว้วางใจให้การสนับสนุนร้านของเรามาโดยตลอด 🥰
    
มาตรการในการจัดการร้านอาหารเบื้องต้น
  1. ทางร้านจะมีการตรวจวัดอุณหภูมิร่างกายของลูกค้าและผู้ที่มาติดต่อทุกท่าน ก่อนเข้ามาในร้านอาหาร
  2. ลูกค้าและผู้มาติดต่อทุกท่านจะต้องให้ความร่วมมือ ทำความสะอาดมือด้วยเจลแอลกอฮอล์ที่ทางร้านจัดเตรียมไว้ให้ ก่อนจะสัมผัสประตูทางเข้าร้าน และทางร้านจะรองรับเฉพาะผู้ที่สวมหน้ากากอนามัยก่อนเข้าร้านเท่านั้น
  3. ทางร้านได้มีการจัดเตรียมโต้ะที่นั่งที่มีการเว้นระยะห่าง 1 ถึง 1.5 เมตรและมีฉากกั้นใส สำหรับผู้มาใช้บริการทุกท่าน
  4. ท่านสามารถสั่งอาหารผ่านพนักงานได้โดยตรง และในส่วนของน้ำรีฟิลต่างๆ น้ำแข็ง น้ำจิ้ม น้ำซุป พริก กระเทียม ฯลฯ ลูกค้าสามารถเรียกพนักงานมาทำการเติมให้ท่านได้
  5. จะต้องไม่ใช้อุปกรณ์ที่ใช้สำหรับปรุงหรือตักอาหารร่วมกัน
  6. ทางร้านจะทำความสะอาดทั้งก่อนและหลังการใ้ช้บริการ
  7. มีการทำความสะอาดร้านและระบายอากาศให้ถ่ายเท ทุกๆสองชั่วโมง
  8. เพื่อให้ระบบของร้านเป็นไปอย่างมีประสิทธิภาพ การให้บริการต่อท่าน จึงจะจำกัดเวลาเป็นท่านละ 1 ชั่วโมงครึ่ง
  9. ขออนุญาตงดให้บริการลูกค้าที่มีอาการไข้ ไอ จาม

https://www.facebook.com/YujinShabu/photos/a.318814808225239/2649043641868999/?type=3&theater`,
    articleType: 'news',
    newsType: 'promotion',
    imageURL: 'https://scontent.fbkk22-1.fna.fbcdn.net/v/t1.0-0/p640x640/95626538_2649043648535665_5031678582401794048_o.jpg?_nc_cat=101&_nc_sid=8024bb&_nc_eui2=AeHciK23L2YyhjdPtVoNBMqypVqhT859Dx-lWqFPzn0PH1T4QJKedoEfXmoSe-_5LJSuSews-XcvJCEW6acV0HaD&_nc_oc=AQkjoeN5FlSfLiK_STNeiO5WuZvRboGVo-17kwXb-LMxkmcCuwiPfbK8ewhaEmhKh30&_nc_ht=scontent.fbkk22-1.fna&_nc_tp=6&oh=aa3b3ebb71ffb35eddb3d044dcff6e74&oe=5ED3D8B3',
    author: '5e981fd5f1ad412b40217827',
    tags: ['ทั่วไป', 'อาหาร']
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