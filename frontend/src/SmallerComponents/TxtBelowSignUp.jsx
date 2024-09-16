export default function TxtBelowSignUp({text, spanText}) {
    return <div className='text-center mt-3'> {text} <span className='underline hover:cursor-pointer'>{spanText}</span>
    </div>
}