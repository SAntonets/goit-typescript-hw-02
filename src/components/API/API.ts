import axios from 'axios';

const ACCESS_KEY: string = 'PId6GjeQ_obh_Sys5wkx9HFhQRvv3YmIj74Modod6jY';


export type Image = {
  id: string;
  slug: string;
  alternative_slugs: {
    [key: string]: string;
  };
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string;
  breadcrumbs: {
    slug: string;
    title: string;
    index: number;
    type: string;
  }[];
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: any | null;
  topic_submissions: any;
  asset_type: string;
  user: {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    twitter_username: string | null;
    portfolio_url: string | null;
    bio: string | null;
    location: string;
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
      following: string;
      followers: string;
    };
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
    instagram_username: string | null;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    total_promoted_photos: number;
    total_illustrations: number;
    total_promoted_illustrations: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: {
      instagram_username: string | null;
      portfolio_url: string | null;
      twitter_username: string | null;
      paypal_email: string | null;
    };
  };
  tags: {
    type: string;
    title: string;
    source?: {
      ancestry: {
        type: {
          slug: string;
          pretty_slug: string;
        };
        category: {
          slug: string;
          pretty_slug: string;
        };
        subcategory: {
          slug: string;
          pretty_slug: string;
        };
      };
      title: string;
      subtitle: string;
      description: string;
      meta_title: string;
      meta_description: string;
      cover_photo: {
        id: string;
        slug: string;
        alternative_slugs: {
          [key: string]: string;
        };
        created_at: string;
        updated_at: string;
        promoted_at: string;
        width: number;
        height: number;
        color: string;
        blur_hash: string;
        description: string;
        alt_description: string;
        breadcrumbs: {
          slug: string;
          title: string;
          index: number;
          type: string;
        }[];
        urls: {
          raw: string;
          full: string;
          regular: string;
          small: string;
          thumb: string;
          small_s3: string;
        };
        links: {
          self: string;
          html: string;
          download: string;
          download_location: string;
        };
        likes: number;
        liked_by_user: boolean;
        current_user_collections: any[];
        sponsorship: any | null;
        topic_submissions: any;
        asset_type: string;
        user: {
          id: string;
          updated_at: string;
          username: string;
          name: string;
          first_name: string;
          last_name: string;
          twitter_username: string | null;
          portfolio_url: string | null;
          bio: string | null;
          location: string;
          links: {
            self: string;
            html: string;
            photos: string;
            likes: string;
            portfolio: string;
            following: string;
            followers: string;
          };
          profile_image: {
            small: string;
            medium: string;
            large: string;
          };
          instagram_username: string | null;
          total_collections: number;
          total_likes: number;
          total_photos: number;
          total_promoted_photos: number;
          total_illustrations: number;
          total_promoted_illustrations: number;
          accepted_tos: boolean;
          for_hire: boolean;
          social: {
            instagram_username: string | null;
            portfolio_url: string | null;
            twitter_username: string | null;
            paypal_email: string | null;
          };
        };
      };
    };
  }[];
};


type PromiseResult = {
  images: Image[],  
  total: number,
}

async function searchImages(query: string, page: number): Promise<PromiseResult> {
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
