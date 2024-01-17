import './Header.css';

interface Props {
    pageTitle: string;
}

export default function Header({ pageTitle }:  Props) {

    return (
        <>
        <div>
            <span className="page-title">{pageTitle}</span>
        </div>
        </>
    );
}