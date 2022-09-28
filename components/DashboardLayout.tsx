import { useState, useRef, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { Dialog } from 'primereact/dialog';
import { BsEnvelope, BsGraphUp, BsPlusCircle } from 'react-icons/bs';
import { BiCode } from 'react-icons/bi';
import { FaRegUserCircle } from 'react-icons/fa';
import { FiAward } from 'react-icons/fi';
import { GrLocation } from 'react-icons/gr';
import { MdLogout } from 'react-icons/md';
import { ProgressBar } from 'primereact/progressbar';
import Header from './Header'
import Sidebar from './Sidebar'
import styles from './DashboardLayout.module.scss'
import layoutStyles from '../styles/Home.module.scss';
import "react-toastify/dist/ReactToastify.css";

const DashboardLayout = (props: any) => {
    const wrapperRef = useRef<HTMLHeadingElement>(null);
    const userRef = useRef<HTMLHeadingElement>(null);
    const [profileModal, setProfileModal] = useState(false);
    const [emailVariValue, setEmailVariValue] = useState(15);
    const [addressVariValue, setAddressVariValue] = useState(50);

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (event) {
                if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                    if (userRef.current && userRef.current.contains(event.target)) {
                        setProfileModal(true);
                    } else {
                        setProfileModal(false);
                    }
                }
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <div>
            <Head>
                <link rel="shortcut icon" href="/images/icon-logo.svg" />
                <title>Dataplus</title>
            </Head>


            <div className={"p-d-flex " + styles.wrapper}>
                {
                    props.sidebar ? <Sidebar /> : null
                }
                <div className={styles.right}>
                    <Header profile={setProfileModal} userRef={userRef} />

                    <main className={styles.main}>
                        {props.children}
                    </main>

                </div>
            </div>

            {/* profile-Modal */}
            <div>
                <Dialog showHeader={false} dismissableMask={true} modal={false} className={styles.profileCustomStyles} maskClassName={styles.profileDialogMask} position={'right'} visible={profileModal} style={{ width: '320px', borderRadius: "8px", overflow: "hidden" }} onHide={() => ''}>
                    <div className={styles.profileModal} ref={wrapperRef}>
                        <div className={styles.topBox}>
                            <div className={styles.progressBox}>
                                <h5><BsEnvelope />Email verification</h5>
                                <div className={styles.progress}>
                                    <ProgressBar className={styles.line} value={emailVariValue} showValue={false} style={{ height: "10px", borderRadius: "20px" }}></ProgressBar>
                                    <span>{emailVariValue}%</span>
                                </div>
                            </div>
                            <div className={styles.progressBox}>
                                <h5><GrLocation />Address verification</h5>
                                <div className={styles.progress}>
                                    <ProgressBar className={styles.line} value={addressVariValue} showValue={false} style={{ height: "10px", borderRadius: "20px" }}></ProgressBar>
                                    <span>{addressVariValue}%</span>
                                </div>
                            </div>
                            <button className={layoutStyles.blueBtnOnly + " p-mt-3 p-mx-auto"}>Show More</button>
                            <button className={styles.upgradeBtn}>Upgrade Plan</button>
                        </div>
                        <div className={styles.navLinks}>
                            <ul>
                                <li>
                                    <Link href={"/#"}>
                                        <a>
                                            <FaRegUserCircle />
                                            Account
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/#"}>
                                        <a>
                                            <FiAward />
                                            Subscription
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/#"}>
                                        <a>
                                            <BsGraphUp />
                                            Usage
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/#"}>
                                        <a>
                                            <BsPlusCircle />
                                            Add-ons
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/#"}>
                                        <a>
                                            <BiCode />
                                            API
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/#"}>
                                        <a>
                                            <MdLogout />
                                            Log Out
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
    )
}

export default DashboardLayout
