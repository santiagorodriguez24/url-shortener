process.env.PORT = process.env.PORT || 3001;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

let urlDB;

if (process.env.NODE_ENV === 'development') {
    urlDB = 'mongodb://localhost:27017/url-shortener';
} else {
    urlDB = process.env.mongo_database_url;
}

process.env.DATABASE = urlDB;