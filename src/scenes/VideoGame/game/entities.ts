import classnames from "classnames";
import s from "../ui/styles.module.css";
import { barrelLength, shotVelocity } from "./constants";
import { getBarrelPosition } from "./utils";
import { Enemy, EnemySpawn, Entity } from "./types";

/**
 * Create an enemy element and metadata.
 */
export function createEnemy(enemySpawn: EnemySpawn, spawnTime: number): Entity {
	const {
		position: { x, y },
		style,
	} = enemySpawn;

	const el = document.createElement("div");
	el.className = classnames(s.entity, s.entityEnemy, s[`entityEnemy${style}`]);
	el.style.transform = `translate(${x}px, ${y}px)`;

	return {
		type: "enemy",
		el,
		spawnTime,
		enemySpawn,
		x,
		y,
	};
}

/**
 * Create a shot element and metadata.
 */
export function createShot(
	barrelAngle: number,
	turretEl: HTMLElement | null
): Entity {
	let { x, y } = getBarrelPosition();
	x = turretEl!.offsetLeft + barrelLength * Math.cos(barrelAngle) + 40;
	y += barrelLength * Math.sin(barrelAngle);
	const velocity = {
		x: window.innerHeight * shotVelocity * Math.cos(barrelAngle),
		y: window.innerHeight * shotVelocity * Math.sin(barrelAngle),
	};
	const el = document.createElement("div");
	el.className = classnames(s.entity, s.entityShot);
	el.style.transform = `translate(${x}px, ${y}px)`;

	return {
		type: "shot",
		velocity,
		el,
		x,
		y,
	};
}

/**
 * Calculate score from shooting an enemy.
 */
export function scoreFromEnemy(enemy: Enemy) {
	return 50;
}
