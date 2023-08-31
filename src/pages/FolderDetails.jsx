import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import Modal from '../components/Modal';
import download from '../assets/download.svg';
import iconImage from '../assets/folder-icon-image.svg';
import iconPdf from '../assets/folder-icon-pdf.svg';
import iconXlsx from '../assets/folder-xlx-icon.svg';
import print from '../assets/print.svg';
import search from '../assets/search.svg';
import folder from '../assets/folder.svg';
import sort from '../assets/sort.svg';
import favouriteIconFilled from '../assets/heart-filled.svg';
import favouriteIconOutlined from '../assets/heart_outlined.svg';

const FolderDetails = () => {
  const { folderId } = useParams();
  const [folderContent, setFolderContent] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('name');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage('');
  };
  const handleDoubleClick = (folderId) => {
    // Redirect to the FileDetails page on double-click
    window.location.href = `/file/${folderId}`;
  };

  const handleDownloadClick = async (fileUrl, fileName) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  useEffect(() => {
    console.log('Fetching folder content for folderId:', folderId);
    axios
      .get(
        `http://3wdz.c.time4vps.cloud:3000/file/${folderId}`
        //   , {
        //   headers: {
        //       "Access-Control-Allow-Origin": "*",
        //       "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        //     }
        // }
      )
      .then((response) => {
        console.log('API Response:', response.data);
        setFolderContent(response.data);
      })
      .catch((error) => {
        console.error('Error fetching folder content:', error);
      });
  }, [folderId]);

  return (
    <div className="mb-8 mf:mx-56">
      <div className="flex flex-col justify-between my-24 ml-6 md:flex-row ">
        <div className="relative mb-8 mx-28 mf:mb-0">
          <button
            onClick={toggleDropdown}
            id="dropdownDefaultButton"
            className="bg-gray-50 border border-gray-300 text-gray-500 focus:ring-blue-500 focus:border-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            type="button"
          >
            Sort <img src={sort} className="ml-5" alt="" />
          </button>
          {isDropdownOpen && (
            <div
              id="dropdown"
              className="right-0 z-10 bg-white divide-y rounded-lg shadow w-44 top-10"
            >
              <ul
                className="py-2 text-sm text-black dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <p
                    onClick={() => setSortOrder('name')}
                    className="block px-4 py-2 text-black bg-white cursor-pointer"
                  >
                    By name
                  </p>
                </li>
                <li>
                  <p
                    onClick={() => setSortOrder('created_at')}
                    className="block px-4 py-2 text-black bg-white cursor-pointer"
                  >
                    By time created
                  </p>
                </li>
              </ul>
            </div>
          )}
        </div>

        <form className="flex items-center mx-28">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative mf:w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img src={search} alt="" />
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
              placeholder="Search"
              required
            />
          </div>
        </form>
      </div>
      <div className="flex h-screen">
        <div className="mx-auto md:mr-auto">
          <h4 className="mt-10 mb-6 ml-6 text-xl font-semibold leading-6 md:ml-0">
            Folders
          </h4>
          <div className="grid gap-4 ml-6 md:ml-0 md:grid-cols-4">
            {folderContent.map((item) =>
              item.type === 'folder' ? (
                <div
                  key={item.id}
                  className="items-center block px-5 py-2 text-sm text-center text-gray-900 border border-[#EFF0F0] rounded-lg w-72 bg-white "
                >
                  <div className="flex flex-row items-center gap-2 cursor-pointer">
                    <div className="">
                      <div className="bg-gray-200 rounded-full w-[35px] h-[35px] items-center flex justify-center">
                        <img
                          src={folder}
                          alt=""
                          className="w-[19px] h-[19px]"
                        />
                      </div>
                    </div>
                    <div className="text-start">
                      <h5
                        className=""
                        onDoubleClick={() => handleDoubleClick(item.id)}
                      >
                        {item.name}
                      </h5>
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        240mb
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )
            )}
          </div>

          <h4 className="mt-10 mb-6 ml-6 text-xl font-semibold leading-6 md:ml-0">
            Files
          </h4>
          <div className="grid gap-4 ml-6 md:ml-0 md:grid-cols-4">
            {folderContent
              .sort((a, b) => {
                if (sortOrder === 'name') {
                  return a.name.localeCompare(b.name);
                } else if (sortOrder === 'created_at') {
                  return new Date(a.created_at) - new Date(b.created_at);
                }
                return 0;
              })
              .map((item) =>
                item.type === 'file' ? (
                  <div
                    key={item.id}
                    className="relative max-w-[288px] p-3 bg-white border border-gray-200 rounded-lg shadow"
                  >
                    {item.src.endsWith('.jpg') ||
                    (item.type === 'file' && item.name.endsWith('.jpg')) ? (
                      <>
                        <img
                          className="rounded-lg object-cover h-[215px] w-[264px]"
                          src={item.src}
                          alt=""
                          onDoubleClick={() => handleImageClick(item)}
                        />
                        <div className="absolute top-5 right-5">
                          <div className="bg-gray-500 rounded-full w-[35px] h-[35px] items-center flex justify-center">
                            {item.favourite === true ? (
                              <img
                                src={favouriteIconFilled}
                                alt=""
                                className="w-[17px] h-[17px]"
                              />
                            ) : (
                              <img
                                src={favouriteIconOutlined}
                                alt=""
                                className="w-[17px] h-[17px]"
                              />
                            )}
                          </div>
                        </div>
                      </>
                    ) : item.type === 'file' && item.name.endsWith('.xlsx') ? (
                      <>
                        <div className="relative   bg-[#F2F5F7] rounded-lg object-cover">
                          <div className="flex flex-col items-center">
                            <img
                              className="w-24 h-[215px]"
                              src={iconXlsx}
                              alt=""
                              onDoubleClick={() =>
                                handleDownloadClick(item.src, item.name)
                              }
                            />
                            <div className="absolute top-5 right-5">
                              <div className="bg-gray-500 rounded-full w-[35px] h-[35px] items-center flex justify-center">
                                {item.favourite === true ? (
                                  <img
                                    src={favouriteIconFilled}
                                    alt=""
                                    className="w-[17px] h-[17px]"
                                  />
                                ) : (
                                  <img
                                    src={favouriteIconOutlined}
                                    alt=""
                                    className="w-[17px] h-[17px]"
                                  />
                                )}
                              </div>
                            </div>
                            <div className="absolute bottom-5 left-2">
                              <div className="bg-transparent border-2 border-[#DFE1E2] rounded-full w-[35px] h-[35px] items-center flex justify-center">
                                <img
                                  src={download}
                                  alt=""
                                  className="w-[17px] h-[17px]"
                                />
                              </div>
                            </div>
                            <div className="absolute bottom-5 left-12">
                              <div className="bg-transparent border-2 border-[#DFE1E2] rounded-full w-[35px] h-[35px] items-center flex justify-center">
                                <img
                                  src={print}
                                  alt=""
                                  className="w-[17px] h-[17px]"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : item.src.endsWith('.pdf') ||
                      (item.type === 'file' && item.name.endsWith('.pdf')) ? (
                      <>
                        <div className="relative   bg-[#F2F5F7] rounded-lg object-cover">
                          <div className="flex flex-col items-center">
                            <img
                              className="w-24 h-[215px]"
                              src="../assets/pdf.svg"
                              alt=""
                              onDoubleClick={() =>
                                handleDownloadClick(item.src, item.name)
                              }
                            />
                            <div className="absolute top-5 right-5">
                              <div className="bg-gray-500 rounded-full w-[35px] h-[35px] items-center flex justify-center">
                                {item.favourite === true ? (
                                  <img
                                    src={favouriteIconFilled}
                                    alt=""
                                    className="w-[17px] h-[17px]"
                                  />
                                ) : (
                                  <img
                                    src={favouriteIconOutlined}
                                    alt=""
                                    className="w-[17px] h-[17px]"
                                  />
                                )}
                              </div>
                            </div>
                            <div className="absolute bottom-5 left-2">
                              <div className="bg-transparent border-2 border-[#DFE1E2] rounded-full w-[35px] h-[35px] items-center flex justify-center">
                                <img
                                  src={download}
                                  alt=""
                                  className="w-[17px] h-[17px]"
                                />
                              </div>
                            </div>
                            <div className="absolute bottom-5 left-12">
                              <div className="bg-transparent border-2 border-[#DFE1E2] rounded-full w-[35px] h-[35px] items-center flex justify-center">
                                <img
                                  src={print}
                                  alt=""
                                  className="w-[17px] h-[17px]"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      // Default case
                      <>
                        <div className="relative   bg-[#F2F5F7] rounded-lg object-cover">
                          <div className="flex flex-col items-center">
                            <img
                              className="w-24 h-[215px]"
                              src={iconImage}
                              alt=""
                              onDoubleClick={() => handleImageClick(item)}
                            />
                            <div className="absolute top-5 right-5">
                              <div className="bg-gray-500 rounded-full w-[35px] h-[35px] items-center flex justify-center">
                                {item.favourite === true ? (
                                  <img
                                    src={favouriteIconFilled}
                                    alt=""
                                    className="w-[17px] h-[17px]"
                                  />
                                ) : (
                                  <img
                                    src={favouriteIconOutlined}
                                    alt=""
                                    className="w-[17px] h-[17px]"
                                  />
                                )}
                              </div>
                            </div>
                            <div className="absolute bottom-5 left-2">
                              <div className="bg-transparent border-2 border-[#DFE1E2] rounded-full w-[35px] h-[35px] items-center flex justify-center">
                                <img
                                  src={download}
                                  alt=""
                                  className="w-[17px] h-[17px]"
                                />
                              </div>
                            </div>
                            <div className="absolute bottom-5 left-12">
                              <div className="bg-transparent border-2 border-[#DFE1E2] rounded-full w-[35px] h-[35px] items-center flex justify-center">
                                <img
                                  src={print}
                                  alt=""
                                  className="w-[17px] h-[17px]"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="flex flex-row items-center">
                      <div className="">
                        <div className="bg-[#FFF7E5] rounded-full w-[35px] h-[35px] items-center flex justify-center">
                          {item.src.endsWith('.jpg') ||
                          (item.type === 'file' &&
                            item.name.endsWith('.jpg')) ? (
                            <>
                              <img
                                src={iconImage}
                                alt=""
                                className="w-[17px] h-[17px]"
                              />
                            </>
                          ) : item.type === 'file' &&
                            item.name.endsWith('.xlsx') ? (
                            <>
                              {' '}
                              <img
                                className="w-[17px] h-[17px]"
                                src={iconXlsx}
                                alt=""
                              />
                            </>
                          ) : item.src.endsWith('.pdf') ||
                            (item.type === 'file' &&
                              item.name.endsWith('.pdf')) ? (
                            <>
                              {' '}
                              <img
                                className="w-[17px] h-[17px]"
                                src={iconPdf}
                                alt=""
                              />
                            </>
                          ) : (
                            <>
                              <img
                                src={iconImage}
                                alt=""
                                className="w-[17px] h-[17px]"
                              />
                            </>
                          )}
                        </div>
                      </div>
                      <div className="p-3">
                        <h5 className="text-xl font-medium tracking-tight text-gray-900 ">
                          {item.name.split('.')[0]}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                          Added{' '}
                          {format(new Date(item.created_at), 'do MMMM yyyy')}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )
              )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal imageSrc={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default FolderDetails;
