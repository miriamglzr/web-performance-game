import s from "./Hero.module.css";

export const Hero = () => {
	return (
		<section className={s.container}>
			<img
				loading="eager"
				decoding="sync"
				className={s.image}
				src="bg.jpg"
				alt=""
				width="1270"
				height="500"
			/>
			<div className={s.center}>
				<h1 className={s.title}>Star fighter</h1>
				<a className={s.button} href="/game">
					Start
				</a>
			</div>
		</section>
	);
};

export default Hero;
