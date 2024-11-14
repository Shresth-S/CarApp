import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({ Car }) {
    const [dealer, setdealer] = useState(null);
    const [message, setMessage] = useState('');

    const onChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        const fetchDealer = async () => {
            try {
                const res = await fetch(`/api/user/${Car.userRef}`);

                const data = await res.json();

                setdealer(data);
            }catch (error) {
                console.log(error);
            }
        }
        fetchDealer();
    }, [Car.userRef]);

    return (
        <>
            {dealer && (
                <div className='flex flex-col gap-2'>
                    <p>Contact <span className='font-semibold'>{dealer.username}</span> for
                        <span className='font-semibold'> {Car.name.toLowerCase()}</span>
                    </p>
                    <textarea name="message" id="messgae" rows="2"
                        value={message} onChange={onChange} placeholder='Enter your message here...'
                    className='w-full border p-3 rounded-lg'>
                        
                    </textarea>

                    <Link to={`mailto:${dealer.email}?subject=Regarding${Car.name}&body=${message}`}
                    className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
                    >
                        Send Message
                    </Link>
                </div>
            )}
        </>
    )
}

