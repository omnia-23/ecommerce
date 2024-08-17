import nodemailer from 'nodemailer'
const sendEmail = async(
    {from='"Route 👻" <mayawaad622@gmail.com>',to,subject= "Hr interview",html}={}
) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: false, 
        auth: {
            user: "mayawaad622@gmail.com",
            pass: "avlropvuudgbtnri",
        },
    });
    const info = await transporter.sendMail({
        from, 
        to,
        subject,
        html, 
    });
    console.log(info);
}


export default sendEmail