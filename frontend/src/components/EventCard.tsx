import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './EventCard.css';  // Import a CSS file for custom styling

interface EventCardProps {
    title: string;
    description: string;
    date: string;
    start_time: string;
    end_time: string;
    location: string;
    user_type: string;
    image: string;
    show: () => void;
    setSelectedEvent: (id: number) => void;
    id: number;
};

export const EventCard: React.FC<EventCardProps> = ({ title, description, date, start_time, end_time,  location, user_type, show, id, setSelectedEvent, image }) => {
  
  // Combine date and time into full date-time strings
  const startDateTime = new Date(`${date} ${start_time}`);
  const endDateTime = new Date(`${date} ${end_time}`);

  // Format the time as "2:00 pm"
  const formattedStartTime = startDateTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  const formattedEndTime = endDateTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  
  
  return (
    <Card className='event-card mx-auto h-100'>  {/* 'h-100' ensures the card takes full height */}
      <Card.Img variant="top" className='event-card-img' src={image} alt={title} />
      <Card.Body className='d-flex flex-column'>  {/* Flexbox for column alignment */}
          <Card.Title>{title}</Card.Title>
          <Card.Text className='truncate'>{description}</Card.Text>
          <Card.Text className='event-timing'>
              <strong>When:</strong> {date} {formattedStartTime} - {formattedEndTime}
          </Card.Text>
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
