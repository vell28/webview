import { API } from '@/constants/url';
import URL from '@/routing/api';

const updateImage = (data, token) => {
    const urlImage = `${API}/${URL.businessCard.getArPreview}`;
    const urlFrontImage = `${API}/${URL.businessCard.getImageFront}`;
    const urlBackImage = `${API}/${URL.businessCard.getImageBack}`;
    const img = new Image();
    const front = new Image();

    img.src = `${urlImage}?id=${data.id}&width=400&token=${token}`;
    front.src = `${urlFrontImage}?id=${data.id}&width=400&token=${token}`;

    data.image = img.src;
    data.frontImage = front.src;
    data.backImage = `${urlBackImage}?id=${data.id}&width=400&token=${token}`;

    return data;
}

export default updateImage;
