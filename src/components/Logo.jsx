import Image from "next/image";

function Logo(){
    return (
        <>
            <Image src={"/logo.png"} className="rounded-full" width={36} height={36} alt="Icon"/>
        </>
    )
}

export default Logo;