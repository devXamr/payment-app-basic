export default function SingleDashboardUser({inital, username}) {
    return <div className='flex justify-between mt-7'>
    <div className='flex flex-row'>
        <div className='rounded-full bg-gray-200 p-2 text-2xl'>{inital}</div>
        <div className='text-2xl ml-4 pt-1.5'>{username}</div>
    </div>
    <div className='rounded-xl bg-black text-white text-xl font-semibold pr-3 pl-3 pt-2 pb-2'>Send Money</div>
    </div>
}