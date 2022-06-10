import { useAnimationFrame } from "framer-motion";
import { useRef, MouseEvent } from "react";
import s from "./ui/styles.module.css";
import { initialState } from "./game/state";
import { onMouseClick, onMouseMove } from "./game/actions";
import { update } from "./game/gameplay";
import useKeypress from "./game/useKeypress";

export default () => {
	const gameState = useRef(initialState());

	const mouseMove = (event: MouseEvent) => {
		onMouseMove(gameState.current, event.clientX, event.clientY);
	};

	const mouseClick = () => {
		onMouseClick(gameState.current);
	};

	useAnimationFrame((time) => {
		update(gameState.current, time / 1000);
	});

	useKeypress((key: string) => {
		checkKey(key);
	});

	const checkKey = (key: string) => {
		if (key === "ArrowLeft") {
			onMouseClick(gameState.current);
		}
		if (key === "ArrowRight") {
			onMouseClick(gameState.current);
		}
		if (key === " ") {
			onMouseClick(gameState.current);
		}
	};

	return (
		<div className={s.scene} onMouseMove={mouseMove} onClick={mouseClick}>
			<div
				className={s.levelBg}
				ref={(el) => (gameState.current.levelBgEl = el)}
			/>
			<div className={s.turret}>
				<div
					className={s.barrel}
					ref={(el) => (gameState.current.barrelEl = el)}
				/>
			</div>
			<div ref={(el) => (gameState.current.entityContainerEl = el)} />
			<div
				className={s.status}
				ref={(el) => (gameState.current.statusEl = el)}
			/>
			<div className={s.modal} ref={(el) => (gameState.current.modalEl = el)}>
				Game Over
			</div>
		</div>
	);
};
