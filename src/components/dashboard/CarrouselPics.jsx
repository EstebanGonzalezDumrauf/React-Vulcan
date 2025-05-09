import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import beretta1 from "../images/beretta/1.jpg";
import beretta2 from "../images/beretta/2.png";
import beretta3 from "../images/beretta/3.jpeg";
import beretta4 from "../images/beretta/4.jpg";
import beretta5 from "../images/beretta/5.jpg";
import browning1 from "../images/browning/1.jpg";
import browning2 from "../images/browning/2.jpg";
import browning3 from "../images/browning/3.webp";
import browning4 from "../images/browning/4.webp";
import browning5 from "../images/browning/5.webp";
// import CardInfo from '../Card'; // Descomenta si lo vas a usar

const ImageGallery = ({ id }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);

    const imageSets = {
        beretta: [
            { src: beretta1, alt: "First Image", description: "Vista lateral izquierda." },
            { src: beretta2, alt: "Second Image", description: "Despiece." },
            { src: beretta3, alt: "Third Image", description: "Vista lateral derecha." },
            { src: beretta4, alt: "Fourth Image", description: "Vista inferior frontal." },
            { src: beretta5, alt: "Fifth Image", description: "Vista superior opuesta." },
        ],
        browning: [
            { src: browning1, alt: "First Image", description: "Descripción de la primera imagen." },
            { src: browning2, alt: "Second Image browning", description: "Descripción de la segunda imagen." },
            { src: browning3, alt: "Third Image", description: "Descripción de la tercera imagen." },
            { src: browning4, alt: "Fourth Image", description: "Descripción de la cuarta imagen." },
            { src: browning5, alt: "Fifth Image", description: "Descripción de la quinta imagen." },
        ]
    };

    const getImageSet = (id) => {
        if (typeof id === 'string') {
            if (id.includes('nbyFZz1UqJpGQNcR95UE')) return imageSets.browning;
            if (id.includes('Bq6p72N1TuTZ0zL75lvZ')) return imageSets.beretta;
        }
        return imageSets.beretta;
    };

    useEffect(() => {
        const set = getImageSet(id);
        setImages(set);
        if (set.length > 0) {
            setSelectedImage(set[0].src);
            setDescription(set[0].description);
        }
    }, [id]);

    const handleThumbnailClick = (image) => {
        setSelectedImage(image.src);
        setDescription(image.description);
    };

    if (images.length === 0) return null; // Evita render hasta que se cargue

    return (
        <Box sx={{ mt: 4, px: 2 }}>
            <Box>
                <Card
                sx={{ border: 'none', boxShadow: 'none'}}
                >
                    <CardMedia
                        component="img"
                        image={selectedImage}
                        alt="Selected"
                        sx={{ maxHeight: 400, objectFit: 'contain'}}
                    />
                    <CardContent                    >
                        <Typography variant="body1">{description}</Typography>
                    </CardContent>
                </Card>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, flexWrap: 'wrap', gap: 2}}>
                    {images.map((image, index) => (
                        <Card
                            key={index}
                            sx={{ width: 80, height: 80, cursor: 'pointer', border: 'none', boxShadow: 'none'}}
                            onClick={() => handleThumbnailClick(image)}
                        >
                            <CardMedia
                                component="img"
                                image={image.src}
                                alt={image.alt}
                                sx={{ width: '100%', height: '100%', objectFit: 'cover'}}
                            />
                        </Card>
                    ))} 
                </Box>
            </Box>

        </Box>
    );
};

export default ImageGallery;
