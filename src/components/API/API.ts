import axios from 'axios';

const ACCESS_KEY: string = 'PId6GjeQ_obh_Sys5wkx9HFhQRvv3YmIj74Modod6jY';

async function searchImages(query: string, page: number): Promise<{ images: any[], total: number }> {
  const url = 'https://api.unsplash.com/search/photos';

  try {
    const response = await axios.get(url, {
      params: {
        query: query,
        page: page
      },
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    });
    const total = response.data.total_pages;
  
    const images = response.data.results;
    return { images: images, total: total };
  } catch (error: any) {
    console.error('Error fetching images:', error.message);
    throw new Error('Failed to fetch images');
  }
}

export default searchImages;
