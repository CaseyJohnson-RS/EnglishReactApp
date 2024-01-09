function Header(props)
{
  const {underLogoText, buttonText, buttonEvent, logoEvent} = props;

  return (
    <nav className="nav-extended grey darken-2">
      <div className="nav-wrapper">
        <span className="brand-logo">
            <a href="#!" onClick={logoEvent} >
                <i className="material-icons">book</i>
                English App
            </a> 
            <sub style={{fontSize : "50%"}}> {underLogoText}</sub>
        </span>
        <div className="right">
          <button 
            className="waves-effect waves-light btn light-blue darken-2"
            onClick={buttonEvent}>
                {buttonText}
          </button>
        </div>
      </div>
    </nav>
  )
}

export {Header}