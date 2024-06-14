import React from 'react'

const Profile = () => {
    return (
        <div className='bg-[#f4f2ee] pt-[5rem] flex flex-col gap-4 justify-center items-center p-4 min-h-screen'>
            <div className='w-[80%] min-w-[320px] bg-[#fefffe] p-4 rounded-md relative'>
                <div className='bg-slate-800 w-full h-[150px] rounded-t-md'>
                </div>
                <img src="https://api.dicebear.com/8.x/adventurer/svg?seed=Chloe" alt="profile_pic" className='w-[150px] absolute top-20 left-8 bg-white rounded-full'/>
                <div className='font-bold mt-16'>Aryan Satija <span className='text-sm text-slate-600 font-semibold'>(He/Him)</span></div>
                <div className='text-slate-600'>
                    C++ DSA | 4 ⭐ CODECHEF (max 1996) | 
                    GUARDIAN @ LEETCODE (max 2193) | 
                    CODEFORCES (max 1592) | Web Developer | 
                    ML Enthusiast | NSUT'26 | IT
                </div>
                <div className='text-slate-500 mt-4'>Netaji Subhas Institute of Technology</div>
                <div className='text-slate-500 mt-4'>New Delhi, Delhi, India</div>
            </div>
            <div className='w-[80%] min-w-[320px] bg-[#fefffe] p-4 rounded-md'>
                <div className='font-bold'>About</div>
                <div>
                    🔹Pursuing BTech, IT 
                    🔹NSUT'26
                    🔹98.71%ile JEE MAINS, 2022
                    🔹AIR 6.8K JEE ADVANCED, 2022
                    🔹solved 700+ leetcode
                    🔹4⭐ CODECHEF
                    🔹Aspiring Web Developer
                </div>
            </div>
            <div className='w-[80%] min-w-[320px] bg-[#fefffe] p-4 rounded-md'>
                <div className='font-bold mb-2'>Skills</div>
                <div className='flex flex-col items-start justify-between gap-4'>
                    {
                        ["react", "javascript", "html", "css", "nodejs", "expressjs"].map((skill, i)=>{
                            return (<div key={i} className='text-cyan-600 text-sm font-bold bg-[#D3E1E3] p-1 rounded-md'>
                                {
                                    skill.toUpperCase()
                                }
                            </div>)         
                        })
                    }
                </div>
            </div>
        </div>
      )
}

export default Profile