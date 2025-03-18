let log = new Log(document.querySelector('.log'));
let player = new Knight('Pedro');
let monster = new LittleMonster();

const stage = new Stage(
    player,
    monster,
    document.querySelector('#player'),
    document.querySelector('#monster'),
    log
)

stage.start();