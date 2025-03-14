import google from '../../assets/img/google.svg'
import apple from '../../assets/img/apple.svg'


const SocialLogin = () => {
    return (
      <div className="social-login">
        <button className="social-button">
          <img src={google} alt="Google" className="social-icon" />
          Google
        </button>
        <button className="social-button">
          <img src={apple}alt="Apple" className="social-icon" />
          Apple
        </button>
      </div>
    )
  }
  export default SocialLogin;