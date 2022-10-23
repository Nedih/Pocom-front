import './Navbar.css';

function Navbar() {
  return (
    <div className="Navbar">
      <ul>
        <li><a class="active" href="#home">Feed</a></li>
        <li><a href="#news">Profile</a></li>
        <li><a href="#contact">Sign Up</a></li>
      </ul>
    </div>
  );
}

export default Navbar;
