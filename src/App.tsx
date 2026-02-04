import './App.css'
import Board from "./components/Board.tsx";
import {BoardProvider} from "./providers/BoardProvider.tsx";

function App() {

  return (
    <BoardProvider>
        <Board />
    </BoardProvider>
  )
}

export default App
