const ServiceCard = ({ color, title, icon, subtitle }) => {
return (
    <div className="flex flex-ro justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
      <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
        {icon}
      </div>
      <div className="ml-5 flex flex-col flex-1">
        <h1 className="mt-2 text-white text-lg">{title}</h1>
        <p className="mt-2 text-white text-lg md:w-9/12">{subtitle}</p>
      </div>
    </div>
  )
}

export default ServiceCard;