const mongoose = require('mongoose')
const User = mongoose.model('User')
const Article = mongoose.model('Article')

const user = {
  username: 'kuchorus',
  loginType: 'normal',
  password: '123456',
  displayName: 'KU Chorus',
  role: 'store',
  avatarURL: 'https://scontent.fbkk2-6.fna.fbcdn.net/v/t1.0-0/p370x247/12240152_970340363043507_4972928624540017244_n.png?_nc_cat=107&_nc_sid=85a577&_nc_oc=AQlaCssMpCJiqOXmJyRD6QxEtnx4QvKG1HXVwl7vOvLQc4PwkwEhPh4biFnQmqDYFsQ&_nc_ht=scontent.fbkk2-6.fna&oh=2c84dd366400b1bab590078ef0d0463c&oe=5EBC2DFC',
  active: true,
  bio: `ชมรมขับร้องประสานเสียงแห่งมหาวิทยาลัยเกษตรศาสตร์`,
  email: 'kuchorus@ku.th',
  firstName: 'KUChorus',
  lastName: 'KUChorus',
  mobilePhone: '0951923921',
  contacts: 'มหาวิทยาลัยเกษตรศาสตร์',
}

const articles = [
  {
    title: 'The New Life Concert เพราะชีวิตต้องมูฟออน',
    description: `พรุ่งนี้ก็จะถึงวันแสดงคอนเสิร์ต "The New Life Concert เพราะชีวิตต้องมูฟออน" ของพวกเราทั้งสองชมรมแล้ว โดยสามารถดูวิธีการลงทะเบียนหน้างานได้ทางด้านล่างโพสต์

**หลังจากลงทะเบียนหน้างานแล้ว สามารถเลือกที่นั่งก่อนเข้าชมคอนเสิร์ต และแจ้งเจ้าหน้าที่หน้างาน**
**ขอสงวนสิทธิ์ให้กับผู้ที่ทำการสำรองที่นั่งผ่านเว็บ ในการเลือกที่นั่งเข้างานก่อน**
    
เปิดรับการลงทะเบียนหน้างานเวลา 16.30 น.
การแสดงจะเริ่มเวลาประมาณ 17.00 -20.00 น.
    
แล้วพบกันนนน 😆😆
อ่านรายละเอียดเพิ่มเติมที่
https://www.facebook.com/KUAcoustic/photos/a.1512268465651440/2480726105472333/?type=3&theater
    `,
    articleType: 'news',
    newsType: 'club',
    imageURL: 'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-9/83810868_2678814495529410_5165992985820659712_n.jpg?_nc_cat=107&_nc_sid=110474&_nc_eui2=AeH7BuxwB_6du4fqts6Wkp-L-FAJRLvdOM_4UAlEu904zzrjl7haWqAgR8ttBYmESs0LmKg5HvS9TSKr1BAS2QB7&_nc_oc=AQl1rehlhlgtHQ8YbiUH2nxthX-ehi7xo6gamvOpetc36oxquACdhY2UOufdi-xpCko&_nc_ht=scontent.fbkk22-2.fna&oh=b5cd63543c5695f82ad56d45065bd211&oe=5ED74D49',
    author: '5e981d00eaa56028e5d6fe58',
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

module.exports = insertMany;