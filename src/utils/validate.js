

export const checkValidData = (email,password)=>{
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ ;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    
    const isEmailvalid = emailRegex.test(email);
    const isPasswordValid = passwordRegex.test(password)
    
    if(!isEmailvalid){
        return {isEmailvalid,message:"Enter a valid Email"}
    }
    if(!isPasswordValid){
        return {isPasswordValid,message:"Enter a valid Password"}
    }
    
    return null
}

export const checkValidName = (name) => {
    const nameRegex = /^[a-zA-Z]{2,}(?:\s[a-zA-Z]{2,})*$/
    const isNameValid = nameRegex.test(name.trim())
    if (!isNameValid) return { isNameValid, message: "Enter a valid full name" }
    return null
}
