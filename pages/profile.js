import React from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'

const Profile = () => {
    const router = useRouter()

    return (
        <div>
            <h1>{router.query.summonerId}</h1>
        </div>
    )
}

export default Profile
