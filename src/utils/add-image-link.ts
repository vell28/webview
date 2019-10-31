import { API } from '@/constants/url';
import URL from '@/routing/api';

export const addImageLink = (data, token) => {
    let active;      
    const urlImage = `${API}/${URL.businessCard.getArPreview}`;
    const urlFrontImage = `${API}/${URL.businessCard.getImageFront}`;
    const urlBackImage = `${API}/${URL.businessCard.getImageBack}`;
    const body = data && !!data.length ? data : Object.keys(data);

    body.forEach((item, i) => {
        if (!data[item]) {
    
            data[i].image = `${urlImage}?id=${data[i].id}&width=400&token=${token}`;

            data[i].frontImage = `${urlFrontImage}?id=${data[i].id}&width=400&token=${token}`;

            data[i].backImage = `${urlBackImage}?id=${data[i].id}&width=400&token=${token}`;
        } 

        if (data[item] && data[item][i]) {

            data[item].forEach((obj, i) => {
            
                active = data[item][i];
   
                active.image = `${urlImage}?template=${active.svgPreviewTemplate}&width=400&token=${token}`;
    
                active.frontImage = `${urlFrontImage}?template=${active.svgCardTemplate}&width=400&token=${token}`;
    
                active.backImage = `${urlBackImage}?template=${active.svgCardTemplate}&width=400&token=${token}`;
            })
        }
        
    })

    return data;
}
