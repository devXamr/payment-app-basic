import InputBox from "./SmallerComponents/InputBox.jsx";
import Heading from "./SmallerComponents/Heading.jsx";
import HeadingDesc from "./SmallerComponents/HeadingDesc.jsx";
import SubmitButton from "./SmallerComponents/SubmitButton.jsx";
import TxtBelowSignUp from "./SmallerComponents/TxtBelowSignUp.jsx";
import {useState} from "react";
import axios from "axios"

export default function SignUp(){
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    async function onSubmit(){
       const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
            username: email,
            firstname : firstname,
            lastname :lastname,
            password: password
        })

        localStorage.setItem("token",response.data.token)




    }






    return <div className='h-screen bg-slate-300 pt-32'>
    <div className="w-max h-max mr-auto ml-auto bg-white rounded-xl pt-12 pb-12 pl-10 pr-10 shadow-xl">
        <Heading text='Sign Up'/>
        <HeadingDesc text='Enter your information to create an account'/>
        <InputBox value={firstname} onChange={(e) => {
            setFirstname(e.target.value)
        }} label='First Name' placehold='John'/>
        <InputBox value={lastname} onChange={(e) => {
            setLastname(e.target.value)
        }} label='Last Name' placehold='Doe'/>
        <InputBox value={email} onChange={(e) => {
            setEmail(e.target.value)
        }} label='Email' placehold='johndoe@gmail.com'/>
        <InputBox value={password} onChange={(e) => {
            setPassword(e.target.value)
        }} label='Password'/>
        <SubmitButton text='Sign Up' submit={onSubmit}/>
        <TxtBelowSignUp text='Already have an account?' spanText='Log in'/>




    </div>
    </div>
}