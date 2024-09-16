export default function SubmitButton({text, submit}) {


    return <button onClick={submit} className='pt-4 pb-4 text-center w-full bg-black text-white rounded-lg mt-7 text-lg font-bold'>{text}</button>
}