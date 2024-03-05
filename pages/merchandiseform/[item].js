// pages/event/[item].js
import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import FormTab from '@/components/FormTab';
import MerchandiseForm from '@/components/MerchandiseForm';

const EventDetailsPage = () => {
    const router = useRouter();
    const { item } = router.query;
    console.log('item', item);
    let headtitle = item
    if (item === 'tshirtb') {
        headtitle = 'Tshirt Boy Print'
    }
    if (item === 'tshirtg') {
        headtitle = 'Tshirt Girl Print'
    }
    if (item === 'tshirtcombo') {
        headtitle = 'Tshirt Combo'
    }
    else{
        headtitle = item
    }
    return (
        <>
            <Head>
                <title>Buy {headtitle}</title>
            </Head>
            <div>
                {item && <MerchandiseForm item={item} />}
            </div>
        </>
    );
};

export default EventDetailsPage;
