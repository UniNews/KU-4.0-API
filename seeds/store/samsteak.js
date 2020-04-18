const mongoose = require('mongoose')
const User = mongoose.model('User')
const Article = mongoose.model('Article')

let user = {
  username: 'samsteak',
  loginType: 'normal',
  password: '123456',
  displayName: 'Sam Steak & More',
  role: 'store',
  avatarURL: 'https://scontent.fbkk2-6.fna.fbcdn.net/v/t1.0-1/p160x160/22688636_10212244722807828_8659882741453970463_n.jpg?_nc_cat=107&_nc_sid=dbb9e7&_nc_oc=AQlCsy9HbCEUOqPuK6e2cSYNo9iP9Liah079ukMSF9IB8ZXO1VnwMxkQlvM2SLE22cQ&_nc_ht=scontent.fbkk2-6.fna&_nc_tp=6&oh=bd9a7123295676f76a0a1d396509a2c9&oe=5EBD9E6A',
  active: true,
  bio: `ร้านสเต็ก ย่านเกษตร`,
  email: 'samsteak@ku.th',
  firstName: 'Sam Steak & More',
  lastName: 'Sam Steak & More',
  mobilePhone: '0987654321',
  contacts: 'มหาวิทยาลัยเกษตรศาสตร์',
}

let articles = [
  {
      title: 'Excellent steaks in Sam steak and more.',
      description: `
      Excellent steaks in Sam steak and more. Good appetizers, great service and desserts. Conveniently located on the main road and near Kasetsart University Bangkhen. Every Ku students must have heard or tried this restaurant as they are very famous on their food quality and the price that satisfy the customers. This place is totally recommended!
      Location: Ngamwongwan Road Chatuchak 10900
      Open - close: 11.00am. - 23:00pm. Open Everyday!!
      Contact : 02-941-0558
      `,
      articleType: 'news',
      newsType: 'promotion',
      imageURL: 'https://scontent.fbkk2-4.fna.fbcdn.net/v/t1.0-9/s960x960/90385196_103966847921081_5123483413864513536_o.jpg?_nc_cat=105&_nc_sid=8024bb&_nc_oc=AQlyi-W-fNyyj_Vv5776H-RLjsJ9dz8mOiXXmjCL1wODyQgMq3y4WIM9hDNTlwq8Nks&_nc_ht=scontent.fbkk2-4.fna&_nc_tp=7&oh=b1134eb559bea8c37ebc6b944a6def3a&oe=5EBD85AA',
      author: '5e981fd5f1ad412b40217829',
      tags: ['ทั่วไป']
  },
  {
    title: 'Take Home ยังงี้​ น้ำหนักจะลงได้ไงงง​ 😁😘',
    description: `
      Take Home ยังงี้​ น้ำหนักจะลงได้ไงงง​ 😁😘 ตามนโยบาย​รัฐบาล​จ้าาา​ 😊 ซื้อที่ร้าน​ เอากลับมากินที่บ้านนน​ 😁👍 ก็ยังถือว่าฟินอยู่น้าาา​😋 กับร้าน​ "Sam steak เมืองเอก" แล้วขอบอกว่าเยอะเหมือนเดิม​ เพิ่มเติมครั้งหน้าจะเอากล่องไปใส่เอง​ 🤔😘 ช่วยลดโลกร้อน​ ลดโฟม​ ด้วยจ้าาาา​ ❤️🌍 แต่รสชาติเค้า​ ดีย์เหมือนเดิม​ มันบดก็ยังฟินเหมือนเดิมมมม​ สรุปคือ​ ถ่ายรูปอาจจะไม่สวย​ แต่รสชาติ​เอาไปเต็มๆๆจ้าาาา​ 👍 แถวเมืองเอกเค้า​ Take Home​ กันนะ​ ใครอยากกินร้านไหน​ โทรสั่งแล้วค่อยไปเอาก็ได้นะ​ จะได้ไม่ต้องรอ​นะจ๊ะะะ​ แล้วอย่าลืม​ #ทำทุกวันให้เป็นวันเงินเดือนออก​ กันน้าาา​ 😁😘 #TakeHome #Steak #เมืองเอก​ #มันบด​ 💋😆
    `,
    articleType: 'news',
    newsType: 'promotion',
    imageURL: 'https://scontent.fbkk2-5.fna.fbcdn.net/v/t1.0-9/90428194_228233505227896_396611917361184768_n.jpg?_nc_cat=110&_nc_sid=110474&_nc_oc=AQlhzlp5Rjpi74q21fnMUWEdiuvlZuI93YAzFcKoQnuJk1GVQII8f8_Qy9kOxGg392o&_nc_ht=scontent.fbkk2-5.fna&oh=6c74db0f380c2e0e7bf90df9f896eb21&oe=5EBBF6FF',
    author: '5e981fd5f1ad412b40217829',
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