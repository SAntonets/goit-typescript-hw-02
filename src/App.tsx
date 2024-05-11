import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Modal from 'react-modal';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import Loader from './components/Loader/Loader';
import ImageModal from './components/ImageModal/ImageModal';
import searchImages from './components/API/API'; 
import './App.css';

Modal.setAppElement('#root');

interface Image {
  id: number;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
}

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchWord, setSearchWord] = useState<string>('');
  const [totalPages, setTotalPages] = useState<number>(1);
  const [errorDownload, setErrorDownload] = useState<boolean>(false);
  const [modalImageId, setModalImageId] = useState<number | null>(null);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setImages([]);
  }, []);

  useEffect(() => {
  if (searchWord !== '') {
    fetchImages();
  }
}, [page, searchWord]);


  const fetchImages = async () => {
    try {
      setErrorDownload(false);
      setLoading(true);
      const data = await searchImages(searchWord, page);
      if (page === 1) {
        setImages(data.images);
      } else {
        setImages(prevImages => [...prevImages, ...data.images]);
      }
      setTotalPages(data.total);
      setErrorDownload(false);
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
      setPage(prevPage => prevPage + 1);
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
