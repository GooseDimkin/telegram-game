export interface IEnemy {
  id: number;
  x: number;
  y: number;
  health: number;
}

export interface IScorePopup {
  id: number;
  x: number;
  y: number;
}

export interface IProjectile {
  id: number;
  x: number;
  y: number;
}

export interface IEnemies {
  enemies: IEnemy[];
  removeEnemy: (id: number) => void;
}

export interface IEnemyHealthBar {
  health: number;
}

export interface IEnemyComponent {
  id: number;
  x: number;
  y: number;
  health: number;
  removeEnemy: (id: number) => void;
}

export interface IHeroHealthBar {
  heroHealth: number;
}

export interface IHero {
  heroHealth: number;
}

export interface IProjectile {
  id: number;
  x: number;
  y: number;
  removeProjectile: (id: any) => void;
  enemies: IEnemy[];
  setIsProjectileHit: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IProjectiles {
  setIsProjectileHit: React.Dispatch<React.SetStateAction<boolean>>;
  enemies: IEnemy[];
}

export interface IScorePopupComponent {
  scorePopups: IScorePopup | undefined;
  score: number;
}
