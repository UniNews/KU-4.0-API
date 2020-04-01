const mongoose = require('mongoose')
const Article = mongoose.model('Article');

const articles = [
    {
        title: 'Work From Home อย่างไรให้ได้งาน 📇',
        description: 'เดี๋ยวนี้หลายบริษัทมีนโยบาย Work From Home (หรือ telework) ที่ให้พนักงานสามารถทำงานข้างนอกได้โดยไม่ต้องเข้าออฟฟิศ เพื่อลดค่าใช้จ่ายในบริษัท และเปลี่ยนบรรยากาศทำงานให้รู้สึกอิสระมากขึ้น แต่บางคนก็หักห้ามใจตัวเองไม่ค่อยจะได้ ทำไปทำมาเวลาไม่พอ สุดท้ายกลายเป็นเหนื่อยกว่าเดิม ลองทำตามวิธีเหล่านี้แล้วจะจัดเวลาได้ดีขึ้น',
        articleType: 'news',
        newsType: 'club',
        imageURL: 'https://scontent.fbkk22-1.fna.fbcdn.net/v/t1.0-9/89151440_2565869087075994_3664292288210665472_n.jpg?_nc_cat=101&_nc_sid=8024bb&_nc_eui2=AeF03MHcLYw4vxHm5ZpdaJjZn4GCWWnrn3QohX31U3FTfENbFscCEWcAwUmiuBen3Mz2gkNKIxJF-87yIYHzmwQtnz9msOlBj7VpF8VwI-2idQ&_nc_oc=AQmfksDO7-fgIf8svbBT_h6XfCJQbl5-sK_4VSprx9KFVm8hbQOQHe3_TmAkWo3jI_4&_nc_ht=scontent.fbkk22-1.fna&oh=0893257173d934ba1d771a1f099bd019&oe=5EA8C43D',
        author: '5e838423d3f9ceae8e0f6ff5',
        tags: ['telework', 'พัฒนาตัวเอง']
    },
    {
        description: 'กำหมัดยามดึก',
        articleType: 'community',
        author: '5e838423d3f9ceae8e0f6ff5',
        tags: ['โมโห', 'กริ้ว']
    }
]

Article.insertMany(articles, function (err) {
    if (err)
        return console.error(err)
    console.log("Articles have been saved in Article collection!")
})

