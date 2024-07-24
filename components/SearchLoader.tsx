import Image from "next/image"

const SearchLoader = () => {
  return (
    <div className="flex justify-center items-center h-auto w-full mt-32">
        <Image src={'/icons/loading-search.svg'} alt="Loader" width={70} height={70}/>
    </div>
  )
}

export default SearchLoader