export interface DeckstatsDeck {
  url_neutral: string;
  image_url: string;
  group_by: string;
  preview_cards_idprintings: number[];
  name: string;
  saved_id: number;
  owner_id: number;
  format_id: number;
  added: number;
  updated: number;
  sort_by: string;
  is_public: boolean;
  colorflag: number;
  colors: number[];
  views: number;
  number_main: number;
  number_main_nonbasic: number;
  revision?: number;
  folder_id?: number;
  number_sideboard?: number;
  number_sideboard_nonbasic?: number;
  likes?: number;
  copy_deck_id?: number;
  is_new?: boolean;
  comments?: number;
  is_work_in_progress?: boolean;
}

export interface DeckstatsFolder {
  id: number;
  owner_id: number;
  decks: DeckstatsDeck[];
  description: string;
  decks_total: number;
  decks_current_page: number;
  decks_per_page: number;
}

export interface DeckstatsResponse {
  success: boolean;
  order_field: string;
  order_direction: string;
  folder: DeckstatsFolder;
}
