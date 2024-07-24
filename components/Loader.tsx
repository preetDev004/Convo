import Image from "next/image"

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
        {/* <Image src={'/icons/loading-circle.svg'} alt="Loader" width={50} height={50}/> */}
        <Image src={'/icons/Loader-1.svg'} alt="Loader" width={60} height={60}/>
    </div>
  )
}

export default Loader