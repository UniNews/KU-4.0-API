const News = require('../models/news')
const mongoose = require('mongoose')

const arr = [
    {
        title: 'ตามหาของหาย',
        description: "📢 ตามหาของหาย📍เป็นกระเป๋าสีดำตรงกลางเป็นลายนกอินทรีกับธงอเมริกา📢ตามหาเจ้าของใครพบเห็นหรือเป็นเจ้าของสามารถติดต่อรับได้ที่เพจนะงับ",
        type: 'lost-founds',
        user: mongoose.Types.ObjectId('5e54c91c2c9d7dfb05079245'),
        imageURL: [
            'https://www.thairath.co.th/media/dFQROr7oWzulq5FZYSPXhRbDggBCsIAoxGuW9cnAWze7xnPrBkxsGbxr3ls1ZrxRknj.webp',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcROybZs5wrL8gXTQgh9JR0DqC6xNo-u1TKtWiD2vWD2e9Lspcja'
        ],
        views: 0,
        comments: [
            mongoose.Types.ObjectId('5e54ca13fb76c6fb3db591ca'),
            mongoose.Types.ObjectId('5e54ca13fb76c6fb3db591cb')
        ],
        tags:['ของหาย']
    },
    {
        title: 'KUPhototrip2020',
        description: 'สิ้นสุดการรอคอย!!!! #KUPhototrip2020 กลับมาแล้วววว วันที่ 15-16 กุมภาพันธ์นี้คราวนี้พวกเราขอพาน้องๆไปออกทริปถ่ายรูปกันที่ “จังหวัดเพชรบุรี”ไปดื่มด่ำกับศิลปะทางธรรมชาติกันที่ โครงการพระราชดำริแหลมผักเบี้ย ที่ไม่ได้เป็นเพียงเส้นทางศึกษาธรรมชาติตามรอยพระราชดำริเท่านั้น ยังมีมุมสวยๆซ่อนอยู่ และ special cafe ที่ชิคที่สุดในเพชรบุรี แต่ขออุบไว้ก่อนว่าเป็นที่ไหน รับรองถ่ายรูปสะใจแน่นอน!!!!!พร้อมกับที่พักที่แสนสบาย ชายหาดส่วนตัว และทั้งหมดนี้ทั้งทริปราคา 550 บาท!!!!สนใจสมัครตามลิงค์นี้เลย https://forms.gle/NyaawqPyYeWoPjZr5สามารถสมัครได้ตั้งแต่วันนี้จนถึงวันที่ 8 กุมภาพันธ์!พลาดทริปนี้แล้วคุณจะเสียใจ!!!!!!!',
        type: 'club',
        user: mongoose.Types.ObjectId('5e54c91c2c9d7dfb05079243'),
        imageURL: [
            'https://scontent.fbkk22-3.fna.fbcdn.net/v/t1.0-9/83897125_2974888739243434_7398344461740146688_o.jpg?_nc_cat=110&_nc_ohc=nQlCpfSDfdoAX8jC3dN&_nc_ht=scontent.fbkk22-3.fna&oh=7394ea13cd1acaec5190241c054311e3&oe=5F008F95'
        ],
        views: 0,
        comments: [],
        tags:['ถ่ายรูป','ชมรม']
    },
    {
        title: 'ร่วมส่งแรงใจไปเชียร์ทีมนิสิตคณะอุตสาหกรรมเกษตร',
        description: 'ร่วมส่งแรงใจไปเชียร์ทีมนิสิตคณะอุตสาหกรรมเกษตร ภาควิชาวิทยาศาสตร์และเทคโนโลยีการอาหาร ชั้นปีที่ 3 (ผ่านการคัดเลือก จำนวน 2 ทีม)เข้าประกวดการแข่งขัน นวัตกรรมอาหารในงานประกวด Food Innopolis Innovation 2020รุ่น Light weight ใน Theme Future Protein',
        type: 'universities',
        imageURL: [
            'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-9/85200045_3374082342608177_8375273694208983040_o.jpg?_nc_cat=109&_nc_ohc=zIerAyrDPrcAX8PhpZq&_nc_ht=scontent.fbkk22-2.fna&oh=99a64ffe24ce7912ad83b4874798bfb6&oe=5EF0DCE3'
        ],
        user: mongoose.Types.ObjectId('5e32a25f3e65ba7204144321'),
        views: 0,
        comments:[],
        tags:['วิชาการ']
    },
    {
        title: 'ขอเชิญร่วมรับฟังสัมมนาเชิงปฎิบัติการ Gen alpha',
        description: 'กาพัฒนาการสำหรับเด็ก gen alpha ณ คณะศึกษาศาสตร์ มหาวิทยาลัยเกษตรศาสตร์ เวลา 8.30-16.00 น.',
        type: 'universities',
        imageURL: [
            'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-9/86757099_10158136271732451_7048548735877382144_n.jpg?_nc_cat=109&_nc_ohc=VBFBXK3NW90AX_nVg2N&_nc_ht=scontent.fbkk22-2.fna&oh=e05b9e522bba3966ed95f44aa0603c61&oe=5EC509E6'
        ],
        user: mongoose.Types.ObjectId('5e32a25f3e65ba7204144321'),
        views: 0,
        comments:[],
        tags: ['วิชาการ']
    },
    {
        title: 'โปรโมชั่น4จ่าย3',
        description: 'วันนี้พี่หมีใจดี๊ใจดีแจกแก้วน้ำให้ลูกค้าที่แวะมาทานที่ร้านของเราจร้า โปรโมชั่นเดือนนี้ เอาใจสายกินจุ👇🏻**ช่วงกลางวันมีโปร 4 จ่าย 3** ถึงสิ้นเดือนนี้เท่านั้น!!!!เรียกกันมากินฟินทั้งแก๊ง',
        type: 'promotions',
        imageURL: [
            'https://scontent-sin2-1.xx.fbcdn.net/v/t1.0-9/77388826_1496956390454444_6510195188281901056_n.jpg?_nc_cat=109&_nc_ohc=RzlZvOZV_sgAX8KBX6U&_nc_ht=scontent-sin2-1.xx&oh=04bfcdbc3d1ed27af171c9f3a498b094&oe=5ED1CCE8'
        ],
        user: mongoose.Types.ObjectId('5e32a25f3e65ba7204144322'),
        views: 0,
        comments:[],
        tags:['ของกิน']
    },
    {
        title: 'โครงการค่ายอาสาทำดีเพื่อพ่อ ครั้งที่ 13',
        description: 'ไฟนอลเสร็จแล้วเราไปค่ายด้วยกันไหม? ใครอยากไปยกมือขึ้นน🖐️มาคราวนี้ ชมรมค่ายอาสาขอเสนอ🔸🔶"โครงการค่ายอาสาทำดีเพื่อพ่อ ครั้งที่ 13"🔶🔸มาร่วมสร้างลานอเนกประสงค์ ลาน BBL ปรับปรุงแปลงผัก ให้กับโรงเรียนในถิ่นทุรกันดารไปกับชมรมค่ายอาสาด้วยกันนะ🤗📆วันที่ 1-7 ธ.ค. 62ณ โรงเรียนบ้านคลองเจ้าแรง อ.กบินทร์บุรี จ.ปราจีนบุรี(ตรงนี้มีใครทายถูกบ้างไหมน้าา🤔)☑️น้องๆ คนไหนที่สนใจสามารถเข้ามากรอกใบสมัครพร้อมสัมภาษณ์ได้ที่ชมรมค่ายอาสาพัฒนา (หน้าตึก 8 ตรงฝั่งตรงข้ามสนามรักบี้)📆ในวันที่ 21-25 ต.ค. 62 17:00-19:00 น. (ยกเว้นวันที่ 23 ต.ค. 62)📌Meeting: 28 ต.ค. 62 เวลา 17:00-19:00 น.💥สำหรับนิสิตวิทยาเขตศรีราชาทางเราจะแจ้งกำหนดการให้ทราบในภายหลัง💥⚠️⚠️⚠️งานนี้รับเฉพาะ KU78 และ KU79 เท่านั้น⚠️⚠️⚠️ขอบอกเลยว่า"ฟรี" ไม่มีค่าใช้จ่าย แถมยังได้เพื่อนต่างวิทยาเขตด้วยนะ😘',
        type: 'club',
        imageURL: [
            'https://scontent.fbkk22-1.fna.fbcdn.net/v/t1.0-9/72239473_2510913405665342_3571193288612380672_o.jpg?_nc_cat=108&_nc_ohc=Mu0X1l2zyhUAX_0tF8u&_nc_ht=scontent.fbkk22-1.fna&oh=4c87cb737e34edf8d658df4b28797533&oe=5EEF1802'
        ],
        user: mongoose.Types.ObjectId('5e32a25f3e65ba7204144320'),
        views: 0,
        comments:[],
        tags: ['ค่ายอาสา']
    }
]
News.insertMany(arr, function (err, news) {
    if (err) return console.error(err)
    console.log(" saved to collection.")
})

