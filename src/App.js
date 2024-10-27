import Footer from "./components/Game/Footer";
import GameContainer from "./components/Game/GameContainer";
import Header from "./components/Header";

function App() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-between gap-4">
      <Header />
      <GameContainer />
      <Footer />
    </div>
  );
}

export default App;
