const mongoose = require('mongoose')
const User = mongoose.model('User')
const Article = mongoose.model('Article')

const user = {
  username: 'kuchorus',
  loginType: 'normal',
  password: '123456',
  displayName: 'ชมรมขับร้องประสานเสียงแห่งมหาวิทยาลัยเกษตรศาสตร์',
  role: 'store',
  avatarURL: 'https://scontent.fbkk2-6.fna.fbcdn.net/v/t1.0-0/p370x247/12240152_970340363043507_4972928624540017244_n.png?_nc_cat=107&_nc_sid=85a577&_nc_oc=AQlaCssMpCJiqOXmJyRD6QxEtnx4QvKG1HXVwl7vOvLQc4PwkwEhPh4biFnQmqDYFsQ&_nc_ht=scontent.fbkk2-6.fna&oh=2c84dd366400b1bab590078ef0d0463c&oe=5EBC2DFC',
  active: true,
  bio: `แรกเริ่มนั้นเกิดจากการรวมกลุ่มของกลุ่มผู้สนใจการขับร้องประสานเสียงโดยมี ผศ.ดร.ธวัชชัย นาควงศ์ (ปัจจุบัน รศ.ดร.ธวัชชัย นาควงษ์) เป็นผู้ริเริ่ม จนมีการก่อตั้งเป็นกลุ่มขับร้องประสานเสียง เมื่อวันที่ 2 กรกฎาคม พ.ศ.2534 ณ ภาควิชาศิลปนิเทศ คณะมนุษยศาสตร์ มีสมาชิก 105 คน จากทุกคณะเพื่อขับร้องเพลงประสานเสียงในพิธีเปิดและปิดงานกีฬามหาวิทยาลัย นนทรีเกมส์ ครั้งที่ 20 ในปี พ.ศ. 2536 โดยนายบุญลือ แซ่จิ้ว ได้ดำรงตำแหน่งเป็นประธานกลุ่มขับร้องประสานเสียงคนแรก ต่อมาจึงจัดตั้งเป็นชมรม โดยมีการนำเรื่องเข้าสภานิสิตแห่งมหาวิทยาลัยเกษตรศาสตร์ และได้รับการอนุมัติให้จัดตั้งเป็น ชมรมขับร้องประสานเสียงแห่งมหาวิทยาลัยเกษตรศาสตร์ (KU CHORUS) และมี นางสาวปิยมาภรณ์ สบายแท้ เป็นประธานชมรมคนแรก`,
  email: 'kuchorus@ku.th',
  firstName: 'KUChorus',
  lastName: 'KUChorus',
  mobilePhone: '0951923921',
  contacts: 'มหาวิทยาลัยเกษตรศาสตร์',
}

const articles = [
  {
      title: 'ชมรม KU Chorus ได้รับรางวัลรองชนะเลิศอันดับ 2',
      description: `
      ชมรม KU Chorus ได้รับรางวัลรองชนะเลิศอันดับ 2 และได้รับรางวัลสนับสนุนให้กับทางมหาวิทยาลัยเกษตรศาสตร์ ในการแข่งขัน GSB GEN WAY-T ณ ลานอัฒจันทร์ Siam Square One

      ขอบคุณทุกฝ่ายที่ให้การสนับสนุน และขอบคุณทุกกำลังใจ
      
      ชมรม KU Chorus จะนำข้อเสนอแนะต่างๆไปปรับใช้ และพัฒนาชมรมให้ดียิ่งขึ้น
      `,
      articleType: 'news',
      newsType: 'club',
      imageURL: 'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-9/s960x960/78302523_2535346046542923_5120116571821309952_o.jpg?_nc_cat=103&_nc_sid=9e2e56&_nc_oc=AQkRN4uUI07EXtwl3wb4wFaxD3DObInWGlSgbMi2L3oNjxjQQqy1jSveOqF6q2vnRKM&_nc_ht=scontent.fbkk2-8.fna&_nc_tp=7&oh=9bbb04776d99eecb4faa093ac28ac770&oe=5EBD28AF',
      author: '5e981d00eaa56028e5d6fe58',
      tags: ['ทั่วไป']
  },
  {
    title: 'เปิดรับสมัคร ออดิชั่นตำแหน่ง "นักเปียโน" และ "นักร้องชาย" ',
    description: `
    ประกาศจากชมรม KU Chorus 🎉🎉🎉
    เปิดรับสมัคร ออดิชั่นตำแหน่ง "นักเปียโน" และ "นักร้องชาย" สำหรับใครที่สนใจจะมาเป็นส่วนหนึ่งไปกับพวกเราชาว KU Chorus สามารถทักเข้ามาทางเพจเพื่อลงชื่อสมัครได้เลยครับ
    โดยบอกชื่อ คณะ ชั้นปี รหัสนิสิต และตำแหน่งที่จะมาสมัคร ไว้ทาง inbox ได้เลยครับ เปิดรับสมัครทางเพจตั้งแต่วันนี้ เป็นต้นไป แล้วพบกันนะครับ 😁😁😁
    `,
    articleType: 'news',
    newsType: 'club',
    imageURL: 'https://scontent.fbkk2-6.fna.fbcdn.net/v/t1.0-9/s960x960/70394258_2376257965785066_3926305990714064896_o.jpg?_nc_cat=107&_nc_sid=110474&_nc_oc=AQkdVut1I3vBuI5JXTUR6PFjFAG7qsZ55x1flB4fYgHtUehRdu3smMPR5kNFUmAoiac&_nc_ht=scontent.fbkk2-6.fna&_nc_tp=7&oh=108c26f4303dcb5cba01830d9e3fcb92&oe=5EBC54D0',
    author: '5e981d00eaa56028e5d6fe58',
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