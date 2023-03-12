import { Link, useLocation } from "react-router-dom";

export const PageNotFound = () => {
    const location = useLocation().pathname

    return (
        <div className="page-not-found">
            <div>page {location} is not found</div>
            <Link to="/">GO BACK</Link>
        </div>
    )
}