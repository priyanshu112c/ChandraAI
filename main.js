const sendbtn = document.querySelector('.sendbtn')
const userinput = document.querySelector('#user-input')
const showmsg = document.querySelector('.show-message')
const bottext = document.querySelector('.bottext')
const botinnertext = document.querySelector('.bot-text')
const fileInput = document.querySelector('#file-input')
const fileuploadwrapper = document.querySelector('.file-upload-wrapper')
const fileUpload = document.querySelector(".uploads")
const fileImage = document.querySelector(".file-image")
const fileCancel = document.querySelector(".file-cancel")
// const animationbot = document.querySelector('.animation-bot-container')
// const botAnimationContainer = document.querySelector('.animation-bot-container')

const userData = {
    file: {
        data: null,
        mime_type: null
    }
}

async function generateResponse(prompt, divshow) {
    // console.log(userData.file.data)
    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDByOBQkeVmM_tauSn7lOad9Z4jhu10M0Y", {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
                contents: [
                    { parts: [{ text: prompt }, ...(userData.file.data ? [{ inline_data: userData.file }] : [])] }
                ]
            })
        })

        const data = await response.json();
        // console.log(data)
        const output = data.candidates[0].content.parts[0].text.replace(/\*\*(.?)\*\*/g, "$1").trim()
        divshow.classList.add('hide')
        createbottext(output)
        // console.log(output)
    } catch (error) {
        divshow.classList.add('hide')
        output = `Error Occuered try again : ${error}`
        // output.style.color = "red"
        createbottext(output)
    }

}

const createbottext = (output) => {
    const div = document.createElement('div')
    const showbot = `<div class="show-message-bot-container">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="show-message-bot">
                            <path
                                d="M160-360q-50 0-85-35t-35-85q0-50 35-85t85-35v-80q0-33 23.5-56.5T240-760h120q0-50 35-85t85-35q50 0 85 35t35 85h120q33 0 56.5 23.5T800-680v80q50 0 85 35t35 85q0 50-35 85t-85 35v160q0 33-23.5 56.5T720-120H240q-33 0-56.5-23.5T160-200v-160Zm200-80q25 0 42.5-17.5T420-500q0-25-17.5-42.5T360-560q-25 0-42.5 17.5T300-500q0 25 17.5 42.5T360-440Zm240 0q25 0 42.5-17.5T660-500q0-25-17.5-42.5T600-560q-25 0-42.5 17.5T540-500q0 25 17.5 42.5T600-440ZM320-280h320v-80H320v80Zm-80 80h480v-480H240v480Zm240-240Z" />
                        </svg>
                    </div>
                    `
    div.classList.add("bottext-container")
    const div2 = document.createElement('div')
    div2.classList.add('bottext')
    const p = document.createElement('p')
    p.innerText = output
    div2.appendChild(p)
    div.innerHTML = showbot
    div.appendChild(div2)
    // console.log(div)
    // console.log(div2)
    showmsg.appendChild(div)
    output = ''
    showmsg.scrollTo({ top: showmsg.scrollHeight, behavior: "smooth" })
    userData.file = {}
    userinput.disabled = false
    sendbtn.disabled = false
    fileUpload.disabled = false
}

