import React, { useState } from 'react';

const Clicker: React.FC = () => {
	const [clickedValue, setClickedValue] = useState<number>(0);
	return (
		<div>
			<div className="flex justify-center items-center text-9xl morph">
				{clickedValue}
			</div>
			<div className="flex justify-center items-center">
				<button
					className="w-[10rem] text-[5rem] flex justify-center items-center morph "
					onClick={() => setClickedValue(clickedValue + 1)}
				>
					&#43;
				</button>
				<button
					className="w-[10rem] text-[5rem] flex justify-center items-center morph"
					onClick={() => setClickedValue(0)}
				>
					&#8634;
				</button>
				<button
					className="w-[10rem] text-[5rem] flex justify-center items-center morph"
					onClick={() => setClickedValue(clickedValue - 1)}
				>
					&#8722;
				</button>
			</div>
		</div>
	);
};

export default Clicker;
