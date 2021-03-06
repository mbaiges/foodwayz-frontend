import { AboutUs } from './AboutUsStack';
import { ContactUs } from './ContactUsStack';
import { Home } from './HomeStack';
import { Search } from './SearchStack';

import {
    CreateRestaurant,
    EditRestaurant,
    EditProfile,
    UserProfile,
    EditProfilePassword, 
    EditProfileAllergies,
    Premium,
    RestaurantStatisticsProfile,
    OwnerRestaurantProfile,
    FoodSpecificStatistics
} from './UserProfileStack';

import Filter from './FilterScreen';
import Food from './FoodScreen';
import RateFood from './RateFoodScreen';
import RestaurantProfile from './RestaurantProfileScreen';
import Reviews from './ReviewsScreen';
import AddDish from './AddDishScreen';
import ReviewInfo from './ReviewInfoScreen';

export {
    // About Us Stack
    AboutUs,

    // Contact Us Stack
    ContactUs,

    // Home Stack
    Home,
    RestaurantProfile,

    // Search Stack
    Search,

    // User Profile Stack
    CreateRestaurant,
    EditRestaurant,
    EditProfile,
    UserProfile,
    EditProfilePassword, 
    EditProfileAllergies,
    Premium,
    RestaurantStatisticsProfile,
    OwnerRestaurantProfile,
    FoodSpecificStatistics,

    // Shared
    Filter,
    Food,
    RateFood,
    //RestaurantProfile,
    Reviews,
    AddDish,
    ReviewInfo,

}