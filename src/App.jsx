import Exercise01 from "./exercise01/main/Exercise01.jsx";
import Exercise02 from "./exercise02/main/Exercise02.jsx";
import Exercise03 from "./exercise03/main/Exercise03.jsx";
import styles from './App.module.scss'
import OverlayProvider from "./exercise02/context/OverlayContext.jsx";

function App() {
    return (
        <OverlayProvider>
            <main className={styles.root}>
                <h1>React Exercises</h1>
                <Exercise01/>
                <Exercise02/>
                <Exercise03/>
            </main>
        </OverlayProvider>
    )
}

export default App
