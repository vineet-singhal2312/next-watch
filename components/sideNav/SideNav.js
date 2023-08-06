import { IoHome } from 'react-icons/io5';
import { FaHistory } from 'react-icons/fa';
import { RiPlayList2Line } from 'react-icons/ri';
import { MdWatchLater } from 'react-icons/md';
import { FaThumbsUp } from 'react-icons/fa';
// import { Link } from "react-router-dom";
import { useReduce } from '../../providers/useReducerProvider';
import Link from 'next/link';

export const SideNav = () => {
	const { setIsSideNav } = useReduce();

	const closeSideNav = () => {
		document.getElementById('sideNav').style.width = '0%';
		setIsSideNav(false);
	};
	return (
		<>
			<nav className="side-nav" id="sideNav">
				<Link className="link side-nav-item1" href="/">
					<IoHome className="side-nav-icon" onClick={() => closeSideNav()} />
				</Link>
				<Link className="link side-nav-item2" href="/history">
					<FaHistory className="side-nav-icon" />
				</Link>
				<Link className="link side-nav-item3" href="/playlist">
					{' '}
					<RiPlayList2Line className="side-nav-icon" />
				</Link>
				<Link className="link side-nav-item4" href="/later">
					<MdWatchLater className="side-nav-icon" />
				</Link>{' '}
				<Link className="link side-nav-item5" href="/liked">
					<FaThumbsUp className="side-nav-icon" />
				</Link>
			</nav>
		</>
	);
};
