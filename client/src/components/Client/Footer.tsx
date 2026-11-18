import React from 'react';
import {Link} from 'react-router-dom';
import { RoutesEnum } from '../../routsEnum';

function Footer() {

    const year = new Date().getFullYear();

  return (
    <footer className='footer'>
        <section className='bottom'>
            <span>Copyright <Link to={RoutesEnum.LOGIN_URL} className='link' > &copy; </Link> </span>
            <span>{year}</span>
        </section>
    </footer>
  )
}

export default Footer