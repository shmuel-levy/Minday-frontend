import { Link } from 'react-router-dom'

export function CarPreview({ car }) {
    return (
        <article className="preview">
            <header>
                <Link to={`/car/${car._id}`}>{car.vendor}</Link>
            </header>

            <p>Speed: <span>{car.speed.toLocaleString()} Km/h</span></p>
            {car.owner && <p>Owner: <Link to={`/user/${car.owner._id}`}>{car.owner.fullname}</Link></p>}

        </article>
    )
}