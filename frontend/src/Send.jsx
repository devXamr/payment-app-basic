import Heading from "./SmallerComponents/Heading.jsx";
import InputBox from "./SmallerComponents/InputBox.jsx";
import SubmitButton from "./SmallerComponents/SubmitButton.jsx";

export default function Send(){
    return <div className="w-max h-max mr-auto ml-auto bg-white mt-32 rounded-xl pt-12 pb-12 pl-10 pr-10 shadow-xl">
        <Heading text='Send Money'/>
        <div className='flex mt-4 justify-center'>
            <div className='bg-gray-200 px-2.5 py-1 rounded-full text-lg'>u1</div>
            <div className='text-lg ml-3'>
                username
            </div>
        </div>
        <InputBox label='Amount (in rupees)' placehold='Enter amount'/>
        <SubmitButton text='Initiate Transfer'/>
    </div>
}