// creiamo ora la parte inferiore della pagina, la card che mostra i dettagli del film selezionato dal dropdown
// MovieCard riceverà sempre il valore selezionato dal dropdown grazie alla prop che gli verrà passata da App
// la prop si chiama "movieTitle"

import { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'

// con "movieTitle" questo componente MovieCard dovrà interrogare le API di OMDB in modo da trovare le informazioni
// con cui riempire la card
// questo comporta che MovieCard dovrà essere un componente a CLASSE, perchè dovrà memorizzare quanto riceve
// da OMDBApi in un oggetto state

class MovieCard extends Component {
  // MovieCard riceve da App il titolo del film che abbiamo selezionato tramite una prop "movieTitle"
  // ora uso "movieTitle" per fare una fetch a OMDBApi

  state = {
    movieObject: null,
  }

  componentDidMount() {
    // componentDidMount è un metodo di lifecycle integrato nei componenti a classe
    // viene lanciato UNA VOLTA SOLA dopo il primo render(), in modo da mostrare l'interfaccia
    // statica e poi recuperare i dati relativi al caricamento iniziale
    this.fetchMovieData()
  }

  fetchMovieData = () => {
    fetch('http://www.omdbapi.com/?apikey=82c3f3e8&s=' + this.props.movieTitle)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('errore nel recupero dati')
        }
      })
      .then((data) => {
        // questo è un oggetto con i risultati
        // dentro troverò i risultati nella proprietà Search
        console.log(data.Search[0])
        this.setState({
          movieObject: data.Search[0],
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <>
        {this.state.movieObject ? (
          <Card>
            <Card.Img variant="top" src={this.state.movieObject.Poster} />
            <Card.Body>
              <Card.Title>{this.state.movieObject.Title}</Card.Title>
              <Card.Text>
                {this.state.movieObject.Type} - {this.state.movieObject.Year}
              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>
        ) : (
          <Spinner animation="border" variant="warning" />
        )}
      </>
    )
  }
}

export default MovieCard
