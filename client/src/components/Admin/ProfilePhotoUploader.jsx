import React, { useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
 
import { uploadImage } from './uploadactions';


const ProfilePhotoUploader = () => {
    const dispatch = useDispatch();
    const [imagePreview, setImagePreview] = useState(null);
    const [imageData, setImageData] = useState(null);
    const { image } = useSelector(state => state.upload);

    const handleUploadClick = event => {
        let file = event.target.files[0];
        const newImageData = new FormData();
        newImageData.append('imageFile', file);
        setImageData(newImageData);
        setImagePreview(URL.createObjectURL(file));
    };

    const uploadImageWithAdditionalData = () => {
        dispatch(uploadImage(imageData));
    };


    return (
        <Container maxWidth="lg" className="p-8 mx-auto ml-30">
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                image={imagePreview !== null ? imagePreview : 'https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg'}
                                className="relative m-8 shadow-md h-300 w-250 hover:opacity-75 md:w-full md:h-100"
                            />
                        </CardActionArea>
                    </Card>
                    <input
                        accept="image/*"
                        id="upload-profile-image"
                        type="file"
                        onChange={handleUploadClick}
                        className="hidden"
                    />
                    <label htmlFor="upload-profile-image">
                        <button
                            type="button"
                            onClick={handleUploadClick}
                            className="px-3 py-2 text-xl font-semibold text-white bg-[#101d3f] rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Change Image
                        </button>
                    </label>
                    <button
                        type="button"
                        onClick={uploadImageWithAdditionalData}
                        className="px-3 py-2 mt-4 text-xl font-semibold text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-700"
                    >
                        Upload Profile Photo
                    </button>
                    <Typography className="mt-4">
                        {image === null ? 'Select An Image To Upload' : `Image Uploaded. Saved as ${image}`}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProfilePhotoUploader;
