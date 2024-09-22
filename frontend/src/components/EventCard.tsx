import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './EventCard.css';  // Import a CSS file for custom styling

interface EventCardProps {
    title: string;
    description: string;
    date: string;
    location: string;
    user_type: string;
    image: string;
};

export const EventCard: React.FC<EventCardProps> = ({ title, description, date, location, user_type, image }) => {
  return (
    <Card className='event-card mx-auto h-100'>  {/* 'h-100' ensures the card takes full height */}
      <Card.Img variant="top" className='event-card-img' src={image} alt={title} />
      <Card.Body className='d-flex flex-column'>  {/* Flexbox for column alignment */}
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{date}</Card.Text>
        <Card.Text>{location}</Card.Text>
        <div className="mt-auto">  {/* Pushes the button to the bottom */}
          <Button variant="primary">{user_type === "volunteer" ? "Sign Up" : "Thank"}</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default EventCard;
