import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface EventCardProps {
    title: string;
    description: string;
    date: string;
    location: string;
    user_type: string;
    show: () => void;
    setSelectedEvent: (id: number) => void;
    id: number
};

export const EventCard: React.FC<EventCardProps> = ({ title, description, date, location, user_type, show, id, setSelectedEvent }) => {
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
        <Button onClick={() => {
            show();
            setSelectedEvent(id);
        }} variant="primary">{user_type === "volunteer" ? "Sign Up" : "Thank"}</Button>
      </Card.Body>
    </Card>
  );
}

export default EventCard;