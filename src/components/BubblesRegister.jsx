import { useEffect } from 'react';
import '../sass/animation.css'; 
import { Container } from 'react-bootstrap';
import Register from './Register';

const BubblesRegister = () => {
  useEffect(() => {
    const generateBubbles = () => {
      const bubblesTotal = 50;
      const main = document.querySelector('.background');

      if (main) {
        for (let i = 1; i <= bubblesTotal; i++) {
          const bubble = document.createElement('div');
          bubble.className = `bubble bubble-${i}`;
          main.appendChild(bubble);
        }
      }
    };

        generateBubbles();

        return () => {
        const bubbles = document.querySelectorAll('.bubble');
        bubbles.forEach(bubble => bubble.remove());
        };
  }, []);

  return (
    <div className="background">
        <Container className='w-100'>
            <Register /> 
        </Container>
      {/* Il tuo contenuto qui */}
    </div>
  );
};

export default BubblesRegister;