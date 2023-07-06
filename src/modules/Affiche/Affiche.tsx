import "./Affiche.scss";
import MovieList from "../MovieList/MovieList/MovieList";

const Affiche = () => {
  return (
    <div>
      <div className="AfficheWrapper">
        <div className="AfficheTitle">
          <div className="Title">Афиша</div>
          <span className="TitleUnderlinedText">cегодня</span>{" "}
          <span className="TitleText">в прокате</span>
        </div>
        <div className="AfficheContent">
          <div className="MoviesList">
            <MovieList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Affiche;
