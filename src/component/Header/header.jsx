import React from 'react';
import '../../css Folder/styletopnav.css';
import '../../css Folder/phonenav.css'
import MainLine from "./mainLine";
import LeftNavBar from '../../apartments/leftNavBar';
import {headerData} from '../../apartments/data-app/headerData'
import {Link} from "react-router-dom";

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = { isOpen: true };
        }
    handelClick = () => {
        this.setState({isOpen : !this.state.isOpen});
        if (this.state.isOpen){
                 document.getElementById("header").style.position = 'fixed'
        } else {
                document.getElementById("header").style.position = 'relative'
        }

    };
    render() {
        // const handle = document.getElementsByClassName('navbar-collapse collapse show');
        if (!this.state.isOpen){
            document.getElementById('navbarNav').onclick = function() {
               document.getElementById('header-button').click()
            };
        }
        return (
            <div id={'wraper'}>
                <nav className={'header navbar navbar-expand-lg navbar-light'} id={'header'}>
                    <button id={'header-button'} className="navbar-toggler burger-button" type="button" onClick={this.handelClick} data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="flex">
                        <div id="logo" className="navbar-brand ">
                            <Link to={'/'}><img src="../images/logo.png" width="150px" alt={''}/></Link>
                        </div>
                        <div id="navbarNav" className="collapse navbar-collapse">
                            <ul className={"navigation navbar-nav order-lg-3 navbar-items"}>
                                {headerData.map((item,i) => {
                                return (
                                    <MainLine {...item} index={i} key={i} />
                                )
                                })}
                            </ul>
                        </div>
                        <LeftNavBar/>
                    </div>
                </nav>
            </div>
        )
    }
}


export default Header;