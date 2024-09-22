import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './EventCard.css';  // Import a CSS file for custom styling
import './GiveThanksModal.css';

interface EventCardProps {
    title: string;
    description: string;
    date: string;
    location: string;
    user_type: string;
    image: string;
    show: () => void;
    setSelectedEvent: (id: number) => void;
    id: number;
};

export const EventCard: React.FC<EventCardProps> = ({ title, description, date, location, user_type, show, id, setSelectedEvent, image }) => {
  return (
    <Card className='event-card mx-auto h-100'>  {/* 'h-100' ensures the card takes full height */}
      <Card.Img variant="top" className='event-card-img' src={image} alt={title} />
      <Card.Body className='d-flex flex-column'>  {/* Flexbox for column alignment */}
          <Card.Title>{title}</Card.Title>
          <Card.Text className='truncate'>{description}</Card.Text>
          {/* <Card.Text className='event-timing'>
              <strong>When:</strong> {new Date(startDate).toLocaleString()} - {new Date(endDate).toLocaleString()}
          </Card.Text> */}
          <Card.Text>
              <strong>Location:</strong> {location}
          </Card.Text>
          <Button onClick={() => {
              show();
              setSelectedEvent(id);
          }} className='button-custom'>
              {user_type === "volunteer" ? "Sign Up" : "+Impact"}
          </Button>
      </Card.Body>
    </Card>
  );
}

export default EventCard;
