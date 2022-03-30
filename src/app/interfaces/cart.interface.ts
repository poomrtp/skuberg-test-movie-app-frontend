export interface CartInterface {
  movies:       Movie[];
  totalPrice:   number;
  totalDiscount: number;
}
export interface Movie {
  vote_count:        number;
  overview:          string;
  release_date?:     string;
  id:                number;
  adult?:            boolean;
  backdrop_path:     string;
  genre_ids:         number[];
  original_language: string;
  original_title?:   string;
  poster_path:       string;
  video?:            boolean;
  vote_average:      number;
  title?:            string;
  popularity:        number;
  media_type:        string;
  first_air_date?:   string;
  name?:             string;
  origin_country?:   string[];
  original_name?: string;
  price?: number
}