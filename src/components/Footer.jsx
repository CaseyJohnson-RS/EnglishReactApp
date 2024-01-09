function Footer(props)
{
    let currentYear = new Date().getFullYear();

    return (<footer className="page-footer grey darken-3">
    <div className="container">
      <div className="row">
        <div className="col l6 s12">
          <h5 className="white-text">Created by Octa</h5>
          <p className="grey-text text-lighten-4">
            This is a small creative project that our team decided to try to implement in order to get acquainted with web programming.
            </p>
        </div>
        <div className="col l4 offset-l2 s12">
          <h5 className="white-text">Github Links</h5>
          <ul>
            <li><a className="grey-text text-lighten-3" href="https://github.com/Racoon11">Racoon11</a></li>
            <li><a className="grey-text text-lighten-3" href="https://github.com/CaseyJohnson-RS">CaseyJohnson-RS</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-copyright grey darken-4">
      <div className="container">
      Copyright © {currentYear} Octa 
      <a className="grey-text text-lighten-4 right" href="#!">Here should be project code link...</a>
      </div>
    </div>
  </footer>)

}

export {Footer}