// qui inserirò il dropdown con i film tra cui scegliere
// voglio farne un componente separato, quindi lo stacco da App.js
// ogni input field in React deve venire "CONTROLLATO" (dovrà avere le prop value e onChange)
// quindi avrò bisogno di uno stato... ma non lo creerò dentro MovieSelect, lo creerò dentro App
// e MovieSelect ci leggerà/scriverà
// questo perchè l'informazione del film selezionato è FONDAMENTALE anche per MovieCard!
// dovrà ricevere lo stesso stato...
// ...quindi salvo il titolo scelto dentro il loro componente Padre (App.js)

import Form from 'react-bootstrap/Form'

const MovieSelect = (props) => {
  // MovieSelect riceve da App la prop "movieTitle", ovvero il valore salvato nello state
  // useremo la prop "movieTitle" come VALUE per l'input field
  return (
    <Form.Select
      aria-label="movie chooser select"
      value={props.movieTitle}
      onChange={(e) => props.changeMovieTitle(e.target.value)}
    >
      <option>Iron Man</option>
      <option>The Avengers</option>
      <option>Dr. Strange</option>
      <option>Spiderman</option>
      <option>Guardians of the Galaxy</option>
      <option>Venom</option>
    </Form.Select>
  )
}

export default MovieSelect
