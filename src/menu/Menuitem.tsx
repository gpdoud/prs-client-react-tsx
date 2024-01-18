
interface Props {
    display: string;
    route: string;
}
export default function Menuitem({ display, route }: Props) {
    return (
        <>
        <span className='menu'>
            <a href={route}>{display}</a>
        </span>
        </>
    );
}
