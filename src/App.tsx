import { useEffect } from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Letter } from './components/Letter';
import { Topics } from './components/Topics';
import { Videos } from './components/Videos';
import { Quiz } from './components/Quiz/Quiz';
import { Flashcards } from './components/Flashcards/Flashcards';
import { Plan } from './components/Plan';
import { Pep } from './components/Pep';
import { BookExam } from './components/BookExam';
import { Footer } from './components/Footer';
import { KEYS } from './lib/storageKeys';
import { writeLS } from './hooks/useLocalStorage';

function App() {
  useEffect(() => {
    writeLS(KEYS.lastVisit, new Date().toISOString());
  }, []);

  return (
    <div className="relative min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Letter />
        <Topics />
        <Videos />
        <Quiz />
        <Flashcards />
        <Plan />
        <Pep />
        <BookExam />
      </main>
      <Footer />
    </div>
  );
}

export default App;
