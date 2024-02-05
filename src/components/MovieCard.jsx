// creiamo ora la parte inferiore della pagina, la card che mostra i dettagli del film selezionato dal dropdown
// MovieCard riceverà sempre il valore selezionato dal dropdown grazie alla prop che gli verrà passata da App
// la prop si chiama "movieTitle"

import { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import Placeholder from 'react-bootstrap/Placeholder'

// con "movieTitle" questo componente MovieCard dovrà interrogare le API di OMDB in modo da trovare le informazioni
// con cui riempire la card
// questo comporta che MovieCard dovrà essere un componente a CLASSE, perchè dovrà memorizzare quanto riceve
// da OMDBApi in un oggetto state

class MovieCard extends Component {
  // MovieCard riceve da App il titolo del film che abbiamo selezionato tramite una prop "movieTitle"
  // ora uso "movieTitle" per fare una fetch a OMDBApi

  state = {
    movieObject: null,
    isLoading: true,
  }

  componentDidMount() {
    // componentDidMount è un metodo di lifecycle integrato nei componenti a classe
    // viene lanciato UNA VOLTA SOLA dopo il primo render(), in modo da mostrare l'interfaccia
    // statica e poi recuperare i dati relativi al caricamento iniziale
    this.fetchMovieData()
  }

  // al montaggio del componente, lo stato iniziale della tendina è "Iron Man", che viene correttamente
  // passato anche a MovieCard tramite prop e quindi l'invocazione di fetchMovieData() dentro il componentDidMount
  // utilizza "Iron Man" come stringa di ricerca, i dati vengono recuperati e mostrati all'utente.
  // ...ma cambiando il valore della tendina, nonostante MovieCard riceva il valore aggiornato della prop!
  // quindi avremmo anche il valore aggiornato in this.props.movieTitle, ma il problema è che non ri-eseguiamo la fetch
  // è possibile utilizzare un metodo di lifecycle che si chiama "componentDidUpdate", che viene lanciato
  // IN AUTOMATICO dal componente a classe OGNI VOLTA che il componente riceve un "aggiornamento" --> ovvero
  // ogni volta che il componente rileva un cambiamento NELLE PROPS o NELLO STATE.

  fetchMovieData = () => {
    this.setState({
      isLoading: true,
    })
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
          isLoading: false,
        })
      })
      .catch((error) => {
        console.log(error)
        this.setState({
          isLoading: false,
        })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    // componentDidUpdate viene re-invocato automaticamente dal componente a classe quando c'è un cambio
    // di props o di state! ...esattamente come render(), ma componentDidUpdate ci permette di interrompere
    // il ciclo infinito di conseguenza grazie ai suoi parametri
    // i due parametri di componentDidUpdate sono chiamati normalmente "prevProps" e "prevState": rappresentano
    // i valori degli oggetti props e state PRIMA dell'ultimo aggiornamento, ovvero PRIMA dell'ultimo cambiamento
    // sono in contrapposizione a this.props e this.state
    // componentDidUpdate viene ri-eseguito OGNI VOLTA che cambia una prop o che cambia lo state; esattamente
    // come render(). Ma grazie ai due parametri, noi possiamo capire cos'è successo!
    // noi vorremmo RI-LANCIARE fetchMovieData() quando cambia la prop "movieTitle", ma NON vorremmo ri-lanciare
    // fetchMovieData() quando cambia lo state!
    if (prevProps.movieTitle !== this.props.movieTitle) {
      // entro in questo if solamente quando c'è stato un cambio di film nella tendina dropdown
      this.fetchMovieData()
    }
    // dentro COMPONENTDIDUPDATE ci vuole SEMPRE in if()
    // se non avete un if è quasi certo che entrate in un loop infinito
    // dovete capire COSA state cercando, ascoltando
  }

  render() {
    // this.fetchMovieData()
    // NON POSSIAMO PURTROPPO METTERE this.fetchMovieData() dentro render()!
    // 100% provocherebbe un ciclo infinito (perchè dentro fetchMovieData() c'è un setState che re-invocherà render())

    return (
      // <>
      //   {this.state.isLoading ? (
      //     <div className="text-center">
      //       <Spinner animation="border" variant="warning" />
      //     </div>
      //   ) : (
      //     <Card>
      //       <Card.Img variant="top" src={this.state.movieObject.Poster} />
      //       <Card.Body>
      //         <Card.Title>{this.state.movieObject.Title}</Card.Title>
      //         <Card.Text>
      //           {this.state.movieObject.Type} - {this.state.movieObject.Year}
      //         </Card.Text>
      //         {/* <Button variant="primary">Go somewhere</Button> */}
      //       </Card.Body>
      //     </Card>
      //   )}
      // </>

      <Card>
        {this.state.isLoading ? (
          <div
            id="spinner-container"
            className="d-flex justify-content-center align-items-center"
          >
            <Spinner animation="border" variant="warning" />
          </div>
        ) : (
          <Card.Img variant="top" src={this.state.movieObject.Poster} />
        )}
        <Card.Body>
          <Card.Title>
            {this.state.isLoading ? (
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
            ) : (
              this.state.movieObject.Title
            )}
          </Card.Title>
          <Card.Text>
            {this.state.isLoading ? (
              <Placeholder as={Card.Body} animation="glow">
                <Placeholder xs={12} />
              </Placeholder>
            ) : (
              <span>
                {this.state.movieObject.Type} - {this.state.movieObject.Year}
              </span>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default MovieCard
