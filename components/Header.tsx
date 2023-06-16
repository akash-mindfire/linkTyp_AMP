import { VscFeedback } from 'react-icons/vsc';
import { FiShare2 } from 'react-icons/fi';
// import { RiFeedbackLine } from 'react-icons/ri';
import FeedBackModal from './modules/FeedBackModal';
import ShareModal from './modules/ShareModal';
import Username from '../pages/[username]';
import { BiShareAlt } from 'react-icons/bi';
import { CgFeed } from 'react-icons/cg';



export default function Header(props: any) {

    const data = props.userData;
    const textColor = data?.profile?.nameColor;

    return (
        <div className="">
            <header className="px-4 mb-2 ">
                <div className="flex flex-row items-center justify-between max-w-2xl pt-2 mx-auto sm:flex-row sm:items-center sm:justify-between">
                    <span className='cursor-pointer'>

                    <label
                            htmlFor='my-modal-6'
                            tabIndex={0}
                            className="flex items-center justify-center rounded-full">
                            < CgFeed className="text-2xl text-black" />
                            <span className='block pl-1 pr-1 font-sans text-sm font-semibold'>Message</span>
                        </label>
                        {/* Modal */}
                        <input type="checkbox" id="my-modal-6" className="modal-toggle" />
                        <div className="modal modal-bottom md:modal-middle">
                            <div className="modal-box">
                                <label htmlFor="my-modal-6" className="absolute text-black bg-transparent btn btn-sm btn-circle right-2 top-2"

                                >✕</label>
                                <FeedBackModal userData={data.backgroundColor} fontColor={data.container.textColor} borderRadius={data.container.shape} />
                            </div>
                        </div>
                        {/* Modal */}
                    </span>
                    <nav aria-label="Header Navigation" className="py-6 pl-2 sm:py-0">
                        <label
                            htmlFor='my-modal-4'
                            tabIndex={0}
                            className="flex items-center justify-center rounded-full">
                            < BiShareAlt className="text-2xl text-black" />
                            <span className='block pl-1 pr-1 font-sans text-sm font-semibold'>share</span>
                        </label>
                        {/* Put this part before </body> tag */}
                        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                        <label htmlFor="my-modal-4" className="cursor-pointer modal modal-bottom md:modal-middle">
                            <label className="relative w-full p-0 modal-box" htmlFor="">
                                <ShareModal userData={data.backgroundColor} fontColor={data.container.textColor} borderRadius={data.container.shape} username={data.username} />
                            </label>
                        </label>
                    </nav>
                </div>
            </header>
        </div>
    );
};