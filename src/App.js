import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import CustomNavbar from './components/CustomNavbar'
import { Component } from 'react'
import MovieSelect from './components/MovieSelect'
import MovieCard from './components/MovieCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class App extends Component {
  state = {
    movieTitle: 'Iron Man',
  }

  changeMovieTitle = (newTitle) => {
    this.setState({
      movieTitle: newTitle,
    })
  }

  render() {
    return (
      <div className="App">
        <header>
          <CustomNavbar />
        </header>
        <main>
          <Container className="my-5">
            <Row className="justify-content-center">
              <Col xs={12} md={6}>
                <MovieSelect
                  movieTitle={this.state.movieTitle}
                  changeMovieTitle={this.changeMovieTitle}
                />
              </Col>
            </Row>
            <Row className="justify-content-center mt-5">
              <Col xs={12} md={6}>
                <MovieCard movieTitle={this.state.movieTitle} />
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    )
  }
}

export default App
