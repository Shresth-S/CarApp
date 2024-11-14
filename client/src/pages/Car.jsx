import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { useSelector } from 'react-redux';
import { FaBath, FaBed, FaChair, FaMap, FaMapMarked, FaCar, FaCarSide, FaShare } from 'react-icons/fa';
import { BiSolidCarGarage } from "react-icons/bi";
import { PiCarDuotone } from "react-icons/pi";
import { MdOutlineElectricCar } from "react-icons/md";

import Contact from '../components/Contact';

export default function Car() {
    SwiperCore.use([Navigation]);
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);
    const params = useParams();
    const {currentUser} = useSelector((state)=>state.user);
    useEffect(() => {
        const fetchCar = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/car/get/${params.carId}`);
                const data = await res.json();
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setCar(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchCar();
    }, [params.carId]);
    
  return (
      <main>
            {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
            {error && <p className='text-center my-7 text-2xl'>Something went wrong!</p>}
            {car && !loading && !error && (
              <div>
                  <Swiper navigation>
                      {car.imageUrls.map((url) => (
                          <SwiperSlide key={url}>
                              <div className='h-[480px]'
                                style={{ background: `url(${url}) center no-repeat` ,backgroundSize:'cover'}}></div>
                          </SwiperSlide>
                      ))}
                  </Swiper>
                
                  <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
                      <FaShare
                          className='text-slate-500'
                          onClick={() => {
                              navigator.clipboard.writeText(window.location.href);
                              setCopied(true);
                              setTimeout(() => {
                                  setCopied(false);
                              }, 2000);
                          }}
                      />                          
                  </div>
                  {copied && (
                      <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
                          Link copied!
                      </p>
                  )}

                  <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
                      <p className='flex items-center mt-6 gap-2 text-slate-600 font-semibold'>
                          <BiSolidCarGarage className='text-green-700' />
                          Sold By-   {car.dealer}
                      </p>

                      <div className='flex gap-4'>
                          
                      </div>
                        <p className='text-slate-800'>
                            <span className='font-semibold text-black'>
                                Description{' '}
                            </span> <br />
                            <div className='text-lg'>
                                {car.description}
                          </div>
                          <div className='flex gap-4'>
                                <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                                    Price- {car.regularPrice}
                                </p>
                                {car.offer && (
                                    <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                                        ${+car.regularPrice - +car.discountPrice} OFF
                                    </p>
                                )}
                            </div>
                        </p>
                      <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                          {car.ev && (<li className='flex items-center gap-1 whitespace-nowrap'>
                              <MdOutlineElectricCar className='text-lg' />
                              {car.ev ? 'EV' : ``}
                          </li>)}
                          {car.type==='hatchback' && (<li className='flex items-center gap-1 whitespace-nowrap'>
                              <FaCarSide className='text-lg' />
                              {car.type==='hatchback' ? 'HatchBack' : ``}
                          </li>)}
                          {car.type==='sedan' && (<li className='flex items-center gap-1 whitespace-nowrap'>
                              <FaCar className='text-lg' />
                              {car.type==='sedan' ? 'Sedan' : ``}
                          </li>)}
                          {car.type==='suv' && (<li className='flex items-center gap-1 whitespace-nowrap'>
                              <PiCarDuotone className='text-lg' />
                              {car.type==='suv' ? 'SUV' : ``}
                          </li>)}
                      </ul>
                    
                      {currentUser && car.userRef !== currentUser._id && !contact && (
                            <button onClick={()=>setContact(true)} className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'>
                                Contact Dealer
                            </button>
                      )}

                      {contact && <Contact car={car} />}

                  </div>
                  
              </div>
            )}
      </main>
  )
}

