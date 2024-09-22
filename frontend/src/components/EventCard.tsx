import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface EventCardProps {
    title: string;
    description: string;
    date: string;
    location: string;
    user_type: string;
};

export const EventCard: React.FC<EventCardProps> = ({ title, description, date, location, user_type }) => {
  return (
    <Card className='mx-auto'>
      <Card.Img className='mx-auto' variant="top" style={{maxWidth: '66%'}} src={"https://via.placeholder.com/150"} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Card.Text>
          {date}
        </Card.Text>
        <Card.Text>
            {location}
        </Card.Text>
        <Button variant="primary">{user_type === "volunteer" ? "Sign Up" : "Thank"}</Button>
      </Card.Body>
    </Card>
  );
}

export default EventCard;