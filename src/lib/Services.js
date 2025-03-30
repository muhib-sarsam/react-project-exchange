import Helper from '../lib/Helper'

const Services = {};

Services.serviceFetch = (url) => {
   return fetch(url).then(response => response.json())
    .then((d) => {
       return d;
    });
};

export default Services;
