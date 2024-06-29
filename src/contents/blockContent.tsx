import React from 'react';

const BlockContent: React.FC = () => {
    return (
        <div className="font-inter flex flex-col justify-center items-center bg-gothamBlack-600 h-screen w-screen z-[2147483648] overflow-hidden space-y-10">
            <span className="text-simplyRed-400 text-6xl">You are in FOCUS MODE.</span>
            <span className="text-white text-4xl">This site is temporarily blocked.</span>
        </div>
    );
};

export default BlockContent;
