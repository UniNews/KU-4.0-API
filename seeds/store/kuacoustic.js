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
  bio: `ชมรมดนตรี Acoustic แห่งมหาวิทยาลัยเกษตรศาสตร์ (บางเขน)`,
  email: 'kuacoustic@ku.th',
  firstName: 'KUAcoustic',
  lastName: 'KUAcoustic',
  mobilePhone: '0951923921',
  contacts: 'มหาวิทยาลัยเกษตรศาสตร์',
}

const articles = [
  {
    title: 'ยกเลิกกิจกรรม ACOUSTICxPHOTO Emotional Live Concert & Photo Gallery',
    description: `‼️‼️‼️ ประกาศสำคัญ ‼️‼️‼️
    
ยกเลิกกิจกรรม ACOUSTICxPHOTO Emotional Live Concert & Photo Gallery
    
เนื่องจากความรุนแรงของสถานการณ์การระบาดของ COVID-19 ทางเราจึงมีมติยกเลิกกิจกรรมที่จะจัดขึ้นในวันพฤหัสที่ 19 มีนาคม 2563 เพื่อความปลอดภัยของทุกท่าน
    
ขอขอบคุณทุกการสนับสนุน ทางสมาชิกชมรมหวังว่าจะได้กลับมาสร้างความสุขให้ทุกคนได้เร็วๆ นี้ ระหว่างนี้ขอให้ทุกคนดูแลสุขภาพตัวเอง แล้วเราจะพบกันใหม่ 🙏🏻
https://www.facebook.com/KUAcoustic/photos/a.1512268465651440/2505248339686776/?type=3&theater
    `,
    articleType: 'news',
    newsType: 'club',
    imageURL: 'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-9/90158312_2505248343020109_183859075971284992_o.jpg?_nc_cat=107&_nc_sid=110474&_nc_eui2=AeFsT6q39h7AX30egGGpxLT6bzZhWkum4VpvNmFaS6bhWvyQ7bX-i1nhDT3PAoQ4UtEoS9JzpJRINw16oCQbUsoY&_nc_oc=AQmudZHR7WmVyQvoCt8TgKbzOht75MyS8J_7_PkvShbtEdByF6iqVhsn0p1MWUYXHz8&_nc_ht=scontent.fbkk22-2.fna&oh=8a233b0b845eac13401fb1c23cfd010c&oe=5ED4C016',
    author: '5e981d00eaa56028e5d6fe59',
    tags: ['ดนตรี']
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