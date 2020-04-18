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
      description: `
        🔥 จะต้ม จะผัด จะย่างชีสหรือจุ่มเนย 🔥
        ครบจบในเตาเดียว❗️เริ่มแล้วทั้ง2สาขาจ้า 🤗
        🥓🥩🤤🍲 #KumaShabu
        .
        ⭐️สาขา1 ริมถนนใหญ่งามวงศ์วาน ก่อนถึงซ.งามวงศ์วาน 54 (ให้ไปจอดรถใน ซ.งามฯ 56 เข้าไป 50ม.มีที่รับฝากรถขวามือ)
        สำรองที่นั่ง ☎️: 092-671-6127
        ⭐️สาขา2 ในซ.งามวงศ์วาน 64 (ให้จอดรถในม.เกษตรฝั่งประตูพหลแล้วข้ามสะพานลอยมา)
        สำรองที่นั่ง ☎️: 092-353-8007
      `,
      articleType: 'news',
      newsType: 'promotion',
      imageURL: 'https://scontent.fbkk2-3.fna.fbcdn.net/v/t1.0-9/87524034_1605728886243860_194789574466076672_n.jpg?_nc_cat=109&_nc_sid=110474&_nc_oc=AQna4MsXtvmXwUDQfZQZq1e2Gsm9lreIKYIUsZ1VnUr_EgraKOf3SIfB39DsE_PWphE&_nc_ht=scontent.fbkk2-3.fna&oh=39806cb03afdb3c10dae01f266feeeba&oe=5EBE6E54',
      author: '5e981fd5f1ad412b40217828',
      tags: ['ทั่วไป']
  },
  {
    title: 'ฟรี!! เนื้อลายเกรดAA พร้อมกระทะใหม่ 🥩🥩',
    description: `
      ฟรี!! เนื้อลายเกรดAA พร้อมกระทะใหม่ 🥩🥩
      เริ่มแล้ววันนี้ ทั้งสองสาขาจ้า 🤩
      #KumaShabu
      .
      ⭐️สาขา1 ริมถนนใหญ่งามวงศ์วาน ก่อนถึงซ.งามวงศ์วาน 54 (ให้ไปจอดรถใน ซ.งามฯ 56 เข้าไป 50ม.มีที่รับฝากรถขวามือ)
      สำรองที่นั่ง ☎️: 092-671-6127
      ⭐️สาขา2 ในซ.งามวงศ์วาน 64 (ให้จอดรถในม.เกษตรฝั่งประตูพหลแล้วข้ามสะพานลอยมา)
      สำรองที่นั่ง ☎️: 092-353-8007
    `,
    articleType: 'news',
    newsType: 'promotion',
    imageURL: 'https://scontent.fbkk2-7.fna.fbcdn.net/v/t1.0-9/p720x720/86695456_1593818754101540_5819506847278694400_o.jpg?_nc_cat=106&_nc_sid=110474&_nc_oc=AQnbkHWjWzzEXyYaHcH6fnejyLzAlKaCDVBToKdyQjqyq6XA7CrZRkSawo2fc54vaRc&_nc_ht=scontent.fbkk2-7.fna&_nc_tp=6&oh=358c55ebefd31f13d5db278e3c788472&oe=5EBCE585',
    author: '5e981fd5f1ad412b40217828',
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