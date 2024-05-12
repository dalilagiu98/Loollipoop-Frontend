import { useEffect } from 'react';
import '../sass/animation.css'; // Assicurati di avere il tuo file SCSS corretto importato
import { Col, Container, Row } from 'react-bootstrap';

const Bubbles = () => {
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
        <Container>
            <Row>
                <Col className='text-center'>
                    <div>Hello world</div>
                </Col>
            </Row>
        </Container>
      {/* Il tuo contenuto qui */}
    </div>
  );
};

export default Bubbles;