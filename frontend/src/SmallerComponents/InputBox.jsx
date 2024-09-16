export default function InputBox({label = '', placehold = '', onChange, value }) {

    return <div className='mt-6'>
        <div className='text-lg font-bold'>{label}</div>
        <input value={value} type='text' placeholder={placehold} className='border-gray-300 selection:border-black border-2 rounded-md w-full pt-3 pb-3 text-lg pl-3 pr' onChange={onChange}/>
    </div>
}