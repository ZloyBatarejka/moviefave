interface IGenre {
  [key: number]: string;
}
interface IGenreButton {
  [key: string]: number;
}

export const genres: IGenre = {
  28: "Боевик",
  12: "Приключения",
  16: "Мультфильм",
  35: "Комедия",
  80: "Криминал",
  99: "Документальный",
  18: "Драма",
  10751: "Семейный",
  14: "Фэнтези",
  36: "История",
  27: "Ужасы",
  10402: "Музыка",
  9648: "Детектив",
  10749: "Мелодрама",
  878: "Фантастика",
  10770: "Телевизионный фильм",
  53: "Триллер",
  10752: "Военный",
  37: "Вестерн",
};

export const genreButton: IGenreButton = {
  action: 28,
  comedy: 35,
  horror: 27,
  fantasy: 14,
  drama: 18,
  thriller: 53,
};
