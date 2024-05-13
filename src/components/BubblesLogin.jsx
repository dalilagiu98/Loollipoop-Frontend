import { useEffect } from 'react';
import '../sass/animation.css'; 
import { Container } from 'react-bootstrap';
import Login from './Login';

const BubblesLogin = () => {
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
        <Container fluid className='w-100'>
            <Login />
        </Container>
      {/* Il tuo contenuto qui */}
    </div>
  );
};

export default BubblesLogin;