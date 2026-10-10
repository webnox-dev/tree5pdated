import React, { useState } from "react";
import { MdArrowBack } from "react-icons/md";

const Tab = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'tab1', label: 'Paternal lineage of Dr. R. S. Lal Mohan' },
    { id: 'tab2', label: 'Maternal Family lineage of Dr. R. S. Lal Mohan' },
    { id: 'tab3', label: 'Paternal Lineage of Mrs. Grace Lal Mohan' },
    { id: 'tab4', label: 'Maternal Lineage of Mrs. Grace Lal Mohan' },
  ];

  return (
    <div className="mx-auto  px-4 sm:px-6 lg:px-8">

      {/* Logo */}
      <a href="https://ajkcas.ac.in/" className="flex flex-row justify-center w-[100%]" target="_blank">
        <img
          src="https://ajkcas.ac.in/wp-content/uploads/2026/09/AJKCollegeOf-Arts-And-Science.webp"
          alt="AJKCAS Logo"
          className="h-16 md:h-[90px] w-auto object-contain bg-white"
        />
      </a>

      {/* Top bar with logo, tabs/dropdown, and back button */}
      <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">



        {/* Tabs or Dropdown */}
        <div className="w-full md:w-auto flex-grow">
          {/* Desktop Tabs */}
          <div className="hidden md:grid grid-cols-4 gap-4 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-4 px-2 text-center cursor-pointer focus:outline-none transition-colors
              ${activeTab === tab.id ? 'text-green-500 font-semibold' : 'text-white hover:text-green-300'}`}
              >
                <span className="truncate block">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Dropdown */}
          <div className="md:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full py-3 pl-4 text-sm pr-8 border border-gray-300 rounded-lg bg-white 
            focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
            >
              {tabs.map((tab) => (
                <option key={tab.id} value={tab.id} className="truncate">
                  {tab.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Back Button */}
        <div className=" hidden md:block">
          <a
            href="https://ajkcas.ac.in/"
            className="flex items-center gap-2 text-white hover:text-green-300 whitespace-nowrap"
            target="_blank"
          >
            <MdArrowBack />
            <span>Back</span>
          </a>
        </div>

      </div>
    </div>

  );
};

export default Tab;