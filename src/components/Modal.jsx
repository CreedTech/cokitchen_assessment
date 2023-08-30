/* eslint-disable react/prop-types */
// import './Modal.css'; // Import your CSS file for styling
import { format } from 'date-fns';
import download from '../assets/download.svg';
import iconImage from '../assets/folder-icon-image.svg';
import iconPdf from '../assets/folder-icon-pdf.svg';
import iconXlsx from '../assets/folder-xlx-icon.svg';

const Modal = ({ imageSrc, onClose }) => {
  return (
    <div className="fixed inset-0 z-[9999950] flex items-center w-full h-full justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-gray-400 backdrop-blur-[2px]  bg-opacity-20">
      <div className="relative px-8 py-3 bg-white border border-gray-200 rounded-lg shadow">
        <div className="flex justify-between mb-10">
          <div className="top-0 right-0 ">
            <div className="bg-transparent border-2 border-[#DFE1E2] rounded-full w-[35px] h-[35px] items-center flex justify-center">
              <img src={download} alt="" className="w-[17px] h-[17px]" />
            </div>
          </div>
          <div className="top-0 right-0 ">
            <button
              onClick={onClose}
              className=" text-[#53575A]focus:outline-none font-normal rounded-lg text-sm leading-5 px-5 py-2.5 text-center inline-flex items-center bg-[#DFE1E2]  mb-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="text-sm font-normal leading-5">Close</span>
            </button>
          </div>
        </div>
        {imageSrc.name.endsWith('.jpg') ||
        imageSrc.name.endsWith('.pdf') ||
        imageSrc.name.endsWith('.xlsx') ? (
          <img
            className="rounded-lg object-cover h-[392px] w-[631px]"
            src={imageSrc.src}
            alt="Modal"
          />
        ) : (
          <>
            <img
              className="rounded-lg object-cover h-[392px] w-[631px]"
              src={iconImage}
              alt=""
            />
          </>
        )}
        <div className="flex flex-row items-center">
          <div className="">
            <div className="bg-[#FFF7E5] rounded-full w-[35px] h-[35px] items-center flex justify-center">
              {imageSrc.src.endsWith('.jpg') ||
              (imageSrc.type === 'file' && imageSrc.name.endsWith('.jpg')) ? (
                <>
                  <img src={iconImage} alt="" className="w-[17px] h-[17px]" />
                </>
              ) : imageSrc.src.endsWith('.pdf') ||
                (imageSrc.type === 'file' && imageSrc.name.endsWith('.pdf')) ? (
                <>
                  {' '}
                  <img
                    className="w-[17px] h-[17px]"
                    src={iconPdf}
                    alt=""
                  />
                </>
              ) : imageSrc.type === 'file' &&
                imageSrc.name.endsWith('.xlsx') ? (
                <>
                  {' '}
                  <img
                    className="w-[17px] h-[17px]"
                    src={iconXlsx}
                    alt=""
                  />
                </>
              ) : (
                <>
                  <img src={iconImage} alt="" className="w-[17px] h-[17px]" />
                </>
              )}
            </div>
          </div>
          <div className="p-3">
            <h5 className="text-xl font-medium tracking-tight text-gray-900 ">
              {imageSrc.name.split('.')[0]}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Added {format(new Date(imageSrc.created_at), 'do MMMM yyyy')}
            </p>
          </div>
        </div>
      </div>
    </div>
    // <div className="modal-overlay" onClick={onClose}>
    //   <div className="modal-content" onClick={(e) => e.stopPropagation()}>
    //     <img src={imageSrc} alt="Modal" />
    //   </div>
    // </div>
  );
};

export default Modal;
