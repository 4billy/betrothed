import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Card,
  CardGroup,
  Form,
  Stack,
  Carousel,
  Row,
  Col,
  Image,
} from 'react-bootstrap';
import { FittedImg } from './invitation.styled';
import PlumButton from '../Common/styled/buttonstyles/PlumButton';
import PlumFilledButton from '../Common/styled/buttonstyles/PlumFilledButton';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function InvitationForm({
  chosedTheme,
  galleryURL,
  setGalleryURL,
  mainPhoto,
  setMainPhoto,
}) {
  // 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  // 'https://images.unsplash.com/photo-1529636798458-92182e662485?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80'
  // const [mainPhoto, setMainPhoto] = useState(
  //   'https://images.unsplash.com/photo-1592218946197-f6c4816c5b03?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  // );
  const [inviteMessage, setInviteMessage] = useState('');
  // const [galleryURL, setGalleryURL] = useState([
  //   'https://images.unsplash.com/photo-1587318634139-bbc108e44808?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80',
  //   'https://images.unsplash.com/photo-1600038938045-b5fadbc55083?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
  //   'https://images.unsplash.com/photo-1595280544618-d5136675b6ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=778&q=80',
  // ]);
  const galleryArray = [];
  const hiddenMainPhotoInput = useRef(null);
  const hiddenGalleryInput = useRef(null);

  const uploadMainPhoto = () => {
    hiddenMainPhotoInput.current.click();
  };
  const addPicToGallery = () => {
    hiddenGalleryInput.current.click();
  };

  const previewMainPhoto = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setMainPhoto(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const updateMessage = (e) => {
    setInviteMessage(e.target.value);
  };

  const previewGallery = (e) => {
    const selectedPhotos = e.target.files;
    for (let i = 0; i < selectedPhotos.length; i++) {
      galleryArray.push(URL.createObjectURL(selectedPhotos[i]));
    }
    setGalleryURL([...galleryArray, ...galleryURL]);
  };

  return (
    <Container
      style={{
        width: '65%',
        backgroundImage: `url(${chosedTheme})`,
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h2>Your Wedding Website</h2>
      <Stack className="mb-5" direction="horizontal" gap={3}>
        <PlumButton className="ms-auto">Share your website</PlumButton>
        {/* <Link to="/rsvp-preview" state={{ from: galleryURL }}> */}
        <Link to="/rsvp-preview">
          <PlumFilledButton>Preview Site</PlumFilledButton>
        </Link>
      </Stack>
      <div>Main Photo</div>
      <FittedImg src={mainPhoto} alt="mainPhoto" />
      <input
        type="file"
        ref={hiddenMainPhotoInput}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={previewMainPhoto}
      />
      <div className="d-flex justify-content-center mt-2">
        <PlumButton onClick={uploadMainPhoto}>Choose new photo</PlumButton>
      </div>
      <Form className="mt-3">
        <Form.Group className="mb-3" controlId="formMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" onChange={updateMessage} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMessage">
          <div>Gallery</div>
          <Row xs={6} md={3}>
            {(galleryURL || []).map((url) => (
              <Col>
                <Image className="w-100 h-100 p-1" src={url} alt="gallery" />
              </Col>
            ))}
          </Row>
          <Form.Control
            type="file"
            ref={hiddenGalleryInput}
            accept="image/*"
            style={{ display: 'none' }}
            onChange={previewGallery}
            multiple
          />
          <div className="d-flex justify-content-center mt-2">
            <PlumButton onClick={addPicToGallery}>Add more photos</PlumButton>
          </div>
        </Form.Group>
        <div className="d-flex justify-content-end">
          {/* <Link to="/rsvp-preview" state={{ from: galleryURL }}> */}
          <Link to="/rsvp-preview">
            <PlumFilledButton type="submit">Save Changes</PlumFilledButton>
          </Link>
        </div>
      </Form>
    </Container>
  );
}
