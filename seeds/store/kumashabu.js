const mongoose = require('mongoose')
const User = mongoose.model('User')
const Article = mongoose.model('Article')

const user = {
  username: 'kumashabu',
  loginType: 'normal',
  password: '123456',
  displayName: 'Kuma Shabu',
  role: 'store',
  avatarURL: 'https://scontent.fbkk2-7.fna.fbcdn.net/v/t1.0-0/p370x247/22852956_928949130588509_1852747991864105926_n.jpg?_nc_cat=106&_nc_sid=85a577&_nc_oc=AQnhiGoPTrTS4gptxsUhyl5IyVaIyV6ZvSZqMxufBv-uk0zoVj5vmXYpzyhf1prrsyk&_nc_ht=scontent.fbkk2-7.fna&_nc_tp=6&oh=1ab0b65dc1ebb18db8470d218022e2f8&oe=5EBDA0AC',
  active: true,
  bio: `ร้านบุฟเฟ่ต์สไตล์ญี่ปุ่น ย่าน เกษตร`,
  email: 'kumashabu@ku.th',
  firstName: 'Kuma Shabu',
  lastName: 'Kuma Shabu',
  mobilePhone: '0926716127',
  contacts: 'มหาวิทยาลัยเกษตรศาสตร์',
}

const articles = [
  {
    title: 'จะต้ม จะผัด จะย่างชีสหรือจุ่มเนย 🔥 ครบจบในเตาเดียว❗️เริ่มแล้วทั้ง2สาขาจ้า ',
    description: `🔥 จะต้ม จะผัด จะย่างชีสหรือจุ่มเนย 🔥
    ครบจบในเตาเดียว❗️เริ่มแล้วทั้ง2สาขาจ้า 🤗
    🥓🥩🤤🍲 #KumaShabu
    .
    ⭐️สาขา1 ริมถนนใหญ่งามวงศ์วาน ก่อนถึงซ.งามวงศ์วาน 54 (ให้ไปจอดรถใน ซ.งามฯ 56 เข้าไป 50ม.มีที่รับฝากรถขวามือ)
    สำรองที่นั่ง ☎️: 092-671-6127
    ⭐️สาขา2 ในซ.งามวงศ์วาน 64 (ให้จอดรถในม.เกษตรฝั่งประตูพหลแล้วข้ามสะพานลอยมา)
    สำรองที่นั่ง ☎️: 092-353-8007
    https://www.facebook.com/KumaShabu/photos/a.343712282445533/1605728882910527/?type=3&theater
      `,
    articleType: 'news',
    newsType: 'promotion',
    imageURL: 'https://scontent.fbkk2-3.fna.fbcdn.net/v/t1.0-9/87524034_1605728886243860_194789574466076672_n.jpg?_nc_cat=109&_nc_sid=110474&_nc_oc=AQna4MsXtvmXwUDQfZQZq1e2Gsm9lreIKYIUsZ1VnUr_EgraKOf3SIfB39DsE_PWphE&_nc_ht=scontent.fbkk2-3.fna&oh=39806cb03afdb3c10dae01f266feeeba&oe=5EBE6E54',
    author: '5e981fd5f1ad412b40217828',
    tags: ['อาหาร']
  },
  {
    title: 'วันนี้ร้านคุมะชาบูจัดเซตดิลิเวอรี่เอาใจคนกินเนื้อมาเสริฟ์ให้แล้วจ้า 😋',
    description: `วันนี้ร้านคุมะชาบูจัดเซตดิลิเวอรี่เอาใจคนกินเนื้อมาเสริฟ์ให้แล้วจ้า 😋

    1️⃣ ชุดเนื้อๆเน้น 600g ราคา 499-
    ✅ริบอายโคขุน x2/เนื้อลายมัน x2/เนื้อเสือร้องไห้/เนื้อหนอก
    
    2️⃣ชุดเนื้อชาร์โรเล่ส์พรีเมี่ยมล้วนๆ 600g ราคา 599-
    ✅ริบอายชาร์โรเล่ส์ x3/สันนอกชาร์โรเล่ส์ x3
    
    3️⃣ชุดเนื้อๆเน้นๆ 600g + เนื้อชาร์โรเล่ส์พรีเมี่ยมล้วนๆ 200g ราคา 599-
    ✅ริบอายโคขุนx2/เนื้อลายมันx2/เนื้อเสือร้องไห้ /เนื้อหนอก / ริบอายชาร์โรเล่ส์ / สันนอกชาร์โรเล่ส์
    
    4️⃣ชุดเนื้อๆเน้นๆ 1 กก. (10 ถาด !!!) ราคา 699-
    ✅ริบอายโคขุนx3/เนื้อลายมันx3/เนื้อเสือร้องไห้x2/เนื้อหนอกx2
    
    5️⃣ชุดนื้อชาร์โรเล่ส์พรีเมี่ยมล้วนๆ 1 กก. (10 ถาด !!!) ราคา 799-
    ✅ริบอายชาร์โรเล่ส์x5/สันนอกชาร์โรเล่ส์x5
    
ปล.1 หากคุณลูกค้าสะดวกมารับสินค้าเองค่าอาหารจะถูกกว่าราคาข้างต้นที่สั่งผ่านแอพดิลิเวอรี่จ้า ❤️ โทรมาสอบถามราคาและสั่งอาหารล่วงหน้าได้ที่เบอร์ 063-3746708 จ้า
ปล.2 ทุกชุด มีผักชุดกลาง,น้ำซุป,น้ำจิ้มสุกี้,พริกกระเทียมและตะเกียบพร้อม 😉👌
https://www.facebook.com/KumaShabu/photos/a.190145734468856/1658035254346556/?type=3&theater`,
    articleType: 'news',
    newsType: 'promotion',
    imageURL: 'https://scontent.fbkk22-1.fna.fbcdn.net/v/t1.0-9/94726245_1658035261013222_1898120110242004992_o.jpg?_nc_cat=101&_nc_sid=8024bb&_nc_eui2=AeEqNnlCGPJ76ir3wcpQw6sY5nRCABLAdW_mdEIAEsB1bz5OyDlWzOn6gxY9TaMNlQ7sqT-S8iP9AFl0kcvQ-AuG&_nc_oc=AQncztB6GeDuiAiy4jeJjmgvCeWd2wTkSbnAApCUvbMh-1txvv7fn4cDAHed4GZb8Po&_nc_ht=scontent.fbkk22-1.fna&oh=c9ad41e2cd403f5d7d1ef7119857628b&oe=5ED64361',
    author: '5e981fd5f1ad412b40217828',
    tags: ['อาหาร']
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