import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getAccommodations,
  getAccommodationById,
  createAccommodation,
  updateAccommodation,
  deleteAccommodation,
  createReservation,
  getReservations,
  deleteReservation,
} from "./services/api";

const sampleListings = [
  {
    id: 1,
    title: "Private Room in Johannesburg",
    location: "Johannesburg",
    type: "Private room",
    guests: 1,
    bedrooms: 1,
    bathrooms: 1,
    price: 650,
    rating: 4.5,
    reviews: 96,
    host: "Lerato",
    description:
      "A neat and affordable private room in Johannesburg, ideal for one guest travelling for work or a short city stay.",
    amenities: ["Wi-Fi", "Workspace", "Secure parking", "Shared kitchen"],
    image:
      "https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    id: 2,
    title: "Cosy Studio in Cape Town",
    location: "Cape Town",
    type: "Entire studio",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    price: 950,
    rating: 4.7,
    reviews: 142,
    host: "Mia",
    description:
      "A cosy studio apartment in Cape Town, perfect for a couple or solo traveller wanting a comfortable city stay.",
    amenities: ["Wi-Fi", "Kitchenette", "Free parking", "Balcony"],
    image:
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    id: 3,
    title: "Sea View Apartment in Cape Town",
    location: "Cape Town",
    type: "Entire apartment",
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    price: 1650,
    rating: 4.8,
    reviews: 210,
    host: "Daniel",
    description:
      "A bright sea view apartment close to Cape Town’s beaches, restaurants and main tourist attractions.",
    amenities: ["Wi-Fi", "Ocean view", "Kitchen", "Free parking", "Washing machine"],
    image:
      "https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    id: 4,
    title: "Beachfront Family Apartment in Durban",
    location: "Durban",
    type: "Entire beach apartment",
    guests: 5,
    bedrooms: 2,
    bathrooms: 2,
    price: 1350,
    rating: 4.6,
    reviews: 165,
    host: "Thabo",
    description:
      "A relaxed beachfront apartment in Durban, ideal for families wanting warm weather and easy beach access.",
    amenities: ["Wi-Fi", "Beach access", "Kitchen", "Free parking", "Family friendly"],
    image:
      "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    id: 5,
    title: "Modern Apartment in New York",
    location: "New York",
    type: "Entire apartment",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    price: 2400,
    rating: 4.8,
    reviews: 320,
    host: "Johann",
    description:
      "A modern New York apartment for two guests, close to restaurants, shops and busy city attractions.",
    amenities: ["Wi-Fi", "Kitchen", "Lift access", "Air conditioning", "Workspace"],
    image:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    id: 6,
    title: "Family Apartment in New York",
    location: "New York",
    type: "Entire apartment",
    guests: 5,
    bedrooms: 3,
    bathrooms: 2,
    price: 4200,
    rating: 4.9,
    reviews: 188,
    host: "Emily",
    description:
      "A spacious New York family apartment with enough space for five guests and easy access to the city.",
    amenities: ["Wi-Fi", "Kitchen", "Washing machine", "Air conditioning", "Family friendly"],
    image:
      "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    id: 7,
    title: "Elegant Studio in Paris",
    location: "Paris",
    type: "Entire studio",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    price: 2100,
    rating: 4.9,
    reviews: 275,
    host: "Claire",
    description:
      "A romantic Paris studio with elegant finishes, perfect for two guests exploring cafés, museums and city streets.",
    amenities: ["Wi-Fi", "Kitchenette", "Heating", "City view", "Coffee machine"],
    image:
      "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    id: 8,
    title: "Classic Townhouse Room in London",
    location: "London",
    type: "Private room",
    guests: 1,
    bedrooms: 1,
    bathrooms: 1,
    price: 1800,
    rating: 4.6,
    reviews: 154,
    host: "Oliver",
    description:
      "A private room in a classic London townhouse, suitable for one guest wanting a comfortable city base.",
    amenities: ["Wi-Fi", "Heating", "Shared kitchen", "Washer"],
    image:
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    id: 9,
    title: "Tropical Villa in Bali",
    location: "Bali",
    type: "Private villa",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    price: 1700,
    rating: 4.9,
    reviews: 310,
    host: "Ayu",
    description:
      "A peaceful tropical villa in Bali with a private pool and garden, perfect for a relaxing holiday.",
    amenities: ["Wi-Fi", "Private pool", "Kitchen", "Garden", "Air conditioning"],
    image:
      "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    id: 10,
    title: "Luxury Cliff Villa in Santorini",
    location: "Santorini",
    type: "Luxury villa",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    price: 3900,
    rating: 5.0,
    reviews: 190,
    host: "Nikos",
    description:
      "A luxury Santorini villa for two guests with bright white finishes, sea views and a peaceful island atmosphere.",
    amenities: ["Wi-Fi", "Sea view", "Private terrace", "Breakfast included", "Air conditioning"],
    image:
      "https://images.pexels.com/photos/261395/pexels-photo-261395.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
];

function normaliseListing(listing) {
  return {
    ...listing,
    id: listing._id || listing.id,
  };
}

function getAllListings() {
  return sampleListings.map(normaliseListing);
}

function formatListingDetails(listing) {
  return `${listing.guests} ${listing.guests === 1 ? "guest" : "guests"} · ${
    listing.bedrooms
  } ${listing.bedrooms === 1 ? "bedroom" : "bedrooms"} · ${listing.bathrooms} ${
    listing.bathrooms === 1 ? "bathroom" : "bathrooms"
  }`;
}

function getGalleryImages(listing) {
  const galleryImages = {
    Johannesburg: [
      listing.image,
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=900",
    ],
    "Cape Town": [
      listing.image,
      "https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=900",
    ],
    Durban: [
      listing.image,
      "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=900",
    ],
    "New York": [
      listing.image,
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=900",
    ],
    Paris: [
      listing.image,
      "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=900",
    ],
    London: [
      listing.image,
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=900",
    ],
    Bali: [
      listing.image,
      "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/5997993/pexels-photo-5997993.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/261395/pexels-photo-261395.jpeg?auto=compress&cs=tinysrgb&w=900",
    ],
    Santorini: [
      listing.image,
      "https://images.pexels.com/photos/261395/pexels-photo-261395.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=900",
    ],
  };

  return (
    galleryImages[listing.location] || [
      listing.image,
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=900",
    ]
  );
}

function ListingImage({ listing, className = "", src }) {
  return (
    <img
      src={src || listing.image}
      alt={listing.title}
      className={className}
      onError={(event) => {
        event.currentTarget.src =
          "https://placehold.co/900x600/f7f7f7/222?text=Property+Photo";
      }}
    />
  );
}

function Header() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const locations = [
    "Johannesburg",
    "Cape Town",
    "Durban",
    "New York",
    "Paris",
    "London",
    "Bali",
    "Santorini",
    "Pretoria",
  ];

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
  const username = localStorage.getItem("username") || "Guest User";

  function handleSearch(event) {
    const selectedLocation = event.target.value;

    if (selectedLocation) {
      navigate(`/locations/${encodeURIComponent(selectedLocation)}`);
    }
  }

 function handleLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("isAdminLoggedIn");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  setDropdownOpen(false);
  navigate("/");
}

  return (
    <header className="header airbnb-header">
      <Link to="/" className="logo airbnb-logo">
        <span className="logo-mark">⌂</span>
        <span>airbnb</span>
      </Link>

      <nav className="centre-nav">
        <Link to="/">Places to stay</Link>
        <button type="button">Experiences</button>
        <button type="button">Online Experiences</button>
      </nav>

      <div className="right-nav">
        {!isAdminLoggedIn && (
          <Link to="/admin/login" className="become-host">
            Become a host
          </Link>
        )}

        <select className="quick-location-filter" onChange={handleSearch} defaultValue="">
          <option value="" disabled>
            Search location
          </option>

          {locations.map((location) => (
            <option value={location} key={location}>
              {location}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="profile-box"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span>☰</span>
          <span className="profile-icon">👤</span>
        </button>

        {(isLoggedIn || isAdminLoggedIn) && <span className="username-text">Hello, {username}</span>}

        {dropdownOpen && (
          <div className="dropdown-menu profile-dropdown">
            {isLoggedIn || isAdminLoggedIn ? (
              <>
                {isAdminLoggedIn && (
                  <button type="button" onClick={() => navigate("/admin/dashboard")}>
                    Admin Dashboard
                  </button>
                )}

                <button type="button" onClick={() => navigate("/admin/reservations")}>
                  View Reservations
                </button>

                <button type="button" onClick={handleLogout}>
                  Log out
                </button>
              </>
            ) : (
                <>
  <button type="button" onClick={() => navigate("/login")}>
    User Login
  </button>

  <button type="button" onClick={() => navigate("/admin/login")}>
    Admin Login
  </button>

  <button type="button" onClick={() => navigate("/admin/login")}>
    Become a host
  </button>
</>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState("Cape Town");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [pets, setPets] = useState(0);
  const [guestMenuOpen, setGuestMenuOpen] = useState(false);

  useEffect(() => {
    async function loadListings() {
      try {
        const data = await getAccommodations();
        setListings(data.map(normaliseListing));
      } catch (error) {
        console.error("Could not load accommodations:", error);
        setListings(getAllListings());
      } finally {
        setLoading(false);
      }
    }

    loadListings();
  }, []);

  function handleHomeSearch(event) {
    event.preventDefault();
    navigate(`/locations/${encodeURIComponent(searchLocation)}`);
  }

  function updateCounter(value, setter, change) {
    const nextValue = value + change;

    if (nextValue >= 0) {
      setter(nextValue);
    }
  }

  if (loading) {
    return (
      <main>
        <section className="page-container">
          <h1>Loading stays...</h1>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="hero improved-hero">
        <form className="home-search-bar" onSubmit={handleHomeSearch}>
          <div>
            <label>Locations</label>
            <select
              value={searchLocation}
              onChange={(event) => setSearchLocation(event.target.value)}
            >
              <option>Johannesburg</option>
              <option>Cape Town</option>
              <option>Durban</option>
              <option>New York</option>
              <option>Paris</option>
              <option>London</option>
              <option>Bali</option>
              <option>Santorini</option>
              <option>Pretoria</option>
            </select>
          </div>

          <div>
            <label>Check-in date</label>
            <input
              type="date"
              value={checkIn}
              onChange={(event) => setCheckIn(event.target.value)}
            />
          </div>

          <div>
            <label>Checkout date</label>
            <input
              type="date"
              value={checkOut}
              onChange={(event) => setCheckOut(event.target.value)}
            />
          </div>

          <div className="guest-counter-box">
            <button
              type="button"
              className="guest-toggle-button"
              onClick={() => setGuestMenuOpen(!guestMenuOpen)}
            >
              <label>Guests</label>
              <p>
                {adults + children} {adults + children === 1 ? "guest" : "guests"}
              </p>
            </button>

            {guestMenuOpen && (
              <div className="guest-dropdown-static guest-dropdown-floating">
                <div className="counter-row">
                  <span>Adults</span>
                  <button type="button" onClick={() => updateCounter(adults, setAdults, -1)}>
                    -
                  </button>
                  <strong>{adults}</strong>
                  <button type="button" onClick={() => updateCounter(adults, setAdults, 1)}>
                    +
                  </button>
                </div>

                <div className="counter-row">
                  <span>Children</span>
                  <button type="button" onClick={() => updateCounter(children, setChildren, -1)}>
                    -
                  </button>
                  <strong>{children}</strong>
                  <button type="button" onClick={() => updateCounter(children, setChildren, 1)}>
                    +
                  </button>
                </div>

                <div className="counter-row">
                  <span>Pets</span>
                  <button type="button" onClick={() => updateCounter(pets, setPets, -1)}>
                    -
                  </button>
                  <strong>{pets}</strong>
                  <button type="button" onClick={() => updateCounter(pets, setPets, 1)}>
                    +
                  </button>
                </div>
              </div>
            )}
          </div>

          <button type="submit" className="search-circle-button">
            🔍
          </button>
        </form>

        <div className="hero-message">
          <h1>Not sure where to go? Perfect.</h1>
          <p>Find beautiful stays, compare prices and reserve your next getaway.</p>
        </div>
      </section>

      <section className="section">
        <h2>Inspiration for your next trip</h2>

        <div className="card-grid">
          {listings.slice(0, 6).map((listing) => (
            <Link to={`/accommodation/${listing.id}`} className="trip-card" key={listing.id}>
              <ListingImage listing={listing} />

              <div>
                <h3>{listing.location}</h3>
                <p>{listing.title}</p>
                <p className="card-rating">
                  ⭐ {listing.rating} · {listing.reviews} reviews
                </p>
                <strong>R{listing.price} / night</strong>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section two-column">
        <div className="feature-card dark-card">
          <h2>Things to do on your trip</h2>
          <p>Book local activities, tours and experiences near your stay.</p>
          <button>Experiences</button>
        </div>

        <div className="feature-card pink-card">
          <h2>Things to do from home</h2>
          <p>Join online cooking, art, travel and culture experiences.</p>
          <button>Online experiences</button>
        </div>
      </section>

      <section className="section shop-section">
        <div>
          <h2>Shop Airbnb gift cards</h2>
          <p>Give someone the gift of a future getaway.</p>
          <button>Learn more</button>
        </div>

        <div className="gift-box">🎁</div>
      </section>

      <section className="hosting-question-section">
        <div>
          <h2>Questions about hosting?</h2>
          <p>
            Learn how to manage properties, reservations and guests from your admin dashboard.
          </p>
          <Link to="/admin/login">Ask a Superhost</Link>
        </div>
      </section>

      <section className="future-getaways-section">
        <h2>Inspiration for future getaways</h2>

        <div className="future-tabs">
          <span className="active-tab">Destinations for arts & culture</span>
          <span>Outdoor adventures</span>
          <span>Beach destinations</span>
          <span>Mountain cabins</span>
          <span>Popular destinations</span>
        </div>

        <div className="future-grid">
          <div>
            <h4>Cape Town</h4>
            <p>South Africa</p>
          </div>
          <div>
            <h4>Johannesburg</h4>
            <p>South Africa</p>
          </div>
          <div>
            <h4>Durban</h4>
            <p>South Africa</p>
          </div>
          <div>
            <h4>New York</h4>
            <p>United States</p>
          </div>
          <div>
            <h4>Paris</h4>
            <p>France</p>
          </div>
          <div>
            <h4>London</h4>
            <p>England</p>
          </div>
          <div>
            <h4>Bali</h4>
            <p>Indonesia</p>
          </div>
          <div>
            <h4>Santorini</h4>
            <p>Greece</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function LocationPage() {
  const { location } = useParams();
  const locationName = decodeURIComponent(location || "Cape Town");

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [guestFilter, setGuestFilter] = useState(1);

  useEffect(() => {
    async function loadListings() {
      try {
        const data = await getAccommodations();
        setListings(data.map(normaliseListing));
      } catch (error) {
        console.error("Could not load accommodations:", error);
        setListings(getAllListings());
      } finally {
        setLoading(false);
      }
    }

    loadListings();
  }, []);

  const filteredListings = listings.filter((listing) => {
    const matchesLocation = listing.location.toLowerCase() === locationName.toLowerCase();
    const matchesPrice = listing.price >= Number(minPrice) && listing.price <= Number(maxPrice);
    const matchesGuests = listing.guests >= Number(guestFilter);

    return matchesLocation && matchesPrice && matchesGuests;
  });

  if (loading) {
    return (
      <main>
        <Header />
        <section className="page-container">
          <h1>Loading stays in {locationName}...</h1>
        </section>
      </main>
    );
  }

  return (
    <main>
      <Header />

      <section className="page-container">
        <p className="muted">{filteredListings.length} stay(s) available</p>
        <h1>Stays in {locationName}</h1>

        <div className="filter-bar">
          <div>
            <label>Minimum price</label>
            <input
              type="number"
              min="500"
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
            />
          </div>

          <div>
            <label>Maximum price</label>
            <input
              type="number"
              min="500"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
            />
          </div>

          <div>
            <label>Guests</label>
            <input
              type="number"
              min="1"
              value={guestFilter}
              onChange={(event) => setGuestFilter(event.target.value)}
            />
          </div>
        </div>

        <p className="results-count">
          {filteredListings.length} accommodation(s) available in {locationName}
        </p>

        <div className="listing-list">
          {filteredListings.length === 0 ? (
            <div className="empty-state">
              <h2>No listings found</h2>
              <p>Try changing the price range or number of guests.</p>
            </div>
          ) : (
            filteredListings.map((listing) => (
              <Link
                to={`/accommodation/${listing.id}`}
                className="listing-card listing-card-clickable"
                key={listing.id}
              >
                <div className="listing-image-wrap">
                  <ListingImage listing={listing} />
                  <span className="heart-icon">♡</span>
                </div>

                <div>
                  <div className="listing-top-row">
                    <p className="muted">{listing.type}</p>
                    <p className="rating-pill">⭐ {listing.rating}</p>
                  </div>

                  <h2>{listing.title}</h2>
                  <p>{listing.location}</p>
                  <p>{formatListingDetails(listing)}</p>
                  <p>{listing.amenities.join(" · ")}</p>
                  <p className="muted">⭐ {listing.rating} ({listing.reviews} reviews)</p>

                  <h3>
                    R{listing.price} <span>/ night</span>
                  </h3>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

function DetailsPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nights, setNights] = useState(7);
  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState("2026-06-19");
  const [checkOut, setCheckOut] = useState("2026-06-26");
  const [reservationMessage, setReservationMessage] = useState("");

  useEffect(() => {
    async function loadListing() {
      try {
        const data = await getAccommodationById(id);
        setListing(normaliseListing(data));
      } catch (error) {
        console.error("Could not load accommodation:", error);
        const fallbackListings = getAllListings();
        const fallbackListing =
          fallbackListings.find((item) => String(item.id) === String(id)) || fallbackListings[0];
        setListing(fallbackListing);
      } finally {
        setLoading(false);
      }
    }

    loadListing();
  }, [id]);

  if (loading) {
    return (
      <main>
        <Header />
        <section className="page-container">
          <h1>Loading accommodation...</h1>
        </section>
      </main>
    );
  }

  if (!listing) {
    return (
      <main>
        <Header />
        <section className="page-container">
          <h1>Accommodation not found</h1>
        </section>
      </main>
    );
  }

  const weeklyDiscount = listing.weeklyDiscount || (listing.price > 2000 ? 450 : 250);
  const cleaningFee = listing.cleaningFee || (listing.guests > 3 ? 500 : 300);
  const serviceFee = listing.serviceFee || Math.round(listing.price * 0.12);
  const taxes = listing.occupancyTaxes || Math.round(listing.price * 0.08);

  const subtotal = listing.price * nights;
  const total = subtotal - weeklyDiscount + cleaningFee + serviceFee + taxes;

  async function handleReservation() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      setReservationMessage("Please log in to make a reservation.");
      return;
    }

    if (guests > listing.guests) {
      setReservationMessage(
        `This listing only allows ${listing.guests} ${listing.guests === 1 ? "guest" : "guests"}.`
      );
      return;
    }

    try {
      await createReservation({
        guestName: localStorage.getItem("username") || "Demo Guest",
        accommodation: listing.id,
        checkIn,
        checkOut,
        guests,
        total,
      });

      setReservationMessage("Reservation created successfully!");
    } catch (error) {
      console.error("Could not create reservation:", error);
      setReservationMessage("Reservation could not be created. Please try again.");
    }
  }

  return (
    <main>
      <Header />

      <section className="page-container details-page">
        <div className="details-title-row">
          <div>
            <h1>{listing.type} in {listing.location}</h1>
            <p className="details-subheading">{listing.title}</p>
            <p>
              ⭐ {listing.rating} · {listing.reviews} reviews · {listing.location}
            </p>
          </div>

          <div className="share-save-row">
            <button type="button">↗ Share</button>
            <button type="button">♡ Save</button>
          </div>
        </div>

        <div className="image-gallery">
          {getGalleryImages(listing).map((image, index) => (
            <ListingImage
              key={`${listing.id}-${index}`}
              listing={listing}
              src={image}
              className={index === 0 ? "main-image" : ""}
            />
          ))}
        </div>

        <div className="details-layout">
          <section className="details-main-content">
            <div className="host-row enhanced-host-row">
              <div>
                <h2>
                  {listing.type} hosted by {listing.host}
                </h2>
                <p>{formatListingDetails(listing)}</p>
                <div className="host-badges">
                  <span>⭐ {listing.rating} rating</span>
                  <span>✓ Identity verified</span>
                  <span>🏅 Superhost</span>
                </div>
              </div>

              <div className="host-avatar">👤</div>
            </div>

            <hr />

            <div className="feature-list">
              <div>
                <span>🏠</span>
                <div>
                  <h3>Entire place or private stay</h3>
                  <p>You’ll have the space shown in the listing description.</p>
                </div>
              </div>

              <div>
                <span>🧼</span>
                <div>
                  <h3>Enhanced clean</h3>
                  <p>This host follows cleaning practices between stays.</p>
                </div>
              </div>

              <div>
                <span>🔑</span>
                <div>
                  <h3>Self check-in</h3>
                  <p>Check yourself in with a safe and simple arrival process.</p>
                </div>
              </div>

              <div>
                <span>📍</span>
                <div>
                  <h3>Great location</h3>
                  <p>Guests enjoy the area and nearby attractions.</p>
                </div>
              </div>
            </div>

            <hr />

            <h3>Description</h3>
            <p className="description-text">{listing.description}</p>

            <hr />

            <h3>Where you’ll sleep</h3>
            <div className="sleep-card">
              <div className="bed-icon">🛏️</div>
              <h4>Bedroom</h4>
              <p>
                {listing.bedrooms} {listing.bedrooms === 1 ? "bedroom" : "bedrooms"}, suitable
                for up to {listing.guests} {listing.guests === 1 ? "guest" : "guests"}.
              </p>
            </div>

            <hr />

            <h3>What this place offers</h3>
            <div className="amenities-grid">
              {listing.amenities.map((amenity) => (
                <div key={amenity} className="amenity-item">
                  <span>✓</span>
                  <p>{amenity}</p>
                </div>
              ))}
            </div>

            <hr />

            <h3>{nights} nights in {listing.location}</h3>
            <p className="description-text">
              Your booking is calculated using your selected check-in date, checkout date, number of
              guests and total nights.
            </p>

            <hr />

            <h3>Reviews</h3>
            <div className="ratings-grid">
              <div>
                <span>Cleanliness</span>
                <strong>4.8</strong>
              </div>
              <div>
                <span>Communication</span>
                <strong>4.7</strong>
              </div>
              <div>
                <span>Check-in</span>
                <strong>4.9</strong>
              </div>
              <div>
                <span>Accuracy</span>
                <strong>4.6</strong>
              </div>
              <div>
                <span>Location</span>
                <strong>4.9</strong>
              </div>
              <div>
                <span>Value</span>
                <strong>4.5</strong>
              </div>
            </div>

            <div className="review-cards">
              <article>
                <strong>Jane</strong>
                <p>Lovely place, clean and comfortable. The location was convenient.</p>
              </article>

              <article>
                <strong>Michael</strong>
                <p>The host was friendly and the stay felt safe and relaxed.</p>
              </article>
            </div>

            <hr />

            <section className="host-details-card">
              <div className="host-avatar large-host-avatar">👤</div>
              <div>
                <h3>Hosted by {listing.host}</h3>
                <p>Joined in 2024</p>
                <p>⭐ {listing.reviews} reviews</p>
                <p>✓ Identity verified</p>
                <p>🏅 Superhost</p>
                <p>{listing.host} is experienced, helpful and responds quickly to guests.</p>
                <p>
                  <strong>Response rate:</strong> 100%
                </p>
                <p>
                  <strong>Response time:</strong> Within an hour
                </p>
              </div>
            </section>

            <hr />

            <div className="rules-grid">
              <section>
                <h3>House rules</h3>
                <p>Check-in: After 14:00</p>
                <p>Checkout: Before 10:00</p>
                <p>No smoking</p>
                <p>No parties or events</p>
                <p>Pets allowed on request</p>
                <p>Quiet hours after 22:00</p>
              </section>

              <section>
                <h3>Health & safety</h3>
                <p>Enhanced cleaning process</p>
                <p>Smoke alarm available</p>
                <p>First-aid kit available</p>
                <p>Guests must follow safety instructions</p>
              </section>

              <section>
                <h3>Cancellation policy</h3>
                <p>Free cancellation for 48 hours after booking.</p>
                <p>Cancel before check-in for a partial refund.</p>
                <p>Service fees may not be fully refundable.</p>
              </section>
            </div>
          </section>

          <aside className="cost-card">
            <div className="price-card-top">
              <h2>
                R{listing.price} <span>/ night</span>
              </h2>
              <p>
                ⭐ {listing.rating} · {listing.reviews} reviews
              </p>
            </div>

            {reservationMessage && (
              <p
                className={
                  reservationMessage.includes("log in") || reservationMessage.includes("could not")
                    ? "error-message"
                    : "success-message"
                }
              >
                {reservationMessage}
              </p>
            )}

            <div className="booking-grid">
              <div>
                <label>Check-in</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(event) => setCheckIn(event.target.value)}
                />
              </div>

              <div>
                <label>Checkout</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(event) => setCheckOut(event.target.value)}
                />
              </div>
            </div>

            <label>Nights</label>
            <input
              type="number"
              min="1"
              value={nights}
              onChange={(event) => setNights(Number(event.target.value))}
            />

            <label>Guests</label>
            <input
              type="number"
              min="1"
              max={listing.guests}
              value={guests}
              onChange={(event) => setGuests(Number(event.target.value))}
            />

            <button type="button" className="reserve-button" onClick={handleReservation}>
              Reserve
            </button>

            <p className="charge-note">You won’t be charged yet</p>

            <div className="cost-row">
              <span>
                R{listing.price} x {nights} nights
              </span>
              <span>R{subtotal}</span>
            </div>

            <div className="cost-row">
              <span>Weekly discount</span>
              <span>-R{weeklyDiscount}</span>
            </div>

            <div className="cost-row">
              <span>Cleaning fee</span>
              <span>R{cleaningFee}</span>
            </div>

            <div className="cost-row">
              <span>Service fee</span>
              <span>R{serviceFee}</span>
            </div>

            <div className="cost-row">
              <span>Occupancy taxes</span>
              <span>R{taxes}</span>
            </div>

            <hr />

            <div className="cost-row total">
              <span>Total</span>
              <span>R{total}</span>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function UserLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleUserLogin(event) {
  event.preventDefault();

  if (!email || !password) {
    setError("Please enter your email and password.");
    return;
  }

  try {
    const userData = await loginUser({ email, password });

    if (userData.role !== "user") {
      setError("Please use the Admin Login page for admin accounts.");
      return;
    }

    localStorage.setItem("token", userData.token);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", userData.name);
    localStorage.setItem("role", userData.role);

    setError("");
    navigate("/");
  } catch (error) {
    setError(error.response?.data?.message || "User login failed. Please try again.");
  }
}

  return (
    <main>
      <Header />
      <section className="auth-page">
        <form className="auth-card" onSubmit={handleUserLogin}>
          <h1>User Login</h1>
          <p className="hint-text">Log in as a guest to make reservations.</p>

          {error && <p className="error-message">{error}</p>}

          <label>Email</label>
          <input
            type="email"
            placeholder="guest@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit">Log in</button>
          <p className="hint-text">
            Demo: use any valid email and a password with 6 or more characters.
          </p>
        </form>
      </section>
    </main>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

 async function handleLogin(event) {
  event.preventDefault();

  if (!email || !password) {
    setError("Please enter both your email and password.");
    return;
  }

  try {
    const userData = await loginUser({ email, password });

    if (userData.role !== "admin") {
      setError("This account is not an admin account.");
      return;
    }

    localStorage.setItem("token", userData.token);
    localStorage.setItem("isAdminLoggedIn", "true");
    localStorage.setItem("username", userData.name);
    localStorage.setItem("role", userData.role);

    setError("");
    navigate("/admin/dashboard");
  } catch (error) {
    setError(error.response?.data?.message || "Admin login failed. Please try again.");
  }
}


  return (
    <main>
      <Header />
      <section className="auth-page">
        <form className="auth-card" onSubmit={handleLogin}>
          <h1>Admin Login</h1>
          {error && <p className="error-message">{error}</p>}

          <label>Email</label>
          <input
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit">Login</button>
          <p className="hint-text">
            Admin demo: use any valid email and a password with 6 or more characters.
          </p>
        </form>
      </section>
    </main>
  );
}

function AdminDashboard() {
  return (
    <main>
      <Header />
      <section className="page-container">
        <h1>Admin Dashboard</h1>
        <p>Manage Airbnb property listings and reservations.</p>
        <div className="admin-grid">
          <Link to="/admin/create-listing" className="admin-card">
            Create Listing
          </Link>
          <Link to="/admin/listings" className="admin-card">
            View Listings
          </Link>
          <Link to="/admin/reservations" className="admin-card">
            View Reservations
          </Link>
        </div>
      </section>
    </main>
  );
}

function CreateListing() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    guests: "",
    type: "",
    price: "",
    amenities: "",
    image: "",
    weeklyDiscount: "",
    cleaningFee: "",
    serviceFee: "",
    occupancyTaxes: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.title ||
      !formData.location ||
      !formData.description ||
      !formData.bedrooms ||
      !formData.bathrooms ||
      !formData.guests ||
      !formData.type ||
      !formData.price
    ) {
      setError("Please complete all required fields.");
      setSuccess("");
      return;
    }

    if (Number(formData.price) < 500) {
      setError("The price must be at least R500 per night.");
      setSuccess("");
      return;
    }

    const newListing = {
      title: formData.title,
      location: formData.location,
      type: formData.type,
      guests: Number(formData.guests),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      price: Number(formData.price),
      rating: 4.5,
      reviews: 0,
      host: "Admin User",
      description: formData.description,
      amenities: formData.amenities
        ? formData.amenities.split(",").map((item) => item.trim())
        : ["Wi-Fi"],
      image: formData.image || "https://placehold.co/900x600/f7f7f7/222?text=Property+Photo",
      weeklyDiscount: Number(formData.weeklyDiscount) || 0,
      cleaningFee: Number(formData.cleaningFee) || 0,
      serviceFee: Number(formData.serviceFee) || 0,
      occupancyTaxes: Number(formData.occupancyTaxes) || 0,
    };

    try {
      await createAccommodation(newListing);
      setError("");
      setSuccess("Listing created successfully!");
      setTimeout(() => navigate("/admin/listings"), 800);
    } catch (error) {
      console.error("Could not create listing:", error);
      setError("Could not create listing. Please check the server and try again.");
      setSuccess("");
    }
  }

  return (
    <main>
      <Header />
      <section className="page-container">
        <h1>Create Listing</h1>
        <p>Add a new property listing for the Airbnb admin dashboard.</p>
        <form className="listing-form" onSubmit={handleSubmit}>
          {error && <p className="error-message full-width">{error}</p>}
          {success && <p className="success-message full-width">{success}</p>}
          <input name="title" placeholder="Title *" value={formData.title} onChange={handleChange} />
          <input
            name="location"
            placeholder="Location *"
            value={formData.location}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description *"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          <input
            name="bedrooms"
            placeholder="Bedrooms *"
            type="number"
            value={formData.bedrooms}
            onChange={handleChange}
          />
          <input
            name="bathrooms"
            placeholder="Bathrooms *"
            type="number"
            value={formData.bathrooms}
            onChange={handleChange}
          />
          <input
            name="guests"
            placeholder="Guests *"
            type="number"
            value={formData.guests}
            onChange={handleChange}
          />
          <input
            name="type"
            placeholder="Type of accommodation *"
            value={formData.type}
            onChange={handleChange}
          />
          <input
            name="price"
            placeholder="Price per night *"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
          <input
            name="amenities"
            placeholder="Amenities, separated by commas"
            value={formData.amenities}
            onChange={handleChange}
          />
          <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
          <input
            name="weeklyDiscount"
            placeholder="Weekly discount"
            type="number"
            value={formData.weeklyDiscount}
            onChange={handleChange}
          />
          <input
            name="cleaningFee"
            placeholder="Cleaning fee"
            type="number"
            value={formData.cleaningFee}
            onChange={handleChange}
          />
          <input
            name="serviceFee"
            placeholder="Service fee"
            type="number"
            value={formData.serviceFee}
            onChange={handleChange}
          />
          <input
            name="occupancyTaxes"
            placeholder="Occupancy taxes"
            type="number"
            value={formData.occupancyTaxes}
            onChange={handleChange}
          />
          <button type="submit">Create Listing</button>
        </form>
      </section>
    </main>
  );
}

function ViewListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadListings() {
      try {
        const data = await getAccommodations();
        setListings(data.map(normaliseListing));
      } catch (error) {
        console.error("Could not load listings:", error);
        setListings(getAllListings());
      } finally {
        setLoading(false);
      }
    }

    loadListings();
  }, []);

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this listing?");
    if (!confirmDelete) return;

    try {
      await deleteAccommodation(id);
      setListings(listings.filter((listing) => listing.id !== id));
    } catch (error) {
      console.error("Could not delete listing:", error);
      alert("Could not delete listing. Please check the server and try again.");
    }
  }

  if (loading) {
    return (
      <main>
        <Header />
        <section className="page-container">
          <h1>Loading listings...</h1>
        </section>
      </main>
    );
  }

  return (
    <main>
      <Header />
      <section className="page-container">
        <h1>View Listings</h1>
        <p>View, update or delete property listings.</p>
        <div className="listing-list">
          {listings.length === 0 ? (
            <p>No listings available.</p>
          ) : (
            listings.map((listing) => (
              <div className="listing-card" key={listing.id}>
                <ListingImage listing={listing} />
                <div>
                  <p className="muted">{listing.type}</p>
                  <h2>{listing.title}</h2>
                  <p>{listing.location}</p>
                  <p>{formatListingDetails(listing)}</p>
                  <p>
                    ⭐ {listing.rating} ({listing.reviews} reviews)
                  </p>
                  <h3>R{listing.price} / night</h3>
                  <div className="button-row">
                    <Link to={`/admin/update-listing/${listing.id}`}>Update</Link>
                    <button type="button" onClick={() => handleDelete(listing.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

function UpdateListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    guests: "",
    type: "",
    price: "",
    amenities: "",
    image: "",
    weeklyDiscount: "",
    cleaningFee: "",
    serviceFee: "",
    occupancyTaxes: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadListing() {
      try {
        const listing = await getAccommodationById(id);
        const normalisedListing = normaliseListing(listing);

        setFormData({
          title: normalisedListing.title || "",
          location: normalisedListing.location || "",
          description: normalisedListing.description || "",
          bedrooms: normalisedListing.bedrooms || "",
          bathrooms: normalisedListing.bathrooms || "",
          guests: normalisedListing.guests || "",
          type: normalisedListing.type || "",
          price: normalisedListing.price || "",
          amenities: normalisedListing.amenities ? normalisedListing.amenities.join(", ") : "",
          image: normalisedListing.image || "",
          weeklyDiscount: normalisedListing.weeklyDiscount || "",
          cleaningFee: normalisedListing.cleaningFee || "",
          serviceFee: normalisedListing.serviceFee || "",
          occupancyTaxes: normalisedListing.occupancyTaxes || "",
        });
      } catch (error) {
        console.error("Could not load listing:", error);
        setError("Could not load listing. Please check the server.");
      } finally {
        setLoading(false);
      }
    }

    loadListing();
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const updatedListing = {
      title: formData.title,
      location: formData.location,
      description: formData.description,
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      guests: Number(formData.guests),
      type: formData.type,
      price: Number(formData.price),
      amenities: formData.amenities.split(",").map((item) => item.trim()),
      image: formData.image,
      weeklyDiscount: Number(formData.weeklyDiscount) || 0,
      cleaningFee: Number(formData.cleaningFee) || 0,
      serviceFee: Number(formData.serviceFee) || 0,
      occupancyTaxes: Number(formData.occupancyTaxes) || 0,
    };

    try {
      await updateAccommodation(id, updatedListing);
      setSuccess("Listing updated successfully!");
      setError("");
      setTimeout(() => navigate("/admin/listings"), 800);
    } catch (error) {
      console.error("Could not update listing:", error);
      setError("Could not update listing. Please try again.");
      setSuccess("");
    }
  }

  if (loading) {
    return (
      <main>
        <Header />
        <section className="page-container">
          <h1>Loading listing...</h1>
        </section>
      </main>
    );
  }

  return (
    <main>
      <Header />
      <section className="page-container">
        <h1>Update Listing</h1>
        <p>Edit the listing details below.</p>
        <form className="listing-form" onSubmit={handleSubmit}>
          {error && <p className="error-message full-width">{error}</p>}
          {success && <p className="success-message full-width">{success}</p>}
          <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
          <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          <input
            name="bedrooms"
            placeholder="Bedrooms"
            type="number"
            value={formData.bedrooms}
            onChange={handleChange}
          />
          <input
            name="bathrooms"
            placeholder="Bathrooms"
            type="number"
            value={formData.bathrooms}
            onChange={handleChange}
          />
          <input
            name="guests"
            placeholder="Guests"
            type="number"
            value={formData.guests}
            onChange={handleChange}
          />
          <input name="type" placeholder="Type of accommodation" value={formData.type} onChange={handleChange} />
          <input
            name="price"
            placeholder="Price per night"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
          <input name="amenities" placeholder="Amenities" value={formData.amenities} onChange={handleChange} />
          <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
          <input
            name="weeklyDiscount"
            placeholder="Weekly discount"
            type="number"
            value={formData.weeklyDiscount}
            onChange={handleChange}
          />
          <input
            name="cleaningFee"
            placeholder="Cleaning fee"
            type="number"
            value={formData.cleaningFee}
            onChange={handleChange}
          />
          <input
            name="serviceFee"
            placeholder="Service fee"
            type="number"
            value={formData.serviceFee}
            onChange={handleChange}
          />
          <input
            name="occupancyTaxes"
            placeholder="Occupancy taxes"
            type="number"
            value={formData.occupancyTaxes}
            onChange={handleChange}
          />
          <button type="submit">Save Changes</button>
        </form>
      </section>
    </main>
  );
}

function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReservations() {
      try {
        const data = await getReservations();
        setReservations(data);
      } catch (error) {
        console.error("Could not load reservations:", error);
        setReservations([]);
      } finally {
        setLoading(false);
      }
    }

    loadReservations();
  }, []);

  async function handleDeleteReservation(id) {
    const confirmDelete = window.confirm("Delete this reservation?");
    if (!confirmDelete) return;

    try {
      await deleteReservation(id);
      setReservations(reservations.filter((reservation) => reservation._id !== id));
    } catch (error) {
      console.error("Could not delete reservation:", error);
      alert("Could not delete reservation.");
    }
  }

  if (loading) {
    return (
      <main>
        <Header />
        <section className="page-container">
          <h1>Loading reservations...</h1>
        </section>
      </main>
    );
  }

  return (
    <main>
      <Header />
      <section className="page-container">
        <h1>Admin Reservations</h1>
        <table className="reservation-table">
          <thead>
            <tr>
              <th>Guest</th>
              <th>Listing</th>
              <th>Dates</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan="5">No reservations yet.</td>
              </tr>
            ) : (
              reservations.map((reservation) => (
                <tr key={reservation._id}>
                  <td>{reservation.guestName}</td>
                  <td>{reservation.accommodation?.title || "Deleted listing"}</td>
                  <td>
                    {reservation.checkIn} - {reservation.checkOut}
                  </td>
                  <td>R{reservation.total}</td>
                  <td>
                    <button type="button" onClick={() => handleDeleteReservation(reservation._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer improved-footer">
      <div>
        <h3>Support</h3>
        <p>Help Centre</p>
        <p>Safety information</p>
        <p>Cancellation options</p>
        <p>Report a neighbourhood concern</p>
      </div>

      <div>
        <h3>Community</h3>
        <p>Airbnb.org</p>
        <p>Support disaster relief housing</p>
        <p>Combating discrimination</p>
        <p>Invite friends</p>
      </div>

      <div>
        <h3>Hosting</h3>
        <p>Become a host</p>
        <p>AirCover protection for hosts</p>
        <p>Explore hosting resources</p>
        <p>Visit our community forum</p>
      </div>

      <div>
        <h3>Airbnb</h3>
        <p>Newsroom</p>
        <p>Learn about new features</p>
        <p>Careers</p>
        <p>Investors</p>
      </div>

      <div className="copyright-footer improved-copyright">
        <p>© 2026 Airbnb Clone · Privacy · Terms · Sitemap</p>

        <div className="footer-controls">
          <select defaultValue="English">
            <option value="English">English</option>
            <option value="Afrikaans">Afrikaans</option>
            <option value="Zulu">Zulu</option>
          </select>

          <select defaultValue="ZAR">
            <option value="ZAR">ZAR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>

          <div className="social-links">
            <span>f</span>
            <span>X</span>
            <span>◎</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <HomePage />
            </>
          }
        />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/locations/:location" element={<LocationPage />} />
        <Route path="/accommodation/:id" element={<DetailsPage />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/create-listing" element={<CreateListing />} />
        <Route path="/admin/listings" element={<ViewListings />} />
        <Route path="/admin/update-listing/:id" element={<UpdateListing />} />
        <Route path="/admin/reservations" element={<AdminReservations />} />
           </Routes>
    </BrowserRouter>
  );
}

export default App;