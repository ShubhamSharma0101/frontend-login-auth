import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {

        const [ userProfile, setUserProfile] = useState('')
        const navigate = useNavigate();


        useEffect(() => {
            const userDetails = localStorage.getItem('userDetails');
            if (userDetails) {
                const parsedDetails = JSON.parse(userDetails);
                setUserProfile(parsedDetails);
            }
          }, []);

          const handleLogout = () =>{
            localStorage.removeItem('authToken')
            localStorage.removeItem('userDetails')
            navigate('/')
          }
          
    return (
        <section className='flex  flex-col items-center justify-center min-h-screen bg-gray-50min-h-screen  bg-gray-100'>
                <div className="text-center mb-6">
                    <h1 className="text-5xl font-bold text-gray-800">Welcome to</h1>
                    <h2 className="text-4xl font-extrabold text-purple-600">Unstop</h2>
                </div>

                <div className="w-80 bg-white rounded-lg shadow-lg p-6">
                    <div className="flex flex-col items-center">
                        <img
                            src={userProfile.image}
                            alt="User Profile"
                            className="w-24 h-24 rounded-full mb-4"
                        />
                        <h3 className="text-lg font-semibold text-gray-800">{userProfile.firstName} {userProfile.lastName}</h3>
                        <p className="text-sm text-gray-500">{userProfile.email}</p>
                        <p className="text-sm text-gray-500 mb-4">{userProfile.gender}</p>
                        <button onClick={handleLogout} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                            Logout
                        </button>
                    </div>
                </div>
        </section>
    )
}

export default Home