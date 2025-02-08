"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";

const partners = [
  { id: 1, logo: "https://www.hlrlookup.com/storage/sprint.jpg" },
  { id: 2, logo: "https://www.hlrlookup.com/storage/mtn-logo.png" },
  { id: 3, logo: "https://www.hlrlookup.com/storage/at-and-t-1.jpg" },
  { id: 4, logo: "https://www.hlrlookup.com/storage/three.jpg" },
  { id: 4, logo: "https://www.hlrlookup.com/storage/orange-networks.png" },
  { id: 4, logo: "https://www.hlrlookup.com/storage/t-mobile.jpg" },
  { id: 4, logo: "https://www.hlrlookup.com/storage/vodafone.png" },
  { id: 4, logo: "https://www.hlrlookup.com/storage/o2.jpg" },
];
const clients = [
  { id: 1, name: "Cecil Murphy - Web Designer", testimonial: "All my clients need a contact form, and with the HLR Lookup API I can assure them that each phone number they capture is verified at the point of entry. This gives them peace of mind that they can contact their new customer as and when required. The HLR Lookup API is a great tool and I rarely build a website without it.", image: "https://www.hlrlookup.com/storage/7e570445-25f0-4276-8e8f-084aba2c8fb8-200w-150x150.jpg" },
  { id: 2, name: "Melanie Miles - Message Marketing Team", testimonial: "To combat low SMS delivery and response rates we approached the team at HLR Lookup last year and we've never looked back. All SMS now reach our customers, sales have increased and costs have gone down. The team are always happy to help, I can't recommend them enough.", image: "https://www.hlrlookup.com/storage/44.jpg" },
  { id: 3, name: "Jessie Cook - Director", testimonial: "The importance of clean and accurate data has never been higher. HLR Lookup is a powerful tool in our Lead Generation locker. Our data is enhanced with the information HLR Lookup provides and ensures we can be confident our data is as up to date as possible.", image: "https://www.hlrlookup.com/storage/32.jpg" },
  { id: 4, name: "Marvin Figueroa - Data Provider", testimonial: "Using HLR Lookup to for data cleansing has increased the quality of my data 10 fold. My customers are happy, which means i'm happy. Thanks guys!", image: "https://www.hlrlookup.com/storage/fyxulj0e-150x150.jpg" },
  { id: 4, name: "Mae Jones - Team Leader", testimonial: "Integrating HLR Lookup into our Dialer platform was a great business decision. Our team now spend less time on wasted calls and sales have increased. All Call Centres should make use of HLR Lookups before every campaign.", image: "https://www.hlrlookup.com/storage/65.jpg" },
];

export default function Partners() {
    const [startClientCarousel, setStartClientCarousel] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStartClientCarousel(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

  return (
    <section className="container mx-auto p-5 text-center user-select-none">
      <h3 className="mb-5">Our Globle Network Partner</h3>
      <Swiper
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 5 },
        }}
        spaceBetween={30}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        modules={[Autoplay]}
        className="w-full"
      >
        {partners.map((partner,index) => (
          <SwiperSlide key={index} className="sSlide flex justify-center">
            <div className="p-4 bg-white rounded-lg">
              <img src={partner.logo} className="w-40 h-40 object-contain mx-auto" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* <h3 className="mt-5">Our Clients</h3> */}
    <h3 className="mt-5">Our Clients</h3>
    {startClientCarousel && (
        <Swiper
            slidesPerView={1}
            breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            }}
            spaceBetween={30}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            pagination={{ clickable: true }}
            navigation={false}
            modules={[Autoplay, Pagination, Navigation]}
            className="w-full"
        >
            {clients.map((clients,index) => (
            <SwiperSlide key={index} className="sSlide flex justify-center">
                <div className="p-4 bg-white d-flex align-content-between flex-wrap" style={{ minHeight: "300px" }}>
                    <span className="">{clients.testimonial}</span><br/>
                    <div className="row align-items-center">
                        <div className="col-2">
                            <img src={clients.image} alt={clients.name} className="img-fluid rounded-5" />
                        </div>
                        <div className="col-10">
                            <h5 className="mt-2 text-start">{clients.name}</h5>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            ))}
        </Swiper>
    )}
    </section>
  );
}
