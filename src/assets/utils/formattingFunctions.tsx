    import { FaStar, FaStarHalf } from 'react-icons/fa';

    export function formatDate(date: string) {
        let dateSliced = date.split("-");
        dateSliced = dateSliced.map((item) => item.replace(/^0+/, ''));
        return (dateSliced[1]+"/"+dateSliced[2]+"/"+dateSliced[0]);
    }

    export function renderStars(rating: number, size: number) {
        let stars = [];
        for (let i = 0; i < Math.floor(rating); i++) {
            stars.push(<FaStar key={i} size={size} color="#F4A258"/>);
        }
        if (rating % 1 >= 0.5) {
            stars.push(<FaStarHalf key={5} size={size} color="#F4A258"/>);
        }
        return stars;
    }