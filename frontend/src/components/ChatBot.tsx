"use client";
import { useState } from "react";
import { IoIosClose  } from "react-icons/io"

export default function ChatBot() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div data-aos="fade-left" data-aos-offset="100"  className="fixed bottom-0 right-0 z-50">
        <div className="flex flex-row m-2">

          {/* Help Button */}
          <div className="mx-2 flex items-center3 bg-white border-[2px] border-[#3CBDE6]  justify-center flex-shrink-0 shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl w-[150px] h-[50px] cursor-pointer">
            <button
              onClick={() => setModalOpen(true)}
              className="font-poppins text-sm"
            >
              How can I help?
            </button>
          </div>

          {/* Chatbot Icon */}
          <div className="flex items-center justify-center flex-shrink-0 shadow-[inset_0_1px_3px_0_rgba(0,0,0,0.4)] rounded-full w-[60px] h-[60px] cursor-pointer">
            <img src="/OpsieChatbot.svg" alt="Chatbot" className="w-20 h-20" />
          </div>

        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex flex-col items-end  justify-end bg-black/40 z-50  ">
          <div className="shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] h-[370px] flex flex-col items-start justify-start bg-[#ECEDF1] rounded-xl shadow-lg w-[280px] mb-20 mx-2">
                <div className="bg-[#24B6DD] flex flex-row justify-center items-start m-2 rounded-lg pb-4 pt-2 w-[265px] gap-4">
                    <div className="flex items-center justify-center flex-shrink-0  rounded-full w-[40px] h-[40px] cursor-pointer">
                        <img src="/opsie-chabot-white.svg" alt="Chatbot" className="w-40 h-40" />
                    </div>
                    <div className="flex flex-col items-start justify-center leading-0">
                    <h2 className="text-white text-2xl font-semibold">Opsie</h2>
                    <p className="text-white text-[10px] mt-2">
                        Usual reply time: 2 to 3 Minutes
                    </p>    
                </div>
                <button
                onClick={() => setModalOpen(false)}
                className=" text-white rounded-lg  text-[50px] w-10 h-10 flex  items-center justify-end
                "
                >
                <IoIosClose/>
                </button>
                
            </div>
            <div className="h-[200px]">

            </div>
            <div className="flex items-center justify-center ">
                 <div className="flex items-end justify-end border border-1 rounded-lg w-[265px] mx-2 py-4">
                <input type="text" placeholder=""/>
            </div>
             </div>
             
          </div>
          
        </div>
      )}
    </>
  );
}