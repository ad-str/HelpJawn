import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface EventCardProps {
    title: string;
    description: string;
    date: string;
    location: string;
    imageLink: string;
};

export const EventCard: React.FC<EventCardProps> = ({ title, description, date, location, imageLink }) => {
  return (
    <Card className='mx-auto'>
      <Card.Img className='mx-auto' variant="top" style={{maxWidth: '66%'}} src={imageLink} />
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
        <Button variant="primary">Sign Up</Button>
      </Card.Body>
    </Card>
  );
}

export default EventCard;