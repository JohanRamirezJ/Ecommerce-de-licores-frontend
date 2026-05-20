import vinoImg from '../assets/images/vino-removebg-preview.jpg';
import whiskyImg from '../assets/images/whisky-removebg-preview.jpg';
import vodkaImg from '../assets/images/vodka-removebg-preview.jpg';
import aguardienteImg from '../assets/images/aguardiente-removebg-preview.jpg';
import tequilaImg from '../assets/images/tequila-removebg-preview.jpg';
import ronImg from '../assets/images/ron-removebg-preview.jpg';
import cervezaImg from '../assets/images/cerveza-removebg-preview.jpg';
import b1 from '../assets/images/b1.png';
import b2 from '../assets/images/b2.png';
import b3 from '../assets/images/b3.png';
import b4 from '../assets/images/b4.png';
import b5 from '../assets/images/b5.png';

const imageMap = {
    'vino-removebg-preview.jpg': vinoImg,
    'whisky-removebg-preview.jpg': whiskyImg,
    'whisky-removedbg-preview.jpg': whiskyImg, // the user mentioned this specific named typo
    'vodka-removebg-preview.jpg': vodkaImg,
    'aguardiente-removebg-preview.jpg': aguardienteImg,
    'tequila-removebg-preview.jpg': tequilaImg,
    'ron-removebg-preview.jpg': ronImg,
    'cerveza-removebg-preview.jpg': cervezaImg,
    'b1.png': b1,
    'b2.png': b2,
    'b3.png': b3,
    'b4.png': b4,
    'b5.png': b5,
};

export const mapImage = (imageName) => {
    if (!imageName) return vinoImg; // default target image
    return imageMap[imageName] || vinoImg; // returns default fallback if mismatch occurs
};
