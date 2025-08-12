import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, FreeMode, Mousewheel } from 'swiper/modules';
import CloudRain from '../assets/cloud-rain.svg?react';
import CloudSun from '../assets/cloud-sun.svg?react';
import type { FilteredHourlyItem } from '../hooks/useFilteredHourlyData';
import 'swiper/css'

const SwiperComponent = ({ data } : { data: FilteredHourlyItem[] }) => (
  <div className="w-full h-96 sm:h-fit relative overflow-y-scroll sm:overflow-auto">
    <Swiper
      updateOnWindowResize
      modules={[Navigation, Scrollbar, FreeMode, Mousewheel]}
      spaceBetween={16}
      freeMode={true}
      mousewheel={{ enabled: true }}
      scrollbar={{
        draggable: true,
        horizontalClass: 'bg-gray-700',
        dragClass: 'bg-gray-400 h-1'
      }}
      navigation={{
        nextEl: '.cursor-slider-right',
        prevEl: '.cursor-slider-left',
        disabledClass: 'opacity-20 pointer-events-none'
      }}
      wrapperClass='pb-5'
      breakpoints={{
        0: {
          slidesPerView: 3,
          direction: 'vertical',
          height: 350
        },
        640: {
          slidesPerView: 4,
          direction: 'horizontal'
        },
        768: {
          slidesPerView: 5,
          direction: 'horizontal'
        },
        1024: {
          slidesPerView: 7,
          direction: 'horizontal'
        },
      }}
    >
  {
      data.map((item) => {
          return (
          <SwiperSlide key={item.time} className="p-6 border rounded">
            <div className="flex sm:flex-col h-full sm:h-40 sm:justify-between">
              <div className="flex flex-col relative border-r pr-5 sm:border-r-0 md:pb-2 md:border-0">
                <span className="text-xs">{item.dateString}</span>
                <span className="text-sm">{item.formattedTime}</span>
              </div>
              <div className="ml-auto sm:m-0 self-center lg:self-end">
                <span className="text-l xl:text-xl">{`${item.temperature.toFixed(2)} °F`}</span>
                { item.rain > 0 ? <CloudRain className="w-12 h-12 sm:h-20 sm:w-18" /> : <CloudSun className="w-12 h-12 sm:h-20 sm:w-18" />}
              </div>
            </div>
          </SwiperSlide>
          );
      })
      }
    </Swiper>
    
    <div className="flex float-end mt-3 gap-1">
      <button
        className="cursor-slider-left hidden sm:block z-10 p-2 border rounded"
      >
        ◀
      </button>
      <button
        className="cursor-slider-right hidden sm:block z-10 p-2 border rounded"
      >
        ▶
      </button>
    </div>
  </div>
);

export default SwiperComponent;

