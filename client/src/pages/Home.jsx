import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import CarItem from '../components/CarItem';

export default function Home() {
    const [offerCars, setOfferCars] = useState([]);
    const [evCars, setevCars] = useState([]);
    const [hatchbackCars, sethatchbackCars] = useState([]);
    const [sedanCars, setsedanCars] = useState([]);
    const [suvCars, setsuvCars] = useState([]);
    SwiperCore.use([Navigation]);

    console.log(offerCars);

    useEffect(() => {
        const fetchEVCars = async () => {
            try {
                const res = await fetch('/api/car/get?ev=true&limit=4');
                const data = await res.json();
                setevCars(data);
                fetchSUVCars();
            } catch (error) {
                console.log(error);
           }
        }

        const fetchHatchBackCars = async () => {
            try {
                const res = await fetch('/api/car/get?type=hatchback&limit=4');
                const data = await res.json();
                sethatchbackCars(data);
            } catch (error) {
                console.log(error);
           }
        }

        const fetchSedanCars = async () => {
            try {
                const res = await fetch('/api/car/get?type=sedan&limit=4');
                const data = await res.json();
                setsedanCars(data);
                fetchEVCars();
            } catch (error) {
                console.log(error);
           }
        }

        const fetchSUVCars = async () => {
            try {
                const res = await fetch('/api/car/get?type=suv&limit=4');
                const data = await res.json();
                fetchHatchBackCars();
                setsuvCars(data);
            } catch (error) {
                console.log(error);
           }
        }

        fetchSedanCars();
    },[])

    return (
        <div>
            {/* top */}
            <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
                <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
                    Get your next <span className='text-slate-500'>Sleek and stunning</span>
                    <br />
                    Car with ease
                </h1>
                <div className="text-gray-400 text-xs sm:text-sm">
                    Drive Your Passion Forward!!
                    <br />
                    CarQuest is the ultimate hub for buying, selling, and managing cars!
                    <br />
                    Explore our extensive range of vehicles and services today
                </div>
                <Link to={"/search"} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
                    Let's get started...
                </Link>
            </div>
            
            <Swiper navigation className='-mt-10'>
                {evCars && evCars.length > 0 && 
                    evCars.map((car) => (
                        <SwiperSlide>
                            <div style={{ background: `url(${car.imageUrls[0]}) center no-repeat`,backgroundSize:"cover" }}
                                className='h-[540px] mt-0' key={car._id}>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
                
                {evCars && evCars.length > 0 && (
                    <div className="my-3">
                        <div className="">
                            <h2 className='text-2xl font-semibold text-slate-600'>Recent Electric Cars</h2>
                            <Link className='text-sm text-blue-800 hover:underline' to={'/search?ev=true'}>
                                Show more Electric cars
                            </Link>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {evCars.map((car) => (
                                <CarItem car={car} key={car._id} />
                            ))}
                        </div>
                    </div>
                )
                }

                {hatchbackCars && hatchbackCars.length > 0 && (
                    <div className="my-3">
                        <div className="">
                            <h2 className='text-2xl font-semibold text-slate-600'>Recent HatchBack Cars</h2>
                            <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=hatchback'}>
                            Show more HatchBack Cars
                            </Link>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {hatchbackCars.map((car) => (
                                <CarItem car={car} key={car._id} />
                            ))}
                        </div>
                    </div>
                )
                }

                {suvCars && suvCars.length > 0 && (
                    <div className="my-3">
                        <div className="">
                            <h2 className='text-2xl font-semibold text-slate-600'>Recent SUV Cars</h2>
                            <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=suv'}>
                            Show more SUV Cars
                            </Link>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {suvCars.map((car) => (
                                <CarItem car={car} key={car._id} />
                            ))}
                        </div>
                    </div>
                )
                }

                {sedanCars && sedanCars.length > 0 && (
                    <div className="my-3">
                        <div className="">
                            <h2 className='text-2xl font-semibold text-slate-600'>Recent Sedan Cars</h2>
                            <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sedan'}>
                            Show more Sedan Cars
                            </Link>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {sedanCars.map((car) => (
                                <CarItem car={car} key={car._id} />
                            ))}
                        </div>
                    </div>
                )
                }
            </div>
        </div> 
    );
}