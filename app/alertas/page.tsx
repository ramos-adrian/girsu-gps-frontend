import Image from "next/image";

const Alertas = () => {
    return (
        <div className="mx-auto flex justify-center">
            <a href="https://wa.me/5493813415833">
                <Image src="/alertasWhatsapp.png" alt="instrucciones" width={794} height={1123}/>
            </a>
        </div>
    )
}

export default Alertas