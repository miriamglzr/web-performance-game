import { useEffect } from "react";

const useKeypress = (handler: any) => {
	useEffect(() => {
		const eventListener = (event: KeyboardEvent) => {
			handler(event.key);
		};
		window.addEventListener("keydown", eventListener);
		return () => {
			window.removeEventListener("keydown", eventListener);
		};
	}, [handler]);
};

export default useKeypress;
