import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CarItem from '../components/CarItem';

export default function Search() {
    const navigate = useNavigate();
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        type: 'all',
        ev: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    })

    const [loading, setLoading] = useState(false);
    const [cars, setCars] = useState([]);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        // const sedanFromUrl = urlParams.get('sedan');
        const typeFromUrl = urlParams.get('type');
        // const suvFromUrl = urlParams.get('suv');
        const evFromUrl = urlParams.get('ev');
        // const hatchbackFromUrl = urlParams.get('hatchback');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (searchTermFromUrl || evFromUrl || offerFromUrl || sortFromUrl || orderFromUrl) {
            //if any of them changes
            setSidebarData({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                ev: evFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            });
        }

        const fetchCars = async () => {
            setLoading(true);
            setShowMore(false);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/car/get?${searchQuery}`);
            const data = await res.json();
            if (data.length > 8) {
                setShowMore(true);
            }else {
                setShowMore(false);
            }
            setCars(data);
            setLoading(false);
        }

        fetchCars();

    }, [location.search]);

    const handleChange = (e) => {
        if (e.target.id === 'searchTerm') {
            setSidebarData({...sidebarData, searchTerm: e.target.value})
        }

        if (e.target.id === 'all' || e.target.id === 'suv' || e.target.id === 'sedan' || e.target.id === 'hatchback') {
            setSidebarData({ ...sidebarData, type: e.target.id });
        }

        if (e.target.id === 'ev' || e.target.id === 'offer') {
            setSidebarData({ ...sidebarData, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false });
        }

        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';

            const order = e.target.value.split('_')[1] || 'desc';

            setSidebarData({ ...sidebarData, sort, order });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const urlParams = new URLSearchParams();

        urlParams.set('searchTerm', sidebarData.searchTerm);
        // urlParams.set('sedan', sidebarData.sedan);
        urlParams.set('type', sidebarData.type);
        // urlParams.set('suv', sidebarData.suv);
        urlParams.set('ev', sidebarData.ev);
        // urlParams.set('hatchback', sidebarData.hatchback);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('order', sidebarData.order);

        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    const onShowMoreClick = async () => {
        const numberOfCars = cars.length;
        const startIndex = numberOfCars;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/car/get?${searchQuery}`);
        const data = await res.json();
        if (data.length < 9) {
            setShowMore(false);
        }
        setCars([...cars, ...data]);
    };

  return (
      <div className='flex flex-col md:flex-row'>
          <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
              <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                  <div className="flex items-center gap-2">
                      <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                      <input type="text" id='searchTerm' placeholder='Search...'
                          className='border rounded-lg p-3 w-full'
                          value={sidebarData.searchTerm} onChange={handleChange } />
                  </div>

                  <div className="flex gap-2 flex-wrap items-center">
                      <label className='font-semibold'>Type:</label>
                      <div className="flex gap-2">
                          <input type="checkbox" id="all" className='w-5'
                              onChange={handleChange} checked={sidebarData.type === 'all'} />
                          <span>All</span>
                      </div>
                      <div className="flex gap-2">
                          <input type="checkbox" id="sedan" className='w-5'
                            onChange={handleChange} checked={sidebarData.type==='sedan'} />
                          <span>Sedan</span>
                      </div>
                      <div className="flex gap-2">
                          <input type="checkbox" id="suv" className='w-5'
                            onChange={handleChange} checked={sidebarData.type==='suv'} />
                          <span>SUV</span>
                      </div>
                      <div className="flex gap-2">
                          <input type="checkbox" id="hatchback" className='w-5'
                            onChange={handleChange} checked={sidebarData.type==='hatchback'} />
                          <span>HatchBack</span>
                      </div>
                      <div className="flex gap-2">
                          <input type="checkbox" id="ev" className='w-5'
                            onChange={handleChange} checked={sidebarData.ev} />
                          <span>EV</span>
                      </div>
                      <div className="flex gap-2">
                          <input type="checkbox" id="offer" className='w-5'
                              onChange={handleChange} checked={sidebarData.offer} />
                          <span>Offer</span>
                      </div>

                  </div>

                  <div className='flex items-center gap-2'>
                      <label className='font-semibold'>Sort:</label>
                      <select onChange={handleChange} defaultValue={'created_at_desc'} id="sort_order" className='border rounded-lg p-3'>
                          <option value={'createdAt_desc'}>Latest</option>
                          <option value={'createdAt_asc'}>Oldest</option>
                      </select>
                  </div>
                  <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
              </form>
          </div> 

          <div className="flex-1">
              <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
                  Car results:
              </h1>
              <div className="p-7 flex flex-wrap gap-4">
                  {!loading && cars.length === 0 && (
                      <p className='text-xl text-slate-700'>No car found!</p>
                  )}
                  {loading && (
                      <p className='text-xl text-slate-700 text-center w-full'>Loading...</p>
                  )}

                  {!loading && cars && cars.map((car) => (
                          <CarItem key={car._id} car={car} />
                      ))
                  }

                  {showMore && (
                      <button onClick={onShowMoreClick}
                        className='text-green-700 hover:underline p-7'>
                        Show more
                       </button>
                  )}
              </div>
          </div> 
      </div>
  )
}