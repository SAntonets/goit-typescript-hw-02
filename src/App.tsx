import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Modal from 'react-modal';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import Loader from './components/Loader/Loader';
import ImageModal from './components/ImageModal/ImageModal';
import searchImages, { ImageData } from './components/API/API'; // Assuming ImageData type is exported from API
import './App.css';

Modal.setAppElement('#root');

interface Image {
  // Define properties of Image type if any
}

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchWord, setSearchWord] = useState<string>('');
  const [totalPages, setTotalPages] = useState<number>(0);
  const [errorDownload, setErrorDownload] = useState<boolean>(false);
  const [modalImageId, setModalImageId] = useState<number | null>(null);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setImages([]);
  }, []);

  useEffect(() => {
    fetchImages();
  }, [page, searchWord]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const data = await searchImages(searchWord, page);
      if (page === 1) {
        setImages(data.images);
      } else {
        setImages(prevImages => [...prevImages, ...data.images]);
      }
      setTotalPages(data.total);
    } catch (error) {
      toast.error('Failed to fetch images');
      setErrorDownload(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (searchText: string) => {
    setSearchWord(searchText);
    setPage(1);
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const openModal = (id: number) => {
    setModalImageId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setModalImageId(null);
    setIsOpen(false);
  };

  return (
    <div className="app">
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 && <ImageGallery images={images} openModal={openModal} />}
      {errorDownload && <ErrorMessage />}
      {loading && <Loader />}
      {page < totalPages && <LoadMoreBtn onClick={handleLoadMore} />}
      {modalImageId && <ImageModal images={images} modalImageId={modalImageId} closeModal={closeModal} modalIsOpen={modalIsOpen} />}
    </div>
  );
}

export default App;
