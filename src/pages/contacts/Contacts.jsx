import './Contacts.scss';
// import mailLogo from '../../assets/image/icon/gmail.png';
// import githubLogo from '../../assets/image/icon/gitHub.png';
// import skypeLogo from '../../assets/image/icon/skype.png';

const Contacts = () => {
  return (
    <div className="contacts">
      <div className="contact__my-contact">
        <p>My contact: click link to bottom &darr;</p>
        <p>Связь со мной: нажмите на ссылку внизу &darr;</p>
        <div className="contact__my-contact-link">
          <div className="contact__my-contact-mail my-contact">
            <b>Mail:</b>{' '}
            <a
              className="my-contact__link"
              href="https://mail.google.com/mail/u/1/?view=cm&fs=1&to=web.egorovm@gmail.com&tf=1"
              target="_blank"
              rel="noreferrer">
              <div className="contact__icon icon-wrp">
                {/* <img className="contact__icon img" src={mailLogo} alt="mail" /> */}
              </div>
              <span>web.egorovm@gmail.com</span>
            </a>
          </div>
          <div className="contact__my-contact-git-hub my-contact">
            <b>GitHub:</b>{' '}
            <a
              className="my-contact__link"
              href="https://github.com/SeddiMK"
              target="_blank"
              rel="noreferrer">
              <div className="contact__icon icon-wrp">
                {/* <img
                  className="contact__icon img"
                  src={githubLogo}
                  alt="gitHub"
                /> */}
              </div>
              <span>SeddiMK</span>
            </a>
          </div>
          <div className="contact__my-contact-skype my-contact">
            <b>Skype:</b>{' '}
            <a
              className="my-contact__link"
              href="skype:live:.cid.985f030235657018?add"
              target="_blank"
              rel="noreferrer">
              <div className="contact__icon icon-wrp">
                {/* <img
                  className="contact__icon img"
                  src={skypeLogo}
                  alt="gitHub"
                /> */}
              </div>
              <span>Maksim Egorov</span>
            </a>
          </div>
          <div className="contact__my-contact-link-project my-contact">
            <b>Link to project from github:</b>{' '}
            <a
              className="my-contact__link"
              href="https://github.com/SeddiMK"
              target="_blank"
              rel="noreferrer">
              <div className="contact__icon icon-wrp">
                <i className="contact__icon img fa fa-link fa-2x"></i>
              </div>
              <span>React-cart_shop_redux</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
