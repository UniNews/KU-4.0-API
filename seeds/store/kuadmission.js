const mongoose = require('mongoose')
const User = mongoose.model('User')
const Article = mongoose.model('Article')

let user = {
  username: 'kuadmission',
  loginType: 'normal',
  password: '123456',
  displayName: 'KU Admission',
  role: 'store',
  avatarURL: 'https://scontent.fbkk22-3.fna.fbcdn.net/v/t1.0-9/12036422_530971107054749_3663391887205333585_n.png?_nc_cat=103&_nc_sid=85a577&_nc_eui2=AeHGKCoq_qhOZFWiWD7xr-I0bDRxG_pR1QBsNHEb-lHVAC3BenQHc4kDUmGuRWzkPhYETlhddt0XysJi0BeFOhmm&_nc_oc=AQktMnS2_N0M4PpNHiXmyQgGuZnykChKrDhDnWB9IL57ukmXzp5xA-0rGGAR7nXV1zc&_nc_ht=scontent.fbkk22-3.fna&oh=677c9837ae4ad3e0857d2eebba28303f&oe=5ED45396',
  active: true,
  bio: `ประชาสัมพันธ์ข้อมูลการรับสมัครและคัดเลือกบุคคลเข้าศึกษาในระบบรับตรง มหาวิทยาลัยเกษตรศาสตร์ (KU Admission) และโครงการ/โควตาอื่นๆ ของมหาวิทยาลัยเกษตรศาสตร์`,
  email: 'yujinshabu@ku.th',
  firstName: 'KU Admission',
  lastName: 'KU Admission',
  mobilePhone: '0863041997',
  contacts: '50 Ngam Wong Wan Rd, Lat Yao Chatuchak กรุงเทพมหานคร',
}

let articles = [
  {
    title: '📣📣 TCAS รอบที่ 3 ม.เกษตรศาสตร์ ยกเลิกการสอบสัมภาษณ์',
    description: `📣📣 TCAS รอบที่ 3 ม.เกษตรศาสตร์ ยกเลิกการสอบสัมภาษณ์ นะคะ
✅ ประกาศผล วันที่ 8 พ.ค. 2563 ทาง www.mytcas.com
✅ ยืนยันสิทธิ์ วันที่ 8-9 พ.ค. 2563 ทาง www.mytcas.com
👉 รายละเอียดเพิ่มเติมทาง www.admission.ku.ac.th`,
    articleType: 'news',
    newsType: 'university',
    imageURL: 'https://www.facebook.com/kuadmission/photos/a.794541780697679/1674982295986952/?type=3&theater',
    author: '5e981fd5f1ad412b40217827',
    tags: ['ทั่วไป', 'การเรียน']
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