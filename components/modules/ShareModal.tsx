import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import {
    FacebookIcon,
    LinkedinIcon,
    WhatsappIcon,
    EmailIcon,
    TwitterIcon,
    TelegramIcon,
} from "react-share";
import { CgChevronRight, CgCopy } from 'react-icons/cg'
import { BsLink } from "react-icons/bs";
import { useState } from "react";
import Image from "next/image";
import { TbClipboardCopy } from "react-icons/tb";


export default function ShareModal(props: any) {


    // background color
    const userData = props.userData
    // text color
    const textColor = props.fontColor
    // border radius
    const borderRadius = props.borderRadius
    //username
    const username = props.username
    const [inputValue, setInputValue] = useState(`https://linktyp.com/${username}`);


    // copy to clipboard functionality 

    // State to keep track of copied state
    const [copied, setCopied] = useState(false);

    // Handler for when the copy button is clicked
    const handleCopy = () => {
        navigator.clipboard.writeText(`https://linktyp.com/${username}`).then(function () {
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        }, function (err) {
            console.error('Failed to copy link: ', err);
        });
    };


    



    return (
        <div className="font-sans ">
            <label htmlFor="my-modal-4" className="btn-sm bg-transparent btn-circle btn absolute right-2 top-2 text-black">✕</label>
            <div className="w-full md:p-5 mt-5">
                <div className="flex justify-center">
                    <Image src="/Group.svg" alt="" width={24} height={24} className="w-24 pb-2" />
                </div>
                <div className="text-center">
                    <p className="font-sans font-semibold tracking-widest text-lg md:p-4 p-2">Share this Linktree</p>
                </div>
                <ul className="menu bg-base-100 w-full gap-2 pt-2">
                    <li>
                        <a className="rounded-xl bg-white">
                            <FacebookShareButton url={`https://linktyp.com/${username}`} quote="" className="flex items-center w-full p-2">
                                <div>
                                    <FacebookIcon size={40} round={true} />
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <span className="pl-5 font-sans font-semibold tracking-wider text-base">Share on Facebook</span>
                                    <CgChevronRight className="text-2xl" />
                                </div>
                            </FacebookShareButton>
                        </a>
                    </li>
                    <li>
                        <a className="rounded-xl bg-white">
                            <TwitterShareButton url={`https://linktyp.com/${username}`} title="" className="flex items-center w-full p-2">
                                <div>
                                    <TwitterIcon size={40} round={true} />
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <span className="pl-5 font-sans font-semibold tracking-wider text-base">Share on Twitter</span>
                                    <CgChevronRight className="text-2xl" />
                                </div>
                            </TwitterShareButton>
                        </a>
                    </li>
                    <li>
                        <a className="rounded-xl bg-white">
                            <WhatsappShareButton url={`https://linktyp.com/${username}`} title="" className="flex items-center w-full p-2">
                                <div>
                                    <WhatsappIcon size={40} round={true} />
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <span className="pl-5 font-sans font-semibold tracking-wider text-base">Share on Whatsapp</span>
                                    <CgChevronRight className="text-2xl" />
                                </div>
                            </WhatsappShareButton>
                        </a>
                    </li>
                    <li>
                        <a className="rounded-xl bg-white">
                            <TelegramShareButton url={`https://linktyp.com/${username}`} title="" className="flex items-center w-full p-2">
                                <div>
                                    <TelegramIcon size={40} round={true} />
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <span className="pl-5 font-sans font-semibold tracking-wider text-base">Share on Telegram</span>
                                    <CgChevronRight className="text-2xl" />
                                </div>
                            </TelegramShareButton>
                        </a>
                    </li>
                    <li>
                        <a className="rounded-xl bg-white">
                            <LinkedinShareButton url={`https://linktyp.com/${username}`} title="" className="flex items-center w-full p-2">
                                <div>
                                    <LinkedinIcon size={40} round={true} />
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <span className="pl-5 font-sans font-semibold tracking-wider text-base">Share on LinkedIn</span>
                                    <CgChevronRight className="text-2xl" />
                                </div>
                            </LinkedinShareButton>
                        </a>
                    </li>
                    <li>
                        <a className="rounded-xl bg-white">
                            <EmailShareButton url={`https://linktyp.com/${username}`} title="" className="flex items-center w-full p-2">
                                <div>
                                    <EmailIcon size={40} round={true} />
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <span className="pl-5 font-sans font-semibold tracking-wider text-base">Share via Email</span>
                                    <CgChevronRight className="text-2xl" />
                                </div>
                            </EmailShareButton>
                        </a>
                    </li>
                    <li>
                        <div className="form-control w-full">
                            <div className="input-group w-full">
                                <input
                                    type="text"
                                    placeholder=""
                                    value={inputValue}
                                    className="input input-bordered w-full"
                                    onChange={(event) => setInputValue(event.target.value)}
                                />                                    <button
                                    className="btn btn-square"
                                    onClick={handleCopy}
                                >
                                    <CgCopy className="text-xl" />
                                   {copied && (
                                   <p className="text-sm">Copied!</p>
                                )}
                                </button>                                   
                                 
                            </div>
                        </div>                   
                     </li>
                </ul>
            </div>
        </div>
    )
}


