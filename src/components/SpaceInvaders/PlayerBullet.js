import Bullet from './Bullet'

class PlayerBullet extends Bullet {
    update() {
        this.y -= 6;
    }
}

export default PlayerBullet