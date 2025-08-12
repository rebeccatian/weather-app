import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, FreeMode, Mousewheel } from 'swiper/modules';
import CloudRain from '../assets/cloud-rain.svg?react';
import CloudSun from '../assets/cloud-sun.svg?react';
import type { FilteredHourlyItem } from '../hooks/useFilteredHourlyData';

const SwiperComponent = ({ data } : { data: FilteredHourlyItem[] }) => (
  <Swiper
    updateOnWindowResize
    className="h-full sm:h-fit w-full relative overflow-hidden"
    modules={[Scrollbar, FreeMode, Mousewheel]}
    spaceBetween={16}
    freeMode={true}
    mousewheel={{ enabled: true }}
    scrollbar={{
      draggable: true,
      horizontalClass: 'bg-gray-700',
      dragClass: 'bg-gray-400 h-1'
    }}
    wrapperClass='pb-4'
    breakpoints={{
      0: {
        slidesPerView: 3,
        direction: 'vertical'
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
          <SwiperSlide key={item.time} className="p-4 sm:pb-8 border rounded">
            <div className="flex sm:flex-col h-full sm:h-30 sm:justify-between items-center sm:items-start">
              <div className="flex flex-col relative border-r pr-5 sm:border-r-0 md:pb-2 md:border-0">
                <span className="text-xs">{item.dateString}</span>
                <span className="text-sm">{item.formattedTime}</span>
                <span className="text-l xl:text-xl hidden sm:block">{`${item.temperature.toFixed(2)} °F`}</span>
              </div>
              <div className="ml-auto sm:m-0 self-center lg:self-end flex text-right items-end sm:flex-col">
                <span className="text-l xl:text-xl block sm:hidden pr-1">{`${item.temperature.toFixed(2)} °F`}</span>
                {
                  item.precipitation_probability > 0 && <span className="text-sm opacity-75 sm:block hidden">{`${item.precipitation_probability}% rain`}</span>
                }
                { item.precipitation_probability > 50 ? <CloudRain className="w-8 h-8 sm:h-12 sm:w-12" /> : <CloudSun className="w-8 h-8 sm:h-12 sm:w-12" />}
              </div>
            </div>
          </SwiperSlide>
          );
      })
    }
  </Swiper>
);

export default SwiperComponent;

