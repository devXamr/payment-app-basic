import InputBox from "./SmallerComponents/InputBox.jsx";
import SubmitButton from "./SmallerComponents/SubmitButton.jsx";
import SingleDashboardUser from "./SmallerComponents/SingleDashboardUser.jsx";
import axios from "axios";
import {useEffect, useState} from "react";

export default async function Dashboard(){

    const [username, setUsername] = useState("")
    const [balance, setBalance] = useState(0)
    const [fetchedUsers, setFetchedUsers] = useState({})
    const [searchData, setSearchData] = useState("")


    const userInfo = await axios.get("http://localhost:3000/api/v1/account/balance")

    setUsername(userInfo.data.name)
    setBalance(userInfo.data.balance)

    useEffect( () => {

        async function fetchData(){
           const result = await axios.get("http://localhost/api/v1/user/bulk?filter=" + searchData)
            setFetchedUsers(result.data.users)
        }

        fetchData()


    }, [searchData]);




    return <div>
        <div className='flex justify-between pt-4 pb-4 border-b-2 border-gray-300 '>
            <div className='text-xl ml-4 font-semibold'>
                Payments
            </div>
            <div className='flex mr-4'>
                <div className='mr-4 text-lg'>Hello, {username}</div>
                <div className='rounded-full bg-gray-200 px-2.5 py-1'>{username.charAt(0)}</div>

            </div>
        </div>
        <div className='mt-4 ml-4 text-2xl font-semibold'>
            Your balance : {balance}
        </div>

        <div className='ml-4 mt-12 mr-4'>
            <div className='font-semibold text-2xl'>Users</div>
            <InputBox placehold='Search for a user ' onChange={(e) => {
                setSearchData(e.target.value)
            }} value={searchData}/>
        </div>

        <div className='ml-4 mr-4 mt-5'>

            {fetchedUsers.map(user =>
                <SingleDashboardUser key={user.firstname} username={user.firstname} initial={user.firstname.charAt(0)}/>
            )}

        </div>



    </div>
}