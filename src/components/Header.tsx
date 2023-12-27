import React from 'react';
type Title = {
	title: string;
};

const Header: React.FC<Title> = ({ title }) => {
	return (
		<header className="z-[1] mx-[1rem] my-[1rem] h-[10rem] w-full rounded bg-[#373d44] shadow-[inset_5px_5px_8px_#2c3136,inset_-5px_-5px_8px_#49525a] flex justify-center items-center ">
			<h1 className="text-7xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-[linear-gradient(145deg,#383e44,#2f343a)] drop-shadow-custom">
				{title}
			</h1>
		</header>
	);
};

export default Header;
