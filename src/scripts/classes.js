class Character {
  _life = 1;
  maxLife = 1;
  attack = 0;
  defense = 0;

  constructor(name) {
    this.name = name;
  }

  get life() {
    return this._life;
  }

  set life(newLife) {
    this._life = newLife < 0 ? 0 : newLife;
  }
}

class Knight extends Character {
  constructor(name) {
    super(name);
    this.life = 100;
    this.attack = 10;
    this.defense = 8;
    this.maxLife = this.life;
  }
}

class Sorcerer extends Character {
  constructor(name) {
    super(name);
    this.life = 80;
    this.attack = 14;
    this.defense = 3;
    this.maxLife = this.life;
  }
}

class LittleEnemy extends Character {
  constructor() {
    super('Little Enemy');
    this.life = 40;
    this.attack = 4;
    this.defense = 4;
    this.maxLife = this.life;
  }
}

class BigMonster extends Character {
  constructor() {
    super('Big Monster');
    this.life = 120;
    this.attack = 16;
    this.defense = 6;
    this.maxLife = this.life;
  }
}

class Stage {
  static MAX_ATTACK_FACTOR = 2;
  static MAX_DEFENSE_FACTOR = 2;

  constructor(player, enemy, playerElement, enemyElement, battleLog) {
    this.player = player;
    this.enemy = enemy;
    this.playerElement = playerElement;
    this.enemyElement = enemyElement;
    this.battleLog = battleLog;
  }

  start() {
    this.update();
  }

  renderCharacter(character, characterElement) {
    characterElement.querySelector('.name').innerHTML =
      `${character.name} - ${character.life.toFixed(1)} HP`;
    const lifePercent = (character.life / character.maxLife) * 100;
    characterElement.querySelector('.bar').style.width = `${lifePercent}%`;
  }

  update() {
    this.renderCharacter(this.player, this.playerElement);
    this.renderCharacter(this.enemy, this.enemyElement);
  }

  doAttack(attacking, attacked) {
    if (attacking.life <= 0 || attacked.life <= 0) {
      this.battleLog.addMessage('Atacando cachorro morto.');
      return;
    }

    const attackFactor = (Math.random() * Stage.MAX_ATTACK_FACTOR).toFixed(2);
    const defenseFactor = (Math.random() * Stage.MAX_DEFENSE_FACTOR).toFixed(2);
    const finalAttackPower = attacking.attack * attackFactor;
    const finalDefensePower = attacking.defense * defenseFactor;

    if (finalAttackPower > finalDefensePower) {
      attacked.life -= finalAttackPower;
      this.battleLog.addMessage(
        `${attacking.name} causou ${finalAttackPower.toFixed(1)}`,
      );
    } else {
      this.battleLog.addMessage(`${attacked.name} conseguiu defender`);
      return;
    }

    this.update();
  }
}
