import React from 'react';
import toilet1 from '../../utils/Images/King.webp';
import toilet2 from '../../utils/Images/Dirty.webp';
import toilet3 from '../../utils/Images/royal-style-gold-toilet-5.jpg';
import toilet4 from '../../utils/Images/toilet.webp';
import toilet5 from '../../utils/Images/Large_Bathroom.webp';

const listings = [
  {
    title: 'Posh Toilet',
    address: 'post road, birimingham',
    description: 'Posh and clean',
    image: toilet1,
  },
  {
    title: 'Dirty Toilet',
    address: 'post road, birimingham',
    description: 'Old and dirty',
    image: toilet2,
  },
  {
    title: 'Toilet',
    address: 'post road, birimingham',
    description: 'King of toilets',
    image: toilet3,
  },
  {
    title: 'shower and toilet',
    address: 'post road, birimingham',
    description: 'wash yo self',
    image: toilet4,
  },
  {
    title: 'TOLet',
    address: 'post road, birimingham',
    description: 'Posh andfgfgfg clean',
    image: toilet5,
  },
];

const LocalListings = () => {
  return (
    <div className="d-flex min-vh-100 align-items-end">
      <div className="Listings-card bg-warning p-5">
        <div className="row">
          {listings.map((listing) => (
            <div className="col border border-dark d-flex align-items-center justify-content-center flex-column" key={listing.title}>
              <p className="small-font-size">{listing.title}</p>
              <img className="w-50 h-50" src={listing.image} alt={listing.title} />
              <p>{listing.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocalListings;