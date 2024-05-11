interface Props {
  onClick: () => void;
}

const LoadMoreBtn: React.FC<Props> = ({ onClick }) => {
  return (
    <button type='button' onClick={onClick}>Load More</button>
  );
}

export default LoadMoreBtn;
