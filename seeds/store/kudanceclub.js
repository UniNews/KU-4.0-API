const mongoose = require('mongoose')
const User = mongoose.model('User')
const Article = mongoose.model('Article')

const user = {
  username: 'kudanceclub',
  loginType: 'normal',
  password: '123456',
  displayName: 'KU Dance Club',
  role: 'store',
  avatarURL: 'https://scontent.fbkk2-3.fna.fbcdn.net/v/t31.0-0/c73.0.1134.1134a/s526x395/1465898_626636107418224_3198930181773441968_o.jpg?_nc_cat=111&_nc_sid=85a577&_nc_oc=AQkSazq3_67-dxnCL1Q8kGy33CW2ZnPNb0pKoIBwlRvmIdwxtg1k0GHPEUl_-FFCrNI&_nc_ht=scontent.fbkk2-3.fna&oh=5621978f5e389e8687eda9a1bbad38f6&oe=5EBDDE57',
  active: true,
  bio: `ชมรมสำหรับนิสิตมหาวิทยาลัยเกษตรศาสตร์ทุกคณะ ที่รักและสนใจการเต้นทุกรูปแบบ`,
  email: 'kudanceclub@ku.th',
  firstName: 'KUDanceClub',
  lastName: 'KUDanceClub',
  mobilePhone: '0951923921',
  contacts: 'มหาวิทยาลัยเกษตรศาสตร์',
}

const articles = [
  {
    title: '💛 Our memories. 🖤',
    description: `💛 Our memories. 🖤
    
จบไปแล้วนะครับกับshowcaseครั้งแรกของพวกเรา KU DANCE CLUB เป็น 1 ในความทรงจำสุดพิเศษของพวกเรา ขอขอบคุณทุกคนที่เข้ามาร่วมเติมเต็มให้โชว์พิเศษมากขึ้น
และขอขอบคุณเพื่อนบ้านของพวกเราไม่ว่าจะเป็น
Creative dance, Higher level TU, CU Art street dance club, DPU chorus
และขอขอบคุณชมรม KU Band, KU Acostic, KU Chorus, องค์การบริหารองค์การนิสิต, สภาผู้แทนนิสิต และขอขอบคุณผู้ชมทุกๆท่านมากเลยครับ
    
แล้วเจอกันใหม่ครับShowcaseปีหน้า อย่าลืมมาเป็นส่วนหนึ่งกับพวกเรานะครับบ
https://www.facebook.com/kudanceclub/photos/pcb.2751666898248457/2751665774915236/?type=3&theater`,
    articleType: 'news',
    newsType: 'club',
    imageURL: 'https://scontent.fbkk22-4.fna.fbcdn.net/v/t1.0-9/87077001_2751665778248569_8506409980742598656_o.jpg?_nc_cat=111&_nc_sid=110474&_nc_eui2=AeExx_3uP0JiimTGFFdIaeyigTnP40at_DmBOc_jRq38OUwmPm9G_3qLm16eUvt4IeRkjrW2YplYUz8GULlM8AmQ&_nc_oc=AQnpfXM88Jne2fDS9RMIdg2rCgVvh_Gs_YvjJClMPrz-k2JgP56NaKF3VVfI4p6jSVs&_nc_ht=scontent.fbkk22-4.fna&oh=902862e02d8cbf24ba7d45e1b1998e7a&oe=5ED6B80B',
    author: '5e9819f4328d2e2777968f62',
    tags: ['กีฬา', 'ทั่วไป']
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