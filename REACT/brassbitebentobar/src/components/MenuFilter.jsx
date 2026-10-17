import { FormGroup, Label, Input } from 'reactstrap';

export default function MenuFilter({ selectedCategory, onSelectCategory }) {
    return (
        <FormGroup className="mb-4 text-center mx-auto" style={{ maxWidth: '300px' }}>
            <Label htmlFor="categoryFilter" className="fw-bold text-warning fs-5">
                Filter by Category:
            </Label>
            <Input
                type="select"
                id="categoryFilter"
                value={selectedCategory}
                onChange={(e) => onSelectCategory(e.target.value)}
                className="bg-dark text-light border-warning text-center"
            >
                <option value="All">All Categories</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
            </Input>
        </FormGroup>
    );
}