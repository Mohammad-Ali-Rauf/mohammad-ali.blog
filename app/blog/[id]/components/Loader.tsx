import React from "react";

export default function Loader() {
	return (
		<div className="animate-pulse space-y-5">
			<div className="flex flex-col justify-between items-center gap-y-3">
				<h1 className=" h-10 w-full bg-gray-300 rounded-md"></h1>
				<h1 className=" h-10 w-full bg-gray-300 rounded-md"></h1>
				<h1 className=" h-10 w-full bg-gray-300 rounded-md"></h1>
				<h1 className=" h-10 w-full bg-gray-300 rounded-md"></h1>
				<h1 className=" h-10 w-full bg-gray-300 rounded-md"></h1>
				<h1 className=" h-10 w-full bg-gray-300 rounded-md"></h1>
				<h1 className=" h-10 w-full bg-gray-300 rounded-md"></h1>
				<h1 className=" h-10 w-full bg-gray-300 rounded-md"></h1>
				<h1 className=" h-10 w-full bg-gray-300 rounded-md"></h1>
				<h1 className=" h-10 w-full bg-gray-300 rounded-md"></h1>
			</div>
			<div className=" border h-96 rounded-md bg-graident-dark "></div>
		</div>
	);
}