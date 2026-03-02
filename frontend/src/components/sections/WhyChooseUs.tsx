import React, { useState } from "react";
import SectionHeader from "../SectionHeader";

export default function WhyChooseUs() {
    

    return(
        <div>
            <div className="flex items-center justify-center md:items-start  flex-col gap-4">
                <SectionHeader
                    badgeText="Why Choose Us"
                    icon="/ICONS/text-white-icon.svg"
                />

                    <h1 className="font-poppins text-center leading-[35px] tracking-[2px] text-[32px] md:text-[50px]">What Makes Us <span className="text-[#3CBDE6] font-semibold">Different</span></h1>
                    <p className="text-center md:text-start text-[16px] md:text-[20px] leading-[15px] md:leading-[22px] font-light md:font-normal w-full md:w-[600px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10 md:mx-20">
                <div className="col-span-2 md:col-span-2 rounded-3xl shadow-lg bg-[#E9E9E9] overflow-hidden">
                <img
                    src="/Cutting-Edge.png"
                    alt="Cutting Edge"
                    className="w-full overflow-hidden rounded-2xl"
                />
                <p className="p-6">Lorem ipsum dolor sit amet...</p>
                </div>
                <div className="col-span-1 md:col-span-1 rounded-3xl shadow-lg bg-white overflow-hidden">
                    <img
                        src="/Cutting-Edge.png"
                        alt="Cutting Edge"
                        className="w-full"
                    />
                    <p className="mt-4">Lorem ipsum dolor sit amet...</p>
                </div>
                <div className="col-span-1 md:col-span-1 rounded-3xl shadow-lg bg-white ">
                    <img
                        src="/Cutting-Edge.png"
                        alt="Cutting Edge"
                        className="w-full rounded-2xl"
                    />
                    <p className="mt-4">Lorem ipsum dolor sit amet...</p>
                </div>
                <div className="col-span-2 md:col-span-2 rounded-3xl shadow-lg bg-white overflow-hidden">
                    <img
                        src="/Cutting-Edge.png"
                        alt="Cutting Edge"
                        className="w-full overflow-hidden  rounded-2xl"
                    />
                    <p className="mt-4 py-3">Lorem ipsum dolor sit amet...</p>
                </div>
            </div>
        </div>
    )
}