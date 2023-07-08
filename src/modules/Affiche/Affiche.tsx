import s from "./Affiche.module.scss";
import MovieList from "../MovieList/MovieList";

const Affiche = () => {
  return (
    <div className={s.AfficheWrapper}>
      <div className={s.AfficheTitle}>
        <div className={s.Title}>Афиша</div>
        <span className={s.TitleUnderlinedText}>cегодня</span>
        <span className={s.TitleText}>в прокате</span>
      </div>
      <div className={s.AfficheContent}>
        <div className={s.MoviesList}>
          <MovieList />
        </div>
      </div>
    </div>
  );
};

export default Affiche;
