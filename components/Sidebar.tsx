import { useState } from 'react';
import { FaChevronUp, FaChevronDown, FaUserCircle, FaWrench, FaRegFileAlt, FaCog } from 'react-icons/fa';
import { BsGrid3X3 } from "react-icons/bs";
import { Button } from 'primereact/button';
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Logo from '../public/images/main_logo.svg'
import iconLogo from '../public/images/icon-logo.svg'
import switcher from '../public/images/sidemenu-switcher.svg'

import ActiveLink from './ActiveLink'

import styles from './DashboardLayout.module.scss'

const Sidebar = () => {
    const router = useRouter();
    const [wideNav, setWideNav] = useState(true);
    const [dropDown, setDropDown] = useState(false);

    let sidebarClass = styles.sidebar;
    if (!wideNav) {
        sidebarClass = styles.sidebar + ' ' + styles.narrowSide;
    }


    return (
        <aside className={sidebarClass}>
            <div className={styles.logo}>
                <Link href="/" >
                    <a className={styles.logoBtn}>
                        {wideNav ?
                            <Image
                                src={Logo}
                                alt="Dataplus"
                                width={117}
                                height={29}
                            />
                            :
                            <Image
                                src={iconLogo}
                                alt="Dataplus"
                                width={30}
                                height={30}
                            />
                        }
                    </a>
                </Link>
            </div>
            <ul className='p-mt-2'>
                <li>
                    <ActiveLink activeClassName={styles.active} href="/">
                        <a className={styles.navLink}>
                            <FaUserCircle />
                            <span>My Contacts</span>
                        </a>
                    </ActiveLink>
                </li>
                <li>
                    <ActiveLink activeClassName={styles.active} href="/tools/csv-compare">
                        <a className={styles.navLink}>
                            <FaWrench />
                            <span>Tools</span>
                        </a>
                    </ActiveLink>
                </li>
                <li>
                    <ActiveLink activeClassName={styles.active} href="/report">
                        <a className={styles.navLink}>
                            <FaRegFileAlt />
                            <span>Report</span>
                        </a>
                    </ActiveLink>
                </li>
                <li className={styles.dropDown}>
                    <a className={styles.navLink} onClick={() => setDropDown(!dropDown)}>
                        <FaCog />
                        <span>Your account</span>
                        <button className={styles.dropDownBtn}>
                            {
                                dropDown ? <FaChevronUp /> : <FaChevronDown />
                            }
                        </button>
                    </a>
                    {
                        dropDown ?
                            <ul>
                                <li>
                                    <ActiveLink activeClassName={styles.active} href="/profile/account">
                                        <a className={styles.navLink}>
                                            <span>Your account</span>
                                        </a>
                                    </ActiveLink>
                                </li>
                                <li>
                                    <ActiveLink activeClassName={styles.active} href="/profile/login">
                                        <a className={styles.navLink}>
                                            <span>Login & Security</span>
                                        </a>
                                    </ActiveLink>
                                </li>
                                <li>
                                    <ActiveLink activeClassName={styles.active} href="/profile/billing">
                                        <a className={styles.navLink}>
                                            <span>Billing Information</span>
                                        </a>
                                    </ActiveLink>
                                </li>
                                <li>
                                    <ActiveLink activeClassName={styles.active} href="/profile/team">
                                        <a className={styles.navLink}>
                                            <span>Manage Team</span>
                                        </a>
                                    </ActiveLink>
                                </li>
                            </ul>
                            :
                            ""
                    }
                </li>
            </ul>
            {
                wideNav ?
                    <Button onClick={() => setWideNav(false)} className={styles.sideToggle}>
                        <Image
                            src={switcher}
                            alt="Dataplus"
                            width={14}
                            height={66}
                        />
                    </Button>
                    :
                    <Button onClick={() => setWideNav(true)} className={styles.sideToggle}>
                        <Image
                            src={switcher}
                            alt="Dataplus"
                            width={14}
                            height={66}
                        />
                    </Button>
            }
        </aside>
    )
}

export default Sidebar