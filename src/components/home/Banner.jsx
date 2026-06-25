import { fontBangla } from '@/app/layout';
import Image from 'next/image';
import React from 'react';

const Banner = () => {
    return (
        <div className='flex justify-center items-center'>
            <div className='flex-1 space-y-5'>
                <h1 className={`${fontBangla.className} text-6xl font-bold leading-20`}>আপনার শিশুকে দিন একটি <span className='text-orange-400'>সুন্দর ভবিষ্যৎ</span> </h1>
                <p className=''>Buy Every Toy With Up to 15% Discount</p>
                <button className='btn btn-outline text-orange-400'>Explore Products</button>
            </div>
            <div className='flex-1'>
                <Image src={'/assets/hero.png'} alt='Toy Product' width={500} height={400}/>
            </div>
        </div>
    );
};

export default Banner;