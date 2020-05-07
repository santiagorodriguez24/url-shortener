process.env.PORT = process.env.PORT || 3001;

process.env.NODE_ENV = process.env.NODE_ENV || 'developmentchuchi';

let urlDB;

if (process.env.NODE_ENV === 'developmentchuchi') {
    urlDB = 'mongodb://localhost:27017/url-shortener';
} else {
    urlDB = process.env.mongo_database_url;
}

process.env.DATABASE = urlDB;