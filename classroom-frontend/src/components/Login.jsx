import { useState, useEffect } from "react";
import {
  Lock,
  Mail,
  Key,
  ChevronLeft,
  ChevronRight,
  LogIn,
  EyeOff,
  Eye,
} from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EnhancedLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [fadeIn, setFadeIn] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    {
      url: "src/assets/pexels-max-fischer-5212345.jpg",
      title: "SMART CLASS",
      description: "Where teaching and learning come together.",
    },
    {
      url: "src/assets/pexels-julia-m-cameron-4145354.jpg",
      title: "Empowering Education",
      description:
        "A New Era of Learning Begins Here.",
    },
    {
      url: "src/assets/pexels-buro-millennial-636760-1438081.jpg",
      title: "24/7 Access",
      description:
        "Your Digital Classroom, Anytime, Anywhere..",
    },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const data = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/authenticate",
        data
      );

      if (response.data.status === 200) {
        const { role, token, email } = response.data.data;
        localStorage.setItem("email", email);
        localStorage.setItem("token", token);

        Swal.fire({
          title: "Login Successful",
          text: `Welcome, ${role}`,
          icon: "success",
          timer: 2000,
          // confirmButtonText: "Continue",
        })
          if (role === "ADMIN") {
            navigate("/indexclass");
          } else if (role === "TEACHER") {
            navigate("/teacherindexclass");
          } else if (role === "STUDENT") {
            navigate("/studentindexclass");
          }
        
      } else if (response.status === 401) {
        setError("Invalid email or password.");
        Swal.fire({
          title: "Login Failed",
          text: "Invalid email or password.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (err) {
      setError("Invalid email or password.");
      Swal.fire({
        title: "Login Failed",
        text: "Invalid email or password.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div
      className={`w-screen h-screen flex flex-col lg:flex-row overflow-hidden transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-indigo-900 z-0"></div>

      <div className="relative z-10 flex flex-1 h-full">
        <div className="hidden lg:block lg:w-3/5 h-full relative overflow-hidden">
          <div className="absolute inset-0">
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${image.url})`,
                    backgroundBlendMode: "overlay",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent"></div>
                <div className="relative h-full flex items-center justify-start pl-8 md:pl-16 pr-4 md:pr-8">
                  <div className="max-w-md md:max-w-lg">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
                      {image.title}
                    </h1>
                    <p className="text-white/90 text-sm md:text-xl">
                      {image.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-8 md:bottom-16 left-8 md:left-16 z-10 flex items-center space-x-2 md:space-x-3">
            <button
              onClick={prevSlide}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            </button>

            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white scale-110 md:scale-125"
                    : "bg-white/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}

            <button
              onClick={nextSlide}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>
        </div>

        <div className="w-full lg:w-2/5 h-full flex items-center justify-center px-4 sm:px-6">
          <div className="w-full max-w-sm sm:max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-1 sm:p-4 md:p-6 border border-white/20">
            <div className="text-center mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <img
                  src="src/assets/img/classlogo.png"
                  alt="logo"
                  className="h-10 w-10"
                />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                SIGN IN
              </h2>
              <p className="text-white/70 mt-1 sm:mt-2">
                welcome back to smart class
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 sm:space-y-4">
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white/80"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white/80"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-white/50" />
                    ) : (
                      <Eye className="h-5 w-5 text-white/50" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-white text-sm">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-white/30 rounded bg-white/10"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-white/80"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-indigo-300 hover:text-indigo-200 transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-2 sm:py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <LogIn className="h-5 w-5 mr-2" />
                )}
                {isLoading ? "Signing in..." : "Sign in"}
              </button>

              <div className="text-white text-center">OR signin with</div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="relative w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white/70 text-sm font-medium text-black hover:bg-white transition-colors group"
                >
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ">
                    LinkedIn
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="40"
                    height="40"
                    viewBox="0 0 42 42"
                  >
                    <path
                      fill="#0288D1"
                      d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                    ></path>
                    <path
                      fill="#FFF"
                      d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                    ></path>
                  </svg>
                </button>

                <button
                  type="button"
                  className="relative w-full inline-flex justify-center py-2 px-4 border border-white/20 rounded-lg shadow-sm bg-white/70 text-sm font-medium text-white hover:bg-white transition-colors group"
                >
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ">
                    Github
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="40"
                    height="40"
                    viewBox="0 0 50 50"
                  >
                    <path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"></path>
                  </svg>
                </button>
                <button
                  type="button"
                  className="relative w-full inline-flex justify-center py-2 px-4 border border-white/20 rounded-lg shadow-sm bg-white/70 text-sm font-medium text-white hover:bg-white transition-colors group"
                >
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Google
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
