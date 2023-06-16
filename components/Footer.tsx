import Image from "next/image"
export default function Footer () {
    return (
        <footer className='bottom-0 flex justify-center w-full h-full pt-5 pb-5 font-sans text-center'>
        made with ❤️ by
        <img src="/typoflogo.svg" alt={"typoflogo"} width={82} height={82} className="ml-2"/>
        
       </footer>
    )
}