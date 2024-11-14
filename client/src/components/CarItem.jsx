import React from 'react';
import { Link } from 'react-router-dom';
import { FaBath, FaBed, FaChair, FaMap, FaMapMarked, FaCar, FaCarSide, FaShare } from 'react-icons/fa';
import { BiSolidCarGarage } from "react-icons/bi";
import { PiCarDuotone } from "react-icons/pi";
import { MdOutlineElectricCar } from "react-icons/md";

export default function CarItem({ car }) {
  return (
      <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
          <Link to={`/car/${car._id}`}>
              <img src={car.imageUrls[0]}
                  alt="car cover"
                  className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-150'
              />

              <div className='p-3 flex flex-col gap-2 w-full'>
                  {/* truncate to remove extra spaces */}
                  <p className='truncate text-lg font-semibold text-slate-700'>{car.name}</p>
                  <div className="flex items-center gap-1">
                      <BiSolidCarGarage className='h-4 w-4 text-green-700'/>
                      <p className='truncate text-sm text-gray-600 w-full'>{car.dealer}</p>
                  </div>
                  <p className='text-gray-600 line-clamp-2'>
                      {car.description}
                  </p>
                  <p className='text-slate-500 mt-2 font-semibold'>
                      $
                      {car.offer ?
                          car.discountPrice.toLocaleString('en-US') :
                          car.regularPrice.toLocaleString('en-US')
                      }
                  </p>

                  <div className='text-slate-700 flex gap-5'>
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
                  </div>
              </div>
            
              
          </Link>

      </div>
  )
}