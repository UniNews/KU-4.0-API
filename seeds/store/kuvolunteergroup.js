const mongoose = require('mongoose')
const User = mongoose.model('User')
const Article = mongoose.model('Article')

let user = {
  username: 'kuvolunteergroup',
  loginType: 'normal',
  password: '123456',
  displayName: 'ชมรมค่ายอาสาพัฒนา มหาวิทยาลัยเกษตรศาสตร์',
  role: 'store',
  avatarURL: 'https://scontent.fbkk2-6.fna.fbcdn.net/v/t1.0-9/52487965_2114158535340833_6446977534587305984_n.jpg?_nc_cat=107&_nc_sid=85a577&_nc_oc=AQnReV3DDzFM2ZZdsJ3wd1hyutaC0b3_UFs5Sr2EySC3LLXhu7dnoXrXjXqlxa-xlGM&_nc_ht=scontent.fbkk2-6.fna&oh=5441488c167371e6bdf148ecd480fff7&oe=5EBE95EF',
  active: true,
  bio: `องค์กรนี้ไม่ได้สร้างขึ้นมาเพื่อหาผลประโยชน์ให้ฝ่ายใดฝ่ายหนึ่ง
  หรือการเมืองทั้งสิ้น
  แต่สร้างขึ้นเพื่อความบันเทิง และอัพเดทข่าวสารให้กลุ่มนิสิติาสาสมัคร
  มหาวิทยาลัยเกษตรศาสตร์ หรือ
  ชมรมค่ายอาสาพัฒนามหาวิทยาลัยเกษตรศาสตร์ ได้รู้
  หากรูปใดหรือข้อความใด้ไม่เหมาะสม ก็ขออภัยเป็นอย่างสูง`,
  email: 'kuvolunteergroup@ku.th',
  firstName: 'KUVolunteerGroup',
  lastName: 'KUVolunteerGroup',
  mobilePhone: '0951923921',
  contacts: 'มหาวิทยาลัยเกษตรศาสตร์',
}

let articles = [
  {
      title: 'โครงการค่ายอาสาพัฒนา ครั้งที่ 54',
      description: `
      มาครั้งนี้ ชาวค่ายอาสาจะพาไปสร้างอาคารเรียนอเนกประสงค์🤩

      📆วันที่ 16-25 เม.ย. 63
      ณ โรงเรียนหลักด่านวิทยา อ.ยางตลาด จ.กาฬสินธุ์
      
      ☑️สำหรับน้องๆ ที่สนใจจะไหลไปกับเราสามารถเข้ามากรอกใบสมัครพร้อมสัมภาษณ์ได้ที่ชมรมค่ายอาสาพัฒนา (หน้าตึก 8 ตรงฝั่งตรงข้ามสนามรักบี้)
      📆ในวันที่ 24-28 ก.พ. 63 เวลา 16:00-19:00 น.
      📌Meeting: 18 มี.ค. 63 เวลา 16:30 น. เป็นต้นไป
      
      💥สำหรับนิสิตวิทยาเขตศรีราชาทางเราจะแจ้งกำหนดการให้ทราบในภายหลัง💥
      
      ⚠️⚠️⚠️งานนี้รับเฉพาะ KU78 และ KU79 เท่านั้น⚠️⚠️⚠️
      
      บอกเลยว่าค่ายนี้ฟรี!! แถมยังมีเพื่อนต่างวิทยาเขตด้วยนะ😉
      
      #ชมรมค่ายอาสาพัฒนามหาวิทยาลัยเกษตรศาสตร์ #kuvolunteer
      
      ปล. สำหรับใครที่สงสัยว่าน้ำดำคืออะไร ที่จริงแล้วมันเป็นความหมายของชื่อจังหวัดกาฬสินธุ์นั่นเองค่าา✨✨✨
      `,
      articleType: 'news',
      newsType: 'club',
      imageURL: 'https://scontent.fbkk2-5.fna.fbcdn.net/v/t1.0-9/s960x960/86272165_2785994831490530_2746641116324429824_o.png?_nc_cat=110&_nc_sid=8024bb&_nc_oc=AQmUpPsy1XqeDDHp87pluzI0gHIj5OLUiSoXIHzs1RK8uoKKHtth0aZJTRxd3Zzohqk&_nc_ht=scontent.fbkk2-5.fna&oh=6b775708fae24e331535a43a5fee940c&oe=5EBDC1A0',
      author: '5e9818e846871726ac3a79e3',
      tags: ['ทั่วไป']
  },
  {
    title: 'รับสมัคร Staff สร้างอาคารอเนกประสงค์',
    description: `
    📣📣📣ปุกาด! ปุกาด! สำหรับชาวศรีราชาที่อยากมาไหลสงกรานต์ไปกับชาวค่ายอาสา คราวนี้โอกาสมาถึงแล้ววว

    น้องๆ ศรีราชาคนไหนที่อยากจะมาค่ายกับเรา
    📌มาพบกันที่ หน้าห้องพยาบาล
    📆วันที่ 4-6 มี.ค. 63 เวลา 17:30 -​ 19:30 น.
    
    แล้วมาสมัครกันเยอะๆ นะคะะ😊😊😊
    `,
    articleType: 'news',
    newsType: 'club',
    imageURL: 'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-9/p720x720/87675695_2802726226484057_1689613677247856640_o.jpg?_nc_cat=103&_nc_sid=110474&_nc_oc=AQmQjjFRg2mbb1BLOtczrKAnQ2yX97MwTZ9tGspzHrjdy93BZCPL7hc8WqbYwFgKePw&_nc_ht=scontent.fbkk2-8.fna&_nc_tp=6&oh=90ffb6ba456da2f18052ae4d45d69d82&oe=5EBD2ECB',
    author: '5e9818e846871726ac3a79e3',
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