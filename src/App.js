import { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
// import HomePage from "./views/HomePage/HomePage";
// import MoviePageDetails from "./views/MoviePageDetails/MoviePageDetails";
// import MoviesPage from "./views/MoviesPage/MoviesPage";
import NotFoundPage from "./views/NotFoundPage/NotFoundPage";
import "./App.css";

const HomePage = lazy(() =>
  import("./views/HomePage/HomePage" /* webpackChunkName: "Home-Page" */)
);

const MoviePageDetails = lazy(() =>
  import(
    "./views/MoviePageDetails/MoviePageDetails" /* webpackChunkName: "Movie-Page-Details" */
  )
);

const MoviesPage = lazy(() =>
  import("./views/MoviesPage/MoviesPage" /* webpackChunkName: "Movies-Page" */)
);

const App = () => (
  <>
    <Suspense fallback={<h2> Загружается... </h2>}>
      <Navigation />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/movies/:movieId" component={MoviePageDetails} />
        <Route path="/movies" component={MoviesPage} />
        <Route path="/movies/:movieId/cast" component={HomePage} />
        <Route path="/movies/:movieId/reviews" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  </>
);

export default App;
