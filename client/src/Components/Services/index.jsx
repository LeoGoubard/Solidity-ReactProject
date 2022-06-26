import { BsShieldFillCheck } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';
import ServiceCard from './ServiceCard';


const Services = () => {
  const serviceCards = [
    {
      color: "bg-[#2952e3]",
      title: "Security Guaranteed",
      icon: <BsShieldFillCheck fontSize={21} className="text-white" />,
      subtitle: "Security is guaranteed. We always maintain privacy and quality of our product",
    },
    {
      color: "bg-[#8945F8]",
      title: "Best exchanged rates",
      icon: <BiSearchAlt fontSize={21} className="text-white" />,
      subtitle: "Security is guaranted. We always maintain privacy and quality of our product",
    },
    {
      color: "bg-[#F84550]",
      title: "Fastest transactions",
      icon: <RiHeart2Fill fontSize={21} className="text-white" />,
      subtitle: "Security is guaranted. We always maintain privacy and quality of our product",
    },
  ]
  return (
    <div className="flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
        <div className="flex-1 flex flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
            Services that we
            <br />
            continue to improve
          </h1>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-start items-center">
        {serviceCards.map((serviceCardItem) => {
          const { color, title, icon, subtitle } = serviceCardItem;
          return (
          <ServiceCard
            color={color}
            title={title}
            icon={icon}
            subtitle={subtitle}
          />
        )})}
      </div>
    </div>
  )
}

export default Services;