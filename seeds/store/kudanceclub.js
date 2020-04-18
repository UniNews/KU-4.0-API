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
  bio: `ชมรมสำหรับนิสิตมหาวิทยาลัยเกษตรศาสตร์ทุกคณะ ที่รักและสนใจการเต้นทุกรูปแบบ (Style)`,
  email: 'kudanceclub@ku.th',
  firstName: 'KUDanceClub',
  lastName: 'KUDanceClub',
  mobilePhone: '0951923921',
  contacts: 'มหาวิทยาลัยเกษตรศาสตร์',
}

const articles = [
  {
      title: 'ครสนใจร่วม workshop สมัครกันได้นะครับบ',
      description: `
      📣💥แจ้งอัพเดตเวลาเวิร์คช็อป🔥⏰
      เราได้เปลี่ยนเวลาเวิร์คช็อปเล็กน้อยในวันที่ 29 ก.พ.
      รบกวนตรวจสอบเวลาใหม่อีกครั้งนะจ้ะ🙇
      
      📌 📌 Schedule 📌📌
      Fri 28 Feb. at Urban Dance Studio ( Sukhumvit 23 )
      20.00 - 21.30 ( Souchin x Mark )
      
      Sat 29 Feb. at The Movement Studio BKK ( RCA )
      18.00 - 19.30 ( Souchin )
      20.00 - 21.30 ( Souchin x Somkid )
      
      Sun 1 Mar. at Central Pattaya Beach
      18.30 - 20.00 ( Souchin )
      
      🇯🇵 ใครที่ชอบ Hip Hop สายญี่ปุ่นห้ามพลาด!! 🇯🇵
      ครั้งแรกของเมืองไทย กับ Workshop โดย 🔥 Souchin จากทีม Kanaboon 🔥 💯 แชมป์โลก จากเวทีการแข่งขัน World Hip Hop Dance Championship ในรุ่น Varsity 2016, 2018 และรุ่น Megacrew 2019 ร่วมด้วย 2 นักเต้นคนไทย Mark จากทีม Urban Squad และ Somkid จากทีม Redemption
      
      Walk in
      1 Class : 1,200 thb.
      2 Classes : 2,000 thb.
      3 Classes : 2,400 thb.
      
      📌 สามารถลงทะเบียน Workshop ได้ที่
      Line ID : @Themovement.bkk
      Facebook : The Movement Studio BKK
      
      Line ID : @Urbandancestudio
      Facebook : Urban Dance Studio Bangkok
      
      Facebook : โรงเรียนสอนเต้นพัทยา Boss Dance Studio
      
      #SouchinxPassionmoves
      #HHIThailand
      #Themovementstudio.bkk
      #Urbandancestudio
      #Bossdancestudio
      `,
      articleType: 'news',
      newsType: 'club',
      imageURL: 'https://scontent.fbkk2-5.fna.fbcdn.net/v/t1.0-9/87385142_2483969475048640_5567256090770407424_n.jpg?_nc_cat=110&_nc_sid=110474&_nc_oc=AQkiXFuC1Olq8dB5SDK_eAIVkkJUj7hVdMVrjO7NXy-D_lMAjH9g_BVoSkwa2G3uwAM&_nc_ht=scontent.fbkk2-5.fna&oh=b7be34aad28ec225b1bc9eb0e5fe7381&oe=5EBD7895',
      author: '5e9819f4328d2e2777968f62',
      tags: ['ทั่วไป']
  },
  {
    title: 'Our memories',
    description: `
    💛 Our memories. 🖤

    จบไปแล้วนะครับกับshowcaseครั้งแรกของพวกเรา KU DANCE CLUB เป็น 1 ในความทรงจำสุดพิเศษของพวกเรา ขอขอบคุณทุกคนที่เข้ามาร่วมเติมเต็มให้โชว์พิเศษมากขึ้น
    และขอขอบคุณเพื่อนบ้านของพวกเราไม่ว่าจะเป็น
    Creative dance, Higher level TU, CU Art street dance club, DPU chorus
    และขอขอบคุณชมรม KU Band, KU Acostic, KU Chorus, องค์การบริหารองค์การนิสิต, สภาผู้แทนนิสิต และขอขอบคุณผู้ชมทุกๆท่านมากเลยครับ
    
    แล้วเจอกันใหม่ครับShowcaseปีหน้า อย่าลืมมาเป็นส่วนหนึ่งกับพวกเรานะครับบ
    
    #kdc1stshowcase
    #kdcthedreamcatcher
    #kdcshowcase2020
    `,
    articleType: 'news',
    newsType: 'club',
    imageURL: 'https://scontent.fbkk2-3.fna.fbcdn.net/v/t1.0-0/p640x640/87077001_2751665778248569_8506409980742598656_o.jpg?_nc_cat=111&_nc_sid=110474&_nc_oc=AQnvKBt0v-rqYtU5HOm4Vi2L5O_MubPAAU3WzHzeJgVYBcqn10odVIqa7zxxoDdk85k&_nc_ht=scontent.fbkk2-3.fna&_nc_tp=6&oh=d29519efca59f1cf3f449945848ef40c&oe=5EBDA36E',
    author: '5e9819f4328d2e2777968f62',
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