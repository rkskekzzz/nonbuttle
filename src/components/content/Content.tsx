'use client'
import { useEffect, useMemo, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import { Stack } from '../stack'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
type CardProps = {
  title: string
  description: string | React.ReactNode
  image: string | string[]
  type: 'text-first' | 'image-first'
}

const Card = ({ title, description, image, type }: CardProps) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className={cn('grid grid-flow-row-dense gap-8', !isMobile ? 'grid-cols-3 grid-rows-1' : '')}>
      <Stack className={cn(type === 'text-first' ? 'order-1' : 'order-2', 'px-8')} direction='col' gap='gap-2'>
        <h2 className='text-2xl font-bold'>{title}</h2>
        <p>{description}</p>
      </Stack>
      <div className={cn(isMobile || type === 'text-first' ? 'order-2' : 'order-1', 'col-span-2', 'w-full')}>
        {image instanceof Array ? (
          <Swiper
            color='black'
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
          >
            {image.map((item, index) => (
              <SwiperSlide key={index}>
                <Image src={item} alt={title} width={2000} height={700} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Image src={image} alt={title} width={2000} height={700} />
        )}
      </div>
      {/* </Stack> */}
    </div>
  )
}

type VideoProps = {
  title: string
  description: string
  video: string
}

const Video = ({ title, description, video }: VideoProps) => {
  return (
    <video className='w-full' autoPlay muted controls={false}>
      <source src={video} type='video/mp4' />
      Your browser does not support the video tag.
    </video>
  )
}

const Content = () => {
  return (
    <Stack className='w-full pb-20' direction='col' gap='gap-[100px]'>
      <Video title='Video 1' description='This is video 1' video='/test.mp4' />
      <Card
        title={'지구를 지키는 가장 세련된 방법'}
        description={'넌버틀은 물에 녹는 친환경 용기에 자연에서 추출한 재료들로 만들어진 코스메틱을 담아드립니다'}
        image={['/product/내용물1.png', '/product/내용물2.png']}
        type='text-first'
      />
      <Card
        title={'불편함을 감수하지 마세요.'}
        description={'사용이 끝난 용기는 분리수거 필요없이 \n방수 막을 제거하시거나\n살짝 부러뜨려 물에 녹여 보내세요'}
        image='/product/레몬배경옐로우.png'
        type='image-first'
      />
      <Card
        title={'넌버틀의 가치'}
        description={'그린워싱, 걱정하지말고 눈으로 직접 보세요'}
        image={['/product/자갈제품.png', '/product/제품2.png']}
        type='text-first'
      />
      <Card title={'Contact us'} description={'용기 협업부터 제품 판매까지'} image='/test.png' type='image-first' />
    </Stack>
  )
}

export default Content
