import Bullet from './Bullet'

class AlienBullet extends Bullet {
   update() {
       this.y += 2;
   }
}

export default AlienBullet