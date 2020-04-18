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
  bio: `YUJIN SHABU is a Japanese BUFFET restaurant.
  limit time : 1 hours and 20 minutes`,
  email: 'yujinshabu@ku.th',
  firstName: 'Yujin Shabu',
  lastName: 'Yujin Shabu',
  mobilePhone: '0863041997',
  contacts: 'สามารถเดินทางได้ด้วยรถสาธารณะ และรถยนต์ส่วนบุคคล ร้านจะอยู่ฝั่งตรงข้าม ประตูงามวงศ์วาน 1 มหาวิทยาลัยเกษตรศาสตร์ บางเขน',
}

let articles = [
  {
      title: 'YUJIN SHABU DELIVERY / TAKEOUT',
      description: `
        YUJIN SHABU DELIVERY / TAKEOUT ชาบูสดใหม่ ใส่ใจความสะอาด ย่านมหาลัยเกษตร เปิดให้บริการในส่วนของเดลิเวอรี่ส่งถึงบ้านและสั่งกลับบ้านที่หน้าร้านตั้งแต่วันนี้เป็นต้นไป

        โปรโมชั่นพิเศษ รัศมี 5 กิโลเมตร ส่งฟรีถึงที่ ไม่มีขั้นต่ำ
        อาหารจานเดี่ยวลด 20% ทุกเมนู
        
        ช่วงเวลาในการจัดส่ง : 11.00-21.30น.
        
        หรือสั่งกลับบ้านได้ที่หน้าร้าน Yujin Shabu
        
        สั่งผ่านไลน์ได้ที่ Line ID : @yujinshabu
        สั่งผ่าน Facebook : Yujin Shabu
        โทร : 0955350281, 0863041997
      `,
      articleType: 'news',
      newsType: 'promotion',
      imageURL: 'https://scontent.fbkk2-6.fna.fbcdn.net/v/t1.0-9/s960x960/90016257_2557360294370668_3638951968279363584_o.jpg?_nc_cat=104&_nc_sid=8024bb&_nc_oc=AQk11zKzt2adtoV9E2wNMEdgUf4CIPiQR-Q06jRfqPCNMZdUQ6MLZds-UyL6Z-dgMPE&_nc_ht=scontent.fbkk2-6.fna&_nc_tp=7&oh=0ec74690d77d172fa4b95a92e7f4a542&oe=5EBF6E7E',
      author: '5e981fd5f1ad412b40217827',
      tags: ['ทั่วไป']
  },
  {
    title: 'ร้านยูจินยังคงเปิดให้บริการสั่งกลับบ้านและเดลิเวอรี่ ตั้งแต่เวลา 10.30-20.30น. ของทุกวัน',
    description: `
      👩🏼‍🍳ร้านยูจินยังคงเปิดให้บริการสั่งกลับบ้านและเดลิเวอรี่ ตั้งแต่เวลา 10.30-20.30น. ของทุกวัน

      🥘🍲🍱โดยสามารถสั่งอาหารได้กับทางร้านโดยตรง ผ่านไลน์ไอดี : @yujinshabu หรือ Facebook: yujinshabu เราจัดส่งฟรีในรัศมี 5 กม. หรือสั่งผ่าน Grab Food ในช่วงเวลา 10.30-20.00น.
      
      ร้านยูจินยังคงมุ่งมั่นที่จะให้บริการที่ดีที่สุดและรักษามาตรการสร้างสุขอนามัยที่ดีอย่างเคร่งครัดเพื่อความไว้วางใจในความสะอาดของอาหารอยู่เสมอ เราจะร่วมฝ่าวิกฤตนี้ไปด้วยกัน 🙏🏼
    `,
    articleType: 'news',
    newsType: 'promotion',
    imageURL: 'https://scontent.fbkk2-4.fna.fbcdn.net/v/t1.0-9/p720x720/91650628_2585267698246594_8946041342807506944_o.jpg?_nc_cat=105&_nc_sid=110474&_nc_oc=AQkvga5blu-eQiZz4NVq5G2CzHYIUsn7kazAGM3BK9JLuH2paZLxheWjXTAEVMj85x0&_nc_ht=scontent.fbkk2-4.fna&_nc_tp=6&oh=e409d7b63740763d258bc70d1f493fbe&oe=5EBCAEBE',
    author: '5e981fd5f1ad412b40217827',
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