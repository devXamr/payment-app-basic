import Heading from "./SmallerComponents/Heading.jsx";
import HeadingDesc from "./SmallerComponents/HeadingDesc.jsx";
import InputBox from "./SmallerComponents/InputBox.jsx";
import SubmitButton from "./SmallerComponents/SubmitButton.jsx";
import TxtBelowSignUp from "./SmallerComponents/TxtBelowSignUp.jsx";
import {useState} from "react"
import axios from "axios";
export default function SignIn(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(){
        const result = await axios.post('http://localhost:3000/api/v1/user/signin', {
            username: email,
            password: password
        })
        localStorage.setItem("token" , result.data.token)
    }


    return <div className="w-max h-max mr-auto ml-auto bg-white mt-32 rounded-xl pt-12 pb-12 pl-10 pr-10 shadow-xl">
        <Heading text='Sign In'/>
        <HeadingDesc text='Enter your credentials to access your account'/>
        <InputBox value={email} onChange={(e)=> {
            setEmail(e.target.value)
        }} label='Email' placehold='johndoe@example.com'/>
        <InputBox value={password} onChange={(e)=>{
            setPassword(e.target.value)
        }} label='Password'/>

        <SubmitButton submit={handleSubmit} text='Sign In'/>
        <TxtBelowSignUp text="Don't have an account?" spanText='Sign Up'/>
    </div>
}