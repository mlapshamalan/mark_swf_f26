
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, FormGroup, Label, Input, Button, Container, Card, CardBody, Alert, Row, Col } from 'reactstrap';
import bgReservations from '../assets/images/bg-reservations.png';

const schema = yup.object().shape({
    name: yup.string().required('Full Name is required').max(20, 'Name must be 20 characters or fewer'),
    email: yup.string().required('Email address is required').email('Must be a valid email address'),
    partySize: yup.number().typeError('Party size is required').required('Party size is required').min(1).max(8),
    date: yup.string().required('Reservation date is required'),
    time: yup.string().required('Reservation time is required'),
    seating: yup.string().required('Please select a seating preference'),
    dietaryNotes: yup.string().max(30, 'Dietary notes must not exceed 30 characters'),
    newsletter: yup.boolean()
});

export default function ReservationsPage() {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        control,
        formState: { errors, isSubmitSuccessful }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            partySize: '',
            date: '',
            time: '',
            seating: 'Indoor Steam Parlor',
            dietaryNotes: '',
            newsletter: false
        }
    });

    const dietaryNotesValue = watch('dietaryNotes') || '';

    const onSubmit = (data) => {
        console.log('Reservation Submitted as JSON:', JSON.stringify(data, null, 2));
        reset();
    };

    return (
        <div
            className="flex-grow-1 d-flex flex-column"
            style={{
                background: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${bgReservations}) no-repeat center center fixed`,
                backgroundSize: 'cover'
            }}
        >
            <Container className="my-5 flex-grow-1">
                <Card className="form-section p-3 border-warning bg-dark text-light mx-auto shadow-lg" style={{ maxWidth: '800px' }}>
                    <CardBody>
                        <h1 className="text-warning mb-3 h2 page-heading">Table Dispatch Request</h1>

                        {isSubmitSuccessful && (
                            <Alert color="success">
                                Dispatch Confirmed! Check developer console to view transmitted JSON.
                            </Alert>
                        )}

                        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <FormGroup className="mb-3">
                                <Label htmlFor="name"><i className="fa-solid fa-user text-warning me-1"></i> Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    className="bg-dark text-light border-warning"
                                    invalid={!!errors.name}
                                    {...register('name')}
                                />
                                {errors.name && <div className="text-danger small mt-1">{errors.name.message}</div>}
                            </FormGroup>

                            <FormGroup className="mb-3">
                                <Label htmlFor="email"><i className="fa-solid fa-envelope text-warning me-1"></i> Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    className="bg-dark text-light border-warning"
                                    invalid={!!errors.email}
                                    {...register('email')}
                                />
                                {errors.email && <div className="text-danger small mt-1">{errors.email.message}</div>}
                            </FormGroup>

                            <Row className="g-3 mb-3">
                                <Col md={4}>
                                    <FormGroup>
                                        <Label htmlFor="partySize"><i className="fa-solid fa-users text-warning me-1"></i> Party Size</Label>
                                        <Input
                                            id="partySize"
                                            type="select"
                                            className="bg-dark text-light border-warning"
                                            invalid={!!errors.partySize}
                                            {...register('partySize')}
                                        >
                                            <option value="">Select size...</option>
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                                <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                                            ))}
                                        </Input>
                                        {errors.partySize && <div className="text-danger small mt-1">{errors.partySize.message}</div>}
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label htmlFor="date"><i className="fa-solid fa-calendar text-warning me-1"></i> Date</Label>
                                        <Input
                                            id="date"
                                            type="date"
                                            className="bg-dark text-light border-warning"
                                            invalid={!!errors.date}
                                            {...register('date')}
                                        />
                                        {errors.date && <div className="text-danger small mt-1">{errors.date.message}</div>}
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label htmlFor="time"><i className="fa-solid fa-clock text-warning me-1"></i> Time</Label>
                                        <Input
                                            id="time"
                                            type="time"
                                            className="bg-dark text-light border-warning"
                                            invalid={!!errors.time}
                                            {...register('time')}
                                        />
                                        {errors.time && <div className="text-danger small mt-1">{errors.time.message}</div>}
                                    </FormGroup>
                                </Col>
                            </Row>

                            <fieldset className="mb-3 p-3 border border-warning rounded">
                                <legend className="float-none w-auto px-2 fs-6 fw-bold text-warning">Seating Preference</legend>
                                {['Indoor Steam Parlor', 'Airship Deck', 'Courier Bar'].map((seat) => (
                                    <FormGroup check inline key={seat}>
                                        <Controller
                                            name="seating"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    type="radio"
                                                    {...field}
                                                    value={seat}
                                                    checked={field.value === seat}
                                                />
                                            )}
                                        />
                                        <Label check>{seat}</Label>
                                    </FormGroup>
                                ))}
                                {errors.seating && <div className="text-danger small mt-1">{errors.seating.message}</div>}
                            </fieldset>

                            <FormGroup className="mb-3">
                                <Label htmlFor="dietaryNotes" className="d-flex justify-content-between">
                                    <span>Dietary Notes (Optional)</span>
                                    <small>Remaining: <span className="text-warning fw-bold">{30 - dietaryNotesValue.length}</span></small>
                                </Label>
                                <Input
                                    id="dietaryNotes"
                                    type="text"
                                    maxLength="30"
                                    className="bg-dark text-light border-warning"
                                    invalid={!!errors.dietaryNotes}
                                    {...register('dietaryNotes')}
                                />
                                {errors.dietaryNotes && <div className="text-danger small mt-1">{errors.dietaryNotes.message}</div>}
                            </FormGroup>

                            <FormGroup check className="mb-4">
                                <Input
                                    id="newsletter"
                                    type="checkbox"
                                    {...register('newsletter')}
                                />
                                <Label check htmlFor="newsletter">Dispatch weekly steam-courier menu updates</Label>
                            </FormGroup>

                            <div className="d-flex gap-3">
                                <Button type="submit" color="warning" className="text-dark fw-bold">
                                    Transmit Request
                                </Button>
                                <Button type="button" outline color="secondary" className="text-light" onClick={() => reset()}>
                                    Reset Form
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Container>
        </div>
    );
}