const addmessage = (userMessage, isUser) => {
    if (isUser) {
        // console.log(userData.file.data)
        const usercontainer = document.createElement('div')
        usercontainer.classList.add('usertext-container')
        if (userData.file.data != null) {
            // const userimage = `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="user-image"`
            const img = document.createElement('img')
            img.src = `data:${userData.file.mime_type};base64,${userData.file.data}`
            img.classList.add('user-image')
            usercontainer.appendChild(img);
        }

        const usertext = document.createElement('div')
        usertext.classList.add('usertext')
        usertext.innerHTML = userMessage

        usercontainer.appendChild(usertext)
        showmsg.appendChild(usercontainer)
        // console.log(showmsg)
        showmsg.scrollTo({ top: showmsg.scrollHeight, behavior: "smooth" })
        // fileUpload.style.display = 'flex'
    }
    if (fileuploadwrapper.querySelector("img").src != "") {
        fileuploadwrapper.querySelector("img").classList.remove("show")
        // fileUpload.style.display = 'flex'
        // fileImage.style.display = 'none'
        // fileCancel.style.display = 'none'
        fileUpload.style.display = 'flex'
    }

    // console.log(`${URL}?key=${API}`)
    // generateResponse(userinput.value.trim())

}
//This is the main file 
const botAnimation = (userMessage, isUser) => {
    const botAnimationContainer = document.createElement('div')
    const animationSvg = `<div class="show-message-bot-container">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="show-message-bot">
                            <path
                                d="M160-360q-50 0-85-35t-35-85q0-50 35-85t85-35v-80q0-33 23.5-56.5T240-760h120q0-50 35-85t85-35q50 0 85 35t35 85h120q33 0 56.5 23.5T800-680v80q50 0 85 35t35 85q0 50-35 85t-85 35v160q0 33-23.5 56.5T720-120H240q-33 0-56.5-23.5T160-200v-160Zm200-80q25 0 42.5-17.5T420-500q0-25-17.5-42.5T360-560q-25 0-42.5 17.5T300-500q0 25 17.5 42.5T360-440Zm240 0q25 0 42.5-17.5T660-500q0-25-17.5-42.5T600-560q-25 0-42.5 17.5T540-500q0 25 17.5 42.5T600-440ZM320-280h320v-80H320v80Zm-80 80h480v-480H240v480Zm240-240Z" />
                        </svg>
                    </div>
                    <div class="bottext  animtion-bot">
                        <div class="think-indicator">
                            <div class="dot"></div>
                            <div class="dot"></div> 
                            <div class="dot"></div>
                        </div>
                    </div>`

    botAnimationContainer.classList.add('animation-bot-container')
    showmsg.scrollTo({ top: showmsg.scrollHeight, behavior: "smooth" })
    setTimeout(() => {
        botAnimationContainer.innerHTML = animationSvg
        // console.log(botAnimationContainer)
        showmsg.appendChild(botAnimationContainer)
        // console.log(userMessage)
        // console.log(userMessage)
        showmsg.scrollTo({ top: showmsg.scrollHeight, behavior: "smooth" })
        generateResponse(userMessage, botAnimationContainer)
        userMessage = ''
    }, 600);

}
const handleusermessage = () => {
    const userMessage = userinput.value;

    if (userMessage) {
        addmessage(userMessage, true)
        botAnimation(userMessage, true);

        userinput.disabled = true;
        sendbtn.disabled = true;
        fileUpload.disabled = true;
    }
    userinput.value = ""
}


// sendbtn.addEventListener('click',()=>{
//     const bts = generateResponse("hii");
// })
userinput.addEventListener('keypress', (e) => {
    if (e.key == 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleusermessage()
    }
})

fileInput.addEventListener("change", () => {
    let file = fileInput.files[0];
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const base64string = e.target.result.split(',')[1]
        fileuploadwrapper.querySelector("img").src = e.target.result
        fileUpload.style.display = 'none'
        fileuploadwrapper.querySelector("img").classList.add("show")
        
        if (!file) return;
        userData.file = {
            data: base64string,
            mime_type: file.type
        }
        if (fileuploadwrapper.querySelector("img").src != "") {
            fileImage.addEventListener("click",()=>{
                fileuploadwrapper.querySelector("img").src = ""
                fileUpload.style.display = 'flex'
                fileImage.classList.remove('show')
                userData.file = {}
            })
        }
        // console.log(userData)
        fileInput.value = ""
    }
    reader.readAsDataURL(file)
})
sendbtn.addEventListener('click', handleusermessage)
document.querySelector('#file-upload').addEventListener("click", () => fileInput.click())

/** Dark theme and light theme */

const lightTheme = document.querySelector('.light-theme')
const darkTheme = document.querySelector('.dark-theme')

lightTheme.addEventListener("click",()=>{
    darkTheme.style.display = 'block'
    lightTheme.classList.add('hide')

    document.querySelector("link[href='style.css']").href = 'dark-theme.css'

})
darkTheme.addEventListener('click',()=>{
    lightTheme.classList.remove('hide')
    darkTheme.style.display = 'none'

    document.querySelector("link[href='dark-theme.css']").href = 'style.css'
})