import React from 'react';
import SightUi from './SightUi';
import $api from '@/api/http';

async function getArtist(id) {
    const res = await $api.get(`sights/${id}`)
    return res.data
}

export default async function Sight({ params: { id } }) {

    const res = await getArtist(id)

    return (
        <>
            <SightUi sight={res} />
        </>
    )
}